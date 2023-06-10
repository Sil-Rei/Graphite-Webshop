import { useEffect, useState } from "react";
import "./showcase.css";
import { productsByCategory } from "../../../services/productService";
import BigDisplay from "../bestseller/big-display/big-display";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function ShowCase({ category }) {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await productsByCategory(category);
      console.log(result);

      const renderedProducts = result.map((product, key) => {
        return (
          <li key={key}>
            <BigDisplay
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              reviews={product.reviews}
              quantity={product.stock_quantity}
            />
          </li>
        );
      });
      setProducts(renderedProducts);
    }
    fetchData();
  }, []);

  const handleClick = () => {
    navigate("/products/" + category);
  };

  return (
    <div className="showcase-container">
      <div className="showcase-heading-wrapper">
        <h2 className="showcase-heading">{category}s</h2>
        <div className="showcase-arrow" onClick={handleClick}>
          <ArrowRight className="arrow-icon" />
        </div>
      </div>

      <ul className="showcase-list">{products.slice(0, 3)}</ul>
    </div>
  );
}
export default ShowCase;
