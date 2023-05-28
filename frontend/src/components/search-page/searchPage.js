import { useParams } from "react-router-dom";
import "./searchPage.css";
import { useEffect, useState } from "react";
import { searchForProduct } from "../../services/productService";
import BigDisplay from "../startpage/bestseller/big-display/big-display";

function SearchPage() {
  const { term } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const result = await searchForProduct(term);
        console.log(result);
        setSearchResults(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResults();
  }, [term]);

  const mappedResults = searchResults.map((result) => {
    return (
      <li className="search-page-item" key={result.id}>
        <BigDisplay
          name={result.name}
          price={result.price}
          image={result.image}
          id={result.id}
        />
      </li>
    );
  });

  return (
    <div className="search-page-container">
      <h2>
        {searchResults.length} results found for '{term}'
      </h2>
      <ul className="search-page-list">{mappedResults}</ul>
    </div>
  );
}

export default SearchPage;
