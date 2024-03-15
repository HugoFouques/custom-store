import { displayPrice } from "../../helpers/price";
import CheckoutButton from "./CheckoutButton";
import { CheckoutStep, getStepIndex } from "../../types/CheckoutStep";

import "./CartRecap.css";

const CartRecap = ({
  totalItems,
  totalPrice,
  currentStep,
  handlePayment,
  handleGoToNextStep,
}: {
  totalItems: number;
  totalPrice: number;
  currentStep: CheckoutStep;
  handlePayment: () => void;
  handleGoToNextStep: () => void;
}) => {
  const isEmpty = totalItems === 0;
  const isPaymentStep = getStepIndex(currentStep) === 3;

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
            La livraison est gratuite jusqu'à la fin du mois ! Profitez-en !
          </div>
          <hr className="divider" />
          <div className="recap-total">
            <span>Total (TVA incluse)</span>
            <span>{displayPrice(totalPrice)}</span>
          </div>
          {isPaymentStep ? (
            <CheckoutButton
              text={"Procéder au paiment"}
              onClick={handlePayment}
            />
          ) : (
            <CheckoutButton
              text={"Poursuivre la commande"}
              disabled={isEmpty}
              onClick={handleGoToNextStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartRecap;
