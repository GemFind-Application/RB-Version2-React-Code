import { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./items.css";

const Items = ({ className = "", propLeft, propTop }) => {
  const itemsStyle = useMemo(() => {
    return {
      left: propLeft,
      top: propTop,
    };
  }, [propLeft, propTop]);

  return (
    <div className={`items ${className}`} style={itemsStyle}>
      <div className="product-card">
        <div className="product-info1">
          <div className="product-name">
            <b className="princess-1001-carath5">Princess 10.01 CARATH</b>
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
              <b className="empty3">$363,440</b>
              <b className="vs2-excellent">VS2, Excellent</b>
            </div>
          </div>
        </div>
      </div>
      <div className="button29 btn__group">
        <Link to="/diamond/" className="diamond_item--link">Select - $485</Link>
      </div>
    </div>
  );
};

Items.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propLeft: PropTypes.any,
  propTop: PropTypes.any,
};

export default Items;
