import { Link } from "react-router-dom";
import "./big-display.css";

function BigDisplay({ name, price, image, id }) {
  const imageURL = "http://localhost:8000" + image;
  return (
    <Link to={"/product/" + id} className="big-display-link">
      <div className="big-display-container">
        <img src={imageURL} alt="store item" className="big-display-image" />
        <h2 className="big-display-name">{name}</h2>
        <p className="big-display-price">{price}€</p>
      </div>
    </Link>
  );
}

export default BigDisplay;
