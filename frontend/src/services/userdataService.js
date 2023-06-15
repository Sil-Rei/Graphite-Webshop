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
export const getPurchases = async () => {
  try {
    const response = await axios.get("/api/purchases/user/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const response = await axios.get("/api/reviews/user/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`/api/reviews/user/delete/?id=${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const registerUser = async (data) => {
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

export const syncCartContext = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("/api/sync-cart/", {
      data,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const updateCartQuantity = async (id, newQuantity) => {
  try {
    const response = await axios.post("/api/cart/update-quantity/", {
      id,
      newQuantity,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post("/api/newsletter/subscribe/", {
      email,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const validateCoupon = async (coupon) => {
  try {
    const response = await axios.post("/api/coupon/validate/", {
      coupon,
    });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
