import { useEffect, useState } from "react";
import "./admin-products.css";
import AdminProduct from "./admin-product/admin-product";
import { productsByCategory } from "../../../services/productService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await productsByCategory("all");
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mappedProducts = filteredProducts.map((product) => (
    <li key={product.id}>
      <AdminProduct product={product} />
    </li>
  ));
  return (
    <div className="admin-products-container">
      <h2>Products</h2>
      <div className="admin-products-row">
        <input
          type="text"
          placeholder="Search..."
          className="admin-product-search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="admin-new-product-button">Add new product</button>
      </div>

      <ul className="admin-products-list">{mappedProducts}</ul>
    </div>
  );
}

export default AdminProducts;
