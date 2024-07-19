import { useEffect,useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DiamondTableScroll from "./pages/diamond-table-scroll";
import RequestSent from "./pages/request-sent";
import HintSent from "./pages/hint-sent";
import Compare from "./pages/compare";
import DiamondPage from "./pages/diamond-details";
import Complete from "./pages/complete";
import DiamondTable from "./pages/diamond-table";
import Diamond from "./pages/diamond";
import Settings from "./pages/settings";
import SettingDetails from "./pages/setting-details"; 
import { appService } from './Services';
import { settingService } from './Services';
import Footer from "./components/Footer"
function App() {
  const [ additionOptionSetting,setAdditionOptionSetting] = useState([]);
  const [ isAdditionOptionSettingLoaded,setIsAdditionOptionSettingLoaded] = useState(false);
  const [settingNavigation,setSettingNavigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettingNavLoaded, setIsSettingNavLoaded] = useState(false);
  const [compareDiamondsId, setCompareDiamondsId] = useState([]);
  const [isLabGrown, setIsLabGrown] = useState(false); // Default to Mined
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
 
  const [shopUrl,setShopUrl]=useState(`${import.meta.env.VITE_SHOP_URL}`);
  const navigate = useNavigate();
  let configAppData = {
    show_powered_by:false,
    sorting_order: 'cost-l-h',
    price_row_format:'lefjt',
    default_viewmode:'grid',   
    display_tryon:true,
  }
  useEffect(() => {
    let storedFlowData = JSON.parse(localStorage.getItem('startflow'));
    console.log(storedFlowData)
     if(storedFlowData===null){
       const pathname = location.pathname;
       localStorage.setItem('startflow',JSON.stringify({'path':pathname,'isLoaded':false}));
     } 
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  useEffect(() => {
    async function fetchAppSetting(){
      try {
        const res = await appService.getAdditionalOption();  

        if(res[0]) {
                
          setAdditionOptionSetting(res[0][0]);
          setIsAdditionOptionSettingLoaded(true);
        }       
      } catch (err) {        
      }
    }
    fetchAppSetting();
  },[])
  
  useEffect(() => {   
    async function fetchSettingNavigation(){
      try {
        const res = await settingService.getSettingNavigation();  
        console.log(res); 
        if(res[0]) {
          setSettingNavigation(res[0]);
          setIsSettingNavLoaded(true);
          setIsLabGrown(res[0].navStandard!=null ? false :true);
          setLoading(true);
        }       
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } 
    }
    fetchSettingNavigation();
  },[])
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/request-sent":
        title = "";
        metaDescription = "";
        break;
      case "/hint-sent":
        title = "";
        metaDescription = "";
        break;
      case "/compare":
        title = "";
        metaDescription = "";
        break;
      case "/diamond-page":
        title = "";
        metaDescription = "";
        break;
      case "/setting-details":
        title = "";
        metaDescription = "";
        break;
      case "/complete":
        title = "";
        metaDescription = "";
        break;
      case "/diamond-table":
        title = "";
        metaDescription = "";
        break;
      case "/diamond":
        title = "";
        metaDescription = "";
        break;
      case "/settings":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  const onCompareContainerClick = () => {

    if(compareDiamondsId.length <2){
      alert('Please select minimum 2 diamonds to compare.')
    }else{
      if(compareDiamondsId.length >6 ){
        alert('You can select a maximum of 6 diamonds to compare! Please check your compare item page you have some items in your compare list.')
      }else{
        navigate("/compare");
      }
      
    }   
  };
  const addCompareDiamondIds = (diamondId) => {
    let newcompareDiamonds = compareDiamondsId.filter(item => item === diamondId);
    console.log(newcompareDiamonds)
    if(newcompareDiamonds.length > 0){
      let newcompareArray = compareDiamondsId.filter(item => item !== diamondId);
      setCompareDiamondsId(newcompareArray);
    }else{
      setCompareDiamondsId([...compareDiamondsId,diamondId]);
    }   
    //setCurrentPage(1);
  };
  const removeCompareDiamondIds = (diamondId) => {
   let newcompareDiamonds = compareDiamondsId.filter(item => item !== diamondId);
   setCompareDiamondsId(newcompareDiamonds);
  };
  console.log(settingNavigation)
  return (
    <div>
    {loading &&
    <Routes>
      <Route path="/" element={<Settings  configAppData={configAppData} shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown} />} />
      <Route path="/settings" element={<Settings configAppData={configAppData}  shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown}/>} />      
      <Route path="/setting-details/:settingId"  element={<SettingDetails 
      configAppData={configAppData} shopUrl={shopUrl} 
      formSetting={additionOptionSetting}
      isLabGrown={isLabGrown} 
      settingNavigationData={settingNavigation}/>} />
      <Route path="/compare" element={<Compare  configAppData={configAppData} removeCompareDiamondIds={removeCompareDiamondIds} compareDiamondsId={compareDiamondsId} />} />
      <Route path="/diamondtools" element={<Diamond  configAppData={configAppData} addCompareDiamondIds={addCompareDiamondIds} compareDiamondsId={compareDiamondsId} onCompareContainerClick={onCompareContainerClick}   isLabGrown={isLabGrown} setIsLabGrown={setIsLabGrown}/>} />
      <Route path="/diamond-details/:diamondId" element={<DiamondPage additionOptionSetting={additionOptionSetting} configAppData={configAppData} formSetting={additionOptionSetting} />} />   
      <Route path="/complete" element={<Complete
       formSetting={additionOptionSetting} 
       configAppData={configAppData}/>} />
      {/* <Route path="/diamond-table-scroll" element={<DiamondTableScroll />} /> */}
      {/* <Route path="/request-sent" element={<RequestSent />} /> */}
      {/* <Route path="/hint-sent" element={<HintSent />} /> */}
    </Routes>
    }
    <Footer configAppData={configAppData}></Footer>
    </div>
    
  );
}
export default App;
