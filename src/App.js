import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import UserDashBoard from "./components/UserDashBoard";
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

const PrivateRoute = ({ children }) => {
  const [cookie] = useCookies(["Token"]);
  return !!cookie.Token ? children : <Navigate to="/login" replace={true} />;
};

const PublicRoute = ({ children }) => {
  const [cookie] = useCookies(["Token"]);
  return !!cookie.Token ? <Navigate to="/" replace={true} /> : children;
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BooksProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/dashboard" element={<UserDashBoard />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/book/:id"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/getReview"
              element={
                <PrivateRoute>
                  <GetReview />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LogIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot"
              element={
                <PublicRoute>
                  <Forgot />
                </PublicRoute>
              }
            />
            <Route
              path="/recovery/:token/:email"
              element={
                <PublicRoute>
                  <Recovery />
                </PublicRoute>
              }
            />
          </Routes>
        </BooksProvider>
      </BrowserRouter>
    </div>
  );
}
