// Author: Mitul Pravinbhai Malani (B00869519)
import { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { BooksContext } from "../../Providers/BooksProvider";

import "./books-filter.css";

const categoriesList = [
  "Education",
  "Science and Technology",
  "Literature",
  "Fiction",
  "Drama",
  "Research",
  "Thriller",
  "Mystery",
  "Comic Books",
];

function BooksFilter() {
  const { getBooks, search, categories, setCategories } =
    useContext(BooksContext);

  useEffect(() => {
    getBooks({ categoriesList: categories, searchText: search });
  }, [categories.length]);

  const handleChange = ({ target: { value } }) => {
    if (categories.includes(value)) {
      setCategories((prev) => prev.filter((item) => item !== value));
    } else {
      setCategories((prev) => [...prev, value]);
    }
  };

  return (
    <div className="books-filter-wrapper">
      {categoriesList.map((category, i) => (
        <Form.Check
          key={i}
          inline
          type="checkbox"
          id={category}
          label={category}
          value={category}
          name="bookFilter"
          checked={categories.includes(category)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

export default BooksFilter;
