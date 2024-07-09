import React, { useState } from 'react';
import "./requestinfo.css";

const RequestInfoPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    preference: ''
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
    <div className="popup-overlay requestInfopopup-overlay">
      <div className="popup-content">
        <h2>Request More Information</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <p>Our specialists will contact you.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex basic_info">
            <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Your Email" onChange={handleInputChange} required />
          </div>
          <div className="flex phone_info">
            <input type="tel" name="phoneNumber" placeholder="Your Phone Number" onChange={handleInputChange} required />
          </div>
          <div className="flex message_info">
            <textarea name="message" placeholder="Your Message" onChange={handleInputChange} required></textarea>
          </div>
          <div className="request_infocta">
            <div className="flex flex-cta">
              <div className="availability">
                <label>Contact Preference</label>
                <div className="preferences">
                  <div className="preference_val">
                    <input id="preference-phone" value="By Phone" type="radio" name="preference" onChange={handleInputChange} required />
                    <label htmlFor="preference-phone">By Phone</label>
                  </div>
                  <div className="preference_val">
                    <input id="preference-email" value="By Email" type="radio" name="preference" onChange={handleInputChange} required />
                    <label htmlFor="preference-email">By Email</label></div>
                </div>
              </div>
              <button type="submit" className="submit-button">Request</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestInfoPopup;