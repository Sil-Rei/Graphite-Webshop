import "./review-section.css";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { StarFill } from "react-bootstrap-icons";
import Review from "./review/review";

function ReviewSection({ reviews, average }) {
  const getRatingsDistribution = () => {
    let distribution = [2, 1, 7, 0, 1];
    if (reviews) {
      distribution = [0, 0, 0, 0, 0];
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
      {/* <button className="review-section-write-button">Write Review</button>*/}
      <ul className="review-section-reviews">{mappedReviews}</ul>
    </div>
  );
}

export default ReviewSection;
