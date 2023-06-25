import { Pencil, Trash } from "react-bootstrap-icons";
import "./admin-user.css";
import { deleteUser } from "../../../../services/adminService";
import { useContext, useState } from "react";
import AdminUserEdit from "../admin-user-edit/admin-user-edit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../../context/authContext";

function AdminUser({ userProp, reloadCallback }) {
  const [showEdit, setShowEdit] = useState(false);
  const { user } = useContext(AuthContext);

  let className = userProp.is_superuser
    ? "admin-user-container is-admin"
    : "admin-user-container";

  const handleTrashClick = async () => {
    if (user.username === "demoadmin") {
      toast.error("Sorry. The demo admin can't delete users.");
      return;
    }

    if (
      window.confirm("Do you really want to delete " + userProp.username + "?")
    ) {
      try {
        const response = await deleteUser(userProp.username);
        reloadCallback();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const closeEdit = () => {
    setShowEdit(false);
    reloadCallback();
  };

  let content = <p className="admin-user-username">{userProp.username}</p>;

  if (showEdit) {
    content = <AdminUserEdit closeEditCallback={closeEdit} user={userProp} />;
  }

  return (
    <div className={className}>
      {content}
      <Trash className="admin-user-trash-icon" onClick={handleTrashClick} />
      <Pencil className="admin-user-trash-icon" onClick={handleEditClick} />
    </div>
  );
}

export default AdminUser;
