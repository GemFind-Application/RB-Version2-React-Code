import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./component4.css";

const Component4 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onContainerClick = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  return (
    <div className={`div93 ${className}`} onClick={onContainerClick}>
      <div className="inner1">
        <div className="step-1-group">
          <b className="step-11">Step 1</b>
          <b className="choose-setting1">Choose Setting</b>
        </div>
      </div>
      <div className="step-images">
        <img className="image-10-icon3" alt="" src="/image-10@2x.png" />
        <img className="image-9-icon12" alt="" src="/image-9@2x.png" />
        <div className="div94">
          <img className="group-icon5" alt="" src="/group1.svg" />
        </div>
      </div>
    </div>
  );
};

Component4.propTypes = {
  className: PropTypes.string,
};

export default Component4;
