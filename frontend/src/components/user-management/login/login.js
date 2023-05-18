import { useContext } from "react";
import "./login.css";
import { PersonFill, KeyFill } from "react-bootstrap-icons";
import AuthContext from "../../../context/authContext";

function Login() {
  let { loginUser, user } = useContext(AuthContext);
  return (
    <form className="login-container" onSubmit={loginUser}>
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
      <p className="forgot-password">forgot password?</p>
    </form>
  );
}

export default Login;
