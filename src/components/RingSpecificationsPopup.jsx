import React from 'react';
import "./ringspecs.css"
import ShowCostInCard from './showCostInCard';
const RingSpecificationsPopup = ({ product, onClose,configAppData }) => {
  return (
    <div className="popup-overlay ring-specs-popup">
      <div className="popup-content">
        <h2>Setting Details</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="setting-details">
          <div className="settings_info flex">
            <p>Setting Number: <b>{product.styleNumber? product.styleNumber:''}</b></p>
            <p>Price: <b><ShowCostInCard settingDetailForCost={product} configAppData={configAppData}></ShowCostInCard></b></p>
            <p>Metal Type: <b>{product.metalType}</b></p>
          </div>
          <hr className='hr' />

          {product.sideDiamondDetail && (
            <div className="side-diamond-details">
              <h3>Side Diamond Details</h3>
              <div className="diamonds_info flex">
                <p>Number of Diamonds: <b>{product.sideDiamondDetail.noOfDiamonds ? product.sideDiamondDetail.noOfDiamonds:'-'}</b></p>
                <p>Cut: <b>{product.sideDiamondDetail.diamondCut ? product.sideDiamondDetail.diamondCut:'-'}</b></p>
                <p>Minimum Carat Weight (ct.tw.): <b>{product.sideDiamondDetail.minimumCaratWeight ? product.sideDiamondDetail.minimumCaratWeight:'-'}</b></p>
              </div>
            </div>
          )}
           {product.sideDiamondDetail1 && (
             product.sideDiamondDetail1.map((item,index) => {
            return <div className="side-diamond-details" key={index}>
              {index===0 && <h3>Side Diamond Details</h3>}
              <div className="diamonds_info flex">
                <p>Number of Diamonds {index+1}: <b>{item.noOfDiamonds ? item.noOfDiamonds:'-'}</b></p>
                <p>Cut {index+1}: <b>{item.diamondCut?item.diamondCut:'-'}</b></p>
                <p>Minimum Carat Weight (ct.tw.) {index+1}: <b>{item.minimumCaratWeight?item.minimumCaratWeight:'-'}</b></p>
                <p>Diamond Quality {index+1}: <b>{item.diamondQuality?item.diamondQuality:'-'}</b></p>
                
              </div>
            </div>
             })
          )}
        </div>
        <hr className='hr' />
        <div className="can-be-set-with">
          <h3>Can be set with:</h3>
          <div className="can-be-set-with">
            {product.centerStoneFit && 
            product.centerStoneFit.split(",").map((item,index) => {
              return (    
              <>   
                <div className="diamonds_info flex canbesetwithspace" key={'canbesetwith_'+index}>
                  <p>{item}  -  </p>
                  <p>&nbsp; </p>
                  <p> {product.centerStoneMinCarat?product.centerStoneMinCarat:'-'} - {product.centerStoneMaxCarat?product.centerStoneMaxCarat:'-'} </p>              
                </div>
              </>)
            })}  
          </div>
          {/* Diamond shape icons */}
        </div>
      </div>
    </div>
  );
};

export default RingSpecificationsPopup; 