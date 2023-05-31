import { useContext, useEffect, useState } from "react";
import "./profile-page.css";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../../services/userdataService";
import PurchaseHistory from "./purchase-history/purchase-history";
import { BoxArrowDownRight, BoxArrowRight } from "react-bootstrap-icons";
import ReviewHistory from "./review-history/review-history";

function ProfilePage() {
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admin/");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-button-row">
        <button onClick={handleLogout} className="profile-logout-button">
          Logout <BoxArrowRight className="logout-icon" />
        </button>
        <button onClick={handleAdmin} className="profile-admin-button">
          admin area
        </button>
      </div>

      <div className="history-wrapper">
        <PurchaseHistory />
        <ReviewHistory />
      </div>
    </div>
  );
}
export default ProfilePage;
