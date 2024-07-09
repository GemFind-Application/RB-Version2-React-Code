import React, { useState } from 'react';
import "./ScheduleViewingPopup.css"

const ScheduleViewingPopup = ({ onClose, locations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    location: '',
    availableDate: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <div className="popup-overlay schedule-viewing-popup">
      <div className="popup-content">
        <h2>Schedule Viewing</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <p>See This Item & More In Our Store</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleInputChange} required />
          <input type="tel" name="phoneNumber" placeholder="Your Phone Number" onChange={handleInputChange} required />
          <textarea name="message" placeholder="Your Message" onChange={handleInputChange} required></textarea>
          <select name="location" onChange={handleInputChange} required>
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <div className="availability">
            <label className='text-left'>When are you available?</label>
          </div>
          <div className="flex availability_container">
            <input type="date" name="availableDate" onChange={handleInputChange} required />
            <button type="submit" className="submit-button">REQUEST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleViewingPopup;