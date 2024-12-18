import React, { useState ,useEffect} from "react";
import PropTypes from "prop-types";
import "./diamond-details1.css";
import ImageGallery from 'react-image-gallery';
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import { useNavigate, useParams } from "react-router-dom";
import ShowFltCostInCardDiamond from "./ShowFltCostInCardDiamond";
import { utils } from "../Helpers";
const DiamondExpandDetail = ({ className = "", diamond,configAppData ,getdiamondDetail,isLabGrown,}) => {
  const navigate = useNavigate();
  const images = [];
  const [isSettingSelected, setIsSettingSelected] = useState(false);
  // if (diamond.diamondImage) {
  //   images.push({
  //     original: diamond.diamondImage,
  //     thumbnail: diamond.diamondImage,
  //   });
  // }
  if (diamond.biggerDiamondimage) {
    images.push({
      original: diamond.biggerDiamondimage,
      thumbnail: diamond.biggerDiamondimage,
    });
  }
  const getdiamondDetailUrl = ()=>{
    const diamondDetailUrl= `${import.meta.env.VITE_DIAMOND_DETAIL_PAGE}`;
    return  ("/"+ diamondDetailUrl+"/"+utils.getDiamondViewUrl(diamond,isLabGrown))
  }
  const onButtonContainerClick = (diamondDetail) => {
   
    let isJsonString = utils.isJsonString(configAppData.settings_carat_ranges);
   let  diamondDetailurl = getdiamondDetailUrl();
    
    if(configAppData.settings_carat_ranges && isJsonString){
     let caratWeight = diamondDetail.caratWeight;
     let convertStringToArray = JSON.parse(configAppData.settings_carat_ranges);
     
     let appConfigWeight =  convertStringToArray[caratWeight];
     localStorage.setItem('selectedDiamond', JSON.stringify({diamondId:diamondDetail.diamondId,caratDetail:appConfigWeight,diamondUrl:diamondDetailurl}));
    }else{     
      let appConfigWeight =  (Number(diamondDetail.caratWeight) - 0.1).toFixed(2)+"-"+ (Number(diamondDetail.caratWeight)+0.1).toFixed(2);
      //console.log(appConfigWeight)
      localStorage.setItem('selectedDiamond', JSON.stringify({diamondId:diamondDetail.diamondId,caratDetail:appConfigWeight,diamondUrl:diamondDetailurl}));
    }
   // localStorage.setItem('selectedDiamond', JSON.stringify({diamondId:diamondIdToShow}));
    navigate("/diamondtools/completering");
  };
  const selectSetting = (diamondDetail) => { 
    let  diamondDetailurl = getdiamondDetailUrl();
    if(configAppData.settings_carat_ranges){
      let caratWeight = diamondDetail.caratWeight;
      let appConfigWeight =  configAppData.settings_carat_ranges[caratWeight];
      localStorage.setItem('selectedDiamond', JSON.stringify({diamondId:diamondDetail.diamondId,caratDetail:appConfigWeight,caratWeight:caratWeight,diamondUrl:diamondDetailurl}));
     }else{
      let caratWeight = diamondDetail.caratWeight;
       let appConfigWeight =  (Number(diamondDetail.caratWeight) - 0.1).toFixed(2)+"-"+ (Number(diamondDetail.caratWeight)+0.1).toFixed(2);
       //console.log(appConfigWeight)
       localStorage.setItem('selectedDiamond', JSON.stringify({diamondId:diamondDetail.diamondId,caratDetail:appConfigWeight,caratWeight:caratWeight,diamondUrl:diamondDetailurl}));
     }
    navigate("/settings");
  }
  useEffect(() => {
    let selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));
    if(selectedRingSetting) {
    if(selectedRingSetting.settingId &&  selectedRingSetting.settingId!=""){
      setIsSettingSelected(true)
    }}
   
  }, []);
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className={`diamond-details ${className}`}>
      <section className="dd-gallery">
        <ImageGallery items={images} showPlayButton={false} showThumbnails={false} showFullscreenButton={false} showNav={false} onErrorImageURL={imageUrl+'/no-image.jpg'}/>
      </section>
      <section className="content2">
        <div className="top2 tre343">
            <h3 className="diamond-details1">{diamond.shape} {' '}{diamond.carat} CARAT</h3>
          <div className="dd342">
                <div className="price4 no-display">Price:</div>
                <b className="b1"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
            </div>
          <div className="stats">
            <div className="spec-labels1">
                <div className="stats-label">Stock Number:</div>
                <a className="spec-values">{diamond.sku || '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Price Per Carat:</div>
              <a className="spec-values">{diamond.fltCaratPrice ? <ShowFltCostInCardDiamond diamondDetail={diamond} configAppData={configAppData}></ShowFltCostInCardDiamond> : '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Carat Weight:</div>
              <b className="spec-values">{diamond.carat || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Cut:</div>
              <a className="spec-values">{diamond.cut || '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Color:</div>
              <b className="spec-values">{diamond.color || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Clarity:</div>
              <b className="spec-values">{diamond.clarity || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Polish:</div>
              <b className="spec-values">{diamond.polish || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Symmetry:</div>
              <b className="spec-values">{diamond.symmetry || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Girdle:</div>
              <b className="spec-values">{diamond.gridle || diamond.girdleThin || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Culet:</div>
              <b className="spec-values">{diamond.culet || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Fluorescence:</div>
              <b className="spec-values">{diamond.fluorescence || '-'}</b>
            </div>
            
          </div>
        </div>
        <div className="number">
          <div className="measurement-labels">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
              src={`${imageUrl}`+"/fi-8467779.svg"}
            />
            <div className="x-x-measurement">
              <b className="x-x-values">{diamond.depth ? `${diamond.depth}%` : '-'}</b>
              <div className="depth">Depth</div>
            </div>
          </div>
          <div className="measurement-labels1">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
              src={`${imageUrl}`+"/fi-12791189.svg"}
            />
            <div className="x-x-measurement">
              <b className="b4">{diamond.table ? `${diamond.table}%` : '-'}</b>
              <div className="table">Table</div>
            </div>
          </div>
          <div className="measurement-labels2">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
             src={`${imageUrl}`+"/fi-8052211.svg"}
            />
            <div className="x-x-measurement">
              <b className="x371x232">{diamond.measurement || '-'}</b>
              <div className="measurement">Measurement</div>
            </div>
          </div>
          
        </div>
        <div class="buttons" >
          <div class="primary-buttons">
          {isSettingSelected===true ?
            <div class="button52" onClick={()=>onButtonContainerClick(diamond)}>
              Select - &nbsp;<b class="select-363440"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond>
              </b>
            </div>:
            <div class="button52" onClick={()=>selectSetting(diamond)}>Add Your Setting<b class="select-363440"></b></div>
            }            
        <div class="button52_b" onClick={getdiamondDetail}><b class="select-363440">View Details</b></div></div></div>
      </section>
    </div>
  );
};

DiamondExpandDetail.propTypes = {
  className: PropTypes.string,
  diamond: PropTypes.object.isRequired,
};

export default DiamondExpandDetail;