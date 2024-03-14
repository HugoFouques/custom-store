import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { Product, CartItem } from "./types/Product";
import { Operation } from "./types/Operation";

const App = () => {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleCartItemOperation = (itemId: number, operation: Operation) => {
    const product = products.find((p) => p.id === itemId);
    const existingItem = cartItems.find((i) => i.id === itemId);

    if (product) {
      const addItemToCartList = () =>
        setCartItems((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

      const getNewQuantity = (quantity: number): number => {
        return operation === "Add" ? quantity + 1 : quantity - 1;
      };

      const changeItemQuantity = (existingItem: CartItem) => {
        const newQuantity = getNewQuantity(existingItem.quantity);

        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      };

      existingItem ? changeItemQuantity(existingItem) : addItemToCartList();
    }
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <div className="container">
      <Navbar
        userIsLoggedIn={userIsLoggedIn}
        cartItems={cartItems}
        handleLogout={handleLogout}
      />

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={products}
              categories={categories}
              handleAddToCart={handleCartItemOperation}
            />
          }
        />
        <Route path="/products/:id" Component={ProductDetails} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleCartItemOperation={handleCartItemOperation}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" Component={Register} />
      </Routes>
    </div>
  );
};

export default App;
