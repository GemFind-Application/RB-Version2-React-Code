import React, { useState } from "react";
import PropTypes from "prop-types";
import DiamondExpandDetail from "./diamond-expand-details";
import "./diamond-list-header1.css";
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import VideoModal from "./VideoModal";
import { diamondService } from "../Services";
const DiamondListHeader1 = ({ className = "", diamond ,configAppData}) => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
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
  return (
    <div className={`diamond-list-header ${className}`}>
      <div className="diamond-card-details">
        <div className="diamond-details4">
          <img className="image-icon4" alt="" src={diamond.biggerDiamondimage} />
          <div className="name2">
            <b className="princess-1001-carath3">{diamond.shape} {' '}{diamond.carat} CARATH</b>
            <b className="diamond-weight-type"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
          </div>
        </div>
        <div className="img">
          <img className="union-icon" alt="" src={diamond.biggerDiamondimage} />
          <b className="princess1">{diamond.shape && diamond.shape !== "" ? diamond.shape : '-'}</b>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="diamond-carat-value">{diamond.carat && diamond.carat !== "" ? diamond.carat : '-'}</b>
            <div className="carat2">{`Carat `}</div>
          </div>
          <div className="diamond-carat-info">
            <b className="d1">{diamond.color && diamond.color !== "" ? diamond.color : '-'}</b>
            <div className="color3">Color</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="vvs11">{diamond.clarity && diamond.clarity !== "" ? diamond.clarity : '-'}</b>
            <div className="clarity7"> Clarity</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.cut && diamond.cut !== "" ? diamond.cut : '-'}</b>
            <div className="cut8">Cut</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="diamond-table-label">{diamond.table && diamond.table !== "" ? diamond.table + "%" : '-'}</b>
            <div className="table5">Table</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-depth-label">{diamond.depth && diamond.depth !== "" ? diamond.depth + "%" : '-'}</b>
            <div className="depth4">Depth</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.symmetry && diamond.symmetry !== "" ? diamond.symmetry : '-'}</b>
            <div className="symmetry3"> Symmetry</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.polish && diamond.polish !== "" ? diamond.polish : '-'}</b>
            <div className="polish4">{`Polish `}</div>
          </div>
        </div>
        <div className="cell4">
          <b className="diamond-measurement-value">{` `}</b>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="x371x2322">{diamond.measurement && diamond.measurement !== "" ? diamond.measurement : '-'}</b>
            <div className="measurement2">Measurement</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-card-action">{diamond.intensity && diamond.intensity !== "" ? diamond.intensity : '-'}</b>
            <div className="intensity1">Intensity</div>
          </div>
        </div>
        <div className="actions3">
        {(diamond.hasVideo)&&
          <div className="actions4 list-diamond--video"  id={diamond.diamondId}
          onClick={handleVideoIconClick}>
            <img className="video-icon" alt="" src="/video.svg" />
          </div>
        }
          <div className="actions5 compare-list--diamond">
            <img className="compare-icon" alt="" src="/compare.svg" />
          </div>
          <div className="button25 show--more-diamond_info" onClick={handleToggleExpand}>
            <img 
              className="button-item" 
              alt="" 
              src={isExpanded ? "/arr-up.svg" : "/vector-2-3.svg"}
            />
          </div>
        </div>
      </div>
      {/* show the DiamondExpandDetail */}
      {isExpanded && (
        <div className="diamond-expand-detail-wrapper">
          <DiamondExpandDetail configAppData={configAppData} diamond={diamond} />
        </div>
      )}
       {(showVideoPopup && videoUrl!="")  && (
        <VideoModal src={videoUrl} onClose={() => setShowVideoPopup(false)} />
      )}
    </div>
  );
};

DiamondListHeader1.propTypes = {
  className: PropTypes.string,
  diamond: PropTypes.object.isRequired,
};

export default DiamondListHeader1;