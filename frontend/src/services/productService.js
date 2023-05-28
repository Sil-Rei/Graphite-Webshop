import axios from "../utils/axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/all-products");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get("/api/products/" + id + "/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post("/api/add-to-cart/", {
      product_id: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const removeFromCart = async (cartId, itemId) => {
  try {
    const response = await axios.post("/api/remove-from-cart/", {
      cartId: cartId,
      itemId: itemId,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const searchForProduct = async (term) => {
  try {
    const response = await axios.get("/api/search/" + term + "/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const productsByCategory = async (category) => {
  try {
    const response = await axios.get(
      "/api/products/category/" + category + "/"
    );
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
