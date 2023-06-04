import { useEffect, useState } from "react";
import "./admin-users.css";
import { getUsers } from "../../../services/adminService";
import AdminUser from "./admin-user/admin-user";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await getUsers();
        console.log(result);
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, [reload]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const reloadCallback = () => {
    setReload(!reload);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mappedusers = filteredUsers.map((user, index) => (
    <li key={index}>
      <AdminUser user={user} reloadCallback={reloadCallback} />
    </li>
  ));
  return (
    <div className="admin-users-container">
      <h2>users</h2>
      <div className="admin-users-row">
        <input
          type="text"
          placeholder="Search..."
          className="admin-user-search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <ul className="admin-users-list">{mappedusers}</ul>
    </div>
  );
}

export default AdminUsers;
