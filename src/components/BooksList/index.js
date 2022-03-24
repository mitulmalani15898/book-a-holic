import { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { BooksContext } from "../../Providers/BooksProvider";

import BookCard from "../BookCard";

import "./books-list.css";

function BooksList() {
  const { books } = useContext(BooksContext);

  const [isAdded, setIsAdded] = useState(false);

  const { loading, data: booksData, error } = books;

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="books-wrapper">
      {error && <Alert variant="danger">{error}</Alert>}
      {isAdded && (
        <Alert variant="success">
          Book has been added to the cart successfully.
        </Alert>
      )}
      <div className="books-list-wrapper">
        {booksData.map((book) => (
          <BookCard key={book._id} book={book} setIsAdded={setIsAdded} />
        ))}
      </div>
    </div>
  );
}

export default BooksList;
