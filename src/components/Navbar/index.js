import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faBook,
  faCartShopping,
  faHouse,
  faMessage,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../static/images/logo.png";
import "./navbar.css";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <img alt="logo" src={Logo} width="200" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="main-navbar">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faHouse}
                color="#FFF"
                className="logout-icon"
              />
              Home
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faBook}
                color="#FFF"
                className="logout-icon"
              />
              Books
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faArrowDownAZ}
                color="#FFF"
                className="logout-icon"
              />
              Orders
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faUser}
                color="#FFF"
                className="logout-icon"
              />
              Profile
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faMessage}
                color="#FFF"
                className="logout-icon"
              />
              Contact Us
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                color="#FFF"
                className="logout-icon"
              />
              Cart
            </NavLink>
          </Nav>
          <Nav>
            <Nav.Link
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                color="#FFF"
                className="logout-icon"
              />
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
