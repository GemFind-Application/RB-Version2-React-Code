import PropTypes from "prop-types";
import "./component1.css";

const Component1 = ({ className = "", onContainerClick1 }) => {
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`div96 step-items ${className}`} onClick={onContainerClick1}>
      <div className="steps-details">
        
          <b className="step-12">Step 3</b>
          <b className="step-title">Complete Ring</b>
      </div>
      <div className="div109">
      <img className="icon2" alt="" src={`${imageUrl}`+"/02.svg"} />
      </div>
    </div>
  );
};

Component1.propTypes = {
  className: PropTypes.string,

  /** Action props */
  onContainerClick1: PropTypes.func,
};

export default Component1;
