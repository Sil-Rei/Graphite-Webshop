import { useEffect, useState } from "react";
import "./admin-page.css";
import { checkIfAdmin } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./admin-products/admin-products";
import AdminUsers from "./admin-users/admin-users";
import Inventory from "./inventory-chart/inventory";
import SalesChart from "./admin-sales-chart/sales-chart";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await checkIfAdmin();
        if (response === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleRedirectClick = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      {isAdmin && (
        <div className="admin-wrapper">
          <div className="admin-chart-row">
            <Inventory />
            <SalesChart />
          </div>
          <div className="admin-bottom-row">
            <AdminProducts />
            <AdminUsers />
          </div>
        </div>
      )}
      {!isAdmin && (
        <div className="not-admin-wrapper">
          <h2>
            Oops. This area is for admin users only.
            <br /> Wait for the redirect or click{" "}
            <span onClick={handleRedirectClick}>here</span>.
          </h2>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
