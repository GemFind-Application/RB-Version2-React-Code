import React, { useState,useEffect ,useRef} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleViewingPopup.css";
import { settingService } from '../Services';
import SettingDetails1 from './setting-details1';
import ReCAPTCHA from 'react-google-recaptcha';
const ScheduleViewingPopup = ({ onClose, locations, settingId, isLabSetting, ringurl, shopurl ,diamondId,diamondtype,diamondurl,diamondDetail,SettingDetails,configAppData, setShowLoading}) => {
  let formDataValue= {
    name: '',
    email: '',
    phone: '',
    hint_message: '',
    avail_date: null,
    location: '',
    appnt_time:null,
    isLabSetting: isLabSetting,   
    shopurl: shopurl,
   
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


  const [errors, setErrors] = useState({});
  const [ScheduleViewing, setScheduleViewing] = useState(false);
  const [scheduleViewingMessage,setScheduleViewingMessage]= useState('');
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [timearray, setTimeArray] = useState([]);
  const [availableTimeArray, setAvailableTimeArray] = useState([]);
  const recaptcha = useRef();
  useEffect(() => {
    setAvailableTimeArray([])
    if(settingId&&settingId!==""){
      if( SettingDetails.addressList){
        const locationIdObject = SettingDetails.addressList.filter(item=>item.locationName===formData.location); 
        
        if(locationIdObject.length > 0){
          const timedetail = SettingDetails.timingList.filter(item=>item.locationID==locationIdObject[0].locationID);
          setTimeArray(timedetail)
          setFormData({...formData,avail_date:null,appnt_time:null})
        }
      } 
    }else{
      if( diamondDetail.retailerInfo.addressList){
        const locationIdObject = diamondDetail.retailerInfo.addressList.filter(item=>item.locationName===formData.location); 
         
        if(locationIdObject.length > 0){
          const timedetail = diamondDetail.retailerInfo.timingList.filter(item=>item.locationID==locationIdObject[0].locationID);
          setTimeArray(timedetail)
          setFormData({...formData,avail_date:null,appnt_time:null})
        }
      } 
    }
   
  }, [formData.location]);
  useEffect(() => {
    // setIsLabGrown(false);
    async function fetchToken(){
      if(configAppData.site_key&&configAppData.site_key!==""){
      try {      
        const token = await recaptcha.current.executeAsync();
        formData['captcha-response'] = token;      
      } catch (err) {  
        console.error("Error fetching captcha:", err);
        setErrors("Failed to get captcha . Please try again later.");
      }}
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
  const convertTime12to24 = (time12h) => {
   // console.log(time12h)
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes!==undefined ?minutes:'00'}`;
  }
  
  const handleDateChange = (date) => {
    const start = new Date(date);
    const end = new Date(date);
    const isStoreClose = ('storeClosed'+start.toLocaleString('en-US', { weekday: 'short' }))
    if(timearray[0][isStoreClose]=="" && timearray.length > 0){     
      const dayArray = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      let startDay =convertTime12to24(timearray[0][(dayArray[date.getDay()])+'Start']);
      let endDay = convertTime12to24(timearray[0][(dayArray[date.getDay()])+'End']);
      let startDayArray = (startDay.split(':'));
      let endDayArray = (endDay.split(':')); 
      start.setHours(startDayArray[0],startDayArray[1],0);
      end.setHours(endDayArray[0],endDayArray[1],0);
      let availableTime = [];
      while (start <= end) {
        availableTime.push((start.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'})));
        start.setMinutes(start.getMinutes() + 30);
      }
     setAvailableTimeArray(availableTime)
     setFormData({ ...formData, avail_date: date,appnt_time:availableTime[0]});   
   //  setFormData({...formData,appnt_time:availableTime[0]})
    }else{
      setFormData({ ...formData, avail_date: date}); 
    }
   
   // setFormData({ ...formData, avail_date: date});   
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
    if(configAppData.site_key&&configAppData.site_key!==""){
      if (!formData['captcha-response']) {
        newErrors.recaptcha = 'Please verify captcha';
      }  
    }
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
        setShowLoading(true);
        let apiCall = (formData.settingid && formData.diamondId) ? "resultscheview_cr" : "resultscheview";
        const res = await settingService.scheduleViewing(formDataVal,sendRequest,apiCall); 
      if(res.output.status===2){
        setErrorsFromRes(res.output.msg);
        recaptcha.current.reset();
        setShowLoading(false)
       }
       if(res.output.status===1){
        setScheduleViewingMessage(res.output.msg)
        setScheduleViewing(true);
        recaptcha.current.reset();
        setShowLoading(false)
       }
      //setScheduleViewing(true);
      // onClose();
    }else{
      
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
        <hr className="hr" />
        {errorsFromRes!="" &&            
          <div className='enter-your-password errorText'>{errorsFromRes}</div>            
        }
        <form onSubmit={handleSubmit}>
          <div className="rb_grid rb_col2 form-group basic_info">
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
            <div className="rb_grid rb_col2 form-group select_location">
                <div className="flex-col">
                  <div className="preference_val twoInOne">
                  <label for="location">&nbsp; {errors.location && <span className="error-message">{errors.location}</span>}</label>
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

                <div className="availability schduleb">
                <label>When are you available?</label>
                <div className="preferences">
                  <div className="preference_val">
                    <DatePicker 
                      selected={formData.avail_date}
                      onChange={handleDateChange}
                      placeholderText="00.00.0000"
                      className={errors.preference ? 'error' : ''}
                      dateFormat="MM/dd/yyyy"
                      minDate={new Date()}
                                         
                    />
                  </div>
                </div>

                {
               
                (availableTimeArray.length > 0) &&
                  <div className="preference_val">
                    <select
                      name="appnt_time"
                      value={formData.appnt_time}
                      onChange={(e)=>{handleInputChange(e)}}
                      className={errors.appnt_time ? 'error' : 'no-appearance select--outline'}
                      placeholder='Select Time'
                    >                      
                      {availableTimeArray.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  }
              
              </div>
              </div>
            <div className="rb_grid rb_col1 form-group flex flex-cta">
               <div className="flex message_info">
                  {configAppData.site_key && configAppData.site_key!=="" && 
                    <div className="gift-deadline">
                    <ReCAPTCHA  ref={recaptcha} size="invisible" sitekey={configAppData.site_key} />
                    </div>
                  }
              </div>
              <button type="submit" className="button52">Request</button>
            </div>
          </div>
        </form>
        </>
        ) : (
          <div className="success-message">
            <h2>Request Sent!</h2>
            <p>&nbsp;</p>
            <p>{scheduleViewingMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default ScheduleViewingPopup;