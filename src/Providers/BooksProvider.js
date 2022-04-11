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
  const [cookie] = useCookies(["Token", "Email"]);
  const navigate = useNavigate();

  const [books, setBooks] = useState({
    loading: false,
    error: "",
    data: [],
  });
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getBooks();
    getUserCart();
    getUserOrder();
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
      setBooks((prev) => ({ ...prev, error: error.message }));
    } finally {
      setBooks((prev) => ({ ...prev, loading: false }));
    }
  };

  const getUserCart = async () => {
    const email = cookie.Email;
    if (email) {
      try {
        const res = await axios.get("/cart", { params: { email } });
        if (res.status === 200) {
          setCart(res.data.books);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const getUserOrder = async () => {
    const email = cookie.Email;
    if (email) {
      try {
        const res = await axios.get("/orders/" + email);
        if (res.status === 200 && res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const updateUserCart = async (books) => {
    const email = cookie.Email;
    if (email) {
      try {
        await axios.post("/cart", { email, books });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleAddToCart = (book) => () => {
    if (!cookie.Token) {
      navigate("/login", { replace: true });
    } else {
      updateUserCart([...cart.filter((b) => b._id !== book._id), book]);
      setCart((prev) => [...prev, book]);
    }
  };

  const handleRemoveFromCart = (book) => () => {
    updateUserCart(cart.filter((b) => b._id !== book._id));
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
        updateUserCart,
        orders,
        setOrders,
        getUserCart,
        getUserOrder,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
