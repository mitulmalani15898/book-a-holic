/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * @exports BooksContext
 * @exports BooksProvider
 * Books context provider, therefore any child component of this provider can use these states and functions
 * Holds state for cart, search book value, and selected categories for filtering books
 * also, api call for books page with filtering, searching books
 */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "../axios";

const BooksContext = createContext();

const BooksProvider = (props) => {
  const [cookie] = useCookies(["Token"]);
  const navigate = useNavigate();

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

  // get books with searching and filtering books by categories
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
    } finally {
      setBooks((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleAddToCart = (book) => () => {
    if (!cookie.Token) {
      navigate("/login", { replace: true });
    } else {
      setCart((prev) => [...prev, book]);
    }
  };

  const handleRemoveFromCart = (book) => () => {
    setCart((prev) => prev.filter((b) => b._id !== book._id));
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
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
