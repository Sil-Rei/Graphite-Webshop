import { useContext, useState } from "react";
import "./cart-item.css";

import { XCircle } from "react-bootstrap-icons";
import { removeFromCart } from "../../../services/productService";

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

  const imageURL = "http://localhost:8000" + image;
  const handleChange = (event) => {
    setBuyAmount(event.target.value);
  };

  const handleRemoveClick = async () => {
    try {
      console.log(cartId, itemId);
      const result = await removeFromCart(cartId, itemId);
      onDelete(itemId);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
            className="card-item-amount"
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
