import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Startpage from "./components/startpage/startpage";
import ShoppingCart from "./components/shopping-cart/shopping-cart";
import LoginRegister from "./components/user-management/login-register";
import ProductPage from "./components/product-page/product-page";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import ProfilePage from "./components/profile-page/profile-page";
import SearchPage from "./components/search-page/searchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <AuthProvider>
            <div className="navbar">
              <Navbar />
            </div>

            <Routes>
              <Route exact path="/" element={<Startpage />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/user-profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/search/:term" element={<SearchPage />} />
            </Routes>

            <div className="footer">
              <Footer />
            </div>
          </AuthProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
