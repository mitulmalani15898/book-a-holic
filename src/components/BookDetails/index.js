import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import AddToCart from "../../static/images/icons/AddCartIcon";
import PreviewIcon from "../../static/images/icons/PreviewIcon";
import { BASE_URL } from "../../utils/constants";
import { BooksContext } from "../../Providers/BooksProvider";
import BookPreview from "../BookPreview";

import "./book-details.css";

const BookDetails = () => {
  const { id } = useParams();
  const { books: { data, loading } = {} } = useContext(BooksContext);

  const [book, setBook] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [previewHover, setPreviewHover] = useState(false);

  useEffect(() => {
    if (data.length) {
      setBook(data.find((book) => book._id === id));
    }
  }, [data.length]);

  const handleAddToCart = () => {};

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleShowPreview = () => {
    setShowPreview((prev) => !prev);
  };

  const handlePreviewMouseEnter = () => {
    setPreviewHover(true);
  };

  const handlePreviewMouseLeave = () => {
    setPreviewHover(false);
  };

  console.log("book", book);

  const {
    _id,
    title,
    author,
    price,
    category,
    actualPrice,
    imageUrl,
    bookDescription,
    bookUrl,
    year,
  } = book;

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <BookPreview
        show={showPreview}
        handleClose={handleShowPreview}
        bookPdf={bookUrl}
        preview={true}
      />
      <div className="books-details-wrapper">
        <div className="image-block">
          <div className="book-detail-image-wrapper">
            <img
              src={`${BASE_URL + imageUrl}`}
              alt="book-cover"
              className="book-detail-image"
            />
          </div>
        </div>
        <div className="book-details-block">
          <div className="book-title details-title">{title}</div>
          <div className="book-author book-info">{author}</div>
          <div className="book-author book-info">{year}</div>
          <div className="book-author book-info">{category}</div>
          {price === 0 ? (
            <div className="free-book-tag detail-price">FREE</div>
          ) : (
            <div className="price-wrapper">
              <span className="actual-book-price detail-price">{`$${price}`}</span>
              <span className="book-price detail-price">{`$${actualPrice}`}</span>
            </div>
          )}
          <div className="button-wrapper">
            <button
              className="add-cart-button preview-button"
              onClick={handleShowPreview}
              onMouseEnter={handlePreviewMouseEnter}
              onMouseLeave={handlePreviewMouseLeave}
            >
              <PreviewIcon
                className="add-cart-icon"
                color={previewHover ? "#0166B2" : "#FFF"}
              />
              Preview
            </button>
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

          <div className="book-detail-description">{bookDescription}</div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
