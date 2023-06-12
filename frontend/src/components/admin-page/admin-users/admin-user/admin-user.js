import { Trash } from "react-bootstrap-icons";
import "./admin-user.css";
import { deleteUser } from "../../../../services/adminService";

function AdminUser({ user, reloadCallback }) {
  let className = user.is_superuser
    ? "admin-user-container is-admin"
    : "admin-user-container";

  const handleTrashClick = async () => {
    if (window.confirm("Do you really want to delete " + user.username + "?")) {
      try {
        const response = await deleteUser(user.username);
        reloadCallback();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={className}>
      <p className="admin-user-username">{user.username}</p>
      <Trash className="admin-user-trash-icon" onClick={handleTrashClick} />
    </div>
  );
}

export default AdminUser;
