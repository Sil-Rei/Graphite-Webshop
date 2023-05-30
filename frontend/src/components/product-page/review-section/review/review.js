import { StarFill, Star, Check2, Check2Circle } from "react-bootstrap-icons";
import "./review.css";

function Review({ review }) {
  console.log(review);

  const filledStars = review.stars;

  const parts = review.date.split("-");

  const formattedDate = parts[2] + "." + parts[1] + "." + parts[0];

  // Create an array of stars to be rendered
  const starsArray = Array.from({ length: 5 }, (_, index) =>
    index < filledStars ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <div className="review-container">
      <div className="review-container-name-row">
        <p className="review-container-name">{review.user.username}</p>
        <p className="review-container-date">{formattedDate}</p>
      </div>
      <div className="review-container-star-row">
        <p className="stars">{starsArray}</p>
        {review.verified_purchase && (
          <p className="verified-purchase">
            Verified Purchase <Check2Circle className="verified-icon" />
          </p>
        )}
      </div>
      <p className="review-container-text">{review.review}</p>
    </div>
  );
}

export default Review;
