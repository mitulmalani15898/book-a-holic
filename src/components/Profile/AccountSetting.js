import "./Profile.css";
import { KeyFill, Trash } from "react-bootstrap-icons";
import { useState, useRef } from "react";
import ModalComponent from "./Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const DEF_USER_ACCOUNT_DETAILS = {
//   email: "ashley.bratt@gmail.com",
//   password: "Ashley@123",
// };

const errorField = {
  errorCurrentPassword: "",
  errorNewPassword: "",
};

// const userAccInput = {
//   currentPassword: "",
//   newPassword: "",
// };

function AccountSetting({ userDetails }) {
  const [accDetails, updateAccDetails] = useState(userDetails); //input
  const [userAccDetails, updateUserAccDetails] = useState(userDetails);
  const [accountError, updateAccError] = useState(errorField);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const passRef = useRef("");
  const newPasswordRef = useRef("");

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const navigate = useNavigate();

  const handleAccountInput = (e) => {
    updateUserAccDetails({
      ...userAccDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccValidation = () => {
    let tempError = {};
    let isPasswordValid = true;
    const { currentPassword, newPassword } = userAccDetails;
    const isNewPasswordValid = RegExp(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*_])[A-Za-z0-9!@#$%&*_]{8,}$/
    ).test(newPassword);
    if (currentPassword !== userAccDetails.password) {
      isPasswordValid = false;
      tempError = {
        ...tempError,
        errorCurrentPassword: "Current Password is not correct",
      };
    }

    if (!isNewPasswordValid) {
      tempError = {
        ...tempError,
        errorNewPassword:
          "Password should be minimum 8 characters long, and should contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 Number and is Required.",
      };
      isPasswordValid = false;
    }
    updateAccError({
      ...accountError,
      errorCurrentPassword: tempError.errorCurrentPassword,
      errorNewPassword: tempError.errorNewPassword,
    });

    return isPasswordValid;
  };

  const handleAccUpdate = (e) => {
    e.preventDefault();
    if (handleAccValidation() === false) return;

    axios
      .put("http://localhost:8080/api/user/edit-general-profile", {
        password: userAccDetails.newPassword,
        email: userAccDetails.email,
      })
      .then((res) => {
        console.log(res.data.data);
        if (newPasswordRef.current) newPasswordRef.current.value = "";
        if (passRef.current) passRef.current.value = "";
      });

    console.log(accDetails, userAccDetails);

    updateAccDetails({ ...accDetails, password: userAccDetails.newPassword });
    setIsModalVisible2(true);
  };

  return (
    <div class="container-div">
      <div class="heading-div">
        <h2 class="heading-general">Account Settings</h2>
      </div>
      <div className="form-general">
        <div class="form-row">
          <div class="form-group col-md-7">
            <label for="form-firstname">Email</label>
            <input
              type="email"
              class="form-control"
              id="form-email"
              disabled
              placeholder="Email"
              value={accDetails.email}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-7">
            <label for="form-current-password">Current Password</label>
            <input
              type="password"
              ref={passRef}
              class="form-control"
              id="form-current-password"
              placeholder="Current Password"
              name="currentPassword"
              onChange={handleAccountInput}
            />
            {accountError.errorCurrentPassword && (
              <div className="errorMessage">
                {accountError.errorCurrentPassword}
              </div>
            )}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-7">
            <label for="form-current-password">New Password</label>
            <input
              type="password"
              class="form-control"
              id="form-new-password"
              placeholder="New Password"
              name="newPassword"
              ref={newPasswordRef}
              onChange={handleAccountInput}
            />
            {accountError.errorNewPassword && (
              <div className="errorMessage">
                {accountError.errorNewPassword}
              </div>
            )}
          </div>
        </div>
        <div className="account-btn-container">
          <ModalComponent
            show={isModalVisible2}
            onClose={() => {
              setIsModalVisible2(false);
            }}
            desc={"Password Updated Successfully"}
          />
          <div
            type="submit"
            onClick={handleAccUpdate}
            className="update-account-btn"
          >
            <KeyFill /> &nbsp; Change Password
          </div>
          <ModalComponent
            show={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
            }}
            showActionButton={true}
            title={"Are you sure?"}
            onActionClick={() => {
              axios
                .delete(
                  "http://localhost:8080/api/user/delete",
                  userDetails.email
                )
                .then((res) => {
                  navigate("/");
                });
            }}
            buttonActionText={"Confirm"}
            desc={"Are you sure, you wish to delete the account?"}
          />
          <div
            type="submit"
            onClick={() => {
              setIsModalVisible(true);
            }}
            className="delete-account-btn"
          >
            <Trash /> &nbsp; Delete Account
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSetting;
