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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State variables for validation
  const [emailValidation, setEmailValidation] = useState({});

  // Regular expressions for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      role,
      city,
      street_number: streetNumber,
      last_name: lastName,
      first_name: firstName,
      phone_number: phoneNumber,
    };

    try {
      console.log(phoneNumber, email);
      // First, check if the email already exists
      const checkResponse = await axios.post(
        "http://localhost:3001/signUp/checkSignup",
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
        "http://localhost:3001/signUp/add-user",
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
          <select
            value={city}
            onChange={handleCityChange}
            required={role === "Admin"}
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
            required={role === "Admin"}
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
        <div className="sign-up-form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required={role === "Admin"}
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
            required={role === "Admin"}
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
