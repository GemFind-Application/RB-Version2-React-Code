import React, { useState } from 'react';
import "./requestinfo.css";
import { settingService } from '../Services';
const RequestInfoPopup = ({ onClose ,settingId, isLabSetting ,ringUrl,shopurl}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    preference: '',
    settingId:settingId,
    isLabSetting:isLabSetting,
    ringurl:ringUrl,
    shopurl:shopurl
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // Preference validation
    if (!formData.preference) {
      newErrors.preference = 'Please select a contact preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(JSON.stringify(formData));
      let stringToPass = "";
      Object.keys(formData).forEach(function (key) {
       console.log(key)
       stringToPass += key+"="+(formData[key])+"&";
    });
      console.log(stringToPass)
      const res = await settingService.requestMoreInfo(stringToPass); 
      onClose();
    }
  };

  return (
    <div className="popup-overlay requestInfopopup-overlay">
      <div className="popup-content">
        <h2>Request More Information</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <p>Our specialists will contact you.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex basic_info">
            <input 
              type="text" 
              name="name" 
              placeholder={errors.name || "Your Name"}
              value={formData.name}
              onChange={handleInputChange} 
              className={errors.name ? 'error' : ''}
            />
            <input 
              type="email" 
              name="email" 
              placeholder={errors.email || "Your Email"}
              value={formData.email}
              onChange={handleInputChange} 
              className={errors.email ? 'error' : ''}
            />
          </div>
          <div className="flex phone_info">
            <input 
              type="tel" 
              name="phoneNumber" 
              placeholder={errors.phoneNumber || "Your Phone Number"}
              value={formData.phoneNumber}
              onChange={handleInputChange} 
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          <div className="flex message_info">
            <textarea 
              name="message" 
              placeholder={errors.message || "Your Message"}
              value={formData.message}
              onChange={handleInputChange} 
              className={errors.message ? 'error' : ''}
            ></textarea>
          </div>
          <div className="request_infocta">
            <div className="flex flex-cta">
              <div className="availability">
                <label>Contact Preference</label>
                <div className="preferences">
                  <div className="preference_val">
                    <input 
                      id="preference-phone" 
                      value="By Phone" 
                      type="radio" 
                      name="preference" 
                      checked={formData.preference === "By Phone"}
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="preference-phone">By Phone</label>
                  </div>
                  <div className="preference_val">
                    <input 
                      id="preference-email" 
                      value="By Email" 
                      type="radio" 
                      name="preference" 
                      checked={formData.preference === "By Email"}
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="preference-email">By Email</label>
                  </div>
                </div>
                {errors.preference && <span className="error-message">{errors.preference}</span>}
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