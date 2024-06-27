import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signUp.modules.css";

function SignUp() {
  // State variables
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [streetNumber, setStreetNumber] = useState("");
  const [streets, setStreets] = useState([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State variables for validation
  const [emailValidation, setEmailValidation] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});
  const [retypePasswordValidation, setRetypePasswordValidation] = useState({});

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Validate email
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

  // Validate retype password
  const validateRetypePassword = (password, retypePassword) => {
    const validationAnswer = {};
    if (password !== retypePassword) {
      validationAnswer.status = false;
      validationAnswer.text = "Passwords do not match";
    } else {
      validationAnswer.status = true;
      validationAnswer.text = "Passwords match";
    }
    return validationAnswer;
  };

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

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValidation(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValidation(validatePassword(e.target.value));
    setRetypePasswordValidation(
      validateRetypePassword(e.target.value, retypePassword)
    );
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    setRetypePasswordValidation(
      validateRetypePassword(password, e.target.value)
    );
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setStreets([]); // Clear streets when a new city is selected

    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search",
        {
          params: {
            resource_id: "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3",
            limit: 32000,
            q: selectedCity,
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
  };

  const handleStreetNumberChange = (e) => {
    setStreetNumber(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      role,
      city,
      street_number: streetNumber,
      lastName: lastName,
      firstName: firstName,
      phone_number: phoneNumber,
    };

    try {
      // First, check if the email already exists
      const checkResponse = await axios.post(
        "http://localhost:3001/register/checkSignup",
        { email, phoneNumber }
      );

      if (checkResponse.status !== 200 || !checkResponse.data.success) {
        setErrorMessage(
          checkResponse.data.message ||
            "An account with this email already exists!!!"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 3500);
        return;
      }

      // If the email check is successful, proceed to register the user
      const registerResponse = await axios.post(
        "http://localhost:3001/register/add-user",
        userData
      );

      if (registerResponse.status === 200) {
        setSuccessMessage("You have successfully signed up.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        throw new Error("Failed to register the user");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("An account with this email already exists!!!");
      } else {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3500);
    }
  };

  return (
    <div className="sign-up-container">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="sign-up-form-group">
          <select
            value={role}
            onChange={handleRoleChange}
            required
            name="role"
            className="sign-up-form-control"
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="sign-up-form-group">
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
        {role === "Admin" && (
          <>
            <div className="sign-up-form-group">
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
              <input
                type="password"
                placeholder="Retype Password"
                value={retypePassword}
                onChange={handleRetypePasswordChange}
                required
                name="retypePassword"
                className="sign-up-form-control"
              />
              {!retypePasswordValidation.status && (
                <span className="sign-up-error-message">
                  {retypePasswordValidation.text}
                </span>
              )}
            </div>
          </>
        )}
        <div className="sign-up-form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
            name="lastName"
            className="sign-up-form-control"
          />
        </div>
        <div className="sign-up-form-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            name="firstName"
            className="sign-up-form-control"
          />
        </div>
        <div className="sign-up-form-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
            name="phoneNumber"
            className="sign-up-form-control"
          />
        </div>
        <div className="sign-up-form-group">
          <select
            value={city}
            onChange={handleCityChange}
            required
            name="city"
            className="sign-up-form-control"
          >
            <option value="">Select City</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
        <div className="sign-up-form-group">
          <select
            value={streetNumber}
            onChange={handleStreetNumberChange}
            required
            name="streetNumber"
            className="sign-up-form-control"
          >
            <option value="">Select Street</option>
            {streets.map((streetName) => (
              <option key={streetName} value={streetName}>
                {streetName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="sign-up-btn-primary">
          Sign Up
        </button>
        {errorMessage && (
          <span className="sign-up-error-message">{errorMessage}</span>
        )}
        {successMessage && (
          <span className="sign-up-success-message">{successMessage}</span>
        )}
      </form>
    </div>
  );
}

export default SignUp;
