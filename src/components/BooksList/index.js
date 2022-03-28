import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { BooksContext } from "../../Providers/BooksProvider";
import BookCard from "../BookCard";

import "./books-list.css";

function BooksList() {
  const { books, cart } = useContext(BooksContext);

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
      {!!booksData.length ? (
        <div className="books-list-wrapper">
          {booksData.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              isIncludedInCart={cart.find((b) => b._id === book._id)}
            />
          ))}
        </div>
      ) : (
        <Alert variant="info" align="center">
          There are no books available based on given search or filter value at
          the moment.
        </Alert>
      )}
    </div>
  );
}

export default BooksList;
