import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./dealer-info.css";

const DealerInfo = ({ className = "", onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleSubmit = () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Invalid password. It should be at least 6 characters long.');
      return;
    }

    // If password is valid, clear error and show details
    setError('');
    setIsSuccess(true);

  };

  return (
    <div className={`dealer-info ${className}`}>
      <section className="content3">
        <div className="top3">
          <div className="h11">
            <h3 className="dealer-info1">Dealer Info</h3>
            <div className="enter-your-password">
              Enter your password to continue
            </div>
          </div>
          {!isSuccess ? (
            <div className="inputs1">
              <div className="drop4">
                <input
                  className={`your-gemfind-password ${error ? 'error' : ''}`}
                  name="dealer-password"
                  placeholder="Your Gemfind Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              <button className="button4" onClick={handleSubmit}>
                <b className="submit dealer_info">Submit</b>
              </button>
            </div>
          ) : (
            <div className="success-message">
              <h2>Dealer Information!</h2>
              <p>Show dealer info here....</p>
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
};

export default DealerInfo;