import React, { useState, useEffect } from "react";
import classes from "./CheckoutModal.module.css"; // Ensure the case matches exactly
import axios from "axios";
import Paypal from "../../contexts/PayPal"; // Import the Paypal component

const CheckoutModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [streetNumber, setStreetNumber] = useState("");
  const [streets, setStreets] = useState([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch cities data on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://data.gov.il/api/3/action/datastore_search",
          {
            params: {
              resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
              limit: 32000,
            },
          }
        );
        const cityNames = response.data.result.records.map((record) =>
          record["שם_ישוב"].trim()
        );
        setCities(cityNames);
      } catch (error) {
        console.error("Error fetching cities data:", error);
      }
    };
    fetchCities();
  }, []);

  // Fetch streets data based on selected city
  useEffect(() => {
    const fetchStreets = async () => {
      if (city) {
        try {
          const response = await axios.get(
            "https://data.gov.il/api/3/action/datastore_search",
            {
              params: {
                resource_id: "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3",
                limit: 32000,
                q: city,
              },
            }
          );
          const streetNames = response.data.result.records.map((record) =>
            record["שם_רחוב"].trim()
          );
          setStreets(streetNames);
        } catch (error) {
          console.error("Error fetching streets data:", error);
        }
      }
    };
    fetchStreets();
  }, [city]);

  const handleSendCode = async () => {
    try {
      const response = await axios.post("/register/sendCode", { email });
      if (response.status === 200) {
        setIsCodeSent(true);
      }
    } catch (error) {
      console.error("Error sending code:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("/register/verifyCode", {
        email,
        oneTimeCode,
      });
      if (response.status === 200 && response.data.success) {
        setIsCodeVerified(true);
        // Pre-fill user details
        const userDetails = response.data.userDetails;
        setFirstName(userDetails.first_name);
        setLastName(userDetails.last_name);
        setCity(userDetails.city);
        setStreetNumber(userDetails.street_number);
        setPhoneNumber(userDetails.phone_number);
      } else {
        alert("Invalid code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        const response = await axios.post("/register/add-user", {
          email,
          firstName,
          lastName,
          city,
          street_number: streetNumber,
          phone_number: phoneNumber,
        });
        if (response.status === 200) {
          alert("Sign-up successful!");
          onClose();
        }
      } else if (isCodeVerified) {
        alert("Details verified!");
        onClose();
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
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {cities.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
              <select
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required
              >
                <option value="">Select Street</option>
                {streets.map((streetName, index) => (
                  <option key={index} value={streetName}>
                    {streetName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </>
          )}
          {!isSignUp && (
            <>
              {isCodeSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter Code"
                    value={oneTimeCode}
                    onChange={(e) => setOneTimeCode(e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleVerifyCode}>
                    Verify Code
                  </button>
                </>
              ) : (
                <button type="button" onClick={handleSendCode}>
                  Send Code
                </button>
              )}
            </>
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        {isCodeVerified && (
          <div className={classes.paypal}>
            <Paypal />
          </div>
        )}
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
