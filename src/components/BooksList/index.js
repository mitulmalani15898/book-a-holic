import { useState } from "react";
import Alert from "react-bootstrap/Alert";

import BookCard from "../BookCard";
import { books } from "./books-data";

import "./books-list.css";

function BooksList() {
  const [isAdded, setIsAdded] = useState(false);

  const handleAlertClose = () => {
    setIsAdded(false);
  };

  return (
    <div className="books-wrapper">
      {isAdded && (
        <Alert
          variant="success"
          dismissible
          className="alert-message"
          onClose={handleAlertClose}
        >
          Book has been added to the cart successfully.
        </Alert>
      )}
      <div className="books-list-wrapper">
        {books.map((book) => (
          <BookCard key={book.id} book={book} setIsAdded={setIsAdded} />
        ))}
      </div>
    </div>
  );
}

export default BooksList;
