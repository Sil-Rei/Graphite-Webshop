import { useContext, useEffect, useState } from "react";
import "./login.css";
import { PersonFill, KeyFill } from "react-bootstrap-icons";
import AuthContext from "../../../context/authContext";

function Login() {
  let { loginUser, user } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target.username.value === "" ||
      event.target.password.value === ""
    ) {
      setError("Please provide a username and a password");
      return;
    }
    loginUser(event);
  };

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="input-icon">
          <PersonFill />
        </div>
        <input
          type="text"
          className="login-input"
          placeholder="username"
          name="username"
        />
      </div>
      <div className="input-container">
        <div className="input-icon">
          <KeyFill />
        </div>
        <input
          type="password"
          className="login-input"
          placeholder="password"
          name="password"
        />
      </div>
      <button type="submit" className="login-button">
        login
      </button>
      <p className="error-login">{error}</p>
      <p className="forgot-password">forgot password?</p>
    </form>
  );
}

export default Login;
