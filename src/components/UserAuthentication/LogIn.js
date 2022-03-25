import { useState, React } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./UserAuth.css";

const Login = (props) => {
  var token = "";
  var userEmail = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8080/api/user", {
          email: email,
          password: password,
        })
        .then((res) => {
          token = res.data.data.token;
          userEmail = res.data.data.email;
          setCookie("Token", token, { path: "/" });
          setCookie("Email", userEmail, { path: "/" });
          //navigate to home page.
        })
        .catch((error) => {
          alert("Could not login the user. Please try again!");
        });
    } catch (err) {
      alert("Could not login the user. Please try again!");
      // navigate to login page.
    }
  };
  return (
    <div className="login-container flex-column">
      <h3>Account Login</h3>
      <hr style={{ width: "20%", border: "1px solid black" }} />
      <Form
        onSubmit={handleSubmit}
        style={{ width: "330px", textAlign: "left", marginTop: "2" }}
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
        <div className="button-container" type="submit" onClick={handleSubmit}>
          Login
        </div>
        <p>
          {" "}
          Forgot your password? <Link to="/forgot">Click here</Link>{" "}
        </p>
        Not Registered? &nbsp;
        <Link to="/signup">Sign Up</Link>
      </Form>
    </div>
  );
};
export default Login;
