import { useContext, useState } from "react";
import "./admin-product.css";
import { Pencil, Trash, TrashFill } from "react-bootstrap-icons";
import AdminProductEdit from "../admin-product-edit/admin-product-edit";
import { deleteProduct } from "../../../../services/adminService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../../context/authContext";

function AdminProduct({ product, reloadCallback }) {
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleTrashClick = async () => {
    if (user.username === "demoadmin") {
      toast.error("Sorry. The demo admin can't delete products.");
      return;
    }

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
