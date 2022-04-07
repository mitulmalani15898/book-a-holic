/**
 * Filename : Forgot.js
 * Author: Abhinav Rawat (B00895691)
 * File Purpose: Forget Password
 */

import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./UserAuth.css";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Forgot = (props) => {
  const navigate = useNavigate();
  let [email, setEmail] = React.useState();

  // Backend POST call for forget password
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios
        .post(
          `https://bookaholic-backend.herokuapp.com/api/user/forgot/${email}`,
          {
            email: email,
          }
        )
        .then((res) => {
          alert("Email sent!!");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      alert("Request error caught.");
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-form-container flex-column">
        <hr />
        <h3>Account Recovery</h3>
        <hr style={{ width: "100%", border: "1px solid black" }} />
        <Form style={{ width: "100%", textAlign: "left", marginTop: "2" }}>
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Please enter your email address"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="submit-container d-flex flex-column justify-content-center">
            <div
              className="button-container"
              type="submit"
              onClick={handleSubmit}
            >
              Reset
            </div>
          </div>
          <br />
          <p>
            Log into your Account? <Link to="/Login">Click here</Link>
          </p>
          <p>
            Not Registered? &nbsp;
            <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Forgot;
