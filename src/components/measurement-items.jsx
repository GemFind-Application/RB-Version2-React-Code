import { useMemo } from "react";
import PropTypes from "prop-types";
import "./measurement-items.css";

const MeasurementItems = ({
  className = "",
  fi8467779,
  measurementSubValues,
  depth,
  propFlex,
}) => {
  const measurementItemsStyle = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);
  //const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div
      className={`measurement-items ${className}`}
      style={measurementItemsStyle}
    >
      <img className="fi-8467779-icon2" loading="lazy" alt="" src={fi8467779} />
      <div className="measurement-sub-items">
        <b className="measurement-sub-values">{measurementSubValues}</b>
        <div className="depth3">{depth}</div>
      </div>
    </div>
  );
};

MeasurementItems.propTypes = {
  className: PropTypes.string,
  fi8467779: PropTypes.string,
  measurementSubValues: PropTypes.string,
  depth: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
};

export default MeasurementItems;
