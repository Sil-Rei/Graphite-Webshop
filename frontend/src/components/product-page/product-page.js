import "./product-page.css";
import { Check, StarFill } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { addToCart, getProductById } from "../../services/productService";
import { useParams } from "react-router-dom";
import CartContext from "../../context/cartContext";
import ReviewSection from "./review-section/review-section";

function ProductPage() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [productData, setProductData] = useState({});
  const [error, setError] = useState(null);

  const { addCartItem } = useContext(CartContext);

  const { productId } = useParams();

  const handleChange = (event) => {
    setBuyAmount(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getProductById(productId);
      result.image = "http://localhost:8000/" + result.image;
      setProductData(result);
    }
    fetchData();
  }, [productId]);

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleAddCart = async () => {
    try {
      await addToCart(productId, buyAmount);
      addCartItem();
      setProductData((prevData) => ({
        ...prevData,
        stock_quantity: prevData.stock_quantity - buyAmount,
      }));
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  const getAverageStars = () => {
    if (productData.reviews.length !== 0) {
      return (
        productData.reviews.reduce((sum, obj) => sum + obj.stars, 0) /
        productData.reviews.length
      ).toFixed(1);
    }
    return 0;
  };

  return (
    <div className="product-page-container">
      <div className="product-page-main">
        <img
          className="product-page-main-image"
          src={productData.image}
          alt="pink pen"
        />
        <div className="product-page-right">
          <div className="product-page-stars">
            <StarFill />
            {productData.reviews && (
              <>
                <p className="product-page-rating">{getAverageStars()}</p>
                <p className="product-page-review-count">
                  ({productData.reviews.length})
                </p>
              </>
            )}
          </div>
          <h2 className="product-page-heading">{productData.name}</h2>
          <p className="product-page-price">{productData.price}€</p>
          <ul className="product-page-benefits">
            <li>
              <Check />
              100% sustainable
            </li>
            <li>
              <Check />
              100% renewable materials
            </li>
            <li>
              <Check />
              reduced carbon footprint
            </li>
            <li>
              <Check />
              ergonomic grip - <br />
              designed for YOU
            </li>
          </ul>
          <div className="add-to-cart-wrapper">
            <input
              type="number"
              className="product-page-amount"
              value={buyAmount}
              onChange={handleChange}
              min={1}
              max={productData.stock_quantity}
            />
            <button onClick={handleAddCart} className="product-page-to-cart">
              add to cart
            </button>
          </div>
          <div className="product-page-status">
            <p className="product-page-in-stock">
              Remaining stock: {productData.stock_quantity}
            </p>
            <p className="product-page-error">{error}</p>
          </div>
        </div>
      </div>
      <ReviewSection reviews={productData.reviews} />
    </div>
  );
}

export default ProductPage;
