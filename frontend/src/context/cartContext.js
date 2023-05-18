import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0);

  const setCart = (items) => {
    setCartItems(items);
  };

  const addCartItem = () => {
    setCartItems(cartItems + 1);
  };

  const removeCartItem = () => {
    setCartItems(cartItems - 1);
  };

  let contextData = {
    cartItems,
    setCart,
    addCartItem,
    removeCartItem,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
};
export default CartContext;
