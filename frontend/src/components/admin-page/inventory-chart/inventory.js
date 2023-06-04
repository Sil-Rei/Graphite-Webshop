import React, { useEffect, useRef, useState } from "react";
import "./inventory.css";
import { productsByCategory } from "../../../services/productService";

function Inventory() {
  const [products, setProducts] = useState([]);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const squareSize = 30;
  const spacing = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await productsByCategory("all");
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    products.forEach((product, index) => {
      const x = (index % 5) * (squareSize + spacing);
      const y = Math.floor(index / 5) * (squareSize + spacing);
      const color = getColorByQuantity(product.stock_quantity);

      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);
    });
  }, [products]);

  function getColorByQuantity(quantity) {
    var value = Math.min((quantity / 10) * 255, 255);

    var red = 255 - value;
    var green = value;
    var blue = 0;

    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  let heightOfCanvas = 200;
  heightOfCanvas =
    Math.floor(products?.length / 4) * squareSize +
    Math.floor(products?.length / 4) * spacing;

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    products.forEach((product, index) => {
      const x = (index % 5) * (squareSize + spacing);
      const y = Math.floor(index / 5) * (squareSize + spacing);

      if (
        mouseX >= x &&
        mouseX <= x + squareSize &&
        mouseY >= y &&
        mouseY <= y + squareSize
      ) {
        tooltipRef.current.innerText = product.name;
        tooltipRef.current.style.left = `${e.clientX}px`;
        tooltipRef.current.style.top = `${e.clientY}px`;
        tooltipRef.current.style.display = "block";
      }
    });
  }

  function handleMouseLeave(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX >= 0 &&
      mouseX <= canvasRef.current.width &&
      mouseY >= 0 &&
      mouseY <= canvasRef.current.height
    ) {
      return; // Don't hide the tooltip if mouse is still within the canvas
    }

    tooltipRef.current.style.display = "none";
  }

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      <canvas
        ref={canvasRef}
        width={200}
        height={heightOfCanvas}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></canvas>

      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
}

export default Inventory;
