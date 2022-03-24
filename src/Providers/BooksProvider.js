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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async ({ searchText = "", categoriesList = [] } = {}) => {
    try {
      setBooks((prev) => ({ ...prev, loading: true, error: "" }));
      const params = {};
      if (searchText) {
        params.search = searchText;
      }
      if (categoriesList.length) {
        params.categories = JSON.stringify(categoriesList);
      }
      const res = await axios.get("/books", {
        params,
      });
      if (res.status === 200 && res.statusText === "OK") {
        setBooks((prev) => ({ ...prev, data: res.data.data }));
      }
    } catch (error) {
      console.log("error", error);
      setBooks((prev) => ({ ...prev, error: error.message }));
    }
    setBooks((prev) => ({ ...prev, loading: false }));
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        getBooks,
        search,
        setSearch,
        categories,
        setCategories,
        cart,
        setCart,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
