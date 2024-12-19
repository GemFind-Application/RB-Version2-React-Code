import React from "react";
import PropTypes from "prop-types";
import "./diamond-details1.css";
import ImageGallery from 'react-image-gallery';
import ShowCostInCardDiamond from "./showCostInCardDiamond";
import ShowPerCaratPrice from "./ShowPerCaratPrice";

const DiamondSpecificationDetail = ({ className = "", diamond,onClose,configAppData,additionOptionSetting }) => {
  const images = [];
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
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  return (
    <div className="popup-overlay ring-specs-popup">
      <div className="popup-content">
        <h2>Diamond Details</h2>
        <button className="close-button" onClick={onClose}>×</button>
      <section className="content2">
        <div className="top2">
          <p className="diamond-details1">{diamond.shape} {' '}{diamond.caratWeight} CARAT</p>
          <div className="stats">
            <div className="spec-labels1">
              <div className="stats-label">{"Stock Number"}:</div>
              <a className="spec-values">{ additionOptionSetting.show_In_House_Diamonds_First ?
                       diamond.stockNumber:
                       diamond.diamondId}</a>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Price:</div>
              <b className="spec-values"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
            </div>
            { additionOptionSetting.show_In_House_Diamonds_Column_with_SKU && 
              <div className="spec-labels1">
                <div className="stats-label">In House:</div>
                <b className="spec-values">{diamond.txtinhouse && diamond.txtinhouse ==true ? diamond.txtinhouse : '-'}</b>
              </div>
            }


            <div className="spec-labels1">
              <div className="stats-label">Price Per Carat:</div>
              <a className="spec-values">{diamond.fltPrice ? <ShowPerCaratPrice diamondDetail={diamond} configAppData={configAppData}></ShowPerCaratPrice> : '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="stats-label">Carat Weight:</div>
              <b className="spec-values">{diamond.caratWeight || '-'}</b>
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
            <div className="spec-labels1">
              <div className="stats-label">Intensity:</div>
              <b className="spec-values">{diamond.fancyColorIntensity || '-'}</b>
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
      </section>
    </div>
    </div>
  );
};

DiamondSpecificationDetail.propTypes = {
  className: PropTypes.string,
  diamond: PropTypes.object.isRequired,
};

export default DiamondSpecificationDetail;