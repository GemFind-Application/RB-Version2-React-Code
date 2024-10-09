import React, { useState, useRef ,useEffect} from "react";
import PropTypes from "prop-types";
import "./product-items.css";
import { Link } from "react-router-dom";
import ShowCostInCard from "./showCostInCard";
import { utils } from "../Helpers";
import { X } from 'lucide-react';
import './PopupAlert.css';
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
  const [countImg,setCountImg]=useState(0);
  
  const [imageToShowasMain, setImageToShowasMain] = useState(product.imageUrl);
  const settingUrl = `${import.meta.env.VITE_SETTINGS_DETAIL_PAGE}`;
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  const [defaultImg,setdefaultImg]=useState(imageUrl+'/no-image.jpg');
  const [imagetoshow,setImagetoshow]=useState(product.imageUrl);
  //console.log(defaultImg)
  if (isLoading) {
    return <SkeletonProductItem />;
  }
  const handleVideoIconClick = async(settingId) => {
    setShowVideoPopup(false)
    try {     
      const res = await settingService.getSettingVideoUrl(settingId);  
      if(res)     {
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
 const closeVideo=(mainImage)=>{
  setImageToShowasMain(mainImage);         
  setShowVideoPopup(false);     
 }
  useEffect(() => {    
    if(product.metalTypes.length > 0){
      let metalTypeForUrl = filterMetalType.length >0? filterMetalType[0] : product.metalTypes[0].metalType;    
      let url = utils.getUrl(metalTypeForUrl,product.name,product.priceSettingId)
      setViewUrlSetting(url)
    }else{
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

  const showNewImage=(item)=>{
    const requestOptions = {
      method: 'GET', 
    }
    fetch(item,requestOptions)
    .then(function (response) {
      console.log(response)
      if(response.status==200)
      {
        setImageToShowasMain(item);
      }else{
        setImageToShowasMain(imageUrl+"/no-image1.jpg");
      }
      // The API call was successful!
      //return response.text();
    }).then(function (html) {      
      // Convert the HTML string into a document object
     // var parser = new DOMParser();
     // var doc = parser.parseFromString(html, 'text/html');
    //console.log(doc)
    //setDiamondContent(html)
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
    //console.log(imagetoshow)
    //console.log(t);
    
   
    
  }


  return (
    <div className={`ring__items product-items ${className}`} >
      <div className="ring-items__header">
        <h2 className="product-title">{utils.truncateString(product.name)}</h2>
        <div className="ring-items__wrapper">
          <div 
            className="ring-items__item-video" 
            productid={product.settingId}
            
          >
            {(product.videoURL&&product.videoURL!="") && 
            showVideoPopup ?
            <X size={20} onClick={()=>closeVideo(product.imageUrl)}/>
           
          :<img className="video-icon3" onClick={()=>handleVideoIconClick(product.settingId)} alt="" src={  `${imageUrl}`+"/video.svg" }/>
          }


          </div>
          <div className="ring-items__item-wishlist no-display" productid={product.settingId}>
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
          >{showVideoPopup? <video src={videoUrl}  autoPlay loop>
          Your browser does not support the video tag.
          </video>:
           
            <img className="image-9-icon15" alt={product.name} src={imageToShowasMain} />
            }
            

            <ul className="itemHoverImage">
              <li><img loadig="lazy" src={product.imageUrl} alt="" height="75" width="75" 
               onMouseEnter={()=>showNewImage(product.imageUrl)}/></li>
              {
                product.extraImage &&
                product.extraImage.length >0 &&
                product.extraImage.map((item,index)=>{
                  if(index<=2 ){
                    return  <li><img loadig="lazy" 
                    src={item} 
                    alt="" 
                    height="75" 
                    width="75"  
                    onMouseEnter={()=>{showNewImage(item)}}  
                    onMouseLeave={()=>showNewImage(product.imageUrl)}
                    
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src=imageUrl+"/no-image.jpg";
                    
                      //currentTarget.onMouseEnter=null; 
                      //setImageToShowasMain(imageUrl+"/no-image.jpg")
                    }}
                    
                   /></li>
                  }
                 
                })

              }
             
             
            </ul>
          </div>
          <div className="paction">
            <div className="down">
            {product.showPrice && (
              <b className="empty3"> <ShowCostInCard settingDetailForCost={product} configAppData={configAppData}></ShowCostInCard> </b>
            )}
            {configAppData.display_tryon=="1" &&            
           <button className="virtual-try-on1" onClick={()=>showVirtualTryOnIframe(utils.getskuForVirtualTryOn(product.stockNumber))}>Virtual Try On</button>
            }
            </div>
            <div className="down2">
            <Link to={`/${settingUrl}/${viewUrlSetting}`} className="diamond_item--link button40">View Details</Link>
            {configAppData.display_tryon=="1" &&            
           <button className="button40_b" onClick={()=>showVirtualTryOnIframe(utils.getskuForVirtualTryOn(product.stockNumber))}>Virtual Try On</button>
            }
            </div>
          </div>
        </div>
      </div>
    
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
