/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Books page haeder, which contains search books by name and author name
 */
import { useContext, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

import { BooksContext } from "../../Providers/BooksProvider";
import "./books-header.css";

function BooksHeader() {
  const { getBooks, search, setSearch, categories } = useContext(BooksContext);

  /**
   * search books api call after each second,
   * used useCallback so that this function is initialized sigle time and reused in each render
   */
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
