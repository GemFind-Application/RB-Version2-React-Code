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
    <div className={`settingsfilter-wrapper listtop_w ${className}`}>
      <div className="settingsfilter-container listtop_c">
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
        <div className="settings-panel-wrapper rb_listtop_w1">

          <div className="settings-panel rb_listtop_panel">
            <div className="h16 rb_setting_b">
              <b className="settings1 rb_setting_c">Complete Ring</b>
              <b className="create-your-own3 rb_setting_heading"> {configAppData.shop_title}</b>
              <div className="settings-desc rb_setting_desc">
              {configAppData.announcement_text}
              </div>
            </div>
            <div className="settings-steps">
              <div
                className="step-items"
                onClick={onStepsContentContainerClick}
              >
                <div className="steps-details">
                <b className="step-12">Step 1</b>
                <b className="step-title">Choose Setting</b>
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
                className="step-items"
                onClick={onStepsContentContainer1Click}
              >
                <div className="steps-details">
                  
                    <b className="step-12">Step 2</b>
                    <b className="step-title">Choose Diamond</b>
                  
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
              <div className="step-items step-items1">
                <div className="steps-details">
                    <b className="step-12">Step 3</b>
                    <b className="step-title">Complete Ring</b>
                </div>
                <div className="div109">
                <img className="icon4" alt="" src={`${imageUrl}`+"/0.svg" }/>
                </div>
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
