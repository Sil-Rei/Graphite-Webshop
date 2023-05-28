import { Link } from "react-router-dom";
import "./big-display.css";
import { StarFill } from "react-bootstrap-icons";

function BigDisplay({ name, price, image, id, reviews, quantity }) {
  const imageURL = "http://localhost:8000" + image;
  let averageRating = 0;
  if (reviews) {
    if (reviews.length !== 0) {
      averageRating = (
        reviews.reduce((sum, obj) => sum + obj.stars, 0) / reviews.length
      ).toFixed(1);
    }
  }

  let soldoutClassname =
    quantity <= 0 ? "big-display-image sold-out-image" : "big-display-image";

  console.log(name + ":" + averageRating);
  return (
    <Link to={"/product/" + id} className="big-display-link">
      <div className="big-display-container">
        <img src={imageURL} alt="store item" className={soldoutClassname} />
        <div className="big-display-upper-row">
          <h2 className="big-display-name">{name}</h2>
          <div className="big-display-stars">
            <StarFill />
            <p className="big-display-star-p">{averageRating}</p>
          </div>
        </div>

        <p className="big-display-price">{price}€</p>
      </div>
      {quantity <= 0 && <p className="sold-out">sold out</p>}
    </Link>
  );
}

export default BigDisplay;
