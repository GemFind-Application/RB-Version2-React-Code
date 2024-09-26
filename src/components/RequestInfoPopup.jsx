import React, { useState,useEffect ,useRef} from 'react';
import "./requestinfo.css";
import { settingService } from '../Services';
import ReCAPTCHA from 'react-google-recaptcha';
const RequestInfoPopup = ({ onClose ,settingId, isLabSetting ,ringurl,shopurl,diamondId,diamondtype,diamondurl,configAppData, setShowLoading}) => {
  let formDataValue= {
    name: '',
    email: '',
    phone: '',
    hint_message: '',
    contact_pref: '',   
    isLabSetting:isLabSetting,   
    shopurl:shopurl,
  }
  if(configAppData.site_key&&configAppData.site_key!==""){
    formDataValue['captcha-response']='',
    formDataValue['secret-key']=configAppData.secret_key
  }
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
  const [requestSend, setRequestSend] = useState(false);
  const recaptcha = useRef();
  useEffect(() => {
    // setIsLabGrown(false);
    async function fetchToken(){
      try {      
        const token = await recaptcha.current.executeAsync();
        formData['captcha-response'] = token;      
      } catch (err) {  
        console.error("Error fetching captcha:", err);
        setErrors("Failed to get captcha . Please try again later.");
      }
    }
    fetchToken()
   }, [errorsFromRes]);
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
    if(configAppData.site_key&&configAppData.site_key!==""){
      if (!formData['captcha-response']) {
        newErrors.recaptcha = 'Please verify captcha';
      }  
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
      setShowLoading(true)
     let apiCall = (formData.settingid && formData.diamondId) ? "resultreqinfo_cr" : "resultreqinfo";
      const res = await settingService.requestMoreInfo(formDataVal,sendRequest,apiCall);
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
        if(configAppData.site_key&&configAppData.site_key!==""){
          recaptcha.current.reset();
          }
       }
       if(res.output.status===1){
        setRequestInfoMessage(res.output.msg)
        setRequestSend(true);
        if(configAppData.site_key&&configAppData.site_key!==""){
          recaptcha.current.reset();
          }
        
       }
       setShowLoading(false)
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
        <hr className="hr" />
        {errorsFromRes!="" &&              
          <div className='enter-your-password errorText'>{errorsFromRes}</div>     
        }
        <form onSubmit={handleSubmit}>
        <div className="rb_grid rb_col2 form-group">
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
          <div className="rb_grid rb_col1 form-group phone_info">
            <input 
              type="tel" 
              name="phone" 
              placeholder={errors.phoneNumber || "Your Phone Number"}
              value={formData.phone}
              onChange={handleInputChange} 
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          <div className="rb_grid rb_col1 form-group message_info">
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
                  <div>
                  {configAppData.site_key && configAppData.site_key!=="" && 
                    <div className="gift-deadline">
                    <ReCAPTCHA  ref={recaptcha} size="invisible" sitekey={configAppData.site_key} />
                    </div>
                  }
              </div>
                </div>
                {errors.preference && <span className="error-message">{errors.preference}</span>}
              </div>
              <button type="submit" className="button52">Request</button>
            </div>
          </div>
        </form>
        </>
        ) : (
          <div className="success-message">
            <h2>Request Sent!!</h2>
            <p>&nbsp;</p>
            <p>{requestInfoMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestInfoPopup;  