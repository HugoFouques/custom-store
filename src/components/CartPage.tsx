import { CheckoutStep, getStepIndex } from "../types/CheckoutStep";
import { Operation } from "../types/Operation";
import { CartItem } from "../types/Product";
import ProgressBar from "./CartPage/ProgressBar";
import CartRecap from "./CartPage/CartRecap";
import { multiplyPrice } from "../helpers/price";
import CartContent from "./CartPage/CartContent";
import Checkout from "./CartPage/Checkout";

import "./CartPage.css";
import { User } from "../types/User";

const CartPage = ({
  cartItems,
  currentStep,
  user,
  handleCartItemOperation,
  handleRemoveFromCart,
  handleGoToNextStep,
  handlePayment,
}: {
  cartItems: CartItem[];
  currentStep: CheckoutStep;
  user: User | null;
  handleCartItemOperation: (id: number, operation: Operation) => void;
  handleRemoveFromCart: (id: number) => void;
  handleGoToNextStep: () => void;
  handlePayment: () => void;
}) => {
  const totalItemsInCart = cartItems.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  const totalPriceInCart = cartItems.reduce(
    (acc, cur) => acc + multiplyPrice(cur.price, cur.quantity),
    0
  );

  const isCheckoutStep = user && getStepIndex(currentStep) > 2;

  return (
    <div className="cart-container">
      <ProgressBar currentStep={currentStep} />
      <div className="cart-details">
        {isCheckoutStep ? (
          <Checkout user={user} />
        ) : (
          <CartContent
            cartItems={cartItems}
            handleCartItemOperation={handleCartItemOperation}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
        <CartRecap
          totalItems={totalItemsInCart}
          totalPrice={totalPriceInCart}
          currentStep={currentStep}
          handleGoToNextStep={handleGoToNextStep}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default CartPage;
