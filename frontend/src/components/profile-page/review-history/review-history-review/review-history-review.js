import { Star, StarFill } from "react-bootstrap-icons";
import "./review-history-review.css";

function ReviewHistoryReview({ review }) {
  const parts = review.date.split("-");
  const formattedDate = parts[2] + "." + parts[1] + "." + parts[0];

  const filledStars = review.stars;
  const starsArray = Array.from({ length: 5 }, (_, index) =>
    index < filledStars ? <StarFill key={index} /> : <Star key={index} />
  );
  return (
    <div className="review-history-review-container">
      <p>Review of {formattedDate}</p>
      <div className="review-history-review-bottom-row">
        {starsArray}
        <p>{review.review}</p>
      </div>
      <div className="hr-line"></div>
    </div>
  );
}

export default ReviewHistoryReview;
