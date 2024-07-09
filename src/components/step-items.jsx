import PropTypes from "prop-types";
import "./step-items.css";

const StepItems = ({
  className = "",
  step2,
  chooseDiamond,
  prop,
  onStepItemsContainerClick,
}) => {
  return (
    <div
      className={`step-items ${className}`}
      onClick={onStepItemsContainerClick}
    >
      <div className="div107">
        <b className="step-22">{step2}</b>
        <b className="step-title">{chooseDiamond}</b>
      </div>
      <img className="icon4" alt="" src={prop} />
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
