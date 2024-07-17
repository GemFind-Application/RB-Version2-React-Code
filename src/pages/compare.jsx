import { useCallback ,useEffect,useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/frame-component5";
import V from "../components/v";
import TableColumns from "../components/table-columns";
import "./compare.css";
import { diamondService } from "../Services";

const Compare = ({compareDiamondsId}) => {
  console.log(compareDiamondsId)
  const [isAllDiamondDetailsLoaded, setIsAllDiamondDetailsLoaded] = useState(false);
  const [allDiamondDetailsToCompare, setAllDiamondDetailsToCompare] = useState([]);
  const navigate = useNavigate();
  const fetchDiamondDetails = async (compareDiamondsId) => {
   
        try {
            const promises = compareDiamondsId.map((item) => diamondService.getDiamondDetail(item));
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
    fetchDiamondDetails(compareDiamondsId);
  }, []);
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
        <FrameComponent5 />
        <section className="table-up">
          {allDiamondDetailsToCompare.map(item=>{
             return  <V
              key={item.diamondId}
              diamond={item}
              
            />
          })
        }         
        </section>
        <section className="results1">
       
              <TableColumns
            diamond={allDiamondDetailsToCompare}
            
             shape="Shape"
             round="Round"
             round1="Round"
             round2="Round"
             round3="Round"
             round4="Round"
             round5="Round"
           />
         
        
        </section>
      </main>
      }
     <Footer></Footer>
    </div>
  );
};

export default Compare;
