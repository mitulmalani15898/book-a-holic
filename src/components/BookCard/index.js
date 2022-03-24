import { useState } from "react";
import { Link } from "react-router-dom";

import AddToCart from "../../static/images/icons/AddCartIcon";
import { BASE_URL } from "../../utils/constants";

import "./book-card.css";

function BookCard({ book, setIsAdded }) {
  const [isHover, setIsHover] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
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

      <button
        className="add-cart-button"
        onClick={handleAddToCart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AddToCart
          className="add-cart-icon"
          color={isHover ? "#0166B2" : "#FFF"}
        />
        Add To Cart
      </button>
    </div>
  );
}

export default BookCard;
