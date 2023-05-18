import "./startpage.css";
import Hero from "./hero/hero";
import Bestseller from "./bestseller/bestseller";

function Startpage() {
  return (
    <div className="startpage-container">
      <Hero />
      <Bestseller />
    </div>
  );
}

export default Startpage;
