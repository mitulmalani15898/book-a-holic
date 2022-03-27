import { useState, useRef, useEffect } from "react";
import { HouseFill, LockFill, PencilSquare } from "react-bootstrap-icons";
import AccountSetting from "./AccountSetting";
import "./Profile.css";
import ModalComponent from "./Modal";
import axios from "axios";

const DEF_USER_DETAILS = {
  date: "",
  _id: "",
  firstName: "",
  lastName: "",
  occupation: "",
  preferences: [""],
  email: "",
  password: "",
};

const PREFERENCES = ["Non Fiction", "Fiction", "Drama", "Mythology"];

function Profile() {
  const [selectedDiv, updateSelectedDiv] = useState(1);
  const [userDetails, updateUserDetails] = useState(DEF_USER_DETAILS);
  const [inputStates, updateInputState] = useState(DEF_USER_DETAILS);
  const [isDisabled, setDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  let profilePicURL = require("../../static/images/default-profile-pic.jpeg");

  if (userDetails.avatar) {
    profilePicURL = userDetails.avatar;
  }

  if (profilePic) {
    profilePicURL = profilePic;
  }

  const inputRef = useRef(null);

  const handleProfilePic = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]) {
      const base64 = await getBase64(e.target.files[0]);
      axios("http://localhost:8080/api/user/upload-profile", {
        method: "POST",
        params: { email: "abhi@dal.ca" },
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

  const isItemChecked = (item) => {
    return userDetails.preferences.includes(item);
  };

  const handlePrefChange = (e) => {
    const item = e.target.value;
    const pref = inputStates.preferences;
    const index = pref.indexOf(item);
    if (index === -1) pref.push(item);
    else pref.splice(index, 1);

    updateInputState({ ...inputStates, preferences: pref });
  };

  const handleInputChange = (e) => {
    updateInputState({ ...inputStates, [e.target.name]: e.target.value });
  };

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

  const handleGeneralUpdate = async (e) => {
    e.preventDefault();
    if (handleValidate() === true) return;

    updateUserDetails({
      ...inputStates,
    });

    axios
      .put("http://localhost:8080/api/user/edit-general-profile", userDetails)
      .then((res) => {
        console.log(res.data.data);
        updateUserDetails({ ...res.data.data });
      });

    // axios.put("http://localhost:8080/api/user/edit-general-profile", {
    //   method: "PUT",
    //   data: {
    //     userDetails
    //   },
    // });

    console.log(userDetails);
    console.log(inputStates);

    setIsModalVisible(true);
    setDisabled(true);
  };

  // const handlePutRequest = async (e) => {
  //   axios
  //     .put("http://localhost:8080/api/user/edit-general-profile", {
  //       data: { userDetails },
  //     })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       updateUserDetails({ ...res.data.data });
  //     });
  // }

  const handleEditChange = () => {
    setDisabled(!isDisabled);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/profile", {
        headers: {
          'Authorization': `Token ${token}`
        },
        params: { email: "abhi@dal.ca" }, // TODO
      })
      .then((res) => {
        updateUserDetails({ ...res.data.data });
        updateInputState(res.data.data);
      });
  }, []);

  return (
    <div className="profile-container">
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
                      defaultValue={userDetails.occupation}
                      name="iAm"
                      onChange={handleInputChange}
                    >
                      <option value="" value={userDetails.occupation} selected>
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

                  {PREFERENCES.map((item, idx) => {
                    return (
                      <div key={idx} class="form-check">
                        <input
                          defaultChecked={isItemChecked(item)}
                          class="form-check-input"
                          type="checkbox"
                          id="preference-fiction"
                          defaultValue={item}
                          disabled={isDisabled}
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
                  <div
                    onClick={handleGeneralUpdate}
                    type="submit"
                    className="update-btn"
                  >
                    Update
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
