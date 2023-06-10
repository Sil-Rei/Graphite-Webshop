import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CartContext from "./cartContext";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { setCart } = useContext(CartContext);
  const fourteenMinutes = 1000 * 60 * 14;
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  ); // saves both tokens (access / refresh)
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  ); // saves the decoded value of the access token

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    console.log("form submitted");

    try {
      let response = await axios.post("/api/token/", {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      let data = await response.data;
      console.log(data);

      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Wrong password or username");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setCart([]);
  };

  const updateTokens = async () => {
    try {
      let response = await axios.post("/api/token/refresh/", {
        refresh: authTokens?.refresh,
      });
      let data = await response.data;

      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } catch (error) {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateTokens();
    }

    let intervallId = setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, fourteenMinutes);
    return () => clearInterval(intervallId);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
