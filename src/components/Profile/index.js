/**
 * Filename : index.js
 * Author: Yashvi Gulati (B00900339)
 * File Purpose: Managing the user general profile
 */

import { useState, useRef, useEffect } from "react";
import { HouseFill, LockFill, PencilSquare } from "react-bootstrap-icons";
import AccountSetting from "./AccountSetting";
import "./Profile.css";
import ModalComponent from "./Modal";
import { useCookies } from "react-cookie";
import axios from "../../axios";

// User Model
const DEF_USER_DETAILS = {
  date: "",
  _id: "",
  firstName: "",
  lastName: "",
  occupation: "",
  preferences: "",
  email: "",
  password: "",
};

// Preferences stored in Array.
const PREFERENCES = ["Non Fiction", "Fiction", "Drama", "Mythology"];

function Profile() {
  const [cookies, setCookies] = useCookies("user");
  const [selectedDiv, updateSelectedDiv] = useState(1);
  const [userDetails, updateUserDetails] = useState(DEF_USER_DETAILS);
  const [inputStates, updateInputState] = useState(DEF_USER_DETAILS);
  const [isDisabled, setDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Extracting email from cookie
  const USER_EMAIL = cookies.Email;

  let profilePicURL = require("../../static/images/default-profile-pic.jpeg");

  // Setting Profile picture from database
  if (userDetails.avatar) {
    profilePicURL = userDetails.avatar;
  }

  // If no picture present in database, apply default
  if (profilePic) {
    profilePicURL = profilePic;
  }

  const inputRef = useRef(null);

  const handleProfilePic = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  /**
   * Function to convert a file into base64
   * Reference Link : https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
   */
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Backend Request to upload profile picture (POST)
  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]) {
      const base64 = await getBase64(e.target.files[0]);
      axios("/user/upload-profile", {
        method: "POST",
        params: { email: USER_EMAIL },
        data: {
          imageData: base64,
        },
      });
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const errorSet = {
    firstName: "",
    lastName: "",
  };
  const [error, updateErrorState] = useState(errorSet);

  // Function to check checked preference states
  const isItemChecked = (item) => {
    const pregArr = inputStates?.preferences?.split(",");
    return pregArr.includes(item);
  };

  // Function to handle preference change
  const handlePrefChange = (e) => {
    const item = e.target.value;
    const pref = inputStates.preferences.split(",").filter((item) => {
      return item !== "";
    });

    const index = pref.indexOf(item);
    if (index === -1) pref.push(item);
    else pref.splice(index, 1);

    let newPref = "";
    pref.forEach((item) => {
      newPref += item + ",";
    });

    console.log("newPref", newPref);
    updateInputState({ ...inputStates, preferences: newPref });
  };

  const handleInputChange = (e) => {
    updateInputState({ ...inputStates, [e.target.name]: e.target.value });
  };

  /**
   * Function to validate all the input fields
   *  - First Name, Last Name : cannot contain digits, mandatory
   *
   * @returns false if error exists
   */
  const handleValidate = () => {
    let isError = false;

    const { firstName, lastName } = inputStates;
    const isFirstNameValid = RegExp(/^[a-zA-Z]+$/).test(firstName);
    const isLastNameValid = RegExp(/^[a-zA-Z]+$/).test(lastName);
    let errorFields = {};
    if (isFirstNameValid === false || firstName === "" || firstName === null) {
      errorFields = {
        ...errorFields,
        firstName: "First Name can only contain letters and is required",
      };
      isError = true;
    }

    if (isLastNameValid === false || lastName === "" || lastName === null) {
      errorFields = {
        ...errorFields,
        lastName: "Last Name can only contain letters and is required",
      };
      isError = true;
    }

    updateErrorState({
      ...errorFields,
    });

    return isError;
  };

  // Backend Request to edit user profile (PUT)
  const handleGeneralUpdate = async (e) => {
    e.preventDefault();
    if (handleValidate() === true) return;

    updateUserDetails({
      ...inputStates,
    });

    axios
      .put("/user/edit-general-profile", inputStates)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setIsModalVisible(true);
    setDisabled(true);
  };

  // Enabling/Disabling of Edit Button
  const handleEditChange = () => {
    setDisabled(!isDisabled);
  };

  // To get existing details from the database (GET)
  useEffect(() => {
    axios
      .get("/user/profile", {
        params: { email: USER_EMAIL },
      })
      .then((res) => {
        updateUserDetails({ ...res.data.data });
        updateInputState(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="profile-container">
      {/* Modal for Profile Update Success Message */}
      <ModalComponent
        show={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        desc={"Profile Updated Successfully"}
      />
      <div className="main-container">
        <div className="profile-picture-container">
          <div className="pp-container">
            <div
              className="pp-overlay"
              onClick={handleProfilePic}
              src={profilePicURL}
              alt="profile picture"
            >
              <div className="pp-overlay-text">Upload</div>
            </div>
            <img
              onClick={handleProfilePic}
              className="profile-picture"
              src={profilePicURL}
              alt="profile picture"
            />
          </div>

          <input
            onChange={handleProfilePicChange}
            type="file"
            ref={inputRef}
            accept="image/png, image/gif, image/jpeg"
            className="display-none"
          />

          <div>
            <p id="user-name">
              {userDetails.firstName} {userDetails.lastName}
            </p>
          </div>

          <div className="profile-button">
            <span
              id="personal-info"
              className={selectedDiv === 1 && "active-setting"}
              onClick={() => {
                updateSelectedDiv(1);
              }}
            >
              <HouseFill /> &nbsp; General
            </span>
            <span
              id="account-info"
              className={selectedDiv === 2 && "active-setting"}
              onClick={() => {
                updateSelectedDiv(2);
              }}
            >
              <LockFill /> &nbsp; Account
            </span>
          </div>
        </div>
        <div className="profile-info-container">
          {selectedDiv === 1 ? (
            <div className="container-div">
              <div class="heading-div">
                <h2 class="heading-general">General Settings</h2>
                <div
                  className="edit-btn"
                  onClick={handleEditChange}
                  hidden={!isDisabled}
                >
                  <PencilSquare />
                  &nbsp; Edit
                </div>
              </div>
              <form className="form-general">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="form-firstname">First Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="form-firstname"
                      placeholder="First Name"
                      disabled={isDisabled}
                      defaultValue={userDetails.firstName}
                      name="firstName"
                      onChange={handleInputChange}
                    />
                    {error.firstName && (
                      <div className="errorMessage"> {error.firstName} </div>
                    )}
                  </div>
                  <div class="form-group col-md-6">
                    <label for="form-lastname">Last Name *</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      class="form-control"
                      id="form-lastname"
                      placeholder="Last Name"
                      defaultValue={userDetails.lastName}
                      name="lastName"
                      onChange={handleInputChange}
                    />
                    {error.lastName && (
                      <div className="errorMessage"> {error.lastName} </div>
                    )}
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="form-status">I am a/an </label>
                    <select
                      id="form-status"
                      disabled={isDisabled}
                      class="form-control"
                      value={inputStates.occupation}
                      name="occupation"
                      onChange={handleInputChange}
                    >
                      <option value={""} selected>
                        Choose...
                      </option>
                      <option value="Student">Student</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Professional">Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Preferences</label>

                  {/* Creating fields dynamically */}
                  {PREFERENCES.map((item, idx) => {
                    return (
                      <div key={idx} class="form-check">
                        <input
                          checked={isItemChecked(item)}
                          class="form-check-input"
                          type="checkbox"
                          id="preference-fiction"
                          // onClick={handlePrefChange}
                          disabled={isDisabled}
                          value={item}
                          onChange={handlePrefChange}
                        />
                        <label
                          class="form-check-label"
                          for="preference-fiction"
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {isDisabled === false && (
                  <div className="update-cancel-btn">
                    <div
                      onClick={handleGeneralUpdate}
                      type="submit"
                      className="update-btn"
                    >
                      Update
                    </div>
                    <div onClick={refresh} type="submit" className="cancel-btn">
                      Cancel
                    </div>
                  </div>
                )}
              </form>
            </div>
          ) : selectedDiv === 2 ? (
            <AccountSetting userDetails={userDetails} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
