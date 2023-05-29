import { useEffect, useState } from "react";
import "./purchase-history.css";
import { getPurchases } from "../../../services/userdataService";
import Purchase from "./purchase/purchase";

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getPurchases();
        console.log(response);
        setPurchases(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  const mappedPurchases = purchases.map((purchase) => {
    return (
      <li className="purchase" key={purchase.id}>
        <Purchase purchase={purchase} />
      </li>
    );
  });

  return (
    <div className="purchase-history-container">
      <h3>Purchase History</h3>
      <ul className="purchase-list">{mappedPurchases}</ul>
    </div>
  );
}

export default PurchaseHistory;
