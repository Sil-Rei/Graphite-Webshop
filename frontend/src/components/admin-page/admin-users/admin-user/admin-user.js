import "./admin-user.css";

function AdminUser({ user }) {
  let className = user.is_superuser
    ? "admin-user-container is-admin"
    : "admin-user-container";
  return (
    <div className={className}>
      <p className="admin-user-username">{user.username}</p>
    </div>
  );
}

export default AdminUser;
