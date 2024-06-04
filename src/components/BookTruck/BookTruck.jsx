import React, { useState } from "react";

const Booktruck = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitted;
    if (timeSinceLastSubmit < 10000) {
      // 10 seconds cooldown
      alert("Please wait before submitting again.");
      return;
    }

    if (Object.values(formData).some((field) => field === "")) {
      alert("All fields must be filled out.");
      return;
    }

    // Submit form data
    console.log(formData);

    // Update last submitted time
    setLastSubmitted(now);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="date"
        name="dateOfEvent"
        value={formData.dateOfEvent}
        onChange={handleChange}
        placeholder="Date of Event"
      />
      <input
        type="time"
        name="beginTime"
        value={formData.beginTime}
        onChange={handleChange}
        placeholder="Begin Time"
      />
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        placeholder="End Time"
      />
      <input
        type="text"
        name="addressOfEvent"
        value={formData.addressOfEvent}
        onChange={handleChange}
        placeholder="Address of Event"
      />
      <input
        type="text"
        name="cityState"
        value={formData.cityState}
        onChange={handleChange}
        placeholder="City/State"
      />
      <textarea
        name="descriptionOfEvent"
        value={formData.descriptionOfEvent}
        onChange={handleChange}
        placeholder="Brief Description of Event"
      ></textarea>
      <input
        type="number"
        name="numberOfGuests"
        value={formData.numberOfGuests}
        onChange={handleChange}
        placeholder="Number of Guests"
      />
      <select
        name="responsibleForPayment"
        value={formData.responsibleForPayment}
        onChange={handleChange}
      >
        <option value="Attendees">Attendees</option>
        <option value="Host">Host</option>
      </select>
      <select
        name="cateringType"
        value={formData.cateringType}
        onChange={handleChange}
      >
        <option value="Food Truck Catering">Food Truck Catering</option>
        <option value="Buffet Catering">Buffet Catering</option>
      </select>
      <select
        name="heardAboutUs"
        value={formData.heardAboutUs}
        onChange={handleChange}
      >
        <option value="Referral">Referral</option>
        <option value="Social Media">Social Media</option>
        <option value="Website">Website</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Booktruck;
