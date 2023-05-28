import { StarFill, Star } from "react-bootstrap-icons";
import "./review.css";

function Review({ review }) {
  console.log(review);

  const filledStars = review.stars;

  // Split the date string into parts
  const parts = review.date.split("-");

  // Rearrange the parts in the desired format
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
      <div className="review-container-star-row">{starsArray}</div>
      <p className="review-container-text">{review.review}</p>
    </div>
  );
}

export default Review;
