import "./purchase.css";

function Purchase({ purchase }) {
  let priceSum = 0;
  for (let i = 0; i < purchase.items.length; i++) {
    priceSum += purchase.items[i].quantity * purchase.items[i].product.price;
  }

  return (
    <div className="purchase-container">
      <p>purchase of {purchase.purchase_date}</p>
      <p>{priceSum}€</p>
    </div>
  );
}

export default Purchase;
