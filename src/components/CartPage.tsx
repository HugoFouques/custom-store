import { CheckoutStep } from "../types/CheckoutStep";
import { Operation } from "../types/Operation";
import { CartItem } from "../types/Product";
import ProgressBar from "./CartPage/ProgressBar";

import "./CartPage.css";
import CartRecap from "./CartPage/CartRecap";
import { multiplyPrice } from "../helpers/price";
import CartContent from "./CartPage/CartContent";

const CartPage = ({
  cartItems,
  currentStep,
  handleCartItemOperation,
  handleRemoveFromCart,
  handleGoToNextStep,
}: {
  cartItems: CartItem[];
  currentStep: CheckoutStep;
  handleCartItemOperation: (id: number, operation: Operation) => void;
  handleRemoveFromCart: (id: number) => void;
  handleGoToNextStep: () => void;
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
      <ProgressBar currentStep={currentStep} />
      <div className="cart-details">
        <CartContent
          cartItems={cartItems}
          handleCartItemOperation={handleCartItemOperation}
          handleRemoveFromCart={handleRemoveFromCart}
        />
        <CartRecap
          totalItems={totalItemsInCart}
          totalPrice={totalPriceInCart}
          handleGoToNextStep={handleGoToNextStep}
        />
      </div>
    </div>
  );
};

export default CartPage;
