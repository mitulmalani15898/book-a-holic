import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../../Providers/BooksProvider";

import AddToCart from "../../static/images/icons/AddCartIcon";
import { BASE_URL } from "../../utils/constants";

import "./book-card.css";

function BookCard({ book, isIncludedInCart }) {
  const [isHover, setIsHover] = useState(false);
  const { setCart } = useContext(BooksContext);

  const handleAddToCart = (book) => () => {
    setCart((prev) => [...prev, book]);
  };

  const handleRemoveFromCart = (book) => () => {
    setCart((prev) => prev.filter((b) => b._id !== book._id));
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
