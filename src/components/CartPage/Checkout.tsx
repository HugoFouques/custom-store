import { formatDate } from "../../helpers/date";
import { User } from "../../types/User";

import "./Checkout.css";

const Checkout = ({ user }: { user: User }) => {
  const now = new Date();
  const inThreeDays = new Date(now.setDate(now.getDate() + 3));

  return (
    <div className="checkout-content">
      <h2>Livraison</h2>
      <div className="shipping-content">
        <header className="shipping-header">
          <h3>Livraison à domicile</h3>
          <div className="shipping-date">
            <div>
              Livraison le <b>{formatDate(inThreeDays)}</b>
            </div>
            <b>Gratuit</b>
          </div>
        </header>
        <div className="shipping-address">
          <b>Maison</b>
          <div>
            {user.name.lastname} {user.name.firstname}
          </div>
          <div>
            {user.address.number} {user.address.street}
          </div>
          <div>
            {user.address.zipcode} {user.address.city}
          </div>
          <div>{user.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
