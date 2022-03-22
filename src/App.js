import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import BookDetails from "./pages/BookDetails";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/orders" element={<Books />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
