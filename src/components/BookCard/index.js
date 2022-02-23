import { useState } from "react";

import AddToCart from "../../static/images/AddCartIcon";

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

  const { bookName, authorName, price, actualPrice, isFree, coverImage } = book;

  return (
    <div className="book-card-wrapper">
      <div className="book-image-wrapper">
        <div className="book-image-cover">
          <img src={coverImage} alt="book-cover" className="book-image" />
        </div>
      </div>
      <div className="book-title">{bookName}</div>
      <div className="book-author">{authorName}</div>
      {isFree ? (
        <div className="free-book-tag">FREE</div>
      ) : (
        <div>
          <span className="actual-book-price">{`$${actualPrice}`}</span>
          <span className="book-price">{`$${price}`}</span>
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
