import "./review-section.css";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pencil, StarFill, UiChecksGrid } from "react-bootstrap-icons";
import Review from "./review/review";
import { useContext, useEffect, useState } from "react";
import WriteReview from "./write-review/writeReview";
import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

function ReviewSection({ reviews, productId, reloadCallback }) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const { user } = useContext(AuthContext);
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setShowWriteReview(!showWriteReview);
    } else {
      setShowError("login-error");
    }
  };

  const closeWriteReviewCallback = (message) => {
    if (message === "") {
      reloadCallback();
    } else {
      setShowWriteReview(false);
      setShowError(message.response.data);
    }
  };

  useEffect(() => {
    let timer;

    if (showError) {
      timer = setTimeout(() => {
        setShowError("");
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  const getRatingsDistribution = () => {
    let distribution = [0, 0, 0, 0, 0];
    if (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        distribution[5 - reviews[i].stars] += 1;
      }
    }
    return distribution;
  };

  const mappedReviews = reviews?.map((review) => {
    return (
      <li key={review.id}>
        <Review review={review} />
      </li>
    );
  });

  const getAverageStars = () => {
    if (reviews) {
      if (reviews.length !== 0) {
        return (
          reviews.reduce((sum, obj) => sum + obj.stars, 0) / reviews.length
        ).toFixed(1);
      }
    }
    return 0;
  };

  const chartData = {
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    datasets: [
      {
        data: getRatingsDistribution(),
        backgroundColor: "#c0af71",
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        align: "end",
        anchor: "end",
        font: {
          weight: "bold",
          size: 15,
        },
        formatter: (value, context) => {
          const dataValue = context.dataset.data[context.dataIndex];
          return dataValue;
        },
      },
    },
  };

  const classname = showWriteReview
    ? "review-section-write-button-x"
    : "review-section-write-button";

  Chart.register(LinearScale, CategoryScale, ChartDataLabels, ...registerables);
  return (
    <div className="review-section-container">
      <h2>Reviews</h2>
      <div className="review-section-info">
        <div className="review-section-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="review-section-stars">
          <StarFill />
          {getAverageStars()}
          <p className="review-section-review-count">({reviews?.length})</p>
        </div>
      </div>
      <div className="review-section-button-row">
        <button className={classname} onClick={handleClick}>
          {!showWriteReview ? "Write Review" : "x"}
          {!showWriteReview && <Pencil />}
        </button>
        {showError === "login-error" && (
          <p className="review-section-error">
            Please{" "}
            <span className="underlined" onClick={() => navigate("/login")}>
              {" "}
              login
            </span>{" "}
            to write a review.
          </p>
        )}
        {showError !== "login-error" && showError !== "" && (
          <p className="review-section-error">{showError.body}</p>
        )}
      </div>
      <div className="review-section-write-reviews">
        {showWriteReview && (
          <WriteReview
            closeWriteReviewCallback={closeWriteReviewCallback}
            productId={productId}
          />
        )}
      </div>

      <ul className="review-section-reviews">{mappedReviews}</ul>
    </div>
  );
}

export default ReviewSection;
