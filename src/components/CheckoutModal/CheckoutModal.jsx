import React, { useState } from "react";
import classes from "./CheckoutModal.module.css"; // Ensure the case matches exactly
import axios from "axios";

const CheckoutModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [password, setPassword] = useState(""); // For sign-in

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        const response = await axios.post("/register/add-user", {
          email,
          firstName,
          lastName,
          city,
          street,
        });
        if (response.status === 200) {
          alert("Sign-up successful!");
          onClose();
        }
      } else {
        const response = await axios.post("/register/checkSignup", {
          email,
          password,
        });
        if (response.data.success) {
          alert("Login successful!");
          onClose();
        } else {
          alert("Invalid credentials.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </>
          )}
          {!isSignUp && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <button onClick={onClose} className={classes.cancelButton}>
          Cancel
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={classes.toggleButton}
        >
          {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
