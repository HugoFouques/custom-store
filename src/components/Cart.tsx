import React from "react";
import "./Cart.css";
import ProgressLabel from "./ProgressLabel";
import { Product, CartItem } from "../types/Product";
import { Operation } from "../types/Operation";
import { Link } from "react-router-dom";
import { displayPrice, multiplyPrice } from "../helpers/price";

const Cart = ({
  cartItems,
  handleCartItemOperation,
  handleRemoveFromCart,
}: {
  cartItems: CartItem[];
  handleCartItemOperation: (id: number, operation: Operation) => void;
  handleRemoveFromCart: (id: number) => void;
}) => {
  const totalItemsInCart = cartItems.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  const totalPriceInCart = cartItems.reduce(
    (acc, cur) => acc + multiplyPrice(cur.price, cur.quantity),
    0
  );

  return (
    <div className="cart-container">
      <div className="progress-bar">
        <ProgressLabel title="Panier" index={1} currentStep={3} />
        <ProgressLabel title="Authentification" index={2} currentStep={3} />
        <ProgressLabel title="Livraison" index={3} currentStep={3} />
        <ProgressLabel title="Paiement" index={4} currentStep={3} />
        <ProgressLabel title="Confirmation" index={5} currentStep={3} />
      </div>
      <div className="cart-details">
        <div className="cart-content">
          <h2>Panier</h2>
          <header className="cart-header">
            <div className="header-product">Produit</div>
            <div className="header-unit-price">Prix Unitaire</div>
            <div className="header-quantity">Quantité</div>
            <div className="header-total-price">Prix total</div>
            <div className="header-empty"></div>
          </header>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-img">
                  <img src={item.image} alt={item.description} />
                </div>
                <div className="item-info-container">
                  <div className="item-info">{item.title}</div>
                  <div className="item-price">{displayPrice(item.price)}</div>
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleCartItemOperation(item.id, "Remove")}
                      disabled={item.quantity <= 1}
                    >
                      –
                    </button>
                    <button>{item.quantity}</button>
                    <button
                      onClick={() => handleCartItemOperation(item.id, "Add")}
                    >
                      +
                    </button>
                  </div>
                  <div className="total-price item-price">
                    {displayPrice(multiplyPrice(item.price, item.quantity))}
                  </div>
                  <div className="delete-container">
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="continue-container">
            <Link to="/" className="continue-button">
              Continuer mes achats
            </Link>
          </div>
        </div>
        <div className="cart-recap">
          <h2>Récapitulatif</h2>
          <div className="recap-container">
            <div className="recap-price">
              <span>
                Sous-total
                {cartItems.length > 0 ?? ` (${totalItemsInCart} articles)`}
              </span>
              <span>
                {cartItems.length > 0 ? displayPrice(totalPriceInCart) : "-"}
              </span>
            </div>
            <hr className="divider" />
            <div className="recap-shipping">
              Livraison
              <div className="recap-shipping-card">
                Les délais et frais de livraison sont calculés à l'étape
                suivante après la connexion/inscription
              </div>
              <hr className="divider" />
              <div className="recap-total">
                <span>Total (TVA incluse)</span>
                <span>{displayPrice(totalPriceInCart)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
