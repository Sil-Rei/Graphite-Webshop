import { Link, useNavigate } from "react-router-dom";
import "./search-result.css";

function SearchResult({ image, name, price, id }) {
  let imageUrl = "https://res.cloudinary.com/dgsmccttl/" + image;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product/" + id);
  };

  return (
    <div className="search-result-container" onClick={handleClick}>
      <img className="search-result-image" src={imageUrl} alt="result" />
      <h3 className="search-result-name">{name}</h3>
      <p className="search-result-price">{price}€</p>
    </div>
  );
}

export default SearchResult;
