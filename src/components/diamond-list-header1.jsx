import { useMemo } from "react";
import PropTypes from "prop-types";
import "./diamond-list-header1.css";

const DiamondListHeader1 = ({ className = "", propWidth, propAlignSelf,diamond }) => {
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
            <b className="princess-1001-carath3">{diamond.shape} {' '}{diamond.carat} CARATH</b>
            <b className="diamond-weight-type">$363,440</b>
          </div>
        </div>
        <div className="img">
          <img className="union-icon" alt="" src="/union.svg" />
          <b className="princess1">{diamond.shape && diamond.shape!="" ? diamond.shape:'-'}</b>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="diamond-carat-value">{diamond.carat && diamond.carat!="" ? diamond.carat:'-'}</b>
            <div className="carat2">{`Carat `}</div>
          </div>
          <div className="diamond-carat-info">
            <b className="d1">{diamond.color && diamond.color!="" ? diamond.color:'-'}</b>
            <div className="color3">Color</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="vvs11">{diamond.clarity && diamond.clarity!="" ? diamond.clarity:'-'}</b>
            <div className="clarity7"> Clarity</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.cut && diamond.cut!="" ? diamond.cut:'-'}</b>
            <div className="cut8">Cut</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="diamond-table-label">{diamond.table && diamond.table!="" ? diamond.table + "%":'-'}</b>
            <div className="table5">Table</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-depth-label">{diamond.depth && diamond.depth!="" ? diamond.depth + "%":'-'}</b>
            <div className="depth4">Depth</div>
          </div>
        </div>
        <div className="cell">
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.symmetry && diamond.symmetry!="" ? diamond.symmetry :'-'}</b>
            <div className="symmetry3"> Symmetry</div>
          </div>
          <div className="diamond-carat-info">
            <b className="very-good5">{diamond.polish && diamond.polish!="" ? diamond.polish :'-'}</b>
            <div className="polish4">{`Polish `}</div>
          </div>
        </div>
        <div className="cell4">
          <b className="diamond-measurement-value">{` `}</b>
        </div>
        <div className="cell">
          <div className="diamond-table-value">
            <b className="x371x2322">{diamond.measurement && diamond.measurement!="" ? diamond.measurement :'-'}</b>
            <div className="measurement2">Measurement</div>
          </div>
          <div className="diamond-table-value">
            <b className="diamond-card-action">{diamond.intensity && diamond.intensity!="" ? diamond.intensity :'-'}</b>
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
