import { useParams } from "react-router-dom";
import "./purchase-full.css";
import { useEffect, useState } from "react";
import { getPurchases } from "../../../../services/userdataService";

function PurchaseFull() {
  const { purchaseId } = useParams();

  const [purchase, setPurchase] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await getPurchases();
        let correctPurchase;
        for (let i = 0; i < response.length; i++) {
          if (response[i].id === parseInt(purchaseId)) {
            correctPurchase = response[i];
            console.log(correctPurchase);
          }
        }
        setPurchase(correctPurchase);
        setItems(correctPurchase.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchase();
  }, []);
  let formattedDate;
  let sum = 0;
  if (purchase) {
    const parts = purchase.purchase_date.split("-");
    formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
    purchase.items.forEach((item) => {
      sum += item.product.price * item.quantity;
    });
  }

  const mappedItems = items.map((item) => {
    return (
      <li className="purchase-item" key={item.id}>
        <img
          className="purchase-item-image"
          src={
            "https://graphite-webshop-8da1e10f5d95.herokuapp.com/" +
            item.product.image
          }
          alt=""
        />
        {item.product.name}
        <p className="purchase-item-price">{item.product.price}€</p>
        <p className="purchase-item-quantity">x{item.quantity}</p>
      </li>
    );
  });

  return (
    <div className="purchase-full-container">
      <h2>Purchase of {formattedDate}</h2>
      <ul className="purchase-full-list">{mappedItems}</ul>
      <p className="purchase-sum">{sum}€</p>
    </div>
  );
}

export default PurchaseFull;
