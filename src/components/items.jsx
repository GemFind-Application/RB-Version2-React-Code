import { useMemo,useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./items.css";
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import DiamondDetailsPopup from './DiamondItemPopup';
import VideoPopup from "./VideoPopup";
import { diamondService } from "../Services";
import { utils } from "../Helpers";


const Items = ({ className = "",diamond ,addCompareDiamondIds,configAppData}) => {
const [showVideoPopup, setShowVideoPopup] = useState(false);
const [videoUrl, setVideoUrl] = useState('');
const [isDiamondPresentInCompare,setIsDiamondPresentInCompare] =useState()
const [showDetailsPopup, setShowDetailsPopup] = useState(false);

console.log(isDiamondPresentInCompare)
  const handleVideoIconClick = async() => {
    setShowVideoPopup(false)
    try {     
      const res = await diamondService.getDiamondVideoUrl(diamond.diamondId);  
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
            <b className="princess-1001-carath5">{diamond.shape} {' '}{diamond.carat} CARATH</b>
          </div>
          <div className="actions10">
            {(diamond.hasVideo)&&
            <div className="actions11"
                 id={diamond.diamondId}
                 onClick={handleVideoIconClick}>
              <img className="video-icon2" alt="" src="/video.svg" />
            </div>
            }
            <img className="compare-icon2" alt="compare" src="/compare.svg" onClick={()=>addCompareDiamondIds(diamond.diamondId)}/>
            <div className="actions11 3dots" onClick={toggleDetailsPopup}>
              <img className="vector-icon27" alt="" src="/vector3.svg" />
            </div>
          </div>
          {/* end diamond actions buttons */}
        </div>
        <div className="image-wrapper1">
          <div className="info-overlay">
            <img className="image-9-icon13" alt="" src={diamond.biggerDiamondimage} />
            <div className="down">
              <b className="empty3"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
              <b className="vs2-excellent">{diamond.clarity} {diamond.polish && diamond.polish != '' && ',' + diamond.polish}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="button29 btn__group">
        <Link to={`/diamond-details/${utils.getDiamondViewUrl(diamond)}`} className="diamond_item--link">Select - <ShowCostInCardDiamond diamondDetail={diamond} configAppData={configAppData}></ShowCostInCardDiamond></Link>
      </div>
      {(showVideoPopup && videoUrl!="")  && (
        <VideoPopup videoURL={videoUrl} onClose={() => setShowVideoPopup(false)} />
      )}

      {showDetailsPopup && (
        <DiamondDetailsPopup 
          diamond={diamond} 
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
