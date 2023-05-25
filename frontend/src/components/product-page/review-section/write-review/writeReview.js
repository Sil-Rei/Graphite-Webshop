import { useContext, useState } from "react";
import "./writeReview.css";
import AuthContext from "../../../../context/authContext";
import { Star, StarFill } from "react-bootstrap-icons";
import axiosInstance from "../../../../utils/axios";

function WriteReview({ closeWriteReviewCallback, productId }) {
  const { user } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");

  const [rating, setRating] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create an object with the data to send
      const data = {
        reviewText,
        rating,
        productId,
      };

      // Make a POST request to your backend endpoint
      const response = await axiosInstance.post("/api/submit-review", data);

      // Call the callback function to close the write review component
      closeWriteReviewCallback("");
    } catch (error) {
      // Handle error
      console.error("Error submitting review:", error);
      closeWriteReviewCallback(error);
    }
  };

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const starIcons = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <StarFill key={index} onClick={() => handleStarClick(index)} />
    ) : (
      <Star key={index} onClick={() => handleStarClick(index)} />
    )
  );

  return (
    <form className="write-review-container" onSubmit={handleSubmit}>
      <div className="write-review-first-row">
        <p className="write-review-name">{user.username}</p>
      </div>

      <div className="star-row">{starIcons}</div>

      <textarea
        type="text"
        className="write-review-text-input"
        value={reviewText}
        onChange={handleChange}
        maxLength={350}
        placeholder="I like this product because..."
      />
      <button className="write-review-submit">submit</button>
    </form>
  );
}

export default WriteReview;
