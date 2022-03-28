/**
 * Filename : AccountSetting.js
 * Author: Yashvi Gulati (B00900339)
 * File Purpose: Managing the user account profile
 */

import "./Profile.css";
import { KeyFill, Trash } from "react-bootstrap-icons";
import { useState, useRef } from "react";
import ModalComponent from "./Modal";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const errorField = {
  errorCurrentPassword: "",
  errorNewPassword: "",
};

function AccountSetting({ userDetails }) {
  // Updating Account Details sent by Profile using props
  const [accDetails, updateAccDetails] = useState(userDetails);
  const [userAccDetails, updateUserAccDetails] = useState(userDetails);
  const [accountError, updateAccError] = useState(errorField);

  const passRef = useRef("");
  const newPasswordRef = useRef("");

  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const navigate = useNavigate();

  // Updating States on Form
  const handleAccountInput = (e) => {
    updateUserAccDetails({
      ...userAccDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Validation Function
  /**
   * New Password should atleast contain:
   *    - min 8 digits
   *    - 1 uppercase
   *    - 1 lowercase
   *    - 1 special character
   *    - 1 number
   * @returns true if error is present
   */
  const handleAccValidation = () => {
    let tempError = {};
    let isPasswordValid = true;
    const { currentPassword, newPassword } = userAccDetails;

    // Password Validation
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

  // Backend Request for Change Password (UPDATE) on Submit
  const handleAccUpdate = (e) => {
    e.preventDefault();
    if (handleAccValidation() === false) return;

    axios
      .put("/user/edit-general-profile", {
        password: userAccDetails.newPassword,
        email: userAccDetails.email,
      })
      .then((res) => {
        if (newPasswordRef.current) newPasswordRef.current.value = "";
        if (passRef.current) passRef.current.value = "";
      }).catch((error) => {
        console.log(error.message);
      });

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
          {/* Modal Component for Password Change */}
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

          {/* Modal Component for Delete Account */}
          <ModalComponent
            show={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
            }}
            showActionButton={true}
            title={"Are you sure?"}
            onActionClick={() => {
              // Backend Request for account deactivation (DELETE)
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
