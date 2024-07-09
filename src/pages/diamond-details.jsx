import { useState, useCallback } from "react";
import DealerInfo from "../components/dealer-info";
import PortalPopup from "../components/portal-popup";
import DiamondDetails1 from "../components/diamond-details1";
import { useNavigate } from "react-router-dom";
import MeasurementItems from "../components/measurement-items";
import Stats from "../components/stats";
import "./diamond-page.css";

const DiamondPage = () => {
  const [isDealerInfoOpen, setDealerInfoOpen] = useState(false);
  const [isDiamondDetailsOpen, setDiamondDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const onBreadContainerClick = useCallback(() => {
    navigate("/diamond");
  }, [navigate]);

  const openDealerInfo = useCallback(() => {
    setDealerInfoOpen(true);
  }, []);

  const closeDealerInfo = useCallback(() => {
    setDealerInfoOpen(false);
  }, []);

  const openDiamondDetails = useCallback(() => {
    setDiamondDetailsOpen(true);
  }, []);

  const closeDiamondDetails = useCallback(() => {
    setDiamondDetailsOpen(false);
  }, []);

  const onButtonContainerClick = useCallback(() => {
    navigate("/complete");
  }, [navigate]);

  return (
    <>
      <div className="diamond-page">
        <main className="main">
          <header className="head">
            <img
              className="jewellery-icon"
              loading="lazy"
              alt=""
              src="/jewellery.svg"
            />
            <nav className="navigation">
              <nav className="menu1">
                <a className="menu-element5">Menu Element</a>
                <a className="menu-element5">Menu Element</a>
                <a className="menu-element5">Menu Element</a>
                <a className="menu-element5">Menu Element</a>
                <a className="menu-element5">Menu Element</a>
              </nav>
            </nav>
            <div className="content9">
              <div className="hero">
                <div className="hero-action">
                  <img
                    className="acc-icon"
                    loading="lazy"
                    alt=""
                    src="/acc.svg"
                  />
                </div>
                <div className="hero-images">
                  <img
                    className="vector-icon3"
                    loading="lazy"
                    alt=""
                    src="/vector.svg"
                  />
                  <div className="hero-shapes">
                    <a className="hero-icons">2</a>
                  </div>
                </div>
                <div className="hero-images">
                  <img
                    className="vector-icon4"
                    loading="lazy"
                    alt=""
                    src="/vector-1.svg"
                  />
                  <div className="hero-shapes">
                    <a className="hero-icons">5</a>
                  </div>
                </div>
                <div className="hero-images">
                  <img
                    className="vector-icon5"
                    loading="lazy"
                    alt=""
                    src="/vector-2.svg"
                  />
                  <div className="hero-shapes">
                    <a className="hero-icons">3</a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <section className="product">
            <div className="product-details">
              <div className="product-info">
                <div className="breadcrumb">
                  <div className="bread1" onClick={onBreadContainerClick}>
                    <div className="breadcrumb-item">
                      <img
                        className="breadcrumb-separator-icon"
                        loading="lazy"
                        alt=""
                        src="/vector-11.svg"
                      />
                    </div>
                    <b className="back-to-all">Back to All Diamonds</b>
                  </div>
                  <div className="product-gallery">
                    <div className="image">
                      <img
                        className="image-9-icon"
                        loading="lazy"
                        alt=""
                        src="/image-91@2x.png"
                      />
                    </div>
                    <div className="thumbnails">
                      <div className="product-actions">
                        <div className="product-action-primary">
                          <div className="product-action-secondary">
                            <img
                              className="action-icon"
                              alt=""
                              src="/action-icon.svg"
                            />
                          </div>
                          <div className="image1">
                            <img
                              className="image-9-icon1"
                              alt=""
                              src="/image-9-1@2x.png"
                            />
                          </div>
                        </div>
                        <div className="link" onClick={openDealerInfo}>
                          <div className="back-to-all">
                            <span>{`Internal Use Only: `}</span>
                            <b className="dealer-info2">Dealer Info</b>
                          </div>
                          <input className="fi-16159386" type="checkbox" />
                        </div>
                      </div>
                      <div className="thumbnail-images">
                        <div className="image2">
                          <img
                            className="image-9-icon1"
                            loading="lazy"
                            alt=""
                            src="/image-9-2@2x.png"
                          />
                        </div>
                      </div>
                      <div className="thumbnail-images1">
                        <div className="image2">
                          <img
                            className="image-9-icon1"
                            loading="lazy"
                            alt=""
                            src="/image-9-3@2x.png"
                          />
                        </div>
                      </div>
                      <img
                        className="gallery-separator-icon"
                        alt=""
                        src="/gallery-separator.svg"
                      />
                      <div className="image4">
                        <img
                          className="image-9-icon1"
                          loading="lazy"
                          alt=""
                          src="/image-9-4@2x.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="specifications">
                <div className="specs-container">
                  <div className="specs-content">
                    <div className="specs-details">
                      <div className="id-383212322">Id: 383212322</div>
                      <h1 className="princess-1001-carath">
                        Princess 10.01 CARATH
                      </h1>
                      <div className="specs-header">
                        <div className="header-items">
                          <b className="header-labels">$363,440</b>
                        </div>
                        <div className="header-items1">
                          <div className="header-items-child" />
                        </div>
                        <div className="ships" onClick={openDiamondDetails}>
                          <div className="header-items">
                            <div className="back-to-all">
                              Diamond Specifications
                            </div>
                          </div>
                          <img
                            className="group-icon1"
                            loading="lazy"
                            alt=""
                            src="/group.svg"
                          />
                        </div>
                        <div className="header-items1">
                          <div className="header-items-child" />
                        </div>
                        <div className="header-items3">
                          <div className="diamond-grading-report">
                            Diamond Grading Report
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="certification">
                      <img
                        className="sertif-icon"
                        loading="lazy"
                        alt=""
                        src="/sertif@2x.png"
                      />
                      <b className="this-i-color">
                        This I color, SI1 clarity diamond comes accompanied by a
                        diamond grading report from GIA
                      </b>
                    </div>
                  </div>
                  <div className="stats5">
                    <div className="summary-items">
                      <div className="shape1">Shape:</div>
                      <b className="princess">Princess</b>
                    </div>
                    <div className="summary-items1">
                      <div className="carat">Carat:</div>
                      <b className="b11">10.01</b>
                    </div>
                    <div className="summary-items2">
                      <div className="colour">Colour:</div>
                      <b className="d">D</b>
                    </div>
                    <div className="summary-items3">
                      <div className="clarity2">Clarity:</div>
                      <b className="vvs1">VVS1</b>
                    </div>
                    <div className="summary-items4">
                      <div className="cut3">Cut:</div>
                      <b className="very-good2">Very good</b>
                    </div>
                    <div className="summary-items5">
                      <div className="clarity2">Polish :</div>
                      <b className="very-good2">Very good</b>
                    </div>
                    <div className="summary-items6">
                      <div className="symmetry2">Symmetry:</div>
                      <b className="very-good2">Very good</b>
                    </div>
                    <div className="summary-items7">
                      <div className="intensity">Intensity:</div>
                      <b className="b12">-</b>
                    </div>
                  </div>
                  <div className="number2">
                    <MeasurementItems
                      fi8467779="/fi-8467779.svg"
                      measurementSubValues="62.4%"
                      depth="Depth"
                    />
                    <MeasurementItems
                      fi8467779="/fi-12791189.svg"
                      measurementSubValues="57%"
                      depth="Table"
                      propFlex="0.2357"
                    />
                    <MeasurementItems
                      fi8467779="/fi-8052211.svg"
                      measurementSubValues="3.74X3.71X2.32"
                      depth="Measurement"
                      propFlex="1"
                    />
                  </div>
                </div>
                <div className="actions">
                  <div className="buttons">
                    <div className="primary-buttons">
                      <div className="button9" onClick={onButtonContainerClick}>
                        <b className="select-363440">Select - $363,440</b>
                      </div>
                      <button className="button-fav">
                        <img className="heart-icon" alt="" src="/heart.svg" />
                        <b className="add-to-favorites">Add to Favorites</b>
                      </button>
                    </div>
                  </div>
                  <div className="share">
                    <button className="button10">
                      <img
                        className="social-icons"
                        alt=""
                        src="/vector-32.svg"
                      />
                      <b className="save1">Save</b>
                    </button>
                    <button className="button11">
                      <img
                        className="vector-icon6"
                        alt=""
                        src="/vector-41.svg"
                      />
                      <b className="post">Post</b>
                    </button>
                    <button className="button10">
                      <img
                        className="vector-icon7"
                        alt=""
                        src="/vector-51.svg"
                      />
                      <b className="share1">Share</b>
                    </button>
                    <button className="button11">
                      <img
                        className="vector-icon8"
                        alt=""
                        src="/vector-6.svg"
                      />
                      <b className="like">Like</b>
                    </button>
                  </div>
                </div>
                <Stats />
              </div>
            </div>
          </section>
        </main>
        <footer className="pagination3">
          <div className="back-to-all">
            © 2024 GemFind App Store Powered by GemFind.
          </div>
        </footer>
      </div>
      {isDealerInfoOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDealerInfo}
        >
          <DealerInfo onClose={closeDealerInfo} />
        </PortalPopup>
      )}
      {isDiamondDetailsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDiamondDetails}
        >
          <DiamondDetails1 onClose={closeDiamondDetails} />
        </PortalPopup>
      )}
    </>
  );
};

export default DiamondPage;
