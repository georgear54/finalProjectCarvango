import React, { useState } from "react";
import "./signUp.modules.css";

function SignUp() {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State variables for validation
  const [usernameValidation, setUsernameValidation] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});
  const [firstNameValidation, setFirstNameValidation] = useState({});
  const [lastNameValidation, setLastNameValidation] = useState({});
  const [emailValidation, setEmailValidation] = useState({});

  // Regular expressions for email and password validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Validate username
  const validateUsername = (username) => {
    const validationAnswer = {};
    if (username.length < 3) {
      validationAnswer.status = false;
      validationAnswer.text = "The username must contain at least 3 characters";
    } else {
      validationAnswer.status = true;
      validationAnswer.text = "Validation successful";
    }
    return validationAnswer;
  };

  // Validate password
  const validatePassword = (password) => {
    const validationAnswer = {};
    if (!passwordPattern.test(password)) {
      validationAnswer.status = false;
      validationAnswer.text =
        "Password must contain at least 8 characters, including uppercase, lowercase, and a number";
    } else {
      validationAnswer.status = true;
      validationAnswer.text = "Validation successful";
    }
    return validationAnswer;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      firstName,
      lastName,
      email,
    };

    try {
      const response = await fetch("/register/checkSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        // Display error message or handle as needed
        setErrorMessage("an Account with this Username already exists!!!");

        setTimeout(() => {
          setErrorMessage("");
        }, 3500);
        throw new Error("Network response was not ok");
      }

      let data = await response.json();

      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
      return;
    }

    console.log(
      "-----------------------------------------------------------------------------------------------"
    );
    try {
      const response = await fetch("/register/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.status;
      console.log("Response from server:", data);
      setSuccessMessage("You have successfully signed up.");
      if (data === 200) {
        window.location.href = "/login";
      }
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  // Handle input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameValidation(validateUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValidation(validatePassword(e.target.value));
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    // Validation for first name if needed
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    // Validation for last name if needed
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Validation for email
    const validationAnswer = {};
    if (!emailPattern.test(e.target.value)) {
      validationAnswer.status = false;
      validationAnswer.text = "Invalid email address";
    } else {
      validationAnswer.status = true;
      validationAnswer.text = "Validation successful";
    }
    setEmailValidation(validationAnswer);
  };

  return (
    <div className="sign-up-container">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        {/* Input fields with corresponding change handlers */}
        <div className="sign-up-form-group">
          <label className="sign-up-form-group-label">Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
            name="username"
            className="sign-up-form-control"
          />
          {errorMessage && (
            <span className="sign-up-error-message">{errorMessage}</span>
          )}
          {!usernameValidation.status && (
            <span className="sign-up-error-message">
              {usernameValidation.text}
            </span>
          )}
        </div>
        <div className="sign-up-form-group">
          <label className="sign-up-form-group-label">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            name="password"
            className="sign-up-form-control"
          />
          {!passwordValidation.status && (
            <span className="sign-up-error-message">
              {passwordValidation.text}
            </span>
          )}
        </div>
        <div className="sign-up-form-group">
          <label className="sign-up-form-group-label">First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            name="firstName"
            className="sign-up-form-control"
          />
          {/* Validation for first name if needed */}
        </div>
        <div className="sign-up-form-group">
          <label className="sign-up-form-group-label">Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
            name="lastName"
            className="sign-up-form-control"
          />
          {/* Validation for last name if needed */}
        </div>
        <div className="sign-up-form-group">
          <label className="sign-up-form-group-label">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            name="email"
            className="sign-up-form-control"
          />
          {!emailValidation.status && (
            <span className="sign-up-error-message">
              {emailValidation.text}
            </span>
          )}
        </div>
        <button type="submit" className="sign-up-btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
