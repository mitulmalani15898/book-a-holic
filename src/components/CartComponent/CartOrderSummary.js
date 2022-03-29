/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Cart order summary component, which shows order summary with checkout option
 */
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { BooksContext } from "../../Providers/BooksProvider";

const CartOrderSummary = () => {
  const { cart } = useContext(BooksContext);

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => (totalPrice += item.price));
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-order-summary">
      <div className="order-summary-title">Order Summary</div>
      <div className="order-summary-wrapper">
        <div className="order-summary-item">
          <div>{cart.length} Books</div>
          <div>{`$${getTotalPrice()}`}</div>
        </div>
        <div className="d-flex flex-column">
          <Form.Control type="text" placeholder="Enter promo code" />
          <button className="apply-promo-button">Apply</button>
          <div className="divider" />
          <div className="total-cost">
            <div>Total Price</div>
            <div>{`$${getTotalPrice()}`}</div>
          </div>
          <button className="checkout-button">
            <FontAwesomeIcon
              icon={faCartShopping}
              color="#FFF"
              className="back-icon"
            />
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOrderSummary;
