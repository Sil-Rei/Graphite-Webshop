import "./shopping-cart.css";
import CardItem from "./cart-item/cart-item";
import { useContext, useEffect, useState } from "react";
import { getCartItems } from "../../services/userdataService";
import CartContext from "../../context/cartContext";
import { EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        console.log(items.items);
        setCartItems(items.items);
        setCart(items.items.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  // callback function for cart-item child component
  const handleItemDelete = (itemId) => {
    // Update the cartItems state by removing the deleted item
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // Update the cart count
    setCart((prevCount) => prevCount - 1);
  };

  const mappedCartItems = cartItems.map((item) => {
    return (
      <li className="item" key={item.product.id}>
        <CardItem
          name={item.product.name}
          price={item.product.price}
          amount={item.quantity}
          image={item.product.image}
          cartId={item.cart}
          itemId={item.id}
          onDelete={handleItemDelete}
        />
      </li>
    );
  });

  const mappedPrices = cartItems.map((item) => {
    return (
      <li>
        {item.quantity} x {item.product.price}
      </li>
    );
  });

  // calculate price sum
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.quantity * item.product.price;
  });
  totalPrice = totalPrice.toFixed(2);

  return (
    <div className="shopping-cart-container">
      <h1>shopping cart</h1>
      <div className="shopping-cart-body">
        <div className="item-section">
          {totalPrice <= 0 && (
            <div className="shopping-cart-empty">
              <div className="shopping-cart-empty-icon">
                <EmojiFrown />
              </div>
              <p className="shopping-cart-empty-p">Your cart is empty</p>
              <Link to="/">
                <button className="shopping-cart-empty-button">
                  Go shopping
                </button>
              </Link>
            </div>
          )}
          <ul className="item-section-list">{mappedCartItems}</ul>
        </div>
        {totalPrice > 0 ? (
          <div className="price-section">
            <ul className="price-section-prices">{mappedPrices}</ul>
            <div className="price-section-hr" />
            <p className="price-section-sum">{totalPrice}€</p>
            <button className="checkout-button">checkout</button>
            <input type="text" placeholder="coupon?" className="coupon-input" />
          </div>
        ) : (
          <div className="price-section" />
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
