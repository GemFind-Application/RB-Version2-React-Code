import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./frame-component2.css";

const DiamondFilter = ({ className = "" }) => {
  const navigate = useNavigate();

  const onCompContainerClick = useCallback(() => {
    navigate("/compare");
  }, [navigate]);

  const onTableContainerClick = useCallback(() => {
    navigate("/diamond-table");
  }, [navigate]);

  return (
    <div className={`diamond-inner ${className}`}>
      <div className="frame-parent9">
        <div className="top-group">
          <div className="top14">
            <b className="diamonds-founded2">126 Diamonds Founded</b>
            <div className="comp2" onClick={onCompContainerClick}>
              <div className="compare-diamonds3">Compare Diamonds</div>
              <div className="empty-button">
                <b className="placeholder">0</b>
              </div>
            </div>
            <div className="sort6">
              <div className="sort7">
                <div className="sort-by3">Sort by:</div>
                <b className="clarity9">Clarity</b>
                <img className="show-inner" alt="" src="/sort-show-icons.svg" />
              </div>
              <div className="show4">
                <div className="show5">Show:</div>
                <b className="per-page2">12 per Page</b>
                <img className="show-inner" alt="" src="/sort-show-icons.svg" />
              </div>
            </div>
          </div>
          <div className="filters-stone1">
            <div className="mid1">
              <div className="diamond-filters">
                <div className="filters-frame">
                  <div className="filters7">Filters:</div>
                </div>
                <div className="filters8">
                  <div className="price21">
                    <div className="shape-option">
                      <img className="shape-icon" alt="" src="/vector2.svg" />
                      <div className="shape5">Shape</div>
                    </div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="shape-placeholder">
                      <b className="placeholder1">1</b>
                    </div>
                    <div className="shape-info1">
                      <b className="i16">i</b>
                    </div>
                  </div>
                  <div className="price22">
                    <div className="price23">Price</div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="empty-options">
                      <b className="i16">i</b>
                    </div>
                  </div>
                  <div className="price24">
                    <div className="carat4">Carat</div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="div100">
                      <b className="i16">i</b>
                    </div>
                  </div>
                  <div className="metal1">
                    <div className="metal-option">
                      <div className="cut10">Cut</div>
                    </div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="empty-options">
                      <b className="i16">i</b>
                    </div>
                  </div>
                  <div className="price25">
                    <div className="filters7">Colour</div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="div100">
                      <b className="i16">i</b>
                    </div>
                  </div>
                  <div className="price26">
                    <div className="clarity10">Clarity</div>
                    <img className="show-inner" alt="" src="/vector-21.svg" />
                    <div className="empty-options">
                      <b className="i16">i</b>
                    </div>
                  </div>
                </div>
                <div className="actions9">
                  <div className="actions-child">
                    <div className="frame-child5" />
                  </div>
                  <div className="buttons3">
                    <div className="button27">
                      <img className="icons3" alt="" src="/vector-4.svg" />
                    </div>
                    <div className="button28">
                      <img
                        className="vector-icon26"
                        alt=""
                        src="/vector-5.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="div103">
                <div className="search4">
                  <img className="icon3" alt="" src="/vector-3.svg" />
                  <div className="search5">Search...</div>
                </div>
                <div className="view3">
                  <div className="grid3">
                    <img
                      className="fi-11034222-icon2"
                      alt=""
                      src="/fi-110342221.svg"
                    />
                    <b className="grid-view2">Grid View</b>
                  </div>
                  <div className="table7" onClick={onTableContainerClick}>
                    <img
                      className="fi-11034222-icon2"
                      alt=""
                      src="/fi-142371531.svg"
                    />
                    <div className="table-view2">Table View</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="advances1">
          <div className="adv2">
            <b className="advanced-filters2">Advanced Filters</b>
            <div className="adv-child">
              <img className="frame-child6" alt="" src="/vector-24.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DiamondFilter.propTypes = {
  className: PropTypes.string,
};

export default DiamondFilter;
