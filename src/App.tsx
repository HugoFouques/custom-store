import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { Product, CartItem } from "./types/Product";
import { Operation } from "./types/Operation";
import { CheckoutStep, getNextStep } from "./types/CheckoutStep";
import CartPage from "./components/CartPage";
import { User } from "./types/User";

const App = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentCheckoutStep, setCurrentCheckoutStep] =
    useState<CheckoutStep>("LoggedOut");

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const data: User[] = await res.json();
        const user = data.find((u) => u.username === username);

        if (user !== undefined) {
          setUser(user);
        } else {
          throw new Error("Utilisateur inconnu");
        }
      } catch (error) {
        console.error("Error ;( : ", error);
      }
    };

    if (username) {
      fetchUserInfo();
      console.log("User a changé");
    }
  }, [username]);

  const handleLogin = (token: string, username: string): void => {
    localStorage.setItem("authToken", token);
    setUsername(username);
    setCurrentCheckoutStep("LoggedIn");
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUsername(null);
    setCurrentCheckoutStep("LoggedOut");
  };

  const handleGoToNextStep = () => {
    if (username) {
      const nextStep = getNextStep(currentCheckoutStep);

      setCurrentCheckoutStep(nextStep);
    } else {
      navigate("/login");
    }
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
        userIsLoggedIn={username !== null}
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
            <CartPage
              cartItems={cartItems}
              currentStep={currentCheckoutStep}
              user={user}
              handleCartItemOperation={handleCartItemOperation}
              handleRemoveFromCart={handleRemoveFromCart}
              handleGoToNextStep={handleGoToNextStep}
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
