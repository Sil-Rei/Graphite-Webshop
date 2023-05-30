import { useParams } from "react-router-dom";
import "./category-page.css";
import { useEffect, useState } from "react";
import BigDisplay from "../startpage/bestseller/big-display/big-display";
import { productsByCategory } from "../../services/productService";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await productsByCategory(category);
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, [category]);

  const mappedResults = products.map((product) => {
    return (
      <li className="category-page-item" key={product.id}>
        <BigDisplay
          name={product.name}
          price={product.price}
          image={product.image}
          id={product.id}
          reviews={product.reviews}
          quantity={product.stock_quantity}
        />
      </li>
    );
  });

  return (
    <div className="category-page-container">
      <h2>
        {products.length} results found in '{category}'
      </h2>
      <ul className="category-page-list">{mappedResults}</ul>
    </div>
  );
}

export default CategoryPage;
