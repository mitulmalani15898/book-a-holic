import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./UserAuth.css";
import { useNavigate } from "react-router-dom";

const Forgot = (props) => {
  const navigate = useNavigate();
  let [email, setEmail] = React.useState();
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios
        .post(`http://localhost:8080/api/user/forgot/${email}`, {
          email: email,
        })
        .then((res) => {
          alert("Email sent!!");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      alert("Request error caught.");
      // navigate to login page.
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="forgot-container flex-column">
      <h3>Account Recovery</h3>
      <hr style={{ width: "20%", border: "1px solid black" }} />
      <Form style={{ width: "330px", textAlign: "left", marginTop: "2" }}>
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
        <div className="submit-container d-flex mt-3 flex-column justify-content-center">
          <Button
            style={{ width: "330px" }}
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Reset!{" "}
          </Button>
        </div>
        <p>
          {" "}
          Log into your Account? <Link to="/Login">Click here</Link>{" "}
        </p>
        <p>
          Not Registered? &nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>
      </Form>
    </div>
  );
};

export default Forgot;
