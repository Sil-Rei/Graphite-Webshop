import { useState } from "react";
import "./newsletter.css";
import { subscribeNewsletter } from "../../../services/userdataService";

function Newsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    subscribe();
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const subscribe = async () => {
    try {
      const response = await subscribeNewsletter(email);
      setEmail("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-heading">10% off your first purchase?</h2>
      <p className="newsletter-text">Sign up for our newsletter</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          className="newsletter-input"
          type="text"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <button className="newsletter-button" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
