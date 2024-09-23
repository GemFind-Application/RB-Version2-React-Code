import React,{ useMemo,useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./items.css";
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import DiamondDetailsPopup from './DiamondItemPopup';
import VideoModal from "./VideoModal";
import { diamondService } from "../Services";
import { utils } from "../Helpers";

import { useNavigate } from 'react-router-dom';
const Items = ({ className = "",diamond ,addCompareDiamondIds,configAppData,additionOptionSetting,compareDiamondsId,isLabGrown}) => {
const [showVideoPopup, setShowVideoPopup] = useState(false);
const [videoUrl, setVideoUrl] = useState('');
const [isDiamondPresentInCompare, setIsDiamondPresentInCompare] = useState(false);
const [showDetailsPopup, setShowDetailsPopup] = useState(false);

const navigate = useNavigate();
const diamondDetailUrl= `${import.meta.env.VITE_DIAMOND_DETAIL_PAGE}`;
const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
useEffect(() => {   
  let isDiamondPresentInCompare = compareDiamondsId.filter(item=>item===diamond.diamondId);
  setIsDiamondPresentInCompare(isDiamondPresentInCompare.length > 0?true:false)

},[compareDiamondsId])
  const handleVideoIconClick = async() => {
    setShowVideoPopup(false)
    try {     
      const res = await diamondService.getDiamondVideoUrl(diamond.diamondId);  
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
      console.error("Error fetching filter data:", error);
      setError("Failed to fetch filter data. Please try again later.");
    }  
  };

  const toggleDetailsPopup = () => {
    setShowDetailsPopup(!showDetailsPopup);
  };

  return (
    <div className={`items ${className}`}>
      <div className="product-card">
        <div className="product-info1">
          <div className="product-name">
            <b className="princess-1001-carath5">{diamond.shape} {' '}{diamond.carat} CARAT</b>
          </div>
          <div className="actions10">
            {(diamond.hasVideo)&&
            <div className="actions11"
                 id={diamond.diamondId}
                 onClick={handleVideoIconClick}>
              <img className="video-icon2" width="24" height="16" alt="" src={`${imageUrl}`+"/video.svg"} />
            </div>
            }
            {/* Compare icons */}
            <div className="compare">
              {isDiamondPresentInCompare ? (
                <img 
                  className="compare-icon2 compared" 
                  alt="compared" 
                  src={`${imageUrl}`+"/compared.svg"}
                  onClick={()=>addCompareDiamondIds(diamond.diamondId)}
                />
              ) : (
                <img 
                  className="compare-icon2 hide-when-filled" 
                  alt="compare" 
                  src={`${imageUrl}`+"/compare.svg" }
                  onClick={()=>addCompareDiamondIds(diamond.diamondId)}
                />
              )}
            </div>
            <div className="actions11 3dots" onClick={toggleDetailsPopup}>
              <img className="vector-icon27" alt="" src={`${imageUrl}`+"/vector3.svg"} />
            </div>
          </div>
          {/* end diamond actions buttons */}
        </div>
        <div className="image-wrapper1">
          <div className="info-overlay">
            <img className="image-9-icon13" alt="" src={diamond.biggerDiamondimage} />
          </div>
        </div>
      </div>
      <div className="paction">
      <div className="down">
              <b className="empty3"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
              <b className="vs2-excellent">{diamond.clarity} {diamond.polish && diamond.polish != '' && ',' + diamond.polish}</b>
            </div>
            <div className="down2">
            <Link to={`/${diamondDetailUrl}/${utils.getDiamondViewUrl(diamond,isLabGrown)}`} className="diamond_item--link button40">Select - <ShowCostInCardDiamond diamondDetail={diamond} configAppData={configAppData}></ShowCostInCardDiamond></Link>
            </div>
      </div>
      {(showVideoPopup && videoUrl!="")  && (
        <VideoModal src={videoUrl} onClose={() => setShowVideoPopup(false)} />
      )}
      {showDetailsPopup && (
        <DiamondDetailsPopup 
          diamond={diamond} 
          configAppData={configAppData}
          additionOptionSetting={additionOptionSetting}
          onClose={() => setShowDetailsPopup(false)} 
        />
      )}
    </div>
  );
};

Items.propTypes = {
  className: PropTypes.string,

};

export default Items;
