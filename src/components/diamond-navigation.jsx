import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Component4 from "./component4";
import Component from "./component";
import Component1 from "./component1";
import PropTypes from "prop-types";
import "./frame-component1.css";

const FrameComponent1 = ({ className = "" ,diamondNavigation,setIsLabGrown,isLabGrown}) => {
  console.log(isLabGrown)
  const navigate = useNavigate();

  const onContainer2Click = useCallback(() => {
    navigate("/complete");
  }, [navigate]);
  const handleLabGrownToggle = (value) => {
    if(value === 'Lab Grown'){
      setIsLabGrown(true);
    }
    if(value === 'Mined'){
      setIsLabGrown(false);
    }
    if(value === 'Fancy Color'){
      setIsLabGrown('fancy');
    }
   
  };
  return (
    <div className={`wrapper3 ${className}`}>
      <div className="diamond-nav-container">
        <div className="home-group">
          <div className="home2">Home</div>
          <div className="home-buttons1">
            <img className="icons" alt="" src="/vector-12.svg" />
          </div>
          <div className="create-ring2">Create Ring</div>
          <div className="home-buttons1">
            <img className="icons" alt="" src="/vector-23.svg" />
          </div>
          <b className="choose-diamond3">Choose Diamond</b>
        </div>
        <div className="diamonds-group">
          <b className="diamonds1">Diamonds</b>
          <div className="frame-parent7">
            <div className="frame-parent8">
              <div className="create-your-own-ring-group">
                <b className="create-your-own2">Create your own ring</b>
                <div className="lorem-nisl-fringilla2">
                  Lorem nisl fringilla magna malesuada egestas dui. Fringilla
                  fermentum fusce interdum nulla velit vestibulum. Pretium
                  iaculis id elementum commodo convallis. A rhoncus malesuada
                  orci aliquam ipsum quis praesent. Egestas molestie nec enim et
                  sem in orci.
                </div>
              </div>
              <div className="type1">
                {(diamondNavigation.navStandard && diamondNavigation.navStandard!==null) &&
                <div className={isLabGrown===false?'price18':'price19'}  onClick={()=>handleLabGrownToggle(diamondNavigation.navStandard)}>
                  <div className="mined1">{diamondNavigation.navStandard}</div>
                  <div className="empty-row">
                    <b className="i10">i</b>
                  </div>
                </div>
                }
                {(diamondNavigation.navLabGrown && diamondNavigation.navLabGrown!==null) &&
                <div className={isLabGrown===true?'price18':'price19'} onClick={()=>handleLabGrownToggle(diamondNavigation.navLabGrown)}>
                  <div className="lab-growned1">{diamondNavigation.navLabGrown}</div>
                  <div className="empty-row">
                    <b className="i10">i</b>
                  </div>
                </div>
                }
                {(diamondNavigation.navFancyColored && diamondNavigation.navFancyColored!==null) &&
                <div className={isLabGrown==='fancy'?'price18':'price19'} onClick={()=>handleLabGrownToggle(diamondNavigation.navFancyColored)}>
                  <div className="fancy-colour1">{diamondNavigation.navFancyColored}</div>
                  <div className="empty-row">
                    <b className="i10">i</b>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className="frame-wrapper1">
              <div className="group">
                <Component4 />
                <Component />
                <Component1 onContainerClick1={onContainer2Click} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
