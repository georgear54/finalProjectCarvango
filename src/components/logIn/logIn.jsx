import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Navigate from React Router
import "./logIn.modules.css";

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false); // New state for login error

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toSend = { username: username, password: password };

    console.log(toSend);
    try {
      const res = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend),
      });

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
    setUsername("");
    setPassword("");
  };
  
  // If user is logged in, navigate to the home page
  if (loggedIn) {
    window.location.href="/home";
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="UserName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
        {loginError && (
          <p>Error logging in: password or username is incorrect </p>
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
