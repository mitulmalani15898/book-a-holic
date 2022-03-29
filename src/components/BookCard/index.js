/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * BookCard component, which represents single book card in the grid of books
 */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { BooksContext } from "../../Providers/BooksProvider";
import AddToCart from "../../static/images/icons/AddCartIcon";
import { BASE_URL } from "../../utils/constants";
import DefaultBook from "../../static/images/DefaultBook.png";

import "./book-card.css";

function BookCard({ book, isIncludedInCart }) {
  const [isHover, setIsHover] = useState(false);
  const { handleAddToCart, handleRemoveFromCart } = useContext(BooksContext);

  const { _id, title, author, price, actualPrice, imageUrl } = book;

  return (
    <div className="book-card-wrapper">
      <Link to={`/book/${_id}`}>
        <div className="book-image-wrapper">
          <div className="book-image-cover">
            <img
              src={`${BASE_URL + imageUrl}`}
              alt="book-cover"
              className="book-image"
              onError={({ currentTarget }) => {
                currentTarget.onError = null;
                currentTarget.src = DefaultBook;
              }}
            />
          </div>
        </div>
      </Link>
      <div className="book-title">{title}</div>
      <div className="book-author">{author}</div>
      {price === 0 ? (
        <div className="free-book-tag">FREE</div>
      ) : (
        <div>
          <span className="actual-book-price">{`$${price}`}</span>
          <span className="book-price">{`$${actualPrice}`}</span>
        </div>
      )}

      {isIncludedInCart ? (
        <button
          className="add-cart-button remove-cart-button"
          onClick={handleRemoveFromCart(book)}
        >
          Remove
        </button>
      ) : (
        <button
          className="add-cart-button"
          onClick={handleAddToCart(book)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <AddToCart
            className="add-cart-icon"
            color={isHover ? "#0166B2" : "#FFF"}
          />
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default BookCard;
