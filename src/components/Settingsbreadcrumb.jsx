import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StepItems from "./step-items";
import PropTypes from "prop-types";
import "./settingsbreadcrumb.css";

const Settingsbreadcrumb = ({ className = "" ,configAppData}) => {
  const navigate = useNavigate();

  const onStepItemsContainer1Click = useCallback(() => {
    navigate("/diamondtools");
  }, [navigate]);
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`settingsfilter-wrapper ${className}`}>
      <div className="settingsfilter-container">
        <div className="settings-breadcrumb">
          <div className="home3">Home</div>
          <img className="bread-child" alt="" src={`${imageUrl}`+"/vector-12.svg"} />
          <div className="create-ring3">Create Ring</div>
          <img className="bread-child" alt="" src={`${imageUrl}`+"/vector-23.svg"} />
          <b className="choose-setting2">Choose Setting</b>
        </div>
        <div className="settings-panel-wrapper">
          <div className="settings-panel">
            <div className="h16">
              <b className="settings1">SETTINGS</b>
              <b className="create-your-own3">Create your own ring</b>
              <div className="settings-desc">
               {configAppData.announcement_text}
              </div>
            </div>
            <div className="settings-steps">
              <div className="step-items1 step-items">
                <div className="steps-details">
                  <b className="step-12">Step 1</b>
                  <b className="step-title">Choose Setting</b>
                </div>
                <div className="div109">
                  <img
                    className="image-9-icon14"
                    alt=""
                    src={`${configAppData.imageUrl}`+"/image-9@2x.png"}
                  />
                  <img className="frame-icon5" alt="" src={`${imageUrl}`+"/frame2.svg"} />
                </div>
              </div>
              <StepItems
                step2="Step 2"
                chooseDiamond="Choose Diamond"
                prop="/03.svg"
                onStepItemsContainerClick={onStepItemsContainer1Click}
              />
              <StepItems
                step2="Step 3"
                chooseDiamond="Complete Ring"
                prop="/02.svg"
              />
            </div>
          </div>
          {/* <div className="mined-lab-wrapper">
            <div className="mined-settings">
              <div className="mined2">Mined</div>
              <div className="separator">
                <b className="i22">i</b>
              </div>
            </div>
            <div className="lab-settings">
              <div className="lab-growned2">Lab Growned</div>
              <div className="separator">
                <b className="i22">i</b>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

Settingsbreadcrumb.propTypes = {
  className: PropTypes.string,
};

export default Settingsbreadcrumb;
