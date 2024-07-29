import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./dealer-info.css";
import { settingService } from '../Services';

const DealerInfo = ({ className = "", onClose, settingId, isLabSetting, shopurl, diamondId, diamondtype }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorsFromRes, setErrorsFromRes] = useState('');
  const [dealerInfoAuthMessage, setDealerInfoAuthMessage] = useState('');
  const [dealerInfo, setDealerInfo] = useState({});

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 4 characters long');
      return;
    }

    setError('');
    try {
      let formData = {};
      let page = "";

      if (diamondId !== "" && diamondId !== undefined) {
        formData = {
          password: password,
          diamondId: diamondId,
          diamondtype: diamondtype,
          shopurl: 'gemfind-app-store.myshopify.com'
        }
        page = "diamond";
      } else {
        formData = {
          password: password,
          settingId: settingId,
          isLabSetting: isLabSetting,
          shopurl: shopurl
        }
        page = "setting";
      }

      let formDataVal = new FormData();
      Object.keys(formData).forEach(function (key) {
        formDataVal.append(key, formData[key]);
      });

      const res = await settingService.validateDealerPassword(formDataVal, page);

      if (res.output.status === 2) {
        setErrorsFromRes(res.output.msg);
      }
      if (res.output.status === 1) {
        setDealerInfoAuthMessage(res.output.msg);
        setDealerInfo(res.output.dealerInfo);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error Dealer Info:', error);
      setErrorsFromRes('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`dealer-info ${className}`}>
      <section className="content3">
        <div className="top3">
          {errorsFromRes !== "" &&
            <div className='enter-your-password errorText'>{errorsFromRes}</div>
          }
          {!isSuccess ? (
            <>
              <div className="h11">
                <h3 className="dealer-info1">Dealer Info</h3>
                <div className="enter-your-password">
                  Enter your password to continue
                </div>
              </div>
              <div className="inputs1">
                <div className="drop4">
                  <input
                    className={`your-gemfind-password ${error ? 'error' : ''}`}
                    name="dealer-password"
                    placeholder={error || "Your Gemfind Password"}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <button className="button4" onClick={handleSubmit}>
                  <b className="submit dealer_info">Submit</b>
                </button>
              </div>
            </>
          ) : (
            <div className="success-message">
              <h2>Vendor Info</h2>
              <section className="content3">
                <div className="top3">
                  {Object.entries(dealerInfo).map(([key, value]) => (
                    <div key={key} className="h11 dealerinfores">
                      <div className="enter-your-password">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </div>
                      <div className="enter-your-password">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
      <img
        className="close-icon2"
        loading="lazy"
        alt=""
        src="/close.svg"
        onClick={onClose}
      />
    </div>
  );
};

DealerInfo.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  settingId: PropTypes.string,
  isLabSetting: PropTypes.bool,
  shopurl: PropTypes.string,
  diamondId: PropTypes.string,
  diamondtype: PropTypes.string
};

export default DealerInfo;