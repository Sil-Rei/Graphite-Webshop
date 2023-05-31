import "./purchase.css";

function Purchase({ purchase }) {
  let priceSum = 0;
  let totalItems = 0;
  for (let i = 0; i < purchase.items.length; i++) {
    priceSum += purchase.items[i].quantity * purchase.items[i].product.price;
    totalItems += purchase.items[i].quantity;
  }
  const image = "http://localhost:8000/" + purchase.items[0].product.image;

  const parts = purchase.purchase_date.split("-");
  const formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
  priceSum = priceSum.toFixed(2);
  return (
    <div className="purchase-container">
      <p>Purchase of {formattedDate}</p>
      <div className="purchase-bottom-row">
        <img className="purchase-image" src={image} alt="" />
        <div className="purchase-right-bottom">
          <p>{priceSum}€</p>
          Items: {totalItems}
        </div>
      </div>
      <div className="hr-line"></div>
    </div>
  );
}

export default Purchase;
