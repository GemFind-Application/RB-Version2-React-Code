import { useState, useCallback ,useEffect} from "react";
import Header from "../components/Header";

import FrameComponent4 from "../components/frame-component4";
import FrameComponent3 from "../components/frame-component3";
import ProductDetails from "../components/product-details";
import "./complete.css";
import { diamondService } from "../Services";
import { settingService } from "../Services";
import ImageGallery from 'react-image-gallery';
const Complete = ({configAppData,formSetting,additionOptionSetting}) => {
  const [settingId, setSettingId] = useState();
  const [diamondId, setDiamondId] = useState();
  const [settingDetail, setSettingDetail] = useState();
  const [diamondDetail, setDiamondDetail] = useState();
  const [selectedRingSize, setSelectedRingSize] = useState(7);
  const [images, setImages] = useState([]);
  const [issettingLoaded, setIssettingLoaded] = useState(false);
  const [isDiamondLoaded, setIsDiamondLoaded] = useState(false);
 
 // const [isSettingAnDiamondIdLoaded, setIsSettingAnDiamondIdLoaded] = useState(false);
  const fetchDiamondDetails = async (diamondId) => {
    try {
      const res = await diamondService.getDiamondDetail(diamondId); 
      console.log()
      if(res) {
        setDiamondDetail(res);  
        setIsDiamondLoaded(true);
        //checkFileExists(res.videoFileName);
       // setIsAllDiamondDetailsLoaded(true);
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const fetchSettingDetails = async (settingId) => {
    try {
      const res = await settingService.getSettingDetail(settingId); 
      if(res) {
        setSettingDetail(res);  
        const images = [];
        console.log(res)
        if (res.extraImage && res.extraImage.length > 0) {
          images.push({
            original: res.mainImageURL,
            thumbnail: res.mainImageURL,
          });
          images.push(...res.extraImage.map((image) => ({
            original: image,
            thumbnail: image,
          })));
        } else if (res.mainImageURL) {
          images.push({
            original: res.mainImageURL,
            thumbnail: res.mainImageURL,
          });
        }
        console.log(images)
        setImages(images);
        setIssettingLoaded(true)
        //checkFileExists(res.videoFileName);
        //setIsAllDiamondDetailsLoaded(true);
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
   useEffect(() => {
    let selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));
    console.log(selectedRingSetting)
    if(selectedRingSetting) {
    if(selectedRingSetting.settingId &&  selectedRingSetting.settingId!=""){
      console.log(selectedRingSetting.settingId)
      setSettingId(selectedRingSetting.settingId);
      setSelectedRingSize(selectedRingSetting.ringSize);
      fetchSettingDetails(selectedRingSetting.settingId);
    }}
    let selecteddiamond = JSON.parse(localStorage.getItem('selectedDiamond'));
    console.log(selecteddiamond)
    if(selecteddiamond) {

    if(selecteddiamond.diamondId &&  selecteddiamond.diamondId!=""){
      console.log(selecteddiamond.diamondId)
      setDiamondId(selecteddiamond.diamondId);
      fetchDiamondDetails(selecteddiamond.diamondId);
    }}
    //setIsSettingAnDiamondIdLoaded(true)
  }, []);
  useEffect(() => {
   
   
  }, []);
 console.log(settingDetail)
 console.log(diamondDetail)
  return (
    <div className="complete">
      <Header />
      <FrameComponent4 />

      <div className="complete-inner">
        <div className="frame-parent">
        {(settingId && diamondId) ?
        (issettingLoaded && isDiamondLoaded) &&
        <>
        <div className="image-container">
          <div className="plp-image-gallery">
            <div className="image-wrapper">
              <ImageGallery items={images} />
            </div>               
          </div>
        </div>
        
        <ProductDetails additionOptionSetting={additionOptionSetting} formSetting={formSetting} settingDetail={settingDetail} diamondDetail={diamondDetail} ringSize={selectedRingSize} configAppData={configAppData}/>
        
       </>
       :<>
        <div className="complete-inner">
        <div className="frame-parent">
            <div>Please select Ring and Diamond First</div>
        </div>
        </div>
       </>
        
      
        }
       
        </div>
        
      </div>
     
    </div>
  );
};

export default Complete;
