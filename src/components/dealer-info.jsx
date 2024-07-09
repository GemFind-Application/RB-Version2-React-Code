import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./dealer-info.css";

const DealerInfo = ({ className = "", onClose }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle submission
    console.log('Password submitted:', password);
    onClose();
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
          <div className="inputs1">
            <div className="drop4">
              <input
                className="your-gemfind-password"
                name="dealer-password"
                placeholder="Your Gemfind Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button4" onClick={handleSubmit}>
              <b className="submit dealer_info">Submit</b>
            </button>
          </div>
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