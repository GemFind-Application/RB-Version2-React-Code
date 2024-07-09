import { useMemo } from "react";
import PropTypes from "prop-types";
import "./v.css";

const V = ({
  className = "",
  propBorderRadius,
  propBorder,
  propBorderTop,
  propBorderRight,
  propBorderBottom,
}) => {
  const v1Style = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      border: propBorder,
      borderTop: propBorderTop,
      borderRight: propBorderRight,
      borderBottom: propBorderBottom,
    };
  }, [
    propBorderRadius,
    propBorder,
    propBorderTop,
    propBorderRight,
    propBorderBottom,
  ]);

  return (
    <div className={`v1 ${className}`} style={v1Style}>
      <div className="image10">
        <div className="frame-group">
          <div className="id-383212322-wrapper">
            <div className="id-3832123222">Id: 383212322</div>
          </div>
          <img
            className="vector-icon15"
            loading="lazy"
            alt=""
            src="/vector-31.svg"
          />
        </div>
        <div className="image-9-wrapper">
          <img
            className="image-9-icon10"
            loading="lazy"
            alt=""
            src="/image-9@2x.png"
          />
        </div>
      </div>
      <div className="frame-container">
        <div className="princess-1001-carath-parent">
          <h3 className="princess-1001-carath1">Princess 10.01 CARATH</h3>
          <b className="empty1">$363,440</b>
        </div>
        <div className="button20">
          <img
            className="button-child"
            loading="lazy"
            alt=""
            src="/vector-22.svg"
          />
        </div>
      </div>
    </div>
  );
};

V.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propBorderRadius: PropTypes.any,
  propBorder: PropTypes.any,
  propBorderTop: PropTypes.any,
  propBorderRight: PropTypes.any,
  propBorderBottom: PropTypes.any,
};

export default V;
