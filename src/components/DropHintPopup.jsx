import React, { useState } from 'react';
import "./hint.css"
import { settingService } from '../Services';
const DropHintPopup = ({ onClose, settingId, isLabSetting ,ringurl,shopurl}) => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    recipientName: '',
    recipientEmail: '',
    reason: '',
    message: '',
    giftDeadline: '',
    settingId:settingId,
    isLabSetting:isLabSetting,
    ringurl:ringurl,
    shopurl:shopurl
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.yourName.trim()) {
      newErrors.yourName = 'Your name is required';
    }

    if (!formData.yourEmail.trim()) {
      newErrors.yourEmail = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.yourEmail)) {
      newErrors.yourEmail = 'Your email is invalid';
    }

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }

    if (!formData.recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.recipientEmail)) {
      newErrors.recipientEmail = 'Recipient email is invalid';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.giftDeadline) {
      newErrors.giftDeadline = 'Gift deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission here
      console.log(JSON.stringify(formData));
      let stringToPass = "";
      Object.keys(formData).forEach(function (key) {
       console.log(key)
       stringToPass += key+"="+(formData[key])+"&";
    });
      console.log(stringToPass)
      const res = await settingService.dropAHint(stringToPass); 
      
      //onClose();
    }
  };

  return (
    <div className="popup-overlay drop-hint-popup">
      <div className="popup-content">
        <h2>Drop A Hint</h2>
        <p>Because you deserve this.</p>
        <button className="close-button" onClick={onClose}>×</button>
        <hr className="hr" />
        <form onSubmit={handleSubmit}>
          <div>
          <input name="ringurl" type="hidden" value=""/>
          <input name="shopurl" type="hidden" value=""/>
          </div>
          <div className="input-group form-group">
            <input 
              type="text" 
              name="yourName" 
              placeholder={errors.yourName || "Your Name"}
              value={formData.yourName}
              onChange={handleInputChange} 
              className={errors.yourName ? 'error' : ''}
            />
            <input 
              type="email" 
              name="yourEmail" 
              placeholder={errors.yourEmail || "Your Email"}
              value={formData.yourEmail}
              onChange={handleInputChange} 
              className={errors.yourEmail ? 'error' : ''}
            />
          </div>
          <div className="input-group form-group">
            <input 
              type="text" 
              name="recipientName" 
              placeholder={errors.recipientName || "Hint Recipient Name"}
              value={formData.recipientName}
              onChange={handleInputChange} 
              className={errors.recipientName ? 'error' : ''}
            />
            <input 
              type="email" 
              name="recipientEmail" 
              placeholder={errors.recipientEmail || "Hint Recipient Email"}
              value={formData.recipientEmail}
              onChange={handleInputChange} 
              className={errors.recipientEmail ? 'error' : ''}
            />
          </div>
          <div className="form-group flex-col">
            <input 
              type="text" 
              name="reason" 
              placeholder={errors.reason || "Reason for this gift"}
              value={formData.reason}
              onChange={handleInputChange} 
              className={errors.reason ? 'error' : ''}
            />
            <textarea 
              name="message" 
              placeholder={errors.message || "Your Message"}
              value={formData.message}
              onChange={handleInputChange} 
              rows={6} 
              className={errors.message ? 'error' : ''}
            ></textarea>
          </div>          
          <div className="gift-deadline">
            <label>Gift deadline:</label> {errors.giftDeadline && <span className="error-message">{errors.giftDeadline}</span>}
            <div className="input-group form-group flex-50">
              <input 
                className={`gift-deadline ${errors.giftDeadline ? 'error' : ''}`}
                type="date" 
                name="giftDeadline" 
                value={formData.giftDeadline}
                onChange={handleInputChange} 
              />
              <button type="submit" className="submit-button">DROP HINT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropHintPopup;