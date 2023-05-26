import { useEffect, useState } from "react";
import "./register.css";
import {
  PersonFill,
  KeyFill,
  Calendar2,
  House,
  ListOl,
  Envelope,
  Check,
} from "react-bootstrap-icons";
import { registerUser } from "../../../services/userdataService";
import { useNavigate } from "react-router-dom";

function isAdult(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);
  const inputDate = new Date(year, month, day);
  const currentDate = new Date();
  inputDate.setFullYear(inputDate.getFullYear() + 18);

  return inputDate <= currentDate;
}

function Register({ registerCallback }) {
  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    zip: "",
    city: "",
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll("input.register-input");
    const missing = [];

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        missing.push(input.name);
      }
    });

    const currentDate = new Date();
    const eighteenYearsAgo = currentDate.getFullYear() - 18;
    console.log(formData.birthDate);
    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }
    if (!isAdult(formData.birthDate)) {
      setError("You need to be at least 18 years old.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password needs to be at least 6 characters");
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!/^\d{5}$/.test(formData.zip)) {
      setError("ZIP invalid");
      return;
    }
    console.log("submitted", formData);
    sendToBackend();
  };

  const sendToBackend = async () => {
    try {
      const result = await registerUser(formData);
      if (result === "User registered") {
        setIsRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setMissingFields([]);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNavigateClick = () => {
    console.log("clicked");
    registerCallback();
  };

  const hideAfterSuccess = isRegistered ? "registered" : "";

  return (
    <div className="register-outer">
      <form
        onSubmit={handleSubmit}
        className="register-container"
        id={hideAfterSuccess}
      >
        <div className="name-input-container">
          <div className="input-container">
            <div className="input-icon">
              <PersonFill />
            </div>
            <input
              type="text"
              className={`register-input ${
                missingFields.includes("firstName") && "missing-field"
              }`}
              placeholder="first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              maxLength={50}
            />
          </div>
          <div className="input-container">
            <div className="input-icon">
              <PersonFill />
            </div>
            <input
              type="text"
              className={`register-input ${
                missingFields.includes("lastName") && "missing-field"
              }`}
              placeholder="last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              maxLength={50}
            />
          </div>
        </div>

        <div className="input-container">
          <div className="input-icon">
            <Calendar2 />
          </div>
          <input
            type="date"
            className={`register-input ${
              missingFields.includes("birthDate") && "missing-field"
            }`}
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <div className="address-input-container">
          <div className="input-container">
            <div className="input-icon">
              <House />
            </div>
            <input
              type="text"
              className={`register-input ${
                missingFields.includes("address") && "missing-field"
              }`}
              placeholder="street & house number"
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={200}
            />
          </div>
          <div className="input-container">
            <div className="input-icon">
              <House />
            </div>
            <input
              id="register-zip"
              type="number"
              maxLength={5}
              className={`register-input ${
                missingFields.includes("zip") && "missing-field"
              }`}
              placeholder="ZIP"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <div className="input-icon">
              <House />
            </div>
            <input
              id="register-city"
              type="text"
              className={`register-input ${
                missingFields.includes("city") && "missing-field"
              }`}
              placeholder="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
        </div>

        <div className="input-container">
          <div className="input-icon">
            <PersonFill />
          </div>
          <input
            type="text"
            className={`register-input ${
              missingFields.includes("username") && "missing-field"
            }`}
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            maxLength={30}
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <Envelope />
          </div>
          <input
            type="email"
            className={`register-input ${
              missingFields.includes("email") && "missing-field"
            }`}
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={30}
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <KeyFill />
          </div>
          <input
            type="password"
            className={`register-input ${
              missingFields.includes("password") && "missing-field"
            }`}
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            maxLength={120}
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <KeyFill />
          </div>
          <input
            type="password"
            className={`register-input ${
              missingFields.includes("repeatPassword") && "missing-field"
            }`}
            placeholder="repeast password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            maxLength={120}
          />
        </div>
        <button className="register-button">register</button>
        <p className="register-error">{error}</p>
      </form>

      {isRegistered && (
        <div className="is-registered-container">
          <p>
            Registration successful! You can now{" "}
            <span onClick={handleNavigateClick}>login</span>
          </p>
          <Check className="registered-icon" />
        </div>
      )}
    </div>
  );
}

export default Register;
