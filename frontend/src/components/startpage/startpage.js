import "./startpage.css";
import Hero from "./hero/hero";
import Bestseller from "./bestseller/bestseller";
import ShowCase from "./showcase/showcase";
import Philosophy from "./philosophy/philosophy";
import Newsletter from "./newsletter/newsletter";

function Startpage() {
  return (
    <div className="startpage-container">
      <Hero />
      <Bestseller />
      <Philosophy />
      <ShowCase category={"tool"} />
      <ShowCase category={"pen"} />
      <Newsletter />
    </div>
  );
}

export default Startpage;
