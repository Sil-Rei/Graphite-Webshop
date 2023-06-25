import { useContext, useState } from "react";
import "./cart-item.css";

import { XCircle } from "react-bootstrap-icons";
import { removeFromCart } from "../../../services/productService";
import AuthContext from "../../../context/authContext";
import { updateCartQuantity } from "../../../services/userdataService";
import CartContext from "../../../context/cartContext";

function CartItem({
  name,
  image,
  price,
  amount,
  cartId,
  itemId,
  onDelete,
  stockQuantity,
}) {
  const [buyAmount, setBuyAmount] = useState(amount);
  const { user } = useContext(AuthContext);
  const { updateCartItemQuantity } = useContext(CartContext);
  const [isInvalidAmount, setIsInvalidAmount] = useState(false);

  let imageURL = image;

  if (!image.includes("http")) {
    imageURL = "https://res.cloudinary.com/dgsmccttl/" + image;
  }

  const handleChange = (event) => {
    let value = event.target.value;
    if (value > stockQuantity || value <= 0) {
      setIsInvalidAmount(true);
    } else {
      setIsInvalidAmount(false);
      setBuyAmount(value);
      updateQuantity(value);
    }
  };

  const updateQuantity = async (newAmount) => {
    updateCartItemQuantity(itemId, newAmount);
    if (user) {
      try {
        await updateCartQuantity(itemId, newAmount);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemoveClick = async () => {
    if (user) {
      try {
        console.log(cartId, itemId);
        const result = await removeFromCart(cartId, itemId);
        onDelete(itemId);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      onDelete(itemId);
    }
  };

  let errorClass = isInvalidAmount
    ? "card-item-amount card-item-error"
    : "card-item-amount";

  return (
    <div className="card-item-container">
      <div className="image-cropper">
        <img src={imageURL} alt="item" className="card-item-image" />
      </div>

      <div className="card-item-left">
        <h3 className="card-item-name">{name}</h3>
        <p className="card-item-price">{price}€</p>
        <div className="card-item-quantity-container">
          <input
            type="number"
            className={errorClass}
            value={buyAmount}
            onChange={handleChange}
            min={1}
            max={stockQuantity}
          />
          <p className="cart-item-stock-quantity">stock: {stockQuantity}</p>
        </div>
      </div>
      <div className="remove-item" onClick={handleRemoveClick}>
        <XCircle />
      </div>
    </div>
  );
}

export default CartItem;
