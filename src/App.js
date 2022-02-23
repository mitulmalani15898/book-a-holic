import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./pages/Books";
import Cart from "./pages/Cart";
import NavbarComponent from "./components/Navbar";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavbarComponent /> */}
        <Routes>
          <Route path="/" element={<h2>Welcome to Book-a-holic!</h2>} />
          <Route path="/books" element={<Books />} />
          <Route path="/orders" element={<Books />} />
          <Route path="/profile" element={<Books />} />
          <Route path="/contact-us" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
