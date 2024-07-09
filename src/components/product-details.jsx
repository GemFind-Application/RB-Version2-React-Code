import { useState, useCallback } from "react";
import SettingDetails from "./setting-details";
import PortalPopup from "./portal-popup";
import DiamondDetails from "./diamond-details";
import Hint from "./hint";
import Schedule from "./schedule";
import RequestInfo from "./request-info";
import PropTypes from "prop-types";
import "./product-details.css";

const ProductDetails = ({ className = "" }) => {
  const [isSettingDetailsOpen, setSettingDetailsOpen] = useState(false);
  const [isDiamondDetailsOpen, setDiamondDetailsOpen] = useState(false);
  const [isHintOpen, setHintOpen] = useState(false);
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const [isRequestInfoOpen, setRequestInfoOpen] = useState(false);

  const openSettingDetails = useCallback(() => {
    setSettingDetailsOpen(true);
  }, []);

  const closeSettingDetails = useCallback(() => {
    setSettingDetailsOpen(false);
  }, []);

  const openDiamondDetails = useCallback(() => {
    setDiamondDetailsOpen(true);
  }, []);

  const closeDiamondDetails = useCallback(() => {
    setDiamondDetailsOpen(false);
  }, []);

  const openHint = useCallback(() => {
    setHintOpen(true);
  }, []);

  const closeHint = useCallback(() => {
    setHintOpen(false);
  }, []);

  const openSchedule = useCallback(() => {
    setScheduleOpen(true);
  }, []);

  const closeSchedule = useCallback(() => {
    setScheduleOpen(false);
  }, []);

  const openRequestInfo = useCallback(() => {
    setRequestInfoOpen(true);
  }, []);

  const closeRequestInfo = useCallback(() => {
    setRequestInfoOpen(false);
  }, []);

  return (
    <>
      <div className={`product-details1 ${className}`}>
        <div className="h15">
          <div className="completed-content-parent">
            <div className="completed-content">
              <b className="completed">Completed</b>
            </div>
            <div className="engagement-ring-parent">
              <b className="engagement-ring">Engagement Ring</b>
              <div className="wrapper2">
                <b className="b20">$364,000</b>
              </div>
              <div className="line-wrapper">
                <div className="line-div" />
              </div>
            </div>
          </div>
          <div className="carat-weight-labels">
            <div className="the-total-carat">The total carat weight:</div>
          </div>
          <div className="carat-weight-labels1">
            <b className="ct1"> 0.55 Ct</b>
          </div>
        </div>
        <div className="stats-parent">
          <div className="stats10">
            <div className="stats-elements">
              <div className="ring-size">Ring Size:</div>
              <b className="stats-values">9</b>
            </div>
            <div className="stats-elements">
              <div className="metal-type2">Metal Type:</div>
              <b className="k-rose-gold">14k Rose Gold</b>
            </div>
            <div className="stats-elements2">
              <div className="side-stone-quality">Side Stone Quality:</div>
              <b className="i1h1">I1/H1</b>
            </div>
            <div className="stats-elements">
              <div className="center-stone-sizect">Center Stone Size(Ct.):</div>
              <b className="b21">0.86-1.14</b>
            </div>
          </div>
          <div className="number3">
            <div className="detail-elements">
              <img className="fi-8467779-icon3" alt="" src="/fi-84677791.svg" />
              <div className="div63">
                <div className="div64">
                  <div className="div65">
                    <div className="payment-info">
                      <b className="prong-round-solitaire2">
                        4 prong Round Solitaire
                      </b>
                      <div className="id-3832123223">Id: 383212322</div>
                    </div>
                    <b className="b22">$485</b>
                  </div>
                  <div className="this-14k-white">
                    This 14K white gold product can accommodate a round diamond
                    shape. Available in 14K, 18K white, yellow and rose gold, as
                    well as Platinum. Center diamond not included. Matching
                    wedding band sold separately.
                  </div>
                </div>
                <div className="edit">
                  <b className="change-setting">Change Setting</b>
                  <img
                    className="edit-child"
                    alt=""
                    src="/sort-show-icons.svg"
                  />
                </div>
              </div>
              <img
                className="info-icon"
                alt=""
                src="/info.svg"
                onClick={openSettingDetails}
              />
            </div>
            <div className="detail-elements1">
              <img
                className="fi-8467779-icon3"
                alt=""
                src="/fi-127911891.svg"
              />
              <div className="div67">
                <div className="div64">
                  <div className="div69">
                    <div className="payment-info">
                      <b className="prong-round-solitaire2">
                        Princess 10.01 CARATH
                      </b>
                      <div className="id-3832123223">Id: 383212322</div>
                    </div>
                    <b className="b23">$363,440</b>
                  </div>
                  <div className="this-excellent-cut">
                    This Excellent cut, E color, I1 clarity diamond comes
                    accompanied by a diamond grading report from GIA
                  </div>
                  <div className="stats11">
                    <div className="stats-elements">
                      <div className="report">Report:</div>
                      <b className="gia1">GIA</b>
                    </div>
                    <div className="stats-elements">
                      <div className="cut6">Cut:</div>
                      <b className="excellent4">Excellent</b>
                    </div>
                    <div className="stats-elements">
                      <div className="color2">Color:</div>
                      <b className="stats-values">E</b>
                    </div>
                    <div className="stats-elements">
                      <div className="clarity4">Clarity:</div>
                      <b className="i13">I1</b>
                    </div>
                  </div>
                </div>
                <div className="edit1">
                  <b className="change-diamond">Change Diamond</b>
                  <img
                    className="edit-child"
                    alt=""
                    src="/sort-show-icons.svg"
                  />
                </div>
              </div>
              <img
                className="info-icon"
                alt=""
                src="/info.svg"
                onClick={openDiamondDetails}
              />
            </div>
          </div>
        </div>
        <div className="payment-content-wrapper">
          <div className="payment-content">
            <div className="div74">
              <div className="payment-info">
                <b className="the-total-carat">Flexible Payment Options:</b>
                <div className="interest-free-payments-of-container">
                  <span>{`3 Interest-Free Payments of `}</span>
                  <b>$951.67</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-options">
          <div className="cart-buttons">
            <div className="button21">
              <b className="add-to-cart">Add to cart - $364,000</b>
            </div>
            <div className="button22">
              <b className="virtual-try-on">Virtual try-on</b>
            </div>
          </div>
          <div className="stats12">
            <div className="engagement-action-icons" onClick={openHint}>
              <img className="fi-8429504-icon1" alt="" src="/fi-8429504.svg" />
              <div className="engagement-actions">
                <b className="drop-a-hint2">Drop A Hint</b>
              </div>
            </div>
            <div className="engagement-action-icons1" onClick={openSchedule}>
              <img className="fi-8429504-icon1" alt="" src="/fi-956926.svg" />
              <div className="engagement-actions">
                <b className="schedule-viewing2">Schedule Viewing</b>
              </div>
            </div>
            <div className="engagement-action-icons2">
              <img className="fi-8429504-icon1" alt="" src="/fi-2989993.svg" />
              <div className="engagement-actions">
                <b className="email-a-friend1">Email A Friend</b>
              </div>
            </div>
            <div className="engagement-action-icons3" onClick={openRequestInfo}>
              <img className="fi-8429504-icon1" alt="" src="/fi-151912.svg" />
              <div className="engagement-actions">
                <b className="request-more-info1">Request More Info</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSettingDetailsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSettingDetails}
        >
          <SettingDetails onClose={closeSettingDetails} />
        </PortalPopup>
      )}
      {isDiamondDetailsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDiamondDetails}
        >
          <DiamondDetails onClose={closeDiamondDetails} />
        </PortalPopup>
      )}
      {isHintOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHint}
        >
          <Hint onClose={closeHint} />
        </PortalPopup>
      )}
      {isScheduleOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSchedule}
        >
          <Schedule onClose={closeSchedule} />
        </PortalPopup>
      )}
      {isRequestInfoOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeRequestInfo}
        >
          <RequestInfo onClose={closeRequestInfo} />
        </PortalPopup>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
};

export default ProductDetails;
