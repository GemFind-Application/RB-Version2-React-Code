import React, { useState } from 'react';
import "./email-friend.css";
import { settingService } from '../Services';
const EmailFriendPopup = ({ onClose,settingId,isLabSetting,ringurl,shopurl,diamondId,diamondtype,diamondurl }) => {
  let formDataValue= {yourName: '',
    name: '',
    email: '',
    friend_name: '',
    friend_email: '',
    message: '',
    isLabSetting: isLabSetting,   
    shopurl: shopurl}
    if(settingId && settingId!==""){
      formDataValue.settingid = settingId;
      formDataValue.ringurl=ringurl;
    }else{
      formDataValue.diamondid = diamondId;
      formDataValue.diamondtype = diamondtype;
      formDataValue.diamondurl = diamondurl;
    }
    if(settingId&&settingId!==""&&diamondId&&diamondId!=""){
      formDataValue.diamondId=diamondId;
      formDataValue.diamondurl = diamondurl;
    }
  const [formData, setFormData] = useState(formDataValue);  
  const [errors, setErrors] = useState({});
  const [SendEmail, setSendEmail] = useState(false);
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [sendFriendMessage, setSendFriendMessage] = useState('');
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
    if (!formData.friend_name.trim()) {
      newErrors.friendsname = `Your Friend's Name is required`;
    }

    // Friends Email validation
    if (!formData.friend_email.trim()) {
      newErrors.friendsemail = `Your Friend's Email is required`;
    } else if (!/\S+@\S+\.\S+/.test(formData.friend_email)) {
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
    //console.log(formData)
    if (validateForm()) {
      // Handle form submission here
      let formDataVal = new FormData();
      Object.keys(formData).forEach(function (key) {
        formDataVal.append(key,formData[key]);
      });
      let sendRequest = 'settings';
        if((!formData.settingid) && formData.diamondid && formData.diamondid!=""){
          sendRequest='diamondtools'
        }else{
          sendRequest = 'settings'
        }
        let apiCall = (formData.settingid && formData.diamondId) ? "resultemailfriend_cr" : "resultemailfriend";
        const res = await settingService.friendsEmail(formDataVal,sendRequest,apiCall); 
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
       }
       if(res.output.status===1){
        setSendFriendMessage(res.output.msg)
        setSendEmail(true);
       }
      
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
        {errorsFromRes!="" &&
          <div>
            <p className='error'>{errorsFromRes}</p>
          </div>
          }
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
              name="friend_name" 
              placeholder={errors.friendsname || "Your Friends Name"}
              value={formData.friend_name}
              onChange={handleInputChange} 
              className={errors.friendsname ? 'error' : ''}
            />
            <input 
              type="email" 
              name="friend_email" 
              placeholder={errors.friend_email || "Your Friends E-mail"}
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
            <p>{sendFriendMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailFriendPopup;