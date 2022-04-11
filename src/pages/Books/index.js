/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * This component works as a wrapper for Books page
 */
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";

import BooksHeader from "../../components/BooksHeader";
import BooksList from "../../components/BooksList";
import BooksFilter from "../../components/BooksFilter";
import { BooksContext } from "../../Providers/BooksProvider";

const Books = () => {
  const { getUserCart, getUserOrder } = useContext(BooksContext);

  useEffect(() => {
    getUserCart();
    getUserOrder();
  }, []);

  return (
    <Container className="books-container">
      <BooksHeader />
      <BooksFilter />
      <BooksList />
    </Container>
  );
};

export default Books;
