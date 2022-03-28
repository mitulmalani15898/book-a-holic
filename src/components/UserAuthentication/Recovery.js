import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./UserAuth.css";
import { useCookies } from "react-cookie";

const Recovery = (props) => {
  const [cookie, setCookie] = useCookies(["Token", "Email"]);
  let [password, setPassword] = React.useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const token =
      window.location.href.split("/")[
        window.location.href.split("/").length - 2
      ];
    const email =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];

    try {
      axios
        .post(`http://localhost:8080/api/user/recovery/${token}/${email}`, {
          password: password,
        })
        .then((res) => {
          alert("Password updated successfully!");
        })
        .catch((error) => {
          alert(error + "omgsgasglasnkfl");
        });
    } catch (err) {
      alert("Request error caught. Please try againaaaaaaaaaaa!");
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="forgot-container flex-column">
      <hr />
      <h3>Account Password Reset</h3>
      <hr style={{ width: "20%", border: "1px solid black" }} />
      <Form style={{ width: "330px", textAlign: "left", marginTop: "2" }}>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter new password"
            value={password}
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
            Change Password!{" "}
          </Button>
          <hr style={{ width: "0%" }} />
        </div>
      </Form>
    </div>
  );
};

export default Recovery;
