import axios from "../utils/axios";

export const getCartItems = async () => {
  try {
    const response = await axios.get("/api/user-cart");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
