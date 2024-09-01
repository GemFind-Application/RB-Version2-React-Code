import PropTypes from "prop-types";
import "./component.css";

const Component = ({ className = "" }) => {
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`div95 step-items step-items1 ${className}`}>
      <div className="steps-details">
          <b className="step-12">Step 2</b>
          <b className="step-title">Choose Diamond</b>
      </div>
      <div className="div109">
      <img className="icon4" alt="Choose Diamond" src={`${imageUrl}` + "/01.svg"} />
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export default Component;
