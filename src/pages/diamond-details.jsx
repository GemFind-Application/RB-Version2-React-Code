import { useState, useCallback ,useEffect} from "react";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import DealerInfo from "../components/dealer-info";
import PortalPopup from "../components/portal-popup";
import DiamondSpecificationDetail from "../components/diamond-specification-details";
import ImageGallery from 'react-image-gallery';
import MeasurementItems from "../components/measurement-items";
import Stats from "../components/stats";
import "./diamond-page.css";
import { diamondService } from "../Services";
import Header from "../components/Header";
import ShowCostInCardDiamond from "../components/showCostInCardDiamond";
import SocialIcon from "../components/SocialIcon";
import Footer from "../components/Footer";
const DiamondPage = ({formSetting,configAppData}) => {
  const { diamondId } = useParams();
  const [diamondDetail, setDiamondDetail] = useState({});
  const [isDiamondDetailLoaded, setIsAllDiamondDetailsLoaded] = useState(false);
  const [isDealerInfoOpen, setDealerInfoOpen] = useState(false);
  const [isDiamondDetailsOpen, setDiamondDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const fetchProductDetails = async (diamondId) => {
    try {
      const res = await diamondService.getDiamondDetail(diamondId); 
      if(res) {
        setDiamondDetail(res);  
        setIsAllDiamondDetailsLoaded(true)
      }     
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    fetchProductDetails(diamondId);
  }, [diamondId]);
  const onBreadContainerClick = useCallback(() => {
    navigate("/diamondtools");
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
  const images = [];
  if (diamondDetail.image2 && diamondDetail.image2 !='') {
    images.push({
      original: diamondDetail.image2,
      thumbnail: diamondDetail.image2,
    });
    images.push({
      original: diamondDetail.image1,
      thumbnail:diamondDetail.image1}
    );
  } else if (diamondDetail.image1) {
    images.push({
      original: diamondDetail.image1,
      thumbnail: diamondDetail.image1,
    });
  }
console.log(images)
  return (
    <>
      <div className="diamond-page">
        <main className="main">
          <Header/>
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
                    <ImageGallery items={images} />
                  </div>
                </div>
              </div>
              <div className="specifications">
                <div className="specs-container">
                  <div className="specs-content">
                    <div className="specs-details">
                      <div className="id-383212322">Id: {diamondDetail.diamondId}</div>
                      <h1 className="princess-1001-carath">
                      {diamondDetail.shape} {' '}{diamondDetail.caratWeight} CARATH
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
                      <b className="princess">{diamondDetail.shape}</b>
                    </div>
                    <div className="summary-items1">
                      <div className="carat">Carat:</div>
                      <b className="b11">{diamondDetail.caratWeight!="" ? diamondDetail.caratWeight:'-'}</b>
                    </div>
                    <div className="summary-items2">
                      <div className="colour">Colour:</div>
                      <b className="d">{diamondDetail.color!="" ? diamondDetail.color:'-'}</b>
                    </div>
                    <div className="summary-items3">
                      <div className="clarity2">Clarity:</div>
                      <b className="vvs1">{diamondDetail.clarity!="" ? diamondDetail.clarity:'-'}</b>
                    </div>
                    <div className="summary-items4">
                      <div className="cut3">Cut:</div>
                      <b className="very-good2">{diamondDetail.cut!="" ? diamondDetail.cut:'-'}</b>
                    </div>
                    <div className="summary-items5">
                      <div className="clarity2">Polish :</div>
                      <b className="very-good2">{diamondDetail.polish!="" ? diamondDetail.polish:'-'}</b>
                    </div>
                    <div className="summary-items6">
                      <div className="symmetry2">Symmetry:</div>
                      <b className="very-good2">{diamondDetail.symmetry!="" ? diamondDetail.symmetry:'-'}</b>
                    </div>
                    <div className="summary-items7">
                      <div className="intensity">Intensity:</div>
                      <b className="b12">-</b>
                    </div>
                  </div>
                  <div className="number2">
                    <MeasurementItems
                      fi8467779="/fi-8467779.svg"
                      measurementSubValues={diamondDetail.depth&&diamondDetail.depth!="" ? diamondDetail.depth+"%":'-'}
                      depth="Depth"
                    />
                    <MeasurementItems
                      fi8467779="/fi-12791189.svg"
                      measurementSubValues={diamondDetail.table&&diamondDetail.table!="" ? diamondDetail.table+"%":'-'}
                      depth="Table"
                      propFlex="0.2357"
                    />
                    <MeasurementItems
                      fi8467779="/fi-8052211.svg"
                      measurementSubValues={diamondDetail.measurement && diamondDetail.measurement!=""?diamondDetail.measurement:'-'}
                      depth="Measurement"
                      propFlex="1"
                    />
                  </div>
                </div>
                <div className="actions">
                  <div className="buttons">
                    <div className="primary-buttons">
                      <div className="button9" onClick={onButtonContainerClick}>
                        <b className="select-363440">Select - <ShowCostInCardDiamond configAppData={configAppData} diamondDetail={diamondDetail}></ShowCostInCardDiamond></b>
                      </div>
                      {/*<button className="button-fav">
                        <img className="heart-icon" alt="" src="/heart.svg" />
                        <b className="add-to-favorites">Add to Favorites</b>
                      </button>*/}
                    </div>
                  </div>
                  <SocialIcon socialIconSetting={formSetting}></SocialIcon>
                </div>
                <Stats 
                formSetting={formSetting}
                emailAFriend={() => setIsEmailAFriendOpen(true)}
                openDropHint={() => setIsDropHintOpen(true)}
                openScheduleViewing={() => setIsScheduleViewingOpen(true)}
                openRequestInfo={() => setIsRequestInfoOpen(true)}/>
              </div>
            </div>
          </section>
        </main>
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
          <DiamondSpecificationDetail 
          diamond={diamondDetail}
          configAppData={configAppData}
          onClose={closeDiamondDetails} />
        </PortalPopup>
      )}
    </>
  );
};

export default DiamondPage;
