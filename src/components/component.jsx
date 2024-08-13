import PropTypes from "prop-types";
import "./component.css";

const Component = ({ className = "" }) => {
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`div95 headergroup-nav ${className}`}>
      <div className="inner2">
        <div className="step-2-group">
          <b className="step-21">Step 2</b>
          <b className="choose-diamond2">Choose Diamond</b>
        </div>
      </div>
      <img className="icon1" alt="" src={`${imageUrl}`+"/01.svg" }/>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export default Component;
