import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <img src={logo} className="logo" alt="logo" />
          <h1>Le custom shop</h1>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="list">
          Mon compte
        </Link>
        <Link to="/cart" className="list">
          Mon panier
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
