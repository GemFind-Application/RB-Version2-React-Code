import React, { useState } from 'react';
import "./hint.css"

const DropHintPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    recipientName: '',
    recipientEmail: '',
    reason: '',
    message: '',
    giftDeadline: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission here
    console.log(formData);
    onClose();
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
            <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Your Email" onChange={handleInputChange} required />
          </div>
          <div className="input-group form-group">
            <input type="text" name="recipientName" placeholder="Hint Recipient Name" onChange={handleInputChange} required />
            <input type="email" name="recipientEmail" placeholder="Hint Recipient Email" onChange={handleInputChange} required />
          </div>
          <div className="form-group flex-col">
            <input type="text" name="reason" placeholder="Reason for this gift" onChange={handleInputChange} required />
            <textarea name="message" placeholder="Your Message" onChange={handleInputChange} rows={6} required></textarea>
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