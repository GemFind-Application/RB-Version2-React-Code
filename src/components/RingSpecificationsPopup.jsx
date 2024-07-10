import React from 'react';
import "./ringspecs.css"
import ShowCostInCard from './showCostInCard';
const RingSpecificationsPopup = ({ product, onClose }) => {
  return (
    <div className="popup-overlay ring-specs-popup">
      <div className="popup-content">
        <h2>Setting Details</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="setting-details">
          <div className="settings_info flex">
            <p>Setting Number: <b>{product.styleNumber}</b></p>
            <p>Price: <b><ShowCostInCard settingDetailForCost={product}></ShowCostInCard></b></p>
            <p>Metal Type: <b>{product.metalType}</b></p>
          </div>
          <hr className='hr' />

          {product.sideDiamondDetail && (
            <div className="side-diamond-details">
              <h3>Side Diamond Details</h3>
              <div className="diamonds_info flex">
                <p>Number of Diamonds: <b>{product.sideDiamondDetail.noOfDiamonds}</b></p>
                <p>Cut: <b>{product.sideDiamondDetail.diamondCut}</b></p>
                <p>Minimum Carat Weight (ct.tw.): <b>{product.sideDiamondDetail.minimumCaratWeight}</b></p>
              </div>
            </div>
          )}
           {product.sideDiamondDetail1 && (
             product.sideDiamondDetail1.map((item,index) => {
            return <div className="side-diamond-details" key={index}>
              <h3>Side Diamond Details</h3>
              <div className="diamonds_info flex">
                <p>Number of Diamonds {index+1}: <b>{item.noOfDiamonds}</b></p>
                <p>Cut {index+1}: <b>{item.diamondCut}</b></p>
                <p>Minimum Carat Weight (ct.tw.) {index+1}: <b>{item.minimumCaratWeight}</b></p>
              </div>
            </div>
             })
          )}
        </div>
        <hr className='hr' />
        <div className="can-be-set-with">
          <h3>Can be set with:</h3>
          {product.centerStoneFit && 
           product.centerStoneFit.split(",").map((item,index) => {
            return (    
            <>   
              <div className="diamonds_info flex" key={index}>
                <p>{item}  -  </p>
                <p>&nbsp; </p>
                <p> {product.centerStoneMinCarat} - {product.centerStoneMaxCarat} </p>              
              </div>
            </>)
          })}  
          {/* Diamond shape icons */}
        </div>
      </div>
    </div>
  );
};

export default RingSpecificationsPopup; 