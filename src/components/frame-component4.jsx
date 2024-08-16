import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./frame-component4.css";

const FrameComponent4 = ({ className = "",configAppData }) => {
  const navigate = useNavigate();

  const onStepsContentContainerClick = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  const onStepsContentContainer1Click = useCallback(() => {
    navigate("/diamondtools");
  }, [navigate]);
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`home-content-wrapper ${className}`}>
      <div className="home-content">
        {/*<div className="home-buttons">
          <div className="home">Home</div>
          <div className="home-buttons-inner">
            <img className="frame-child1" alt="" src={`${imageUrl}`+"/vector-12.svg" }/>
          </div>
          <div className="create-ring">Create Ring</div>
          <div className="home-buttons-inner">
            <img className="frame-child1" alt="" src={`${imageUrl}`+"/vector-23.svg"} />
          </div>
          <b className="complete-ring">Complete Ring</b>
        </div>*/}
        <div className="complete-ring-parent">
          <b className="complete-ring1">Complete Ring</b>
          <div className="create-ring-description-parent">
            <div className="create-ring-description">
              <b className="create-your-own">Create your own ring</b>
              <div className="lorem-nisl-fringilla">
              {configAppData.announcement_text}
              </div>
            </div>
            <div className="steps-content-parent">
              <div
                className="steps-content"
                onClick={onStepsContentContainerClick}
              >
                <div className="steps-content-inner">
                  <div className="step-1-parent">
                    <b className="step-1">Step 1</b>
                    <b className="choose-setting">Choose Setting</b>
                  </div>
                </div>
                <div className="div57">
                  <img
                    className="image-10-icon"
                    alt=""
                    src={`${imageUrl}`+"/image-10@2x.png"}
                  />
                  <img
                    className="image-9-icon11"
                    alt=""
                    src={`${imageUrl}`+"/image-9@2x.png"}
                  />
                  <div className="div58">
                    <img className="group-icon3" alt="" src={`${imageUrl}`+"/group1.svg"} />
                  </div>
                </div>
              </div>
              <div
                className="steps-content1"
                onClick={onStepsContentContainer1Click}
              >
                <div className="steps-content-inner">
                  <div className="step-1-parent">
                    <b className="step-2">Step 2</b>
                    <b className="choose-setting">Choose Diamond</b>
                  </div>
                </div>
                <div className="div57">
                  <img
                    className="image-10-icon1"
                    alt=""
                    src={`${imageUrl}`+"/image-10@2x.png"}
                  />
                  <div className="div58">
                    <img className="group-icon3" alt="" src={`${imageUrl}`+"/group1.svg"} />
                  </div>
                </div>
              </div>
              <div className="steps-content2">
                <div className="steps-content-inner">
                  <div className="step-1-parent">
                    <b className="step-3">Step 3</b>
                    <b className="choose-setting">Complete Ring</b>
                  </div>
                </div>
                <img className="icon" alt="" src={`${imageUrl}`+"/0.svg" }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent4;
