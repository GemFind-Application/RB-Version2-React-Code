import { useState, useCallback } from "react";
import SettingDetails from "./setting-details";
import PortalPopup from "./portal-popup";
import DiamondDetails from "./diamond-details";

import PropTypes from "prop-types";
import Stats from "../components/stats";
import "./product-details.css";
import ShowCostInCard from "./showCostInCard";
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import DropHintPopup from "../components/DropHintPopup";
import ScheduleViewingPopup from "../components/ScheduleViewingPopup";
import RequestInfoPopup from "../components/RequestInfoPopup";
import EmailFriendPopup from "../components/EmailFriendPopup";
import ShowTotalPrice from "./ShowTotalPrice";
const ProductDetails = ({ className = "",settingDetail,diamondDetail ,ringSize,configAppData,formSetting,additionOptionSetting }) => {
  console.log(formSetting)
  const [isSettingDetailsOpen, setSettingDetailsOpen] = useState(false);
  const [isDiamondDetailsOpen, setDiamondDetailsOpen] = useState(false);
  const [isHintOpen, setHintOpen] = useState(false);
  const [isScheduleOpen, setScheduleOpen] = useState(false);

  const [isDropHintOpen, setIsDropHintOpen] = useState(false);
  const [isScheduleViewingOpen, setIsScheduleViewingOpen] = useState(false);
  const [isEmailAFriendOpen, setIsEmailAFriendOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
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

  const emailAFriend = useCallback(() => {
    setRequestInfoOpen(true);
  }, []);

  const closeemailAFriend = useCallback(() => {
    setRequestInfoOpen(false);
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
              <b className="engagement-ring">{settingDetail.settingName?settingDetail.settingName:''}</b>
              <div className="wrapper2">
                <b className="b20"><ShowCostInCard settingDetailForCost={settingDetail} configAppData={configAppData}> </ShowCostInCard></b>
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
            <b className="ct1"> {diamondDetail.caratWeight? diamondDetail.caratWeight+'ct':'-'}  </b>
          </div>
        </div>
        <div className="stats-parent">
          <div className="stats10">
            <div className="stats-elements">
              <div className="ring-size">Ring Size:</div>
              <b className="stats-values">{ringSize}</b>
            </div>
            <div className="stats-elements">
              <div className="metal-type2">Metal Type:</div>
              <b className="k-rose-gold">{settingDetail.metalType!=""?settingDetail.metalType:''}</b>
            </div>
            <div className="stats-elements2">
              <div className="side-stone-quality">Side Stone Quality:</div>
              <b className="i1h1">{settingDetail.sideStoneQuality!=""?settingDetail.sideStoneQuality[0]:''}</b>
            </div>
            <div className="stats-elements">
              <div className="center-stone-sizect">Center Stone Size(Ct.):</div>
              <b className="b21">{settingDetail.centerStoneMinCarat!=""?settingDetail.centerStoneMinCarat+'-'+settingDetail.centerStoneMaxCarat:''}</b>
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
                      {settingDetail.settingName?settingDetail.settingName:''}
                      </b>
                      <div className="id-3832123223">Id: {settingDetail.settingId?settingDetail.settingId:''}</div>
                    </div>
                    <b className="b22"><ShowCostInCard settingDetailForCost={settingDetail} configAppData={configAppData}> </ShowCostInCard></b>
                  </div>
                  <div className="this-14k-white">
                  {settingDetail.description?settingDetail.description:''}
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
                      {diamondDetail.shape!=""?diamondDetail.shape:''} { ' '} {diamondDetail.caratWeight!=""?diamondDetail.caratWeight:''} {'CARATH'}
                      </b>
                      <div className="id-3832123223">
                        
                      {"SKU#:"} { ' '}{additionOptionSetting.show_In_House_Diamonds_First ?
                       diamondDetail.stockNumber:
                       diamondDetail.diamondId}</div>
                    </div>
                    <b className="b23"><ShowCostInCardDiamond diamondDetail={diamondDetail} configAppData={configAppData}></ShowCostInCardDiamond></b>
                  </div>
                  <div className="this-excellent-cut">
                  {diamondDetail.subHeader!=""?diamondDetail.subHeader:''}
                  </div>
                  <div className="stats11">
                    <div className="stats-elements">
                      <div className="report">Report:</div>
                      <b className="gia1">{diamondDetail.certificate!=""?diamondDetail.certificate:'-'}</b>
                    </div>
                    <div className="stats-elements">
                      <div className="cut6">Cut:</div>
                      <b className="excellent4">{diamondDetail.cut!=""?diamondDetail.cut:'NA'}</b>
                    </div>
                    <div className="stats-elements">
                      <div className="color2">Color:</div>
                      <b className="stats-values">{diamondDetail.color!=""?diamondDetail.color:'-'}</b>
                    </div>
                    <div className="stats-elements">
                      <div className="clarity4">Clarity:</div>
                      <b className="i13">{diamondDetail.clarity!=""?diamondDetail.clarity:'-'}</b>
                    </div>
                    {additionOptionSetting.show_In_House_Diamonds_Column_with_SKU &&
                    <div className="stats-elements">
                      <div className="clarity4">In House:</div>
                      <b className="i13">{diamondDetail.inhouse!=""?diamondDetail.inhouse:'-'}</b>
                    </div>}
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
        {/*<div className="payment-content-wrapper">
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
        </div>*/}
        <div className="payment-options">
          <div className="cart-buttons">
            <div className="button21">
              <b className="add-to-cart">Add to cart - <ShowTotalPrice configAppData={configAppData} settingDetailForCost={settingDetail} diamondDetail={diamondDetail}></ShowTotalPrice></b>
            </div>
            {configAppData.display_tryon &&
            <div className="button22">
              <b className="virtual-try-on">Virtual try-on</b>
            </div>}
          </div>
          <Stats 
                formSetting={formSetting}
                emailAFriend={() => setIsEmailAFriendOpen(true)}
                openDropHint={() => setIsDropHintOpen(true)}
                openScheduleViewing={() => setIsScheduleViewingOpen(true)}
                openRequestInfo={() => setIsRequestInfoOpen(true)}/>
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
      {isDropHintOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHint}
        >
        <DropHintPopup
            settingId={settingDetail.settingId}
            ringurl={window.location.hostname + "/setting-details/" + settingDetail.settingId}
            shopurl={''}
            isLabSetting={settingDetail.isLabSetting}
            onClose={() => setIsDropHintOpen(false)} />
        </PortalPopup>
      )}
      {isScheduleViewingOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSchedule}
        >
         <ScheduleViewingPopup
            settingId={settingDetail.settingId}
            ringurl={window.location.hostname + "/setting-details/" + settingDetail.settingId}
            shopurl={''}
            isLabSetting={settingDetail.isLabSetting}
            onClose={() => setIsScheduleViewingOpen(false)}
            locations={settingDetail.addressList ? settingDetail.addressList.map(address => settingDetail.locationName) : []}
          />
        </PortalPopup>
      )}
      {isRequestInfoOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeRequestInfo}
        >
           <RequestInfoPopup 
          onClose={() => setIsRequestInfoOpen(false)}
          settingId={settingDetail.settingId}
          ringurl={window.location.hostname+"/setting-details/"+settingDetail.settingId}
          shopurl={''}
          isLabSetting={settingDetail.isLabSetting}
          />
        </PortalPopup>
       
      )}
      {isEmailAFriendOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeemailAFriend}
        >
         <EmailFriendPopup 
          settingId={settingDetail.settingId}
          ringurl={window.location.hostname+"/setting-details/"+settingDetail.settingId}
          shopurl={''}
          isLabSetting={settingDetail.isLabSetting}
          onClose={() => setIsEmailAFriendOpen(false)} />
        </PortalPopup>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
};

export default ProductDetails;
