// Author: Mitul Pravinbhai Malani (B00869519)
import { useContext, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

import "./books-header.css";
import { BooksContext } from "../../Providers/BooksProvider";

function BooksHeader() {
  const { getBooks, search, setSearch, categories } = useContext(BooksContext);

  const debouncedSearch = useCallback(
    debounce(
      (value, categories) =>
        getBooks({ searchText: value, categoriesList: categories }),
      1000
    ),
    []
  );

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
    debouncedSearch(value, categories);
  };

  return (
    <div className="books-header">
      <div className="search-bar">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by books, authors..."
          value={search}
          onChange={handleSearchChange}
        />
        <div className="search-icon-wrapper">
          <FontAwesomeIcon
            icon={faSearch}
            color="#0166B2"
            className="search-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default BooksHeader;
