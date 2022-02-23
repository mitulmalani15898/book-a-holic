import Form from "react-bootstrap/Form";

import "./books-filter.css";

function BooksFilter() {
  return (
    <div className="books-filter-wrapper">
      <Form.Check inline label="Education" name="bookFilter" type="checkbox" />
      <Form.Check
        inline
        label="Science and Technology"
        name="bookFilter"
        type="checkbox"
      />
      <Form.Check inline label="Literature" name="bookFilter" type="checkbox" />
      <Form.Check inline label="Fiction" name="bookFilter" type="checkbox" />
      <Form.Check inline label="Drama" name="bookFilter" type="checkbox" />
      <Form.Check inline label="Research" name="bookFilter" type="checkbox" />
      <Form.Check inline label="Thriller" name="bookFilter" type="checkbox" />
      <Form.Check inline label="Mystery" name="bookFilter" type="checkbox" />
      <Form.Check
        inline
        label="Comic books"
        name="bookFilter"
        type="checkbox"
      />
    </div>
  );
}

export default BooksFilter;
