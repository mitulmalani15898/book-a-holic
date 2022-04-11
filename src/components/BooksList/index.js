/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Listings of books on Books page
 */
import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { BooksContext } from "../../Providers/BooksProvider";
import BookCard from "../BookCard";

import "./books-list.css";

function BooksList() {
  const { books, cart, orders } = useContext(BooksContext);

  const { loading, data: booksData, error } = books;

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="books-wrapper">
      {!booksData.length ? (
        <Alert variant="info" align="center">
          There are no books available based on given search or filter value at
          the moment.
        </Alert>
      ) : (
        <div className="books-list-wrapper">
          {booksData.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              isIncludedInCart={cart.find((b) => b._id === book._id)}
              isPurchased={orders.find((order) => order.bookId === book._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksList;
