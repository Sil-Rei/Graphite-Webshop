import React, { useEffect, useState } from "react";
import "./admin-add-product.css";
import { addProduct } from "../../../../services/adminService";

function AdminAddProduct({ showAddProductCallback }) {
  const [product, setProduct] = useState({
    image: null,
    name: "",
    quantity: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("stock_quantity", product.quantity);
    formData.append("price", product.price);
    formData.append("category", product.category);

    try {
      const response = await addProduct(formData);
      console.log(response);
      showAddProductCallback();
    } catch (error) {
      console.log(error);
      setError("Invalid form");
    }
  };

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-add-product-container">
      <h3>Add Product</h3>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="admin-add-product-input"
        placeholder="product name"
      />
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        className="admin-add-product-input"
        placeholder="quantity"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="admin-add-product-input"
        placeholder="price"
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        className="admin-add-product-input"
        placeholder="category"
      />
      Image:
      <input
        type="file"
        name="image"
        onChange={handleChange}
        id="add-product-image"
      />
      <button type="submit" className="admin-add-product-button">
        Submit
      </button>
      <p className="error">{error}</p>
    </form>
  );
}

export default AdminAddProduct;
