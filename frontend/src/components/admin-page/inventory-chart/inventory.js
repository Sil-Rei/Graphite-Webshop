import { useEffect, useRef, useState } from "react";
import "./inventory.css";
import { productsByCategory } from "../../../services/productService";

function Inventory() {
  const [products, setProducts] = useState([]);
  const canvasRef = useRef(null);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await productsByCategory("all");
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);
  const squareSize = 30;
  const spacing = 10;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the size of each square

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

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      <canvas ref={canvasRef} width={200} height={heightOfCanvas}></canvas>
    </div>
  );
}

export default Inventory;
