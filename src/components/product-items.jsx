import React, { useState, useRef ,useEffect} from "react";
import PropTypes from "prop-types";
import "./product-items.css";
import { Link } from "react-router-dom";
import ShowCostInCard from "./showCostInCard";
import { utils } from "../Helpers";

import VideoPopup from "./VideoPopup";
import { settingService } from "../Services";
const SkeletonProductItem = () => (
  <div className="skeleton">
    <div className="ring-items__header skeleton-header">
      <div className="skeleton-title"></div>
      <div className="ring-items__wrapper">
        <div className="skeleton-icon"></div>
        <div className="skeleton-icon"></div>
      </div>
    </div>
    <div className="list-items-down-content-wrapper">
      <div className="list-items-down-content">
        <div className="skeleton-image"></div>
        <div className="product-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
        <div className="btn__outer">
          <div className="skeleton-link"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductItems = ({ product, className = "", isLoading = false, onClick ,showVirtualTryOnIframe,filterMetalType,configAppData}) => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const videoRef = useRef(null);
  const [viewUrlSetting, setViewUrlSetting] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const settingUrl = `${import.meta.env.VITE_SETTINGS_DETAIL_PAGE}`;
  if (isLoading) {
    return <SkeletonProductItem />;
  }
  const handleVideoIconClick = async(settingId) => {
    setShowVideoPopup(false)
    try {     
      const res = await settingService.getSettingVideoUrl(settingId);  
      if(res)     {
        console.log(res);
        if(res.showVideo !== false){
          setVideoUrl(res.videoURL);         
          setShowVideoPopup(true);          
        }else{
          setShowVideoPopup(false);
        }        
      }   
    }
    catch (error) {
      console.error("Error fetching video url:", error);
      setError("Failed to fetch video data. Please try again later.");
    }  
  };
 
  useEffect(() => {    
    if(product.metalTypes.length > 0){
      let metalTypeForUrl = filterMetalType.length >0? filterMetalType[0] : product.metalTypes[0].metalType;    
      let url = utils.getUrl(metalTypeForUrl,product.name,product.priceSettingId)
      setViewUrlSetting(url)
    }else{
      console.log(product)
     let metalTypeForUrl ='n-a';    
      let url = utils.getUrl(metalTypeForUrl,product.name,product.priceSettingId)
      setViewUrlSetting(url)
    }
  
  }, []);

  const handleImageHover = () => {
    if (product.videoURL && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleImageLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`ring__items product-items ${className}`} >
      <div className="ring-items__header">
        <h2 className="product-title">{utils.truncateString(product.name)}</h2>
        <div className="ring-items__wrapper">
          <div 
            className="ring-items__item-video" 
            productid={product.settingId}
            onClick={()=>handleVideoIconClick(product.settingId)}
          >
            {(product.videoURL&&product.videoURL!="") && <img className="video-icon3" alt="" src="/video.svg" />}
          </div>
          <div className="ring-items__item-wishlist" productid={product.settingId}>
            {/*<img className="heart-icon" alt="" src="/heart1.svg" />*/}
          </div>
        </div>
      </div>
      <div className="list-items-down-content-wrapper">
        <div className="list-items-down-content">
          <div 
            className="productImage"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            {/*product.videoURL ? (
              <video 
                ref={videoRef}
                className="image-9-icon15" 
                src={product.videoURL}
                poster={product.imageUrl}
                muted
                loop
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </video>
            ) : (*/
            <img className="image-9-icon15" alt={product.name} src={product.imageUrl} />
            /* )*/}
          </div>
          <div className="product-footer">
            {product.showPrice && (
              <b className="b38"> <ShowCostInCard settingDetailForCost={product} configAppData={configAppData}></ShowCostInCard> </b>
            )}
            {configAppData.display_tryon &&            
           <button className="virtual-try-on1" onClick={()=>showVirtualTryOnIframe(utils.getskuForVirtualTryOn(product.stockNumber))}>Virtual Try On</button>
            }
          </div>
          <div className="btn__outer">
            <Link to={`/${settingUrl}/${viewUrlSetting}`}>View Details</Link>
          </div>
        </div>
      </div>
      {showVideoPopup && (
        <VideoPopup videoURL={product.videoURL} onClose={() => setShowVideoPopup(false)} />
      )}
    </div>
  );
};

ProductItems.propTypes = {
  product: PropTypes.shape({
    settingId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    videoURL: PropTypes.string,
    showPrice: PropTypes.bool.isRequired
  }).isRequired,
  className: PropTypes.string,
};

export default ProductItems;
