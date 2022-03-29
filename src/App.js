import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import BookDetails from "./pages/BookDetails";
import Orders from "./components/Orders";
import LogIn from "./components/UserAuthentication/LogIn";
import SignUp from "./components/UserAuthentication/SignUp";
import Forgot from "./components/UserAuthentication/Forgot";
import GetReview from "./components/Reviews/GetReview";
import Recovery from "./components/UserAuthentication/Recovery";
import { BooksProvider } from "./Providers/BooksProvider";

import "./App.css";

export default function App() {
  let [cookie, setCookie] = useCookies(["Token", "Email"]);

  return (
    <div className="App">
      <BrowserRouter>
        <BooksProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/contact-us" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/recovery/:token/:email" element={<Recovery />} />
            {cookie.Token ? (
              <>
                <Route path="/book/:id" element={<BookDetails />} />,
                <Route path="/orders" element={<Orders />} />,
                <Route path="/profile" element={<Profile />} />,
                <Route path="/getReview" element={<GetReview />} />,
                <Route path="/cart" element={<Cart />} />,
              </>
            ) : (
              <>
                <Route path="/books" element={<LogIn />} />,
                <Route path="/book/:id" element={<LogIn />} />,
                <Route path="/orders" element={<LogIn />} />,
                <Route path="/profile" element={<LogIn />} />,
                <Route path="/getReview" element={<LogIn />} />,
                <Route path="/cart" element={<LogIn />} />,
                <Route path="/login" element={<LogIn />} />,
                <Route path="/signup" element={<SignUp />} />,
                <Route path="/forgot" element={<Forgot />} />,
              </>
            )}
          </Routes>
        </BooksProvider>
      </BrowserRouter>
    </div>
  );
}
