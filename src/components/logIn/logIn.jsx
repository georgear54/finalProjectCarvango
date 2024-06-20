import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Navigate from React Router
import axios from "axios";
import "./logIn.modules.css";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false); // New state for login error
  const [emailValidation, setEmailValidation] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  const validateEmail = (email) => {
    const validationAnswer = {};
    if (!emailPattern.test(email)) {
      validationAnswer.status = false;
      validationAnswer.text = "Invalid email address";
    } else {
      validationAnswer.status = true;
      validationAnswer.text = "Validation successful";
    }
    return validationAnswer;
  };

  // const validatePassword = (password) => {
  //   const validationAnswer = {};
  //   if (!passwordPattern.test(password)) {
  //     validationAnswer.status = false;
  //     validationAnswer.text =
  //       "Password must contain at least 8 characters, including uppercase, lowercase, and a number";
  //   } else {
  //     validationAnswer.status = true;
  //     validationAnswer.text = "Validation successful";
  //   }
  //   return validationAnswer;
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValidation(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setPasswordValidation(validatePassword(e.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toSend = { email: email, password: password };

    console.log(toSend);
    try {
      const res = await axios.post(`http://localhost:3001/login`, toSend);

      if (res.status === 200) {
        // If login is successful, set loggedIn state to true
        setLoggedIn(true);
      } else {
        console.error("Error fetching data:", res.status);
        setLoginError(true); // Set login error to true if login fails

        // Remove the error message after 4 seconds
        setTimeout(() => {
          setLoginError(false);
        }, 4000);
      }
    } catch (err) {
      console.error("Error:", err);
      setLoginError(true); // Set login error to true if login fails

      // Remove the error message after 4 seconds
      setTimeout(() => {
        setLoginError(false);
      }, 4000);
    }

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  // If user is logged in, navigate to the home page
  if (loggedIn) {
    window.location.href = "/home";
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Email"
          />
          {!emailValidation.status && (
            <span className="error-message">{emailValidation.text}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
          />
          {!passwordValidation.status && (
            <span className="error-message">{passwordValidation.text}</span>
          )}
        </div>
        <button type="submit">Login</button>
        {loginError && (
          <p className="error-message">
            Error logging in: password or email is incorrect
          </p>
        )}
        {/* Add link to the sign-up page */}
        <p>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
