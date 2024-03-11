import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import Product from "./types/Product";

const App = () => {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error ;( : ", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Error ;( : ", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

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
        <Route
          path="/"
          element={<Products products={products} categories={categories} />}
        />
        <Route path="/products/:id" Component={ProductDetails} />
        <Route path="/cart" Component={Cart} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" Component={Register} />
      </Routes>
    </div>
  );
};

export default App;
