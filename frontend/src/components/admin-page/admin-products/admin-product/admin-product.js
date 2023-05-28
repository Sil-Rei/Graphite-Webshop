import { useState } from "react";
import "./admin-product.css";
import { Pencil, Trash, TrashFill } from "react-bootstrap-icons";
import AdminProductEdit from "../admin-product-edit/admin-product-edit";
import { deleteProduct } from "../../../../services/adminService";

function AdminProduct({ product, reloadCallback }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleTrashClick = async () => {
    if (window.confirm("Do you really want to delete " + product.name + "?")) {
      try {
        const response = await deleteProduct(product.id);
        reloadCallback();
      } catch (error) {}
    }
  };

  const closeEdit = () => {
    setShowEdit(false);
    reloadCallback();
  };

  let content = (
    <p>
      {product.name} {product.price}€ stock: {product.stock_quantity}
    </p>
  );

  if (showEdit) {
    content = (
      <AdminProductEdit closeEditCallback={closeEdit} product={product} />
    );
  }

  return (
    <div className="admin-product-container">
      {content}
      <Pencil onClick={handleEditClick} className="admin-product-edit-icon" />
      <Trash className="admin-product-edit-icon" onClick={handleTrashClick} />
    </div>
  );
}

export default AdminProduct;
