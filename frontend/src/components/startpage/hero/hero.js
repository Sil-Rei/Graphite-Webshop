import { useNavigate } from "react-router-dom";
import "./hero.css";
import pencilwide from "./images/pencil wide2.jpeg";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products/all");
  };

  return (
    <div className="hero-container">
      <img className="hero-image" src={pencilwide} alt="pencil" />
      <div className="cta">
        <p className="cta-text">
          Sustainable office? <br /> Yes, we can!
        </p>
        <button className="cta-button" onClick={handleClick}>
          start shopping
        </button>
      </div>
    </div>
  );
}

export default Hero;
