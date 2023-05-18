import { useState } from "react";
import "./login-register.css";
import Login from "./login/login";
import Register from "./register/register";

function LoginRegister() {
  const [selectedForm, setSelectedForm] = useState("login");

  const toggleForm = (form) => {
    setSelectedForm(form);
  };

  const phrase = selectedForm === "register" ? "meet" : "see";

  return (
    <div className="login-register-container">
      <h1 className="login-register-heading">nice to {phrase} you</h1>
      <div className="login-register-toggle">
        <button
          className={
            "login-register-button " +
            (selectedForm === "login" ? "login-selected" : "")
          }
          id="login-register-button-left"
          onClick={() => toggleForm("login")}
        >
          login
        </button>
        <button
          className={
            "login-register-button " +
            (selectedForm === "register" ? "login-selected" : "")
          }
          id="login-register-button-right"
          onClick={() => toggleForm("register")}
        >
          register
        </button>
      </div>
      {selectedForm === "login" && <Login />}
      {selectedForm === "register" && <Register />}
    </div>
  );
}

export default LoginRegister;
