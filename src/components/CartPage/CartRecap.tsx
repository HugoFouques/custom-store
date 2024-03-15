import { displayPrice } from "../../helpers/price";
import CheckoutButton from "../CheckoutButton";

import "./CartRecap.css";

const CartRecap = ({
  totalItems,
  totalPrice,
  handleGoToNextStep,
}: {
  totalItems: number;
  totalPrice: number;
  handleGoToNextStep: () => void;
}) => {
  const isEmpty = totalItems === 0;

  return (
    <div className="cart-recap">
      <h2>Récapitulatif</h2>
      <div className="recap-container">
        <div className="recap-price">
          <span>
            Sous-total
            {!isEmpty ?? ` (${totalItems} articles)`}
          </span>
          <span>{!isEmpty ? displayPrice(totalPrice) : "-"}</span>
        </div>
        <hr className="divider" />
        <div className="recap-shipping">
          Livraison
          <div className="recap-shipping-card">
            Les délais et frais de livraison sont calculés à l'étape suivante
            après la connexion/inscription
          </div>
          <hr className="divider" />
          <div className="recap-total">
            <span>Total (TVA incluse)</span>
            <span>{displayPrice(totalPrice)}</span>
          </div>
          <CheckoutButton
            disabled={isEmpty}
            handleGoToNextStep={handleGoToNextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default CartRecap;
