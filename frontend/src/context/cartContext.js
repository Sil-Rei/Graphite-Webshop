import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const setCart = (items) => {
    setCartItems(items);
  };

  const addCartItem = (item) => {
    console.log(cartItems);
    setCartItems([...cartItems, item]);
  };

  const removeCartItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  let contextData = {
    cartItems,
    setCart,
    addCartItem,
    removeCartItem,
    clearCart,
    updateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
};
export default CartContext;
