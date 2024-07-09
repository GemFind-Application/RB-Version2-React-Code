import PropTypes from "prop-types";
import "./component1.css";

const Component1 = ({ className = "", onContainerClick1 }) => {
  return (
    <div className={`div96 ${className}`} onClick={onContainerClick1}>
      <div className="inner3">
        <div className="step-3-group">
          <b className="step-31">Step 3</b>
          <b className="complete-ring3">Complete Ring</b>
        </div>
      </div>
      <img className="icon2" alt="" src="/02.svg" />
    </div>
  );
};

Component1.propTypes = {
  className: PropTypes.string,

  /** Action props */
  onContainerClick1: PropTypes.func,
};

export default Component1;
