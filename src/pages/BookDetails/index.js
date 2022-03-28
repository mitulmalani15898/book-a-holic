import React from "react";
import Container from "react-bootstrap/Container";
import BookDetails from "../../components/BookDetails";

import Book1 from "../../static/images/book1.jpg";

const BookDetailsPage = () => {
  return (
    <Container>
      <BookDetails
        book={{
          id: 1,
          bookName: "Good Enough: 40ish Devotionals for a Life of Imperfection",
          authorName: "Kate Bowler and Jessica Richie",
          price: 39.99,
          actualPrice: 32.99,
          isFree: false,
          coverImage: Book1,
        }}
      />
    </Container>
  );
};

export default BookDetailsPage;
