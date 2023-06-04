import { useEffect, useState } from "react";
import "./review-history.css";
import ReviewHistoryReview from "./review-history-review/review-history-review";
import { deleteReview, getReviews } from "../../../services/userdataService";
import { Trash } from "react-bootstrap-icons";

function ReviewHistory() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getReviews();
        console.log(response);
        setReviews(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  const handleTrashClick = async (id) => {
    if (window.confirm("Do you really want to delete that review?")) {
      try {
        const response = await deleteReview(id);
        console.log(response);
        setReviews((reviews) => reviews.filter((review) => review.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mappedReviews = reviews.map((review) => {
    return (
      <li className="review-item" key={review.id}>
        <ReviewHistoryReview review={review} />
        <div className="review-trash-icon">
          <Trash
            className="trash-icon"
            onClick={() => handleTrashClick(review.id)}
          />
        </div>
      </li>
    );
  });

  return (
    <div className="review-history-container">
      <h3>Review History</h3>
      <ul className="review-list">{mappedReviews}</ul>
    </div>
  );
}

export default ReviewHistory;
