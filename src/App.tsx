import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  const handleLogin = (token: string): void => {
    localStorage.setItem("authToken", token);
    setUserIsLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserIsLoggedIn(false);
  };

  return (
    <div className="container">
      <Navbar userIsLoggedIn={userIsLoggedIn} handleLogout={handleLogout} />

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" Component={Products} />
        <Route path="/products/:id" Component={ProductDetails} />
        <Route path="/cart" Component={Cart} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" Component={Register} />
      </Routes>
    </div>
  );
};

export default App;
