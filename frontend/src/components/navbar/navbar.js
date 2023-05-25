import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Person, Cart2, ChatLeftDots, CartFill } from "react-bootstrap-icons";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../context/cartContext";
import AuthContext from "../../context/authContext";
import { searchForProduct } from "../../services/productService";
import SearchResult from "./search-result/search-result";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const profileIconUrl = user ? "/user-profile" : "/login";

  const navigate = useNavigate();

  const handleClick = () => {
    setShowDropdown(true);
    setLoading(false);
  };

  const handleChange = (event) => {
    setLoading(true);
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  // use effect for 0.5s delay before proccessing input in searchbar
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    try {
      const result = await searchForProduct(searchTerm);
      console.log(result);
      setSearchResults(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mappedSearchResults = searchResults.map((result) => {
    return (
      <li className="nav-search-result" key={result.id}>
        <SearchResult
          name={result.name}
          price={result.price}
          image={result.image}
          id={result.id}
        />
      </li>
    );
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDropdown(false);
    navigate("/search/" + searchTerm);
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <li className="logo">
          <Link to="/" className="logo">
            <h1>graphite</h1>
          </Link>
        </li>
        <li className="searchbar">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search ..."
              onClick={handleClick}
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </li>
        <li className="navbar-icons">
          <Link to={profileIconUrl} className="nav-icon">
            <Person />
          </Link>
          <Link to="/shopping-cart" className="nav-icon" id="nav-icon-cart">
            {cartItems > 0 ? <CartFill /> : <Cart2 />}
            {cartItems > 0 && <p className="nav-cart-number">{cartItems}</p>}
          </Link>
          <div className="nav-icon">
            <ChatLeftDots />
          </div>
          <div className="nav-hamburger">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </li>
      </ul>
      <ul className="sublinks">
        <li>
          <Link to={"/products/pen"}>pens</Link>
        </li>
        <li>
          <Link to={"/products/paper"}>papers</Link>
        </li>
        <li>
          <Link to={"/products/tool"}>tools</Link>
        </li>
        <li>
          <Link to={"/products/miscellaneous"}>miscellaneous</Link>
        </li>
        <li>
          <Link to={"/products/all"}>all products</Link>
        </li>
      </ul>
      {showDropdown && (
        <div ref={dropdownRef} className="nav-search-dropdown">
          {loading && searchResults.length === 0 && <p>Loading...</p>}
          <ul className="nav-results-list">{mappedSearchResults}</ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
