import { useEffect, useState } from "react";
import "./bestseller.css";
import BigDisplay from "./big-display/big-display";
import { productsByCategory } from "../../../services/productService";

function Bestseller() {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await productsByCategory("all");

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
      setBestsellers(renderedProducts);
    }
    fetchData();
  }, []);

  return (
    <div className="bestseller-container">
      <h2 className="bestseller-heading">Bestseller</h2>
      <ul className="bestseller-list">{bestsellers.slice(0, 3)}</ul>
    </div>
  );
}

export default Bestseller;
