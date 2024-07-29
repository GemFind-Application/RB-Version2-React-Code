import { useCallback ,useEffect,useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/frame-component5";
import V from "../components/v";
import TableColumns from "../components/table-columns";
import "./compare.css";
import { diamondService } from "../Services";

const Compare = ({compareDiamondsId,removeCompareDiamondIds,configAppData,isLabGrown}) => {
  console.log(compareDiamondsId)
  const [isAllDiamondDetailsLoaded, setIsAllDiamondDetailsLoaded] = useState(false);
  const [allDiamondDetailsToCompare, setAllDiamondDetailsToCompare] = useState([]);
  const [showAllParam, setShowAllParam] = useState(true);
  const navigate = useNavigate();
  const fetchDiamondDetails = async (compareDiamondsId,isLabGrown) => {
   
        try {
            const promises = compareDiamondsId.map((item) => diamondService.getDiamondDetail(item,isLabGrown));
            const diamondDataData = await Promise.all(promises);
            console.log(diamondDataData)
            if(diamondDataData){

              setAllDiamondDetailsToCompare(diamondDataData)
              setIsAllDiamondDetailsLoaded(true)
            }
            console.log(diamondDataData)
            //const filteredPokemon = diamondDataData.map(filterPokemonData);
           // setPokemon(filteredPokemon);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
  };
  useEffect(() => {
    fetchDiamondDetails(compareDiamondsId,isLabGrown);
  }, [compareDiamondsId]);
  const onBreadContainerClick = useCallback(() => {
    navigate("/diamondtools");
  }, [navigate]);

  return (
    <div className="compare">
      <Header />
      {isAllDiamondDetailsLoaded &&
      <main className="empty">
        <div className="bread-wrapper">
          <div className="bread" onClick={onBreadContainerClick}>
            <div className="bread-inner">
              <img className="frame-child" alt="" src="/vector-11.svg" />
            </div>
            <b className="back-to-diamond">Back to Diamond List</b>
          </div>
        </div>
        <FrameComponent5 
            setShowAllParam={setShowAllParam} 
            showAllParam={showAllParam}
            />
        {allDiamondDetailsToCompare.length>0 ?
        <>
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
