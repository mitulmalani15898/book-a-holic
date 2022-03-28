import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";

import { BooksContext } from "../../Providers/BooksProvider";
import { BASE_URL } from "../../utils/constants";
import "./cart.css";

const CartComponent = () => {
  const { cart, setCart } = useContext(BooksContext);

  const handleRemoveFromCart = (book) => () => {
    setCart((prev) => prev.filter((b) => b._id !== book._id));
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => (totalPrice += item.price));
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-main-wrapper">
      <div className="cart-header">
        <div className="cart-header-title">
          <div>Books Cart</div>
          <div>{cart.length} Books</div>
        </div>
        <div className="cart-books">
          {!!cart.length ? (
            cart.map((item) => (
              <div className="cart-book-wrapper" key={item._id}>
                <div className="cart-book-image-cover">
                  <img
                    src={`${BASE_URL + item.imageUrl}`}
                    alt="book-cover"
                    className="cart-book-image"
                  />
                </div>
                <div>
                  <div className="cart-book-title">{item.title}</div>
                  <div className="cart-book-author">{item.authoe}</div>
                </div>
                {item.price === 0 ? (
                  <>
                    <div className="free-book-tag">FREE</div>
                  </>
                ) : (
                  <>
                    <span className="book-price">${item.price}</span>
                    <span className="actual-book-price">
                      ${item.actualPrice}
                    </span>
                  </>
                )}

                <FontAwesomeIcon
                  icon={faTrashCan}
                  color="#0166b2"
                  className="cart-remove-book-icon"
                  onClick={handleRemoveFromCart(item)}
                />
              </div>
            ))
          ) : (
            <Alert variant="info">
              Please click on link below to explore Books Catalogue and add some
              books to the cart.
            </Alert>
          )}
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
            <div>{cart.length} Books</div>
            <div>{`$${getTotalPrice()}`}</div>
          </div>
          <div className="d-flex flex-column">
            {/* <Form.Control type="text" placeholder="Enter promo code" />
            <button className="apply-promo-button">Apply</button> */}
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
    </div>
  );
};

export default CartComponent;
