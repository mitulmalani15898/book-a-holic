import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import BookDetails from "./pages/BookDetails";
import LogIn from "./components/UserAuthentication/LogIn";
import SignUp from "./components/UserAuthentication/SignUp";
import Forgot from "./components/UserAuthentication/Forgot";
import GiveReview from "./components/Reviews/GiveReview"
import GetReview from "./components/Reviews/GetReview"
import Dumm from "./components/Reviews/index"

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/orders" element={<Books />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Books />} />
          <Route path="/giveReview" element={<GiveReview />} />
          <Route path="/getReview" element={<GetReview />} />
          <Route path="/indi" element={<Dumm/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
