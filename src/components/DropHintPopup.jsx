import React, { useState,useRef,useEffect } from 'react';
import "./hint.css"
import { settingService } from '../Services';
import ReCAPTCHA from 'react-google-recaptcha';
const DropHintPopup = ({ onClose, settingId, isLabSetting, ringurl, shopurl,diamondId,diamondtype,diamondurl,configAppData , setShowLoading}) => {
  let formDataValue= {yourName: '',
  name: '',
  email:'',
  recipient_name: '',
  recipient_email: '',
  gift_reason: '',
  hint_message: '',
  gift_deadline: '',
  islabsettings: isLabSetting, 
  shopurl: shopurl,
  
}
if(settingId&&settingId!==""){
    formDataValue.settingid = settingId;
    formDataValue.ringurl=ringurl;
}else{
    formDataValue.diamondid = diamondId;
   // formDataValue.diamondId=diamondId;
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
if(configAppData.site_key&&configAppData.site_key!==""){
  formDataValue['captcha-response']='',
  formDataValue['secret-key']=configAppData.secret_key
}
const recaptcha = useRef();
  const [formData, setFormData] = useState(formDataValue)
 

  const [errors, setErrors] = useState({});
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [hintDropped, setHintDropped] = useState(false);
  const [hintDroppedMessage, setHintDroppedMessage] = useState('');
  
 let today = new Date().toISOString().slice(0, 10)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Your email is invalid';
    }

    if (!formData.recipient_name.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }

    if (!formData.recipient_email.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.recipient_email)) {
      newErrors.recipientEmail = 'Recipient email is invalid';
    }

    if (!formData.gift_reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    if (!formData.hint_message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.gift_deadline) {
      newErrors.giftDeadline = 'Gift deadline is required';
    }
   if(configAppData.site_key&&configAppData.site_key!==""){
    if (!formData['captcha-response']) {
      newErrors.recaptcha = 'Please verify captcha';
    }  
   }
 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    // setIsLabGrown(false);
    async function fetchToken(){
      if(configAppData.site_key&&configAppData.site_key!==""){
        try {  
          //.current.getValue()
          const token = await recaptcha.current.executeAsync();
         //const token = await recaptcha.current.getValue();
          formData['captcha-response'] = token;
        
        } catch (err) {  
          console.error("Error fetching captcha:", err);
          setErrors("Failed to get captcha . Please try again later.");
        }
      }
     
    }
    fetchToken()
   }, [errorsFromRes]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   // const token = await captchaValue.current.executeAsync();
    if (validateForm()) {   
     // const captchaValue = recaptcha.current
     //setFormData({...formData,'captcha-response': captchaValue})
      let formDataVal = new FormData();
      Object.keys(formData).forEach(function (key) {
        formDataVal.append(key,formData[key]);
      });    
  
      try {
        let sendRequest = 'settings';
        if((!formData.settingid) && formData.diamondid && formData.diamondid!=""){
          sendRequest='diamondtools'
        }else{
          sendRequest = 'settings'
        }
        setShowLoading(true)
        let apiCall = (formData.settingid && formData.diamondId) ? "resultdrophint_cr" : "resultdrophint";

       const res = await settingService.dropAHint(formDataVal,sendRequest,apiCall);
       if(res.output.status===2){
        setShowLoading(false)
        setErrorsFromRes(res.output.msg);
        recaptcha.current.reset();
       }
       if(res.output.status===1){
        setShowLoading(false)
        setHintDroppedMessage(res.output.msg)
        setHintDropped(true);
        recaptcha.current.reset();
       }
       
      } catch (error) {
        setShowLoading(false)
        console.error('Error dropping hint:', error);
        // show err msgs to user
      }
    }
  };
//console.log(configAppData)
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
              {errorsFromRes!="" &&
              <div className='enter-your-password errorText'>{errorsFromRes}</div>
            
              }
              <div>
                <input name="ringurl" type="hidden" value={formData.ringurl} />
                <input name="shopurl" type="hidden" value={formData.shopurl} />
              </div>
              <div className="input-group form-group">
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
              <div className="input-group form-group">
                <input 
                  type="text" 
                  name="recipient_name" 
                  placeholder={errors.recipientName || "Hint Recipient Name"}
                  value={formData.recipient_name}
                  onChange={handleInputChange} 
                  className={errors.recipientName ? 'error' : ''}
                />
                <input 
                  type="email" 
                  name="recipient_email" 
                  placeholder={errors.recipientEmail || "Hint Recipient Email"}
                  value={formData.recipient_email}
                  onChange={handleInputChange} 
                  className={errors.recipientEmail ? 'error' : ''}
                />
              </div>
              <div className="form-group flex-col">
                <input 
                  type="text" 
                  name="gift_reason" 
                  placeholder={errors.reason || "Reason for this gift"}
                  value={formData.gift_reason}
                  onChange={handleInputChange} 
                  className={errors.reason ? 'error' : ''}
                />
                <textarea 
                  name="hint_message" 
                  placeholder={errors.hint_message || "Your Message"}
                  value={formData.hint_message}
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
                    name="gift_deadline" 
                    value={formData.gift_deadline}
                    onChange={handleInputChange} 
                    min={today}
                  />
                  <button type="submit" className="submit-button">DROP HINT</button>
                </div>
              </div>
              {configAppData.site_key && configAppData.site_key!=="" && 
              <div className="gift-deadline">
              <ReCAPTCHA  ref={recaptcha} sitekey={configAppData.site_key} size="invisible"/>
              </div>
              }
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>Hint Dropped!</h2>
            <p>{hintDroppedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropHintPopup;