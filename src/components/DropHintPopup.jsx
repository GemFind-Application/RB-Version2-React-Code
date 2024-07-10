import React, { useState } from 'react';
import "./hint.css"

const DropHintPopup = ({ onClose,settingId,isLabSetting }) => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    recipientName: '',
    recipientEmail: '',
    reason: '',
    message: '',
    giftDeadline: ''
  });
  const errors = {};
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    // Form submission here
    console.log(formData);
    onClose();
  };
  const validateForm = (data) => {
    const errors = {};
    console.log(data)
    if (!data.yourName.trim()) {
        errors.yourName = 'Name is required';
    }
    if (!data.yourEmail.trim()) {
        errors.yourEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.yourEmail)) {
        errors.yourEmail = 'Email is invalid';
    }
    if (!data.recipientEmail.trim()) {
      errors.recipientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.recipientEmail)) {
      errors.recipientEmail = 'Email is invalid';
    }    
    if (!data.recipientName.trim()) {
      errors.recipientName = 'RecipientName is required';    
    }
    console.log(errors);   
    return errors;
};
  return (
    <div className="popup-overlay drop-hint-popup">
      <div className="popup-content">
        <h2>Drop A Hint</h2>
        <p>Because you deserve this.</p>
        <button className="close-button" onClick={onClose}>×</button>
        <hr className="hr" />
        <form onSubmit={handleSubmit}>
          <div className="input-group form-group">
            <input type="text" name="yourEmail" placeholder="Your Name" onChange={handleInputChange} required />
            {errors.yourName && <span className="error-message"> {errors.yourName}</span> }
            <input type="email" name="yourEmail" placeholder="Your Email" onChange={handleInputChange} required />
            {errors.yourEmail && <span className="error-message"> {errors.yourEmail}</span> }
          </div>
          <div className="input-group form-group">
            <input type="text" name="recipientName" placeholder="Hint Recipient Name" onChange={handleInputChange} required />
            {errors.recipientName && <span className="error-message"> {errors.recipientName}</span> }
            <input type="email" name="recipientEmail" placeholder="Hint Recipient Email" onChange={handleInputChange} required />
            {errors.recipientEmail && <span className="error-message"> {errors.recipientEmail}</span> }
          </div>
          <div className="form-group flex-col">
            <input type="text" name="reason" placeholder="Reason for this gift" onChange={handleInputChange} required />
            {errors.reason && <span className="error-message"> {errors.reason}</span> }
            <textarea name="message" placeholder="Your Message" onChange={handleInputChange} rows={6} required></textarea>
          </div>
          <div>
           
          </div>
          <div className="gift-deadline">
            <label>Gift deadline:</label>
            <div className="input-group form-group flex-50">
              <input className='gift-deadline' type="date" name="giftDeadline" onChange={handleInputChange} required />
              <button type="submit" className="submit-button">DROP HINT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropHintPopup;