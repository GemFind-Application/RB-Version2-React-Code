import { useState, useCallback ,useEffect} from "react";
import RingSpecificationsPopup from "../components/RingSpecificationsPopup";
import PortalPopup from "./portal-popup";
import DiamondDetailsPopup from "./DiamondItemPopup";
import DiamondSpecificationDetail from "../components/diamond-specification-details";
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
import { diamondService } from "../Services";
import { utils } from "../Helpers";
import VideoTryOn from "../components/VideoTryOn";
import { useNavigate } from 'react-router-dom';
const ProductDetails = ({ className = "",shopUrl,settingDetail,diamondDetail ,ringSize,configAppData,formSetting,additionOptionSetting ,setShowLoading}) => {
  
  const [isSettingDetailsOpen, setSettingDetailsOpen] = useState(false);
  const [isDiamondDetailsOpen, setDiamondDetailsOpen] = useState(false);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showVirtualTryOnUrl, setShowVirtualTryOnUrl] = useState('');
  const [isHintOpen, setHintOpen] = useState(false);
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const navigate = useNavigate();
  const [isDropHintOpen, setIsDropHintOpen] = useState(false);
  const [isScheduleViewingOpen, setIsScheduleViewingOpen] = useState(false);
  const [isEmailAFriendOpen, setIsEmailAFriendOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
  const [ringUrl,setRingUrl]=useState('');
  const [diamondUrl,setDiamondUrl] = useState('');
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
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
  const addToCart = async(diamondDetail,settingDetail) => {
    let formData={};
   
    formData={
      metaltype : settingDetail.metalType,
      ringId : settingDetail.settingId,
      ringsizesettingonly : ringSize,
      diamondId : diamondDetail.diamondId,
      diamondtype : diamondDetail.isLabCreated===true?'labcreated':'',
      diamondpath : diamondUrl.substring(diamondUrl.lastIndexOf("-")+1),
      ringpath : ringUrl.substring(ringUrl.lastIndexOf("-")+1),
      stylenumber : settingDetail.styleNumber,
      sidestonequalityvalue : settingDetail.sideStoneQuality[0],
      centerstonesizevalue : settingDetail.centerStoneMinCarat!=""?settingDetail.centerStoneMinCarat+'-'+settingDetail.centerStoneMaxCarat:'',
      islabsettings :settingDetail.isLabSetting,
    }
    //console.log(formData)
    let formDataToSend = new FormData();
    Object.keys(formDataToSend).forEach(function (key) {
      formDataToSend.append(key,formData[key]);
    });

    const completePurchase = `${import.meta.env.VITE_ADD_TO_CART_COMPLETE_PURCHASE_PREFIX}`;   
     console.log("response addcart")
     const requestOptions = {
      method: 'POST', 
      body: (formDataToSend)
    }
     const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;
    const addtocartUrl = window.location.origin+ext;
    setShowLoading(true);
    let  url=addtocartUrl+"/"+completePurchase+'/'+diamondDetail.diamondId+"/"+settingDetail.settingId;
     fetch(url,requestOptions)
      .then(function(response) {
        console.log(response);
        setShowLoading(false)
        if(response.status===200){
          localStorage.removeItem('selectedDiamond');
          localStorage.removeItem('selectedRing');
          console.log(response.url);
          window.open(response.url,"_self");
          
        }
        else{
          setError("There is some problem is adding the product . Please try again")
        }
      })
    
    //const res = await diamondService.addTocartcompletePurchase(diamondDetail.diamondId,settingDetail.settingId,formDataToSend);
 
  
  //if(res){
    //window.open =('https://gemfind-product-demo-10.myshopify.com/cart')
 // }
  
  }
  const changeSetting = ()=>{
    localStorage.removeItem('selectedRing');
    console.log(ringUrl)
    const navigateUrl = (ringUrl.substring(ringUrl.indexOf("settings")))
    navigate("/"+navigateUrl)
  }
  const changeDiamond = ()=>{
    localStorage.removeItem('selectedDiamond');
    navigate("/diamondtools")
  }
  useEffect(() => {
    const selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));   
    const selectedDiamond = JSON.parse(localStorage.getItem('selectedDiamond'));
    setRingUrl(selectedRingSetting.ringUrl);
    setDiamondUrl(selectedDiamond.diamondUrl)
  }, []);
  
  const showVirtualTryOnIframe = (stockNumber)=>{
    //console.log("here")
    let url = `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${stockNumber}&buynow=0`;
    setShowVirtualTryOn(true);
    setShowVirtualTryOnUrl(url)
  }

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
              <img className="fi-8467779-icon3" alt="" src={`${imageUrl}`+"/fi-84677791.svg"} />
              <div className="div63">
                <div className="div64">
                  <div className="div65">
                    <div className="payment-info">
                      <b className="complete-ring-title">
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
                  <b className="change-setting" onClick={()=>changeSetting()}>Change Setting</b>
                  <img
                    className="edit-child"
                    alt=""
                    src={`${imageUrl}`+"/sort-show-icons.svg"}
                  />
                </div>
              </div>
              <img
                className="info-icon"
                alt=""
                src={`${imageUrl}`+"/info.svg"}
                onClick={openSettingDetails}
              />
            </div>
            <div className="detail-elements1">
              <img
                className="fi-8467779-icon3"
                alt=""
                src={`${imageUrl}`+"/fi-127911891.svg"}
              />
              <div className="div67">
                <div className="div64">
                  <div className="div69">
                    <div className="payment-info">
                      <b className="complete-ring-title">
                      {diamondDetail.shape!=""?diamondDetail.shape:''} { ' '} {diamondDetail.caratWeight!=""?diamondDetail.caratWeight:''} {'CARAT'}
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
                      <b className="i13">{diamondDetail.txtinhouse && diamondDetail.txtinhouse===true ? diamondDetail.txtinhouse : '-'}</b>
                    </div>}
                  </div>
                </div>
                <div className="edit1">
                  <b className="change-diamond" onClick={()=>changeDiamond()}>Change Diamond</b>
                  <img
                    className="edit-child"
                    alt=""
                    src={`${imageUrl}`+"/sort-show-icons.svg"}
                  />
                </div>
              </div>
              <img
                className="info-icon"
                alt=""
                src={`${imageUrl}`+"/info.svg"}
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
            {settingDetail.rbEcommerce && diamondDetail.dsEcommerce &&
            <div className="button21">
              <b className="add-to-cart" onClick={()=>addToCart(diamondDetail,settingDetail)}>Add to cart - <ShowTotalPrice configAppData={configAppData} settingDetailForCost={settingDetail} diamondDetail={diamondDetail}></ShowTotalPrice></b>
            </div>
            }
            {configAppData.display_tryon =="1" &&
           
               <button className="button22" onClick={()=>showVirtualTryOnIframe(utils.getskuForVirtualTryOn(settingDetail.styleNumber))}>                        
                           <b>Virtual Try On</b>
                        </button>
            }
          </div>
          <Stats 
                formSetting={formSetting}
                configAppData={configAppData}
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
          onOutsideClick={() => setSettingDetailsOpen(false)}
        >
          <RingSpecificationsPopup   configAppData={configAppData}  onClose={() => setSettingDetailsOpen(false)} product={settingDetail} />
        </PortalPopup>
      )}
      {isDiamondDetailsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDiamondDetails}
        >
          <DiamondSpecificationDetail 
          additionOptionSetting={additionOptionSetting}
          diamond={diamondDetail}
          configAppData={configAppData}
          onClose={closeDiamondDetails} />
        </PortalPopup>
      )}
      {showVirtualTryOn && showVirtualTryOnUrl!="" &&
       <PortalPopup
       overlayColor="rgba(0, 0, 0, 0.3)"
       onOutsideClick={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
      <VideoTryOn
      src={showVirtualTryOnUrl}
      onClose={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>

      </VideoTryOn></PortalPopup>
      }
      {isDropHintOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHint}
        >
        <DropHintPopup
            settingId={settingDetail.settingId}
            diamondId={diamondDetail.diamondId}
            diamondurl={diamondUrl}
            ringurl={ringUrl}
            shopurl={shopUrl}
            configAppData={configAppData}
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
            diamondId={diamondDetail.diamondId}
            diamondurl={diamondUrl}            
            configAppData={configAppData}
            ringurl={ringUrl}
            diamondDetail={diamondDetail}
            SettingDetails={settingDetail}
            shopurl={shopUrl}
            isLabSetting={settingDetail.isLabSetting}
            onClose={() => setIsScheduleViewingOpen(false)}
            locations={settingDetail.addressList ? settingDetail.addressList.map(address => address.locationName) : []}
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
          diamondId={diamondDetail.diamondId}
          diamondurl={diamondUrl}
          ringurl={ringUrl}
          shopurl={shopUrl}
          isLabSetting={settingDetail.isLabSetting}          
          configAppData={configAppData}
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
          diamondId={diamondDetail.diamondId}
          diamondurl={diamondUrl}
          ringurl={ringUrl}
          shopurl={shopUrl}
          isLabSetting={settingDetail.isLabSetting}
          onClose={() => setIsEmailAFriendOpen(false)} 
          
          configAppData={configAppData}/>
        </PortalPopup>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
};

export default ProductDetails;
