import { useParams } from "react-router-dom";
import "./searchPage.css";

function SearchPage() {
  const { term } = useParams();
  return (
    <div className="search-page-container">
      <h2>{term}</h2>
    </div>
  );
}

export default SearchPage;
