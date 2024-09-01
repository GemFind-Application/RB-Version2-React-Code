import PropTypes from "prop-types";
import "./step-items.css";

const StepItems = ({
  className = "",
  step2,
  chooseDiamond,
  prop,
  onStepItemsContainerClick,
}) => {
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div
      className={`step-items ${className}`}
      onClick={onStepItemsContainerClick}
    >
      <div className="steps-details">
        <b className="step-22">{step2}</b>
        <b className="step-title">{chooseDiamond}</b>
      </div>
      <div className="div109">
        <img className="icon4" alt="" src={imageUrl+prop} />
      </div>
    </div>
  );
};

StepItems.propTypes = {
  className: PropTypes.string,
  step2: PropTypes.string,
  chooseDiamond: PropTypes.string,
  prop: PropTypes.string,

  /** Action props */
  onStepItemsContainerClick: PropTypes.func,
};

export default StepItems;
