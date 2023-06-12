import React, { useEffect, useRef } from "react";
import { getSalesData } from "../../../services/adminService";
import "./sales-chart.css";

function SalesChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const result = await getSalesData();
        renderChart(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSalesData();
  }, []);

  const renderChart = (salesData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Define chart dimensions and styling
    const chartWidth = 400;
    const chartHeight = 300;
    const barColor = "blue";
    const labelColor = "white";
    const labelFont = "13px Poppins";

    const barSpacing = 10;

    // Calculate the maximum sales value
    const maxSales = Math.max(...salesData.map((data) => data.sales));

    // Calculate the width of each bar and the space between bars
    const barWidth =
      (chartWidth - (salesData.length - 1) * barSpacing) / salesData.length;

    // Render the chart elements
    salesData.forEach((data, index) => {
      const x = index * (barWidth + barSpacing);
      const y = chartHeight - (data.sales / maxSales) * chartHeight;

      // Draw the bar
      context.fillStyle = barColor;
      context.fillRect(x, y, barWidth, chartHeight - y);

      // Draw the date label
      context.fillStyle = labelColor;
      context.font = labelFont;

      let date = data.date.split("-")[2] + ".";
      context.fillText(date, x + barWidth / 2.3, chartHeight - 10);
      context.fillText(data.sales, x + barWidth / 2, chartHeight - 30);
    });
  };

  return (
    <div className="sales-chart-container">
      <h2>Sales</h2>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
    </div>
  );
}

export default SalesChart;
