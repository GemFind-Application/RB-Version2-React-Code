import { useCallback ,useEffect,useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/frame-component5";
import V from "../components/v";
import TableColumns from "../components/table-columns";
import "./compare.css";
import { diamondService } from "../Services";
import { remove } from "lodash";
import ShowError from "../components/ShowError";
const Compare = ({compareDiamondsId,removeCompareDiamondIds,configAppData,isLabGrown,setShowLoading}) => {
  
  const [isAllDiamondDetailsLoaded, setIsAllDiamondDetailsLoaded] = useState(false);
  const [allDiamondDetailsToCompare, setAllDiamondDetailsToCompare] = useState([]);
  const [showAllParam, setShowAllParam] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  const fetchDiamondDetails = async (compareDiamondsId,isLabGrown) => {
    try {
        setShowLoading(true)
        const promises = compareDiamondsId.map((item) => diamondService.getDiamondDetail(item,isLabGrown,configAppData.dealerid));
        const diamondDataData = await Promise.all(promises);            
        if(diamondDataData){
          setAllDiamondDetailsToCompare(diamondDataData)
          setIsAllDiamondDetailsLoaded(true)
          setShowLoading(false)
        }         
    } catch (error) {
        console.error("Error fetching diamond details:", error);
        setError("Failed to fetch diamond details. Please try again later.");
    }
  };
  useEffect(() => {    
    window.scrollTo(0, 0);
    localStorage.setItem('diamondIdsToCompare',JSON.stringify(compareDiamondsId))
    fetchDiamondDetails(compareDiamondsId,isLabGrown);
  }, [compareDiamondsId]);
  const onBreadContainerClick = useCallback(() => {
    navigate("/diamondtools");
  }, [navigate]);
  if (error) {
    return <ShowError error={error}/>;
  }
  return (
    <div className="compare">
      {isAllDiamondDetailsLoaded &&
      <main className="empty">
        <div className="bread-wrapper">
          <div className="bread" onClick={onBreadContainerClick}>
            <div className="bread-inner">
              <img className="frame-child" alt="" src={`${imageUrl}`+"/vector-11.svg"} />
            </div>
            <b className="back-to-diamond backlink">Back to Diamond List</b>
          </div>
        </div>
        <FrameComponent5 
            setShowAllParam={setShowAllParam} 
            showAllParam={showAllParam}
            compareDiamondsId={compareDiamondsId}
            removeCompareDiamondIds={removeCompareDiamondIds}
            />
        {allDiamondDetailsToCompare.length>0 ?
        <>
        <section className="compareView">
        <section className="table-up">
          {allDiamondDetailsToCompare.map(item=>{
             return  <V
              configAppData={configAppData}
              key={item.diamondId}
              diamond={item}
              removeCompareDiamondIds={removeCompareDiamondIds}              
            />
          })
        }         
        </section>
        <section className="results1">       
          <TableColumns
          showAllParam={showAllParam}
           configAppData={configAppData}
            diamond={allDiamondDetailsToCompare}   
          />    
        </section>
        </section>
        </>:(
        <div className="no--compare-container">
          <div className="main-container" >           
            <b className="back-to-diamond no--compare">Please select Diamonds To compare</b>
          </div>
        </div>         
        )
        }
      </main>
      }    
    </div>
  );
};

export default Compare;
