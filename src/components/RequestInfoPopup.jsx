import React, { useState } from 'react';
import "./requestinfo.css";
import { settingService } from '../Services';
const RequestInfoPopup = ({ onClose ,settingId, isLabSetting ,ringurl,shopurl,diamondId,diamondtype,diamondurl}) => {
  let formDataValue= {
    name: '',
    email: '',
    phone: '',
    hint_message: '',
    contact_pref: '',   
    isLabSetting:isLabSetting,   
    shopurl:shopurl}
    if(settingId&&settingId!==""){
      formDataValue.settingid = settingId;
      formDataValue.ringurl=ringurl;
    }else{
      formDataValue.diamondid = diamondId;
      formDataValue.diamondtype = diamondtype;
      formDataValue.diamondurl = diamondurl;
  }
  if(settingId&&settingId!==""&&diamondId&&diamondId!=""){
    formDataValue.completering='completering';
  //  formDataValue.diamondid = diamondId;
    formDataValue.diamondId=diamondId;
   // formDataValue.diamondtype = diamondtype;
    formDataValue.diamondurl = diamondurl;
  }
  const [formData, setFormData] = useState(formDataValue);
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [requestInfoMessage, setRequestInfoMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [requestSend, setRequestSend] = useState(false)

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
    if (!formData.phone.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }

    // Message validation
    if (!formData.hint_message.trim()) {
      newErrors.message = 'Message is required';
    }

    // Preference validation
    if (!formData.contact_pref) {
      newErrors.preference = 'Please select a contact preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (validateForm()) {
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
     // let apiCall = (formData.settingid && formData.diamondId) ? "resultreqinfo_cr" : "resultreqinfo";
      const res = await settingService.requestMoreInfo(formDataVal);
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
       }
       if(res.output.status===1){
        setRequestInfoMessage(res.output.msg)
        setRequestSend(true);
       }
      //setRequestSend(true); 
      // onClose();
    }
  };

  return (
    <div className="popup-overlay requestInfopopup-overlay">
      <div className="popup-content">
       <button className="close-button" onClick={onClose}>×</button>
        
        {!requestSend ? (
        <>
        <h2>Request More Information</h2>
        <p>Our specialists will contact you.</p>
        {errorsFromRes!="" &&              
          <p className='error'>{errorsFromRes}</p>              
        }
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
              name="phone" 
              placeholder={errors.phoneNumber || "Your Phone Number"}
              value={formData.phone}
              onChange={handleInputChange} 
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          <div className="flex message_info">
            <textarea 
              name="hint_message" 
              placeholder={errors.message || "Your Message"}
              value={formData.hint_message}
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
                      name="contact_pref" 
                      checked={formData.contact_pref === "By Phone"}
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="preference-phone">By Phone</label>
                  </div>
                  <div className="preference_val">
                    <input 
                      id="preference-email" 
                      value="By Email" 
                      type="radio" 
                      name="contact_pref" 
                      checked={formData.contact_pref === "By Email"}
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
        </>
        ) : (
          <div className="success-message">
            <h2>Request Sent!!</h2>
            <p>{requestInfoMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestInfoPopup;  