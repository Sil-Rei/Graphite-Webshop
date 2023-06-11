import "./philosophy.css";
import Tree from "./tree.png";

function Philosophy() {
  return (
    <div className="philosophy-container">
      <div className="philosophy-text">
        <h2 className="philosophy-heading">Our Promise</h2>
        <p className="philosophy-paragraph">
          Simple, Sustainable, and Stylish. <br /> <br /> We're here to
          revolutionize your office space with minimalistic yet eco-friendly
          office supplies. <br /> <br />
          Taste the luxury feeling of doing the right thing. now.
        </p>
      </div>
      <div className="philosophy-image">
        <img className="tree-image" src={Tree} alt="" />
      </div>
    </div>
  );
}

export default Philosophy;
