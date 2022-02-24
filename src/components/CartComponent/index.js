import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Book1 from "../../static/images/book1.jpg";
import Book2 from "../../static/images/book2.jpg";
import Book3 from "../../static/images/book3.jpg";
import "./cart.css";

const CartComponent = () => {
  return (
    <div className="cart-main-wrapper">
      <div className="cart-header">
        <div className="cart-header-title">
          <div>Books Cart</div>
          <div>3 Books</div>
        </div>
        <div className="cart-books">
          <div className="cart-book-wrapper">
            <div className="cart-book-image-cover">
              <img src={Book1} alt="book-cover" className="cart-book-image" />
            </div>
            <div>
              <div className="cart-book-title">ABSALOM, ABSALOM</div>
              <div className="cart-book-author">WILLIAM FAULKNER</div>
            </div>
            <span className="book-price">$17.97</span>
            <span className="actual-book-price">$17.97</span>
            <FontAwesomeIcon
              icon={faTrashCan}
              color="#0166b2"
              className="cart-remove-book-icon"
            />
          </div>
          <div className="cart-book-wrapper">
            <div className="cart-book-image-cover">
              <img src={Book2} alt="book-cover" className="cart-book-image" />
            </div>
            <div>
              <div className="cart-book-title">ABSALOM, ABSALOM</div>
              <div className="cart-book-author">WILLIAM FAULKNER</div>
            </div>
            <span className="book-price">$17.97</span>
            <span className="actual-book-price">$17.97</span>
            <FontAwesomeIcon
              icon={faTrashCan}
              color="#0166b2"
              className="cart-remove-book-icon"
            />
          </div>
          <div className="cart-book-wrapper">
            <div className="cart-book-image-cover">
              <img src={Book3} alt="book-cover" className="cart-book-image" />
            </div>
            <div>
              <div className="cart-book-title">ABSALOM, ABSALOM</div>
              <div className="cart-book-author">WILLIAM FAULKNER</div>
            </div>
            <span className="book-price">$17.97</span>
            <span className="actual-book-price">$17.97</span>
            <FontAwesomeIcon
              icon={faTrashCan}
              color="#0166b2"
              className="cart-remove-book-icon"
            />
          </div>
        </div>
        <Link to="/books" className="books-link">
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="#0166b2"
            className="back-icon"
          />
          Continue Shopping
        </Link>
      </div>
      <div className="cart-order-summary">
        <div className="order-summary-title">Order Summary</div>
        <div className="order-summary-wrapper">
          <div className="order-summary-item">
            <div>3 Books</div>
            <div>$53.97</div>
          </div>
          <div className="d-flex flex-column">
            <Form.Control type="text" placeholder="Enter promo code" />
            <button className="apply-promo-button">Apply</button>
            <div className="divider" />
            <div className="total-cost">
              <div>Total Cost</div>
              <div>$53.97</div>
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
    </div>
  );
};

export default CartComponent;
