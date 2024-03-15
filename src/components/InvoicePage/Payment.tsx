import Loader from "./Loader";

import "./Payment.css";

const Payment = () => {
  return (
    <div className="payment-container">
      <h2>Paiement en cours...</h2>
      <Loader />
    </div>
  );
};

export default Payment;
