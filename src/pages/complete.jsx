import { useState, useCallback ,useEffect} from "react";
import Header from "../components/Header";

import FrameComponent4 from "../components/frame-component4";
import FrameComponent3 from "../components/frame-component3";
import ProductDetails from "../components/product-details";
import "./complete.css";
import { diamondService } from "../Services";
import { settingService } from "../Services";
import ImageGallery from 'react-image-gallery';
import ShowError from "../components/ShowError";
const Complete = ({configAppData,formSetting,additionOptionSetting,shopUrl,isLabGrown,setShowLoading}) => {
  const [settingId, setSettingId] = useState();
  const [diamondId, setDiamondId] = useState();
  const [settingDetail, setSettingDetail] = useState();
  const [diamondDetail, setDiamondDetail] = useState();
  const [selectedRingSize, setSelectedRingSize] = useState(7);
  const [images, setImages] = useState([]);
  const [issettingLoaded, setIssettingLoaded] = useState(false);
  const [isDiamondLoaded, setIsDiamondLoaded] = useState(false);
  const [error, setError] = useState(null);
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
 // const [isSettingAnDiamondIdLoaded, setIsSettingAnDiamondIdLoaded] = useState(false);
  const fetchDiamondDetails = async (diamondId,isLabGrown) => {
    try {
      const res = await diamondService.getDiamondDetail(diamondId,isLabGrown,configAppData.dealerid);      
      if(res) {
        setDiamondDetail(res);  
        setIsDiamondLoaded(true);
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Error fetching product details")
      setShowLoading(false)
    }
  };
  const fetchSettingDetails = async (settingId) => {
    try {
      const res = await settingService.getSettingDetail(settingId,configAppData.dealerid,isLabGrown); 
      if(res) {
        setSettingDetail(res);  
        const images = [];        
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
        setImages(images);
        setIssettingLoaded(true);
        setShowLoading(false)
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch diamond details. Please try again later.");
      setShowLoading(false)
    }
  };
   useEffect(() => {
    setShowLoading(true)
    let selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));   
    if(selectedRingSetting) {
      if(selectedRingSetting.settingId &&  selectedRingSetting.settingId!=""){
        setSettingId(selectedRingSetting.settingId);
        setSelectedRingSize(selectedRingSetting.ringSize);
        fetchSettingDetails(selectedRingSetting.settingId);  
        setShowLoading(false)    
      }
    }
    let selecteddiamond = JSON.parse(localStorage.getItem('selectedDiamond'));
    if(selecteddiamond) {
      if(selecteddiamond.diamondId &&  selecteddiamond.diamondId!=""){
        setDiamondId(selecteddiamond.diamondId);
        fetchDiamondDetails(selecteddiamond.diamondId,isLabGrown);
        //setShowLoading(false)
      }
    }
    //setIsSettingAnDiamondIdLoaded(true)
  }, []); 
  if (error) {
    return <ShowError error={error}/>;
  }
  return (
    <div className="complete">
      <FrameComponent4 configAppData={configAppData}/>
      <div className="complete-inner">
        <div className="frame-parent">
        {(settingId && diamondId) ?
        (issettingLoaded && isDiamondLoaded) &&
        <>
        <div className="image-container">
          <div className="plp-image-gallery">
            <div className="image-wrapper">
              <ImageGallery items={images} showPlayButton={false} showNav={false}  onErrorImageURL={imageUrl+'/no-image.jpg'}/>
            </div>               
          </div>
        </div>        
        <ProductDetails shopUrl={shopUrl} additionOptionSetting={additionOptionSetting} formSetting={formSetting} settingDetail={settingDetail} diamondDetail={diamondDetail} ringSize={selectedRingSize} configAppData={configAppData}/>
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
