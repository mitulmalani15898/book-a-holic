import { useState } from "react";
import Container from "react-bootstrap/Container";

import BooksHeader from "../../components/BooksHeader";
import BooksList from "../../components/BooksList";
import BooksFilter from "../../components/BooksFilter";

const Books = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <BooksHeader search={search} setSearch={setSearch} />
      <BooksFilter />
      <BooksList />
    </Container>
  );
};

export default Books;
