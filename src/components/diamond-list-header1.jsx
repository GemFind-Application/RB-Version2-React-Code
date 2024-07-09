import { useMemo } from "react";
import PropTypes from "prop-types";
import "./diamond-list-header1.css";

const DiamondListHeader1 = ({ className = "", propWidth, propAlignSelf }) => {
  const diamondListHeaderStyle = useMemo(() => {
    return {
      width: propWidth,
      alignSelf: propAlignSelf,
    };
  }, [propWidth, propAlignSelf]);

  return (
    <div
      className={`diamond-list-header ${className}`}
      style={diamondListHeaderStyle}
    >
      <div className="diamond-card-details">
        <div className="diamond-details4">
          <img className="image-icon4" alt="" src="/image@2x.png" />
          <div className="name2">
            <b className="princess-1001-carath3">Princess 10.01 CARATH</b>
            <b className="diamond-weight-type">$363,440</b>
          </div>
        </div>
        <div className="img">
          <img className="union-icon" alt="" src="/union.svg" />
          <b className="princess1">Princess</b>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="diamond-carat-value">10.01</b>
            <div className="carat2">{`Carat `}</div>
          </div>
          <div className="diamond-carat-info">
            <b className="d1">D</b>
            <div className="color3">Color</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="vvs11">VVS1</b>
            <div className="clarity7"> Clarity</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">Very good</b>
            <div className="cut8">Cut</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="diamond-table-label">57%</b>
            <div className="table5">Table</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-depth-label">62.4%</b>
            <div className="depth4">Depth</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="very-good5">Very good</b>
            <div className="symmetry3"> Symmetry</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">Very good</b>
            <div className="polish4">{`Polish `}</div>
          </div>
        </div>
        <div className="cell4">
          <b className="diamond-measurement-value">{` `}</b>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="x371x2322">3.74X3.71X2.32</b>
            <div className="measurement2">Measurement</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-card-action">-</b>
            <div className="intensity1">Intensity</div>
          </div>
        </div>
        <div className="actions3">
          <div className="actions4">
            <img className="video-icon" alt="" src="/video.svg" />
          </div>
          <div className="actions5">
            <img className="compare-icon" alt="" src="/compare.svg" />
          </div>
          <div className="button25">
            <img className="button-item" alt="" src="/vector-2-3.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

DiamondListHeader1.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propAlignSelf: PropTypes.any,
};

export default DiamondListHeader1;
