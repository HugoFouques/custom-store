import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { CartItem } from "../types/Product";

const Navbar = ({
  userIsLoggedIn,
  cartItems,
  handleLogout,
}: {
  userIsLoggedIn: boolean;
  cartItems: CartItem[];
  handleLogout: () => void;
}) => {
  const totalItemsInCart = cartItems.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <img src={logo} className="logo" alt="logo" />
          <h1>Le custom shop</h1>
        </Link>
      </div>
      <div className="navbar-right">
        {!userIsLoggedIn ? (
          <Link to="/login" className="list">
            Mon compte
          </Link>
        ) : (
          <Link to="/" onClick={handleLogout} className="list">
            Se déconnecter
          </Link>
        )}
        <Link to="/cart" className="list">
          Mon panier ({totalItemsInCart})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
