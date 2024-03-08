import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="container">
      <Navbar />

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" Component={Products} />
        <Route path="/products/:id" Component={ProductDetails} />
        <Route path="/cart" Component={Cart} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </div>
  );
}

export default App;
