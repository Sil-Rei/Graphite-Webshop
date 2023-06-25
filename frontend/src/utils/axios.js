import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://graphite-webshop-8da1e10f5d95.herokuapp.com/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    if (authTokens) {
      config.headers["Authorization"] = `Bearer ${authTokens.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
