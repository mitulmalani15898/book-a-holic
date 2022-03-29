/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * BooksDetails component, which shows details of book along with preview
 */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import isEmpty from "lodash.isempty";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import AddToCart from "../../static/images/icons/AddCartIcon";
import PreviewIcon from "../../static/images/icons/PreviewIcon";
import { BASE_URL } from "../../utils/constants";
import { BooksContext } from "../../Providers/BooksProvider";
import DefaultBook from "../../static/images/DefaultBook.png";
import BookPreview from "../BookPreview";

import "./book-details.css";

const BookDetails = () => {
  const { id } = useParams();
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    books: { data, loading } = {},
  } = useContext(BooksContext);

  const [book, setBook] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [previewHover, setPreviewHover] = useState(false);

  // sets book if page refreshed explicitly
  useEffect(() => {
    if (data.length) {
      setBook(data.find((book) => book._id === id));
    }
  }, [data.length]);

  const handleShowPreview = () => {
    setShowPreview((prev) => !prev);
  };

  const {
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

  const isIncludedInCart = cart.find((b) => b._id === book._id);

  if (loading) {
    return (
      <div className="loader-wrapper empty-details-wrapper">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!loading && isEmpty(book)) {
    return (
      <div className="empty-details-wrapper">
        <Alert variant="danger" className="mt-5">
          Something went wrong, Please try after sometime.
        </Alert>
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
      <div className="back-to-books-link">
        <Link to="/books" className="books-link">
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="#0166b2"
            className="back-icon"
          />
          Back to Books catalogue
        </Link>
      </div>
      <div className="books-details-wrapper">
        <div className="image-block">
          <div className="book-detail-image-wrapper">
            <img
              src={`${BASE_URL + imageUrl}`}
              alt="book-cover"
              className="book-detail-image"
              onError={({ currentTarget }) => {
                currentTarget.onError = null;
                currentTarget.src = DefaultBook;
              }}
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
              onMouseEnter={() => setPreviewHover(true)}
              onMouseLeave={() => setPreviewHover(false)}
            >
              <PreviewIcon
                className="add-cart-icon"
                color={previewHover ? "#0166B2" : "#FFF"}
              />
              Preview
            </button>
            {isIncludedInCart ? (
              <button
                className="add-cart-button cart-button remove-cart-button"
                onClick={handleRemoveFromCart(book)}
              >
                Remove
              </button>
            ) : (
              <button
                className="add-cart-button cart-button"
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
          <div className="book-detail-description">{bookDescription}</div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
