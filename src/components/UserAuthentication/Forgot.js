import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UserAuth.css";

const Forgot = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="forgot-container flex-column">
      <h3>Account Recovery</h3>
      <hr style={{ width: "50%", border: "1px solid black" }} />
      <Form style={{ width: "330px", textAlign: "left", marginTop: "2" }}>
        <Form.Group>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Please enter your email address"
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
        <hr style={{ width: "0%" }}/>
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
