import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./books-header.css";

function BooksHeader({ search, setSearch }) {
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
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
