import "./register.css";
import {
  PersonFill,
  KeyFill,
  Calendar2,
  House,
  ListOl,
} from "react-bootstrap-icons";

function Register() {
  return (
    <div className="register-container">
      <div className="name-input-container">
        <div className="input-container">
          <div className="input-icon">
            <PersonFill />
          </div>
          <input
            type="text"
            className="register-input"
            placeholder="first name"
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <PersonFill />
          </div>
          <input
            type="text"
            className="register-input"
            placeholder="last name"
          />
        </div>
      </div>

      <div className="input-container">
        <div className="input-icon">
          <Calendar2 />
        </div>
        <input type="date" className="register-input" />
      </div>

      <div className="address-input-container">
        <div className="input-container">
          <div className="input-icon">
            <House />
          </div>
          <input
            type="text"
            className="register-input"
            placeholder="street & house number"
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <House />
          </div>
          <input
            id="register-zip"
            type="text"
            className="register-input"
            placeholder="ZIP"
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <House />
          </div>
          <input
            id="register-city"
            type="text"
            className="register-input"
            placeholder="city"
          />
        </div>
      </div>

      <div className="input-container">
        <div className="input-icon">
          <PersonFill />
        </div>
        <input type="text" className="register-input" placeholder="username" />
      </div>
      <div className="input-container">
        <div className="input-icon">
          <KeyFill />
        </div>
        <input
          type="password"
          className="register-input"
          placeholder="password"
        />
      </div>
      <div className="input-container">
        <div className="input-icon">
          <KeyFill />
        </div>
        <input
          type="password"
          className="register-input"
          placeholder="repeast password"
        />
      </div>
      <button className="register-button">register</button>
    </div>
  );
}

export default Register;
