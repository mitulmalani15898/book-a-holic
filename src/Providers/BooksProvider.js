import { createContext, useState, useEffect } from "react";
import axios from "../axios";

const BooksContext = createContext();

const BooksProvider = (props) => {
  const [books, setBooks] = useState({
    loading: false,
    error: "",
    data: [],
  });
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async ({ searchText = "" } = {}) => {
    try {
      setBooks((prev) => ({ ...prev, loading: true }));
      const params = {};
      if (searchText || search) {
        params.search = searchText || search;
      }
      if (categories.length) {
        params.categories = JSON.stringify(categories);
      }
      const res = await axios.get("/books", {
        params,
      });
      if (res.status === 200 && res.statusText === "OK") {
        setBooks((prev) => ({ ...prev, data: res.data.data }));
      }
    } catch (error) {
      console.log("error", error);
      setBooks((prev) => ({ ...prev, error }));
    }
    setBooks((prev) => ({ ...prev, loading: false }));
  };

  return (
    <BooksContext.Provider
      value={{ books, getBooks, search, setSearch, categories, setCategories }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
