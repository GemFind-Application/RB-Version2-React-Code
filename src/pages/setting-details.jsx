import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import DealerInfo from "../components/dealer-info";
import PortalPopup from "../components/portal-popup";
import SettingDetails1 from "../components/setting-details1";
import Header from '../components/Header';
import Stats from "../components/stats";
import Top1 from "../components/top1";
import Review from "../components/review";
import RingSpecificationsPopup from "../components/RingSpecificationsPopup";
import DropHintPopup from "../components/DropHintPopup";
import ScheduleViewingPopup from "../components/ScheduleViewingPopup";
import RequestInfoPopup from "../components/RequestInfoPopup";
import EmailFriendPopup from "../components/EmailFriendPopup";
import { BASE_URL, DEALER_ID } from '../components/api';
import Skeleton from 'react-loading-skeleton';
// import "react-loading-skeleton/dist/skeleton.css";
import PdpLoader from '../components/PdpLoader'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./setting-page.css";
import ShowCostInCard from "../components/showCostInCard";
import SocialIcon from "../components/SocialIcon";
import Footer from "../components/Footer"
import { settingService } from '../Services';
import VideoModal from "../components/VideoModal";
import { utils } from "../Helpers";
const SettingPage = ({formSetting,settingNavigationData,isLabGrown,shopUrl,configAppData}) => {
 
  const { settingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showVirtualTryOnUrl, setShowVirtualTryOnUrl] = useState('');
  const [product, setProduct] = useState(null);
  const [isDealerInfoOpen, setIsDealerInfoOpen] = useState(false);
  const [isSettingDetailsOpen, setSettingDetailsOpen] = useState(false);
  const [isRingSpecsOpen, setIsRingSpecsOpen] = useState(false);
  const [isDropHintOpen, setIsDropHintOpen] = useState(false);
  const [isScheduleViewingOpen, setIsScheduleViewingOpen] = useState(false);
  const [isEmailAFriendOpen, setIsEmailAFriendOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
  const [selectedMetalType, setSelectedMetalType] = useState("");
  const [selectedSideStoneQuality, setSelectedSideStoneQuality] = useState("");
  const [selectedCenterStoneSize, setSelectedCenterStoneSize] = useState("");
  const [selectedRingSize, setSelectedRingSize] = useState("");
  const [selectedDiamondType, setSelectedDiamondType] = useState(isLabGrown ?'Mined':'Lab Grown');
  const [reviews, setReviews] = useState([]);
  const [settingNavigation, setSettingNavigation] = useState(settingNavigationData);
  const [navigation, setNavigation] = useState("");
  const [loading, setLoading] = useState(true);
  const [uniqueCenterStoneSizes, setUniqueCenterStoneSizes] = useState([]);
  //const [socialIconSetting,setSocialIconSetting] = useState(socialIconSettingData);
  const [selectedDiamondShape, setSelectedDiamondShape] = useState("");
  const [settingIdToShow, setSettingIdToShow] = useState(settingId.substring(settingId.lastIndexOf("-")+1));
  const [configurableProduct,setConfigurableProduct]= useState([]);
  const [selectedParam,setSelectedParam]= useState('');
  const [uniqueSideStoneQualities, setUniqueSideStoneQualities] = useState([]);
  const [uniqueDiamondShape, setUniqueDiamondShape] = useState([]);
  
  //const [selectedRingSize,setSelectedRingSize]= useState('');
  useEffect(() => {
    fetchProductDetails(settingIdToShow);
  }, [settingIdToShow]);  
  const fetchProductDetails = async (settingId) => {
    try {
      const res = await settingService.getSettingDetail(settingId); 
      if(res) {
        if(selectedParam!=""){
        let url =  utils.getUrl(res.metalType,res.settingName,settingId,'details')
          //setViewUrlSetting(url)
         navigate("/setting-details/"+url);
        }       
        setProduct(res);
        setConfigurableProduct(res.configurableProduct);       
        let selectedSetting= res.configurableProduct.filter(item=>item.gfInventoryId === settingId );  
        console.log(selectedSetting)
        /*if(selectedSetting.length === 0){
          selectedSetting.diamondShape = res.centerStoneFit;
          selectedSetting.sideStoneQuality = res.sideStoneQuality[0];
          selectedSetting.centerStoneSize = res.centerStoneMinCarat;
          selectedSetting.metalType = res.metalType;
          selectedSetting.gfInventoryId = settingId;         
        }*/ 
        //get all settings for seelcted metal type
        let filterByMetalType = res.configurableProduct.filter(item=>item.metalType == res.metalType); 
        //sort all settings according to stone size
        let sortedarray = filterByMetalType.sort((a, b) => a.centerStoneSize - b.centerStoneSize);
        let  filterBySideStoneType = [];
        //selected setting-assign centerstone, side stone,diamond shape of selected setting.
        if( selectedSetting.length > 0) {
          setSelectedMetalType(res.metalType || "");  
          setSelectedCenterStoneSize(selectedSetting[0].centerStoneSize || "");
          setSelectedSideStoneQuality(selectedSetting[0]['sideStoneQuality']);
          setSelectedDiamondShape(selectedSetting[0]['diamondShape']); 
          setSelectedRingSize('');       
          setSelectedDiamondType(res.isLabSetting ? 'Lab Grown' : 'Mined');
        }
        console.log(selectedSetting)
        if(selectedSetting[0]['sideStoneQuality']!=null) {
          filterBySideStoneType = filterByMetalType.filter(item=>item.sideStoneQuality == selectedSetting[0]['sideStoneQuality']);
        }
       
        let sortedarrayforSideStoneQuality = filterBySideStoneType.sort((a, b) => a.centerStoneSize - b.centerStoneSize);
        console.log(sortedarrayforSideStoneQuality)
        //available diamond shape for selected metal and center stone size 
        let dimondShapeAvailable = res.configurableProduct.filter(item=>item.metalType === res.metalType  && item.centerStoneSize === selectedSetting[0].centerStoneSize);
        const allDiamondShape = dimondShapeAvailable?[...new Set(dimondShapeAvailable.map(item => item.diamondShape))].filter(function(e){return e})  : [];  
        if(sortedarray.length>0) {          
          const uniqueSideStoneQualityArray = [...new Set(sortedarray.map(item => item.sideStoneQuality))].filter(function(e){return e}) ;
          let uniqueCenterStoneSizesArray=[]
          if(uniqueSideStoneQualityArray.length>0){
             uniqueCenterStoneSizesArray = [...new Set(sortedarrayforSideStoneQuality.map(item => item.centerStoneSize))].filter(function(e){return e}) ;         
          }else{
             uniqueCenterStoneSizesArray = [...new Set(sortedarray.map(item => item.centerStoneSize))].filter(function(e){return e}) ;         
          }         
          // const uniqueDiamondShapeArray = [...new Set(allDiamondShape.map(item => item.diamondShape))].filter(function(e){return e}) ;
          //set all center stone size available for selected  metal type
          setUniqueCenterStoneSizes(uniqueCenterStoneSizesArray);
          setUniqueSideStoneQualities(uniqueSideStoneQualityArray);
          setUniqueDiamondShape(allDiamondShape);
        }      
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  
  const selectByMetalType = async (metalValue) => { 
    //get all settings where metal type is selected metal type.    
    var selectedMetalType= configurableProduct.filter(item=> item.metalType ==metalValue );
    //to get minimum price product sort it with ceterstone size and use the product with smallest stone size
    let sortedarray = selectedMetalType.sort((a, b) => a.centerStoneSize - b.centerStoneSize);   
    setSelectedParam('metalType');
    if(sortedarray.length>0){
      setSettingIdToShow(sortedarray[0].gfInventoryId);
    }    
  }
  const selectByCenterStoneSize = async (size) => {
    setSelectedParam('centerStoneSize');
    let selectedCenterStoneSizeProduct=[]
    if(uniqueSideStoneQualities.length > 0) {
       selectedCenterStoneSizeProduct= configurableProduct.filter(item=> item.metalType == selectedMetalType &&  item.sideStoneQuality ==selectedSideStoneQuality && item.centerStoneSize == size  );
    }else{
      //show all products with selected metal type and selected center stone size 
      selectedCenterStoneSizeProduct= configurableProduct.filter(item=> item.metalType ==selectedMetalType &&  item.centerStoneSize == size  );
    }    
    if(selectedCenterStoneSizeProduct.length>0){
      setSettingIdToShow(selectedCenterStoneSizeProduct[0].gfInventoryId);
    }         
  }
  const selectByDiamondShape = async (shape) => {
    const size= selectedCenterStoneSize;
    console.log(shape)
    var selectedShapeProduct= configurableProduct.filter(item=> item.metalType ==selectedMetalType &&  item.diamondShape ===  shape &&  item.centerStoneSize == size  );
   // let sortedarray = selectedShapeProduct.sort((a, b) => a.centerStoneSize - b.centerStoneSize);
    setSelectedParam('diamondShape');
    console.log(selectedShapeProduct)
    setSettingIdToShow(selectedShapeProduct[0].gfInventoryId)
  }
  const selectBysideStoneQuality = async (sideStoneQuality) => {
    var selectedSideStoneQualityProduct= configurableProduct.filter(item=> item.metalType ==selectedMetalType &&  item.sideStoneQuality ===  sideStoneQuality );
    
    let sortedarray = selectedSideStoneQualityProduct.sort((a, b) => a.centerStoneSize - b.centerStoneSize);
    setSelectedParam('sideStoneQuality');
    setSettingIdToShow(sortedarray[0].gfInventoryId)
  }
  const selectRingSetting = async ()=>{
    if(selectedRingSize===""){
      alert("Please select ring size.")
    }else{
      localStorage.setItem('selectedRing', JSON.stringify({settingId:settingIdToShow,ringSize:selectedRingSize}));
      const selectedDiamondId = JSON.parse(localStorage.getItem('selectedDiamondId'));
      if(selectedDiamondId){
        navigate("/diamondtools/completering/");
      }else{
        if(selectedDiamondType!='Mined'){
         // $navigate = '/diamondtools/diamondtype/navlabgrown'; 
        }else{
          navigate('/diamondtools'); 
        }
      }

    }
  }
  const onBreadContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const showVirtualTryOnIframe = (stockNumber)=>{
    console.log("here")
    let url = `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${stockNumber}&buynow=0`;
    setShowVirtualTryOn(true);
    setShowVirtualTryOnUrl(url)
  }
  // const onButtonClick = useCallback(() => {
  //   navigate("/diamond");
  // }, [navigate]);

  // const onButtonClick = useCallback(() => {
  //   navigate("/diamond");
  // }, [navigate]);

  if (!product) {
    return (
      <PdpLoader />
    );
  }

  const uniqueMetalTypes = product.configurableProduct ? [...new Set(product.configurableProduct.map(item => item.metalType))] : [];
 // const uniqueSideStoneQualities = product.configurableProduct ? [...new Set(product.configurableProduct.map(item => item.sideStoneQuality).filter(Boolean))] : [];
  //const uniqueCenterStoneSizes = product.configurableProduct ? [...new Set(product.configurableProduct.map(item => item.centerStoneSize))] : [];
 // const uniqueDiamondShape = product.configurableProduct?[...new Set(product.configurableProduct.map(item => item.diamondShape))].filter(function(e){return e}) : [];
 
  const images = [];
  if (product.extraImage && product.extraImage.length > 0) {
    images.push({
      original: product.mainImageURL,
      thumbnail: product.mainImageURL,
    });
    images.push(...product.extraImage.map((image) => ({
      original: image,
      thumbnail: image,
    })));
  } else if (product.mainImageURL) {
    images.push({
      original: product.mainImageURL,
      thumbnail: product.mainImageURL,
    });
  }
//console.log(uniqueDiamondShape)

  return (
    <>
      <div className="setting-page">
        <Header />
        <main className="main1">
          <section className="bread-crumbs-container">
            <div className="bread-crumbs">
              <div className="bread-crumb">
                <div className="back-link-container" onClick={onBreadContainerClick}>
                  <div className="back-link-container">
                    <img className="back-link-icon" alt="" src="/vector-11.svg" />
                  </div>
                  <b className="select-side-stone">Back to All Settings</b>
                </div>                
                <div className="image-container">
                  <div className="plp-image-gallery">
                    <div className="image-wrapper">
                      <ImageGallery items={images} />
                    </div>
                   {/* <div className="ships1">
                      <span className="view-with">View with:</span>
                      <Link>
                        <b className="round">{product.centerStoneFit ? product.centerStoneFit.split(',')[0] : ""}</b>
                        <img className="round-icon-caret" loading="lazy" alt="" src="/sort-show-icons.svg" />
                      </Link>
                    </div>*/}
                  </div>
                </div>
                <div className="note-container-parent">
                  <div className="note-container">
                    <div className="note-wrapper">
                      <div className="note-content">
                        <b className="note">Note:</b>
                        <div className="all-metal-color">
                          All metal color images may not be available.
                        </div>
                      </div>
                    </div>
                  </div>
                  {!formSetting.internalUseLink &&
                    <div className="link1">
                      <div className="dealer__info">
                        <span>{`Internal Use Only: `}</span>
                        <div className="dealer-info3" onClick={() => setIsDealerInfoOpen(true)}>
                          Dealer Info
                          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 10.2001V15.9688C16.4984 16.4407 16.3102 16.8928 15.9765 17.2265C15.6428 17.5602 15.1907 17.7484 14.7188 17.7501H2.03125C1.55934 17.7484 1.10723 17.5602 0.773536 17.2265C0.439843 16.8928 0.251647 16.4407 0.25 15.9688V3.28131C0.251647 2.8094 0.439843 2.35729 0.773536 2.0236C1.10723 1.6899 1.55934 1.50171 2.03125 1.50006H7.8C7.96576 1.50006 8.12473 1.56591 8.24194 1.68312C8.35915 1.80033 8.425 1.9593 8.425 2.12506C8.425 2.29082 8.35915 2.44979 8.24194 2.567C8.12473 2.68421 7.96576 2.75006 7.8 2.75006H2.03125C1.89035 2.75006 1.75523 2.80603 1.6556 2.90566C1.55597 3.00529 1.5 3.14041 1.5 3.28131V15.9688C1.5 16.1097 1.55597 16.2448 1.6556 16.3445C1.75523 16.4441 1.89035 16.5001 2.03125 16.5001H14.7188C14.8596 16.5001 14.9948 16.4441 15.0944 16.3445C15.194 16.2448 15.25 16.1097 15.25 15.9688V10.2001C15.25 10.0343 15.3158 9.87533 15.4331 9.75812C15.5503 9.64091 15.7092 9.57506 15.875 9.57506C16.0408 9.57506 16.1997 9.64091 16.3169 9.75812C16.4342 9.87533 16.5 10.0343 16.5 10.2001ZM17.125 0.250061H12.125C11.9592 0.250061 11.8003 0.315909 11.6831 0.433119C11.5658 0.55033 11.5 0.709301 11.5 0.875061C11.5 1.04082 11.5658 1.19979 11.6831 1.317C11.8003 1.43421 11.9592 1.50006 12.125 1.50006H15.6187L8.55625 8.55631C8.49767 8.61441 8.45117 8.68354 8.41944 8.7597C8.38771 8.83586 8.37138 8.91755 8.37138 9.00006C8.37138 9.08257 8.38771 9.16426 8.41944 9.24042C8.45117 9.31658 8.49767 9.38571 8.55625 9.44381C8.61435 9.50239 8.68348 9.54889 8.75964 9.58062C8.8358 9.61235 8.91749 9.62868 9 9.62868C9.08251 9.62868 9.1642 9.61235 9.24036 9.58062C9.31652 9.54889 9.38565 9.50239 9.44375 9.44381L16.5 2.38131V5.87506C16.5 6.04082 16.5658 6.19979 16.6831 6.317C16.8003 6.43421 16.9592 6.50006 17.125 6.50006C17.2908 6.50006 17.4497 6.43421 17.5669 6.317C17.6842 6.19979 17.75 6.04082 17.75 5.87506V0.875061C17.75 0.709301 17.6842 0.55033 17.5669 0.433119C17.4497 0.315909 17.2908 0.250061 17.125 0.250061Z" fill="#4B5ADE" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  }
                </div>               
              </div>
              <div className="product-info-container-wrapper">
                <div className="product-info-container">
                  <div className="info-wrapper">
                    <div className="info-content">
                      <div className="id-383212322-parent">
                        <div className="id-3832123221">Id: {product.settingId?product.settingId:''}</div>
                        <h1 className="product--title">{product.settingName?product.settingName:''}</h1>
                        <div className="product-specs">
                          <div className="spec-items">
                            <b className="spec-labels12"><ShowCostInCard settingDetailForCost={product} configAppData={configAppData}></ShowCostInCard></b>
                          </div>
                          <div className="spec-items1">
                            <div className="spec-items-child" />
                          </div>
                          {/*
                          <div className="shipping-header">
                            <div className="ships-by">Ships by:</div>
                          </div>
                          <div className="spec-items3">
                            <b className="monday-may-13">Monday, May 13</b>
                          </div>
                          <div className="spec-items1">
                            <div className="spec-items-child" />
                          </div>*/}
                          <div className="ships2" onClick={() => setIsRingSpecsOpen(true)}>
                            <div className="shipping-header">
                              <div className="ring-specifications">Ring Specifications</div>
                            </div>
                            <img className="group-icon2" loading="lazy" alt="" src="/group.svg" />
                          </div>
                        </div>
                      </div>                      
                    </div>
                    <div className="enim-at-fames">{product.description?product.description:''}</div>
                    {/* FORM DETAILS */}
                    <form action="" name="setting-details-form" className="setting-details-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log({
                          metalType: selectedMetalType,
                          sideStoneQuality: selectedSideStoneQuality,
                          centerStoneSize: selectedCenterStoneSize,
                          ringSize: selectedRingSize,
                          diamondType: selectedDiamondType
                        });
                      }}>
                      <div className="setting-filters-data">
                        {uniqueMetalTypes.length > 0 &&
                          <div className="filter-opened2">
                            <div className="select-metal-type">Select Metal Type</div>
                            <div className="filter-opened3">
                              {uniqueMetalTypes.map((metal, index) => (
                                <div
                                  key={index}
                                  className={`metal-type ${selectedMetalType === metal ? 'active' : ''}`}
                                  onClick={() => selectByMetalType(metal)}
                                >
                                  <div className={`metal-icon ${metal.toLowerCase()} `}>
                                    <div className="ring"></div>
                                  </div>
                                  <span className={`metal-name ${selectedMetalType === metal ? 'selected' : ''}`}>
                                    {metal}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        }
                        {uniqueSideStoneQualities.length > 0 && (
                          <div className="filter-opened4">
                            <div className="select-side-stone">Select Side Stone Quality</div>
                            <div className="stone-quality">
                              {uniqueSideStoneQualities.map((quality, index) => (
                                <div
                                  key={index}
                                  className={`range10 ${selectedSideStoneQuality === quality ? 'active' : ''}`}
                                  onClick={() => selectBysideStoneQuality(quality)}
                                >
                                  <div className="txt10">{quality}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* {uniqueCenterStoneSizes.length > 0 && (
                          <div className="filter-opened4 center-stone-selection">
                            <div className="select-side-stone">Select Center Stone Size(Ct)</div>
                            <div className="center-stone">
                              {uniqueCenterStoneSizes.map((size, index) => (
                                <button
                                  key={index}
                                  className={`range20 ${selectedCenterStoneSize === size ? 'active' : ''}`}
                                  onClick={() => selectByCenterStoneSize(size)}
                                >
                                  <div className="txt20">{size}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )} */}
                        {uniqueCenterStoneSizes.length > 0 && (
                          <div className="filter-opened4 center-stone-selection">
                            <div className="select-side-stone">Select Center Stone Size(Ct)</div>
                            <div className="center-stone">
                              <select
                                className="no-appearance select--outline"
                                value={selectedCenterStoneSize}
                                onChange={(e) => selectByCenterStoneSize(e.target.value)}
                              >
                                {uniqueCenterStoneSizes.map((size, index) => (
                                  <option
                                    key={index}
                                    value={size}
                                    className={`range20 ${selectedCenterStoneSize === size ? 'active' : ''}`}
                                  >
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        {uniqueDiamondShape.length > 0 && (
                          <div className="filter-opened4">
                            <div className="select-side-stone">Select Diamond Shape</div>
                            <div className="stone-quality">
                              {uniqueDiamondShape.map((shape, index) => (
                                <div
                                  key={index}
                                  className={`range10 ${selectedDiamondShape === shape ? 'active' : ''}`}
                                  onClick={() => selectByDiamondShape(shape)}
                                >
                                  <div className="txt10">{shape}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* <div className="filter-opened6">
                          <div className="select-ring-size">Select Ring Size</div>
                          <div className="from-to4">
                            {product.ringSize && product.ringSize.map((size, index) => (
                              <option
                                key={index}
                                value={size}
                                className={`range25 ${selectedRingSize === size ? 'active' : ''}`}
                              >
                                {size}
                              </option>
                            ))}
                          </div>
                        </div> */}
                        <div className="filter-opened6">
                          <div className="select-ring-size">Select Ring Size</div>
                          <select
                            className="no-appearance select--outline"
                            value={selectedRingSize}
                            onChange={(e) => setSelectedRingSize(e.target.value)}
                          >
                            <option
                                key={'ringSize0'}
                                value={''}
                                className={`range25 ${selectedRingSize === '' ? 'active' : ''}`}
                              >
                                {'Ring Size'}
                              </option>
                            {product.ringSize && product.ringSize.map((size, index) => (
                              <option
                                key={index}
                                value={size}
                                className={`range25 ${selectedRingSize === size ? 'active' : ''}`}
                              >
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        {(settingNavigation && (settingNavigation.navStandard || settingNavigation.navLabGrown)) && (
                          <div className="filter-opened7">
                            <div className="select-side-stone">Select Diamond Type</div>
                            <div className="diamond-type-filter">
                              {product.isLabSetting == 1 ? (
                                <>
                                  {settingNavigation.navLabGrown &&
                                    <button
                                      className={`range66 ${selectedDiamondType === 'Lab Grown' ? 'active' : ''}`}
                                      onClick={() => setSelectedDiamondType('Lab Grown')}
                                    >
                                      <div className="txt66">{settingNavigation.navLabGrown}</div>
                                    </button>
                                  }
                                  {settingNavigation.navStandard &&
                                    <button
                                      className={`range67 ${selectedDiamondType === 'Mined' ? 'active' : ''}`}
                                      onClick={() => setSelectedDiamondType('Mined')}
                                    >
                                      <div className="txt67">{settingNavigation.navStandard}</div>
                                    </button>
                                  }
                                </>
                              ) : (
                                <>
                                  {settingNavigation.navStandard &&
                                    <button
                                      className={`range66 ${selectedDiamondType === 'Mined' ? 'active' : ''}`}
                                      onClick={() => setSelectedDiamondType('Mined')}
                                    >
                                      <div className="txt66">{settingNavigation.navStandard}</div>
                                    </button>
                                  }
                                  {settingNavigation.navLabGrown &&
                                    <button
                                      className={`range67 ${selectedDiamondType === 'Lab Grown' ? 'active' : ''}`}
                                      onClick={() => setSelectedDiamondType('Lab Grown')}
                                    >
                                      <div className="txt67">{settingNavigation.navLabGrown}</div>
                                    </button>
                                  }
                                </>
                              )
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                    <div className="actions1">
                      <div className="buttons1">
                        {/* submit the form */}
                        {/* <button type="submit" className="submitring_product" onClick={onButtonClick}>
                          <b className="select-485">Select - {product.currencySymbol}{product.cost}</b>
                        </button> */}
                        <button type="button" className="submitring_product" onClick={selectRingSetting} >
                          <b className="select-485">Select - <ShowCostInCard settingDetailForCost={product} configAppData={{configAppData}}></ShowCostInCard></b>
                        </button>
                        {configAppData.display_tryon &&
                        <button className="button-fav1" onClick={()=>showVirtualTryOnIframe(utils.getskuForVirtualTryOn(product.styleNumber))}>                        
                           <b>Virtual Try On</b>
                        </button>}
                      </div>

                      <SocialIcon socialIconSetting={formSetting}></SocialIcon>
                    </div>
                  </div>
                  <Stats
                    formSetting={formSetting}
                    emailAFriend={() => setIsEmailAFriendOpen(true)}
                    openDropHint={() => setIsDropHintOpen(true)}
                    openScheduleViewing={() => setIsScheduleViewingOpen(true)}
                    openRequestInfo={() => setIsRequestInfoOpen(true)}
                  />
                </div>
              </div>
            </div>
          </section>
          {/*<section className="reviews">
            <Top1 totalReviews={reviews.length} />
            <div className="reviews1">
              {reviews.map((review, index) => (
                <Review key={index} review={review} productName={product.settingName} />
              ))}
            </div>
          </section>*/}
        </main>
       
      </div>
      {isDealerInfoOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsDealerInfoOpen(false)}
        >
          <DealerInfo 
            settingId={product.settingId}
            ringurl={window.location.hostname+"/setting-details/"+settingId}
            shopurl={'gemfind-product-demo-10.myshopify.com'}
            isLabSetting={product.isLabSetting}
            onClose={() => setIsDealerInfoOpen(false)} />
        </PortalPopup>
      )}
      {isSettingDetailsOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setSettingDetailsOpen(false)}
        >
          <SettingDetails1 onClose={() => setSettingDetailsOpen(false)} product={product} />
        </PortalPopup>
      )}
      {isRingSpecsOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsRingSpecsOpen(false)}
        >
          <RingSpecificationsPopup   configAppData={configAppData}  onClose={() => setIsRingSpecsOpen(false)} product={product} />
        </PortalPopup>
      )}
      {isDropHintOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsDropHintOpen(false)}
        >
          <DropHintPopup
            settingId={product.settingId}
            ringurl={window.location.hostname + "/setting-details/" + settingId}
            shopurl={shopUrl}
            isLabSetting={product.isLabSetting}
            onClose={() => setIsDropHintOpen(false)} />
        </PortalPopup>
      )}
      {isScheduleViewingOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsScheduleViewingOpen(false)}
        >
          <ScheduleViewingPopup
            settingId={product.settingId}
            ringurl={window.location.hostname + "/setting-details/" + settingId}
            shopurl={shopUrl}
            isLabSetting={product.isLabSetting}
            onClose={() => setIsScheduleViewingOpen(false)}
            locations={product.addressList ? product.addressList.map(address => address.locationName) : []}
          />
        </PortalPopup>
      )}
      {isRequestInfoOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsRequestInfoOpen(false)}
        >
        <RequestInfoPopup 
          onClose={() => setIsRequestInfoOpen(false)}
          settingId={product.settingId}
          ringurl={window.location.hostname+"/setting-details/"+settingId}
          shopurl={shopUrl}
          isLabSetting={product.isLabSetting}
          />
        </PortalPopup>
      )}
      {isEmailAFriendOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          onOutsideClick={() => setIsEmailAFriendOpen(false)}
        >
          <EmailFriendPopup 
          settingId={product.settingId}
          ringurl={window.location.hostname+"/setting-details/"+settingId}
          shopurl={shopUrl}
          isLabSetting={product.isLabSetting}
          onClose={() => setIsEmailAFriendOpen(false)} />
        </PortalPopup>
      )}
      {showVirtualTryOn && showVirtualTryOnUrl!="" &&
       <PortalPopup
       overlayColor="rgba(0, 0, 0, 0.3)"
       onOutsideClick={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
      <VideoModal
      src={showVirtualTryOnUrl}
      onClose={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>

      </VideoModal></PortalPopup>
      }
    </>
  );
};

export default SettingPage;