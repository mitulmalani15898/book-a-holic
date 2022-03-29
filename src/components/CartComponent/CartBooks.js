/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Listings of books added into the cart component
 */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";

import { BooksContext } from "../../Providers/BooksProvider";
import { BASE_URL } from "../../utils/constants";
import DefaultBook from "../../static/images/DefaultBook.png";

const CartBooks = () => {
  const { cart, handleRemoveFromCart } = useContext(BooksContext);

  return (
    <div className="cart-header">
      <div className="cart-header-title">
        <div>Books Cart</div>
        <div>{cart.length} Books</div>
      </div>
      <div className="cart-books">
        {!cart.length ? (
          <Alert variant="info">
            Please click on link below to explore Books Catalogue and add some
            books to the cart.
          </Alert>
        ) : (
          cart.map((item) => (
            <div className="cart-book-wrapper" key={item._id}>
              <div className="cart-book-image-cover">
                <img
                  src={`${BASE_URL + item.imageUrl}`}
                  alt="book-cover"
                  className="cart-book-image"
                  onError={({ currentTarget }) => {
                    currentTarget.onError = null;
                    currentTarget.src = DefaultBook;
                  }}
                />
              </div>
              <div className="book-details-delete-wrapper">
                <div>
                  <div className="cart-book-title">{item.title}</div>
                  <div className="cart-book-author">{item.author}</div>
                  <div className="cart-book-author">{item.category}</div>
                  <div>
                    {item.price === 0 ? (
                      <div className="free-book-tag">FREE</div>
                    ) : (
                      <>
                        <span className="actual-book-price">${item.price}</span>
                        <span className="book-price">${item.actualPrice}</span>
                      </>
                    )}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color="#0166b2"
                  className="cart-remove-book-icon"
                  onClick={handleRemoveFromCart(item)}
                />
              </div>
            </div>
          ))
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
  );
};

export default CartBooks;
