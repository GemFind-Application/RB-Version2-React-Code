import React, { useState } from 'react';
import "./email-friend.css";
import { settingService } from '../Services';
const EmailFriendPopup = ({ onClose,settingId,isLabSetting,ringurl,shopurl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    friendsname: '',
    friendsemail: '',
    message: '',
    settingId:settingId,
    isLabSetting:isLabSetting,
    ringurl:ringurl,
    shopurl:shopurl
  });

  const [errors, setErrors] = useState({});
  const [SendEmail, setSendEmail] = useState(false);

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

    // Friends Name validation
    if (!formData.friendsname.trim()) {
      newErrors.friendsname = `Your Friend's Name is required`;
    }

    // Friends Email validation
    if (!formData.friendsemail.trim()) {
      newErrors.friendsemail = `Your Friend's Email is required`;
    } else if (!/\S+@\S+\.\S+/.test(formData.friendsemail)) {
      newErrors.friendsemail = 'Email is invalid';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Personal Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      let stringToPass = "";
      Object.keys(formData).forEach(function (key) {
        console.log(key)
        stringToPass += key+"="+(formData[key])+"&";
     });

      console.log(formData);
      const res = await settingService.friendsEmail(stringToPass); 
      setSendEmail(true);
      // onClose();
    }
  };

  return (
    <div className="popup-overlay EmailFriendPopup-overlay">
      <div className="popup-content">
      <button className="close-button" onClick={onClose}>×</button>
      {!SendEmail ? (
      <>
        <h2>E-Mail A Friend</h2>
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
              placeholder={errors.email || "Your E-mail"}
              value={formData.email}
              onChange={handleInputChange} 
              className={errors.email ? 'error' : ''}
            />
          </div>
          <div className="flex basic_info">
            <input 
              type="text" 
              name="friendsname" 
              placeholder={errors.friendsname || "Your Friends Name"}
              value={formData.friendsname}
              onChange={handleInputChange} 
              className={errors.friendsname ? 'error' : ''}
            />
            <input 
              type="email" 
              name="friendsemail" 
              placeholder={errors.friendsemail || "Your Friends E-mail"}
              value={formData.friendsemail}
              onChange={handleInputChange} 
              className={errors.friendsemail ? 'error' : ''}
            />
          </div>
          <div className="flex message_info">
            <textarea 
              name="message" 
              placeholder={errors.message || "Add a personal message here ..."}
              value={formData.message}
              onChange={handleInputChange} 
              className={errors.message ? 'error' : ''}
            ></textarea>
          </div>
          <div className="request_infocta">
            <div className="flex flex-cta">
              <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
              <button type="submit" className="submit-button">Send To Friend</button>
            </div>
          </div>
        </form>
        </>
        ) : (
          <div className="success-message">
            <h2>Email sent!</h2>
            <p>Blandit est volutpat sit sit purus sagittis risus in. Sed ut sagittis elementum at leo. In aliquet odio dui amet tincidunt suspendisse ut. Amet sed vitae pellentesque turpis egestas. Posuere molestie elementum neque quis posuere fusce diam augue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailFriendPopup;