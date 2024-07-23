import React, { useState } from 'react';
import "./hint.css"
import { settingService } from '../Services';

const DropHintPopup = ({ onClose, settingId, isLabSetting, ringurl, shopurl,diamondId,diamondtype,diamondurl }) => {
  let formDataValue= {yourName: '',
  yourEmail: '',
  recipientName: '',
  recipientEmail: '',
  reason: '',
  message: '',
  giftDeadline: '',
  isLabSetting: isLabSetting,
 
  shopurl: shopurl}
  if(settingId&&settingId!==""){
    formDataValue.settingId = settingId;
    formDataValue.ringurl=ringurl;
  }else{
    formDataValue.diamondid = diamondId;
    formDataValue.diamondtype = diamondtype;
    formDataValue.diamondurl = diamondurl;
  }

    const [formData, setFormData] = useState(formDataValue)
 

  const [errors, setErrors] = useState({});
  const [hintDropped, setHintDropped] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let stringToPass = "";
      Object.keys(formData).forEach(function (key) {
        stringToPass += key + "=" + encodeURIComponent(formData[key]) + "&";
      });
      stringToPass = stringToPass.slice(0, -1); // Removed the last '&'
      console.log(stringToPass)
      try {
       //const res = await settingService.friendsEmail(stringToPass);
        setHintDropped(true);
      } catch (error) {
        console.error('Error dropping hint:', error);
        // show err msgs to user
      }
    }
  };

  return (
    <div className="popup-overlay drop-hint-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        {!hintDropped ? (
          <>
            <h2>Drop A Hint</h2>
            <p>Because you deserve this.</p>
            <hr className="hr" />
            <form onSubmit={handleSubmit}>
              <div>
                <input name="ringurl" type="hidden" value={formData.ringurl} />
                <input name="shopurl" type="hidden" value={formData.shopurl} />
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
          </>
        ) : (
          <div className="success-message">
            <h2>Hint Dropped!</h2>
            <p>Blandit est volutpat sit sit purus sagittis risus in. Sed ut sagittis elementum at leo. In aliquet odio dui amet tincidunt suspendisse ut. Amet sed vitae pellentesque turpis egestas. Posuere molestie elementum neque quis posuere fusce diam augue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropHintPopup;