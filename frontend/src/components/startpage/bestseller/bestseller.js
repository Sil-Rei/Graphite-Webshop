import { useEffect, useState } from "react";
import "./bestseller.css";
import BigDisplay from "./big-display/big-display";
import { getAllProducts } from "../../../services/productService";

function Bestseller() {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllProducts();
      console.log(result);

      const renderedProducts = result.map((product, key) => {
        return (
          <li>
            <BigDisplay
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              key={key}
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
