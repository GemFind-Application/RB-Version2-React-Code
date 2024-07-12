import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleViewingPopup.css";
import { settingService } from '../Services';

const RequestInfoPopup = ({ onClose, locations, settingId, isLabSetting, ringurl, shopurl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    preference: null,
    location: '',
    settingId: settingId,
    isLabSetting: isLabSetting,
    ringurl: ringurl,
    shopurl: shopurl
  });

  const [errors, setErrors] = useState({});
  const [ScheduleViewing, setScheduleViewing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, preference: date });
    if (errors.preference) {
      setErrors({ ...errors, preference: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = 'Phone number is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.preference) newErrors.preference = 'Please select a date';
    if (!formData.location) newErrors.location = 'Please select a location';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let stringToPass = "";
      Object.keys(formData).forEach(function (key) {
        stringToPass += key + "=" + (formData[key] instanceof Date ? formData[key].toISOString() : formData[key]) + "&";
      });

      console.log(formData);
      const res = await settingService.scheduleViewing(stringToPass); 
      setScheduleViewing(true);
      // onClose();
    }
  };

  return (
    <div className="popup-overlay requestInfopopup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        {!ScheduleViewing ? (
        <>
        <h2>Schedule Viewing</h2> 
        <p>See This Item & More In Our Store.</p>
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
            <div className="select_location">
                <div className="flex-col">
                  <div className="preference_val">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={errors.location ? 'error' : 'no-appearance select--outline'}
                      placeholder='Select Location'
                    >
                      <option value="">Select a location</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            <div className="flex flex-cta">
              <div className="availability">
                <label>When are you available?</label>
                <div className="preferences">
                  <div className="preference_val">
                    <DatePicker 
                      selected={formData.preference}
                      onChange={handleDateChange}
                      placeholderText="00.00.0000"
                      className={errors.preference ? 'error' : ''}
                      dateFormat="dd.MM.yyyy"
                      minDate={new Date()}
                    />
                  </div>
                </div>
                {errors.preference && <span className="error-message">{errors.preference}</span>}
              </div>
              
              <button type="submit" className="submit-button">Request</button>
            </div>
          </div>
        </form>
        </>
        ) : (
          <div className="success-message">
            <h2>Scheduled View!</h2>
            <p>Blandit est volutpat sit sit purus sagittis risus in. Sed ut sagittis elementum at leo. In aliquet odio dui amet tincidunt suspendisse ut. Amet sed vitae pellentesque turpis egestas. Posuere molestie elementum neque quis posuere fusce diam augue.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default RequestInfoPopup;