import { useState } from "react";
import "./admin-product-edit.css";
import { updateProduct } from "../../../../services/adminService";

function AdminProductEdit({ product, closeEditCallback }) {
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [stockQuantity, setStockQuantity] = useState(product?.stock_quantity);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      name: name,
      price: price,
      stock_quantity: stockQuantity,
      id: product.id,
    };

    try {
      const response = await updateProduct(updatedProduct);
      console.log(response);
      closeEditCallback();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setStockQuantity(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-product-edit-container">
      <div className="admin-edit-inputs">
        {" "}
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="admin-product-edit-input"
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange}
          className="admin-product-edit-input"
        />
        <input
          type="number"
          min={0}
          max={9999}
          name="stockQuantity"
          value={stockQuantity}
          onChange={handleQuantityChange}
          className="admin-product-edit-input"
        />
      </div>

      <button className="admin-product-edit-save-button" type="submit">
        Save
      </button>
    </form>
  );
}

export default AdminProductEdit;
