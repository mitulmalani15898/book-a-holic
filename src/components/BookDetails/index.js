import { useState } from "react";

import AddToCart from "../../static/images/AddCartIcon";

import "./book-details.css";

const BookDetails = ({ book = {} }) => {
  const [isHover, setIsHover] = useState(false);

  const handleAddToCart = () => {
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const { bookName, authorName, price, actualPrice, isFree, coverImage } = book;

  return (
    <div className="books-details-wrapper">
      <div className="image-block">
        <div className="book-detail-image">
          <img
            src={coverImage}
            alt="book-cover"
            className="book-detail-image"
          />
        </div>
      </div>
      <div className="book-details-block">
        <div className="book-title details-title">{bookName}</div>
        <div className="details-button-wrapper">
          <div>
            <div className="book-author details-author">{authorName}</div>
            {isFree ? (
              <div className="free-book-tag detail-price">FREE</div>
            ) : (
              <div>
                <span className="actual-book-price detail-price">{`$${actualPrice}`}</span>
                <span className="book-price detail-price">{`$${price}`}</span>
              </div>
            )}
          </div>
          <button
            className="add-cart-button cart-button"
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

        <div className="book-detail-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
