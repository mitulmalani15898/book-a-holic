/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Navbar component of the app
 */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faArrowDownAZ,
  faBook,
  faCartShopping,
  faHouse,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../static/images/logo.png";
import "./navbar.css";
import { BooksContext } from "../../Providers/BooksProvider";

const NavbarComponent = () => {
  const { setCart, setOrders } = useContext(BooksContext);
  const navigate = useNavigate();
  let [cookie, setCookie, removeCookie] = useCookies(["Token", "Email"]);

  const logOut = () => {
    setCart([]);
    setOrders([]);
    removeCookie("Token");
    removeCookie("Email");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <NavLink to="/">
          <img alt="logo" src={Logo} width="200" height="50" />
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="main-navbar">
            <NavLink
              to="/home"
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
            {!!cookie.Token && (
              <>
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
              </>
            )}
          </Nav>
          <Nav>
            {cookie.Token ? (
              <Nav.Link
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
                onClick={() => logOut()}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color="#FFF"
                  className="logout-icon"
                />
                Log out
              </Nav.Link>
            ) : (
              <Nav.Link
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
                onClick={() => navigate("/login")}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color="#FFF"
                  className="logout-icon"
                />
                Log in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
