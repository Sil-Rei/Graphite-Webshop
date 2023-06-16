import { useState } from "react";
import "./admin-user-edit.css";

function AdminUserEdit({ user, closeEditCallback }) {
  console.log(user);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div className="admin-user-edit-container">
      <p>{user.username}</p>
      <input
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        className="admin-user-edit-input"
        placeholder="first name"
      />
      <input
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
        className="admin-user-edit-input"
        placeholder="last name"
      />
      <button className="admin-user-edit-save-button">Save</button>
    </div>
  );
}

export default AdminUserEdit;
