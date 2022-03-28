/**
 * Filename : SignUp.js
 * Author: Abhinav Rawat (B00895691)
 * File Purpose: User Signup
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Login from "./LogIn";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";
import axios from "../../axios";

const SignUp = () => {
  const navigate = useNavigate();
  let [form, setForm] = useState({});
  let [errors, setErrors] = useState({});
  let [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErrors = findErrors();
    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
    } else {
      try {
        axios
          .post("/user/add", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          })
          .then((res) => {
            alert("User Account Created");
            navigate("/login")
          })
          .catch((error) => {
            alert("User Email already exists. Try resetting the password");
          });
      } catch (err) {
        alert("Could not sign up the user. Please try again!");
        navigate("/signup")
      }
      setDone(true);
    }
  };

  const setField = (input, value) => {
    setForm({
      ...form,
      [input]: value,
    });
    if (!!errors[input])
      setErrors({
        ...errors,
        [input]: null,
      });
  };

  const findErrors = () => {
    const { fname, lname, email, passW, cPassword } = form;
    const inputErrors = {};
    //First name validation
    const regName = /^[a-zA-Z]+[a-zA-Z]+$/;
    if (!fname || fname === "") inputErrors.fname = "cannot be blank!";
    else if (!regName.test(fname))
      inputErrors.fname = "name can only contain alphabets";

    //Last name validation
    if (!lname || lname === "") inputErrors.lname = "cannot be blank!";
    else if (!regName.test(lname))
      inputErrors.lname = "name can only contain alphabets";
    else if (fname === lname)
      inputErrors.lname = "Last name and first name cannot be same";

    //Email validation
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email === "") inputErrors.email = "cannot be blank!";
    else if (!regEmail.test(email))
      inputErrors.email = "Please enter a valid email address";

    //Password validation
    const regPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passW || passW === "") inputErrors.passW = "cannot be blank!";
    else if (!regPassword.test(passW))
      inputErrors.passW =
        "Password must be alphanumeric and have a special character with at least length of 8";
    else if (!passW.length > 7)
      inputErrors.passW = "Length must be more than 8";

    //Confirm password validation
    if (cPassword !== passW) inputErrors.cPassword = "Passwords don't match";

    return inputErrors;
  };

  return (
    <>
      {done && [<Login />]}

      {!done && [
        <div className="signup-container flex-column ">
          <hr/>
          <h3>Registration Form</h3>
          <hr style={{ width: "20%", border: "1px solid black" }} />
          <p> <center>Come join our community. Let's setup your account! </center></p>
          <Form style={{ width: "330px", textAlign: "left" }}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => {setField("fname", e.target.value)
                setFirstName( e.target.value)}}
                isInvalid={!!errors.fname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => {setField("lname", e.target.value)
                setLastName( e.target.value)}}
                isInvalid={!!errors.lname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => {setField("email", e.target.value)
              setEmail( e.target.value)}}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => {setField("passW", e.target.value)
              setPassword( e.target.value)}}
                isInvalid={!!errors.passW}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passW}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setField("cPassword", e.target.value)}
                isInvalid={!!errors.cPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <div
              className="button-container-success"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </div>
            <br/>
            Already Registered? &nbsp;
            <Link to="/login">Log In</Link>
            <hr style={{ width: "0%" }}/>
          </Form>
        </div>,
      ]}
    </>
  );
};

export default SignUp;
