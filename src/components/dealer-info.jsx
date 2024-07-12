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
      {(!isPasswordAuthenticated) ? (
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
       ) : (
        <>
        <section className="content3">
          <div className="top3">
          <div className="h11 ">
            <h3 className="dealer-info1">Vendor Info</h3>            
          </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
                 Dealer Name:
              </div>             
              <div className="enter-your-password">
                ss{dealerInfo.retailerName}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Company:
              </div>             
              <div className="enter-your-password">
                ss{dealerInfo.retailerCompany}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer City/State:
              </div>             
              <div className="enter-your-password">
                ss{dealerInfo.retailerCity}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Contact No.:
              </div>             
              <div className="enter-your-password">
                ss{dealerInfo.retailerContactNo}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Email:
              </div>             
              <div className="enter-your-password">
                ss{dealerInfo.retailerEmail}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Lot number of the item:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.retailerLotNo}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Stock number of the item:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.retailerStockNo}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Wholesale Price:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.wholesalePrice}
              </div>
            </div>

            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Third Party:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.thirdParty}
              </div>
            </div>            
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Diamond Id:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.diamondID}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Seller Name:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.sellerName}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Seller Address:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.sellerAddress}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Fax:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.retailerFax}
              </div>
            </div>
            <div className="h11 dealerinfores" >
              <div className="enter-your-password">
              Dealer Address:
              </div>             
              <div className="enter-your-password">
                {dealerInfo.retailerAddress}
              </div>
            </div>
          </div>
        </section>
      </>)}    
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