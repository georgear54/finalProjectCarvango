import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import "./logIn.modules.css";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [emailValidation, setEmailValidation] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValidation(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toSend = { email, password };

    try {
      const res = await axios.post(`http://localhost:3001/logIn`, toSend, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setLoggedIn(true);
      } else {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 4000);
      }
    } catch (err) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 4000);
    }
    setEmail("");
    setPassword("");
  };

  if (loggedIn) {
    return <Navigate to="/dashBoard" />;
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
        <p>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
