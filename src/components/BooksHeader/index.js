import { useContext, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

import "./books-header.css";
import { BooksContext } from "../../Providers/BooksProvider";

function BooksHeader() {
  const { getBooks, search, setSearch } = useContext(BooksContext);

  const debouncedSearch = useCallback(
    debounce((value) => getBooks({ searchText: value }), 1000),
    []
  );

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
    debouncedSearch(value);
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
