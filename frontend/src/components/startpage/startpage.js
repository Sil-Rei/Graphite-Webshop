import "./startpage.css";
import Hero from "./hero/hero";
import Bestseller from "./bestseller/bestseller";
import ShowCase from "./showcase/showcase";

function Startpage() {
  return (
    <div className="startpage-container">
      <Hero />
      <Bestseller />
      <ShowCase category={"tool"} />
      <ShowCase category={"pen"} />
    </div>
  );
}

export default Startpage;
