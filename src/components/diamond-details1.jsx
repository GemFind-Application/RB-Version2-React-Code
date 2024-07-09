import PropTypes from "prop-types";
import "./diamond-details1.css";

const DiamondDetails1 = ({ className = "" }) => {
  return (
    <div className={`diamond-details ${className}`}>
      <section className="content2">
        <div className="top2">
          <h3 className="diamond-details1">Diamond Details</h3>
          <div className="stats">
            <div className="spec-labels">
              <div className="stock-number">Stock Number:</div>
              <a className="spec-values">387952732</a>
            </div>
            <div className="spec-labels1">
              <div className="price4">Price:</div>
              <b className="b1">$363,440</b>
            </div>
            <div className="spec-labels1">
              <a className="price-per-carat">Price Per Carat:</a>
              <a className="a">$1,990</a>
            </div>
            <div className="spec-labels1">
              <div className="carat-weight">Carat Weight:</div>
              <b className="b2">0,30</b>
            </div>
            <div className="spec-labels1">
              <div className="cut1">Cut:</div>
              <a className="excellent">Excellent</a>
            </div>
            <div className="spec-labels1">
              <div className="color">Color:</div>
              <b className="e">E</b>
            </div>
            <div className="spec-labels1">
              <div className="clarity">Clarity:</div>
              <b className="i11">I1</b>
            </div>
            <div className="spec-labels1">
              <div className="polish">Polish:</div>
              <b className="very-good">Very good</b>
            </div>
            <div className="spec-labels1">
              <div className="symmetry">Symmetry:</div>
              <b className="excellent1">Excellent</b>
            </div>
            <div className="spec-labels1">
              <div className="girdle">Girdle:</div>
              <b className="b3">-</b>
            </div>
            <div className="spec-labels1">
              <div className="color">Culet:</div>
              <b className="none">None</b>
            </div>
            <div className="spec-labels1">
              <div className="fluorescence1">Fluorescence:</div>
              <b className="none">None</b>
            </div>
          </div>
        </div>
        <div className="number">
          <div className="measurement-labels">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
              src="/fi-8467779.svg"
            />
            <div className="x-x-measurement">
              <b className="x-x-values">62.4%</b>
              <div className="depth">Depth</div>
            </div>
          </div>
          <div className="measurement-labels1">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
              src="/fi-12791189.svg"
            />
            <div className="x-x-measurement">
              <b className="b4">57%</b>
              <div className="table">Table</div>
            </div>
          </div>
          <div className="measurement-labels2">
            <img
              className="fi-8467779-icon"
              loading="lazy"
              alt=""
              src="/fi-8052211.svg"
            />
            <div className="x-x-measurement">
              <b className="x371x232">3.74X3.71X2.32</b>
              <div className="measurement">Measurement</div>
            </div>
          </div>
        </div>
      </section>
      <img className="close-icon1" loading="lazy" alt="" src="/close.svg" />
    </div>
  );
};

DiamondDetails1.propTypes = {
  className: PropTypes.string,
};

export default DiamondDetails1;
