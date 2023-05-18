import { useContext } from "react";
import "./profile-page.css";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <button onClick={handleLogout} className="profile-logout-button">
        Logout
      </button>
    </div>
  );
}
export default ProfilePage;
