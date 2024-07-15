import { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./items.css";
import ShowCostInCardDiamond from "./showCostInCardDiamond";

const Items = ({ className = "",diamond }) => {

  return (
    <div className={`items ${className}`}>
      <div className="product-card">
        <div className="product-info1">
          <div className="product-name">
            <b className="princess-1001-carath5">{diamond.shape} {' '}{diamond.carat} CARATH</b>
          </div>
          <div className="actions10">
            <div className="actions11">
              <img className="video-icon2" alt="" src="/video.svg" />
            </div>
            <img className="compare-icon2" alt="" src="/compare.svg" />
            <div className="actions11">
              <img className="vector-icon27" alt="" src="/vector3.svg" />
            </div>
          </div>
        </div>
        <div className="image-wrapper1">
          <div className="info-overlay">
            <img className="image-9-icon13" alt="" src="/image-9@2x.png" />
            <div className="down">
              <b className="empty3"><ShowCostInCardDiamond diamondDetail={diamond}></ShowCostInCardDiamond></b>
              <b className="vs2-excellent">{diamond.clarity} {diamond.polish && diamond.polish!='' && ','+diamond.polish}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="button29 btn__group">
        <Link to="/diamond/" className="diamond_item--link">Select - <ShowCostInCardDiamond diamondDetail={diamond}></ShowCostInCardDiamond></Link>
      </div>
    </div>
  );
};

Items.propTypes = {
  className: PropTypes.string,

};

export default Items;
