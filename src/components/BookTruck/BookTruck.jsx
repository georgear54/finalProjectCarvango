import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./bookTruck.module.css";

const BookTruck = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfEvent: "",
    beginTime: "",
    endTime: "",
    addressOfEvent: "",
    cityState: "",
    descriptionOfEvent: "",
    numberOfGuests: "",
    responsibleForPayment: "Attendees",
    cateringType: "Food Truck Catering",
    heardAboutUs: "Referral",
  });
  const [lastSubmitted, setLastSubmitted] = useState(0);
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    // Fetch cities data on component mount
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

  useEffect(() => {
    // Fetch streets data based on selected city
    const fetchStreets = async () => {
      if (formData.cityState) {
        try {
          const response = await axios.get(
            "https://data.gov.il/api/3/action/datastore_search",
            {
              params: {
                resource_id: "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3",
                limit: 32000,
                q: formData.cityState,
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
  }, [formData.cityState]); // Trigger fetchStreets whenever formData.cityState changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the cityState field changes, clear the addressOfEvent field
    if (name === "cityState") {
      setFormData({
        ...formData,
        [name]: value,
        addressOfEvent: "",
      });
      setStreets([]); // Clear the streets list when city changes
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitted;
    if (timeSinceLastSubmit < 10000) {
      alert("Please wait before submitting again.");
      return;
    }

    if (Object.values(formData).some((field) => field === "")) {
      alert("All fields must be filled out.");
      return;
    }

    console.log(formData);
    setLastSubmitted(now);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <h1 className={classes.formHeader}>Alwadi Falafel Catering</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className={classes.inputField}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={classes.inputField}
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className={classes.inputField}
      />
      <input
        type="date"
        name="dateOfEvent"
        value={formData.dateOfEvent}
        onChange={handleChange}
        placeholder="Date of Event"
        className={classes.inputField}
      />
      <input
        type="time"
        name="beginTime"
        value={formData.beginTime}
        onChange={handleChange}
        placeholder="Begin Time"
        className={classes.inputField}
      />
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        placeholder="End Time"
        className={classes.inputField}
      />
      <select
        name="cityState"
        value={formData.cityState}
        onChange={handleChange}
        className={classes.inputField}
      >
        <option value="">Select City/State</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        name="addressOfEvent"
        value={formData.addressOfEvent}
        onChange={handleChange}
        className={classes.inputField}
        disabled={!formData.cityState}
      >
        <option value="">Select Street</option>
        {streets.map((street, index) => (
          <option key={index} value={street}>
            {street}
          </option>
        ))}
      </select>
      <textarea
        name="descriptionOfEvent"
        value={formData.descriptionOfEvent}
        onChange={handleChange}
        placeholder="Brief Description of Event"
        className={classes.textArea}
      />
      <input
        type="number"
        name="numberOfGuests"
        value={formData.numberOfGuests}
        onChange={handleChange}
        placeholder="Number of Guests"
        className={classes.inputField}
      />
      <select
        name="responsibleForPayment"
        value={formData.responsibleForPayment}
        onChange={handleChange}
        className={classes.selectField}
      >
        <option value="Attendees">Attendees</option>
        <option value="Host">Host</option>
      </select>
      <select
        name="cateringType"
        value={formData.cateringType}
        onChange={handleChange}
        className={classes.selectField}
      >
        <option value="Food Truck Catering">Food Truck Catering</option>
        <option value="Buffet Catering">Buffet Catering</option>
      </select>
      <select
        name="heardAboutUs"
        value={formData.heardAboutUs}
        onChange={handleChange}
        className={classes.selectField}
      >
        <option value="Referral">Referral</option>
        <option value="Social Media">Social Media</option>
        <option value="Website">Website</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default BookTruck;
