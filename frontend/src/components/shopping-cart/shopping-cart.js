import "./shopping-cart.css";
import CartItem from "./cart-item/cart-item";
import { useContext, useEffect, useState } from "react";
import {
  getCartItems,
  makePurchase,
  syncCartContext,
  validateCoupon,
} from "../../services/userdataService";
import CartContext from "../../context/cartContext";
import { BagCheckFill, Check, EmojiFrown } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShoppingCart() {
  const [cartItemsState, setCartItemsState] = useState([]);
  const { setCart, cartItems, removeCartItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [hasBought, setHasBought] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponDisabled, setCouponDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(cartItems);
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        // when not server stored items are in the context, sync the context items with the backend
        console.log(cartItems.length);
        console.log(items);
        if (
          (items.items.length === 0 || items === undefined) &&
          cartItems.length > 0
        ) {
          console.log("synced cartContext");
          await syncCartContext(cartItems);
          setRefresh(!refresh);
        }
        setCartItemsState(items.items);
        setCart(items?.items);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchCartItems();
    } else {
      setCartItemsState(cartItems);
    }
  }, [refresh]);

  // callback function for cart-item child component
  const handleItemDelete = (itemId) => {
    // Update the cartItems state by removing the deleted item
    setCartItemsState((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );

    removeCartItem(itemId);
  };

  const mappedCartItems = cartItemsState.map((item) => {
    console.log(cartItemsState);
    return (
      <li className="item" key={item.id}>
        <CartItem
          name={item.product.name}
          price={item.product.price}
          amount={item.quantity}
          image={item.product.image}
          cartId={item.cart}
          itemId={item.id}
          stockQuantity={item.product.stock_quantity}
          st
          onDelete={handleItemDelete}
        />
      </li>
    );
  });

  const mappedPrices = cartItemsState.map((item, key) => {
    return (
      <li key={key}>
        {item.quantity} x {item.product.price}
      </li>
    );
  });

  // calculate price sum
  let totalPrice = 0;
  cartItemsState.forEach((item) => {
    totalPrice += item.quantity * item.product.price;
  });

  if (couponDisabled) {
    totalPrice = totalPrice * 0.9;
  }
  totalPrice = totalPrice.toFixed(2);
  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await makePurchase();
      console.log(response);
      setHasBought(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueClick = () => {
    setCart([]);
    navigate("/");
  };

  const handleChange = (event) => {
    setCoupon(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await validateCoupon(coupon);
      console.log(response);
      toast.success("Coupon valid! Discount applied.");
      setCouponDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error("Invalid coupon.");
    }
  };

  return (
    <div className="outer-wrapper">
      <ToastContainer />
      {!hasBought ? (
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
                <button className="checkout-button" onClick={handleCheckout}>
                  checkout
                </button>
                <form onSubmit={handleSubmit} className="coupon-form">
                  <input
                    type="text"
                    placeholder="coupon?"
                    className="coupon-input"
                    value={coupon}
                    onChange={handleChange}
                    disabled={couponDisabled}
                  />
                  <button type="submit" className="coupon-submit-button">
                    <Check />
                  </button>
                </form>
              </div>
            ) : (
              <div className="price-section" />
            )}
          </div>
        </div>
      ) : (
        <div className="has-bought-container">
          <p className="bought-text">Purchase Successful!</p>
          <BagCheckFill className="bought-icon" />
          <button className="bought-button" onClick={handleContinueClick}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
