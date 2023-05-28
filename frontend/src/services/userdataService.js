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

export const makePurchase = async () => {
  try {
    const response = await axios.get("/api/purchase/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const registerUser = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("/api/register/", {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      password: data.password,
      email: data.email,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
