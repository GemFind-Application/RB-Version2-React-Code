import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleViewingPopup.css";
import { settingService } from '../Services';
const ExampleCustomTimeInput = ({ date, value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ border: "solid 1px pink" }}
  />
);
const RequestInfoPopup = ({ onClose, locations, settingId, isLabSetting, ringurl, shopurl ,diamondId,diamondtype,diamondurl}) => {
  let formDataValue= {
    name: '',
    email: '',
    phone: '',
    hint_message: '',
    avail_date: null,
    location: '',
    appnt_time:null,
    isLabSetting: isLabSetting,   
    shopurl: shopurl
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


  const [errors, setErrors] = useState({});
  const [ScheduleViewing, setScheduleViewing] = useState(false);
  const [scheduleViewingMessage,setScheduleViewingMessage]= useState('');
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (date) => {
    console.log(date)
    setFormData({ ...formData, avail_date: date ,appnt_time: date.toLocaleTimeString()});   
   // setFormData({ ...formData, appnt_time: date.toLocaleTimeString() });
    if (errors.preference) {
      setErrors({ ...errors, preference: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phoneNumber = 'Phone number is invalid';
    if (!formData.hint_message.trim()) newErrors.message = 'Message is required';
    if (!formData.avail_date) newErrors.preference = 'Please select a date';
    if (!formData.location) newErrors.location = 'Please select a location';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

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
        console.log(formData)
        let apiCall = (formData.settingid && formData.diamondId) ? "resultscheview_cr" : "resultscheview";
        const res = await settingService.scheduleViewing(formDataVal,sendRequest,apiCall); 
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
       }
       if(res.output.status===1){
        setScheduleViewingMessage(res.output.msg)
        setScheduleViewing(true);
       }
      //setScheduleViewing(true);
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
              className={errors.phone ? 'error' : ''}
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
                      selected={formData.avail_date}
                      onChange={handleDateChange}
                      placeholderText="00.00.0000 00:00"
                      className={errors.preference ? 'error' : ''}
                      dateFormat="MM/dd/yyyy h:mm aa"
                      minDate={new Date()}
                      showTimeSelect
                     
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
            <p> <p>{scheduleViewingMessage}</p></p>
          </div>
        )}
      </div>
    </div>
  );
};


export default RequestInfoPopup;