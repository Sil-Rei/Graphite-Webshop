import axios from "../utils/axios";

export const checkIfAdmin = async () => {
  try {
    const response = await axios.get("/api/is-admin/");
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await axios.patch("/api/product/update/", { data: data });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/product/delete/?id=${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`/api/product/add/`, formData);
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`/api/users/all/`);
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
