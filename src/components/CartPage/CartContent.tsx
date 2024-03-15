import { Link } from "react-router-dom";
import { displayPrice, multiplyPrice } from "../../helpers/price";
import "./CartContent.css";
import { CartItem } from "../../types/Product";
import { Operation } from "../../types/Operation";

const CartContent = ({
  cartItems,
  handleCartItemOperation,
  handleRemoveFromCart,
}: {
  cartItems: CartItem[];
  handleCartItemOperation: (id: number, operation: Operation) => void;
  handleRemoveFromCart: (id: number) => void;
}) => {
  return (
    <div className="cart-content">
      <h2>Panier</h2>
      <header className="cart-header">
        <div>Produit</div>
        <div>Prix Unitaire</div>
        <div>Quantité</div>
        <div>Prix total</div>
        <div></div>
      </header>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <div className="item-img">
              <img src={item.image} alt={item.description} />
            </div>
            <div className="item-info-container">
              <div>{item.title}</div>
              <div className="item-price">{displayPrice(item.price)}</div>
              <div className="quantity-selector">
                <button
                  onClick={() => handleCartItemOperation(item.id, "Remove")}
                  disabled={item.quantity <= 1}
                >
                  –
                </button>
                <button>{item.quantity}</button>
                <button onClick={() => handleCartItemOperation(item.id, "Add")}>
                  +
                </button>
              </div>
              <div className="item-price">
                {displayPrice(multiplyPrice(item.price, item.quantity))}
              </div>
              <div>
                <button onClick={() => handleRemoveFromCart(item.id)}>🗑</button>
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
  );
};

export default CartContent;
