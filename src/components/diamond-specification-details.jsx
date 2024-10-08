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
              <div className="stock-number">{"Stock Number"}:</div>
              <a className="spec-values">{ additionOptionSetting.show_In_House_Diamonds_First ?
                       diamond.stockNumber:
                       diamond.diamondId}</a>
            </div>
            <div className="spec-labels1">
              <div className="price4">Price:</div>
              <b className="b1"><ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamond}></ShowCostInCardDiamond></b>
            </div>
            { additionOptionSetting.show_In_House_Diamonds_Column_with_SKU && 
              <div className="spec-labels1">
                <div className="price4">In House:</div>
                <b className="b1">{diamond.txtinhouse && diamond.txtinhouse ==true ? diamond.txtinhouse : '-'}</b>
              </div>
            }


            <div className="spec-labels1">
              <a className="price-per-carat">Price Per Carat:</a>
              <a className="a">{diamond.fltPrice ? <ShowPerCaratPrice diamondDetail={diamond}></ShowPerCaratPrice> : '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="carat-weight">Carat Weight:</div>
              <b className="b2">{diamond.caratWeight || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="cut1">Cut:</div>
              <a className="excellent">{diamond.cut || '-'}</a>
            </div>
            <div className="spec-labels1">
              <div className="color">Color:</div>
              <b className="e">{diamond.color || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="clarity">Clarity:</div>
              <b className="i11">{diamond.clarity || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="polish">Polish:</div>
              <b className="very-good">{diamond.polish || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="symmetry">Symmetry:</div>
              <b className="excellent1">{diamond.symmetry || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="girdle">Girdle:</div>
              <b className="b3">{diamond.gridle || diamond.girdleThin || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="color">Culet:</div>
              <b className="none">{diamond.culet || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="fluorescence1">Fluorescence:</div>
              <b className="none">{diamond.fluorescence || '-'}</b>
            </div>
            <div className="spec-labels1">
              <div className="fluorescence1">Intensity:</div>
              <b className="none">{diamond.fancyColorIntensity || '-'}</b>
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