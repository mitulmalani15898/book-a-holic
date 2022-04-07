/**
 * Filename : Login.js
 * Author: Abhinav Rawat (B00895691)
 * File Purpose: Login
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useCookies } from "react-cookie";
import "./UserAuth.css";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Login = (props) => {
  const navigate = useNavigate();
  var token = "";
  var userEmail = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["Token", "Email"]);

  // Backend code to create a new user
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("/user", {
          email: email,
          password: password,
        })
        .then((res) => {
          token = res.data.data.token;
          userEmail = res.data.data.email;
          setCookie("Email", userEmail, { path: "/" });
          setCookie("Token", token, { path: "/" });
          navigate("/", { replace: true });
        })
        .catch((error) => {
          alert("Invalid Credentials. Please try again!");
        });
    } catch (err) {
      alert("Could not send the Request. Please try again!");
      navigate("/login");
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-form-container flex-column">
        <hr />
        <h3>Account Login</h3>
        <hr style={{ width: "100%", border: "1px solid black" }} />
        <Form
          onSubmit={handleSubmit}
          style={{ width: "100%", textAlign: "left", marginTop: "2" }}
        >
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              placeholder="Please enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div
            className="button-container"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </div>
          <hr style={{ width: "0%" }} />
          <p>
            {" "}
            Forgot your password? <Link to="/forgot">Click here</Link>{" "}
          </p>
          Not Registered? &nbsp;
          <Link to="/signup">Sign Up</Link>
        </Form>
        <hr style={{ width: "0%" }} />
      </div>
    </div>
  );
};
export default Login;
