import { useEffect,useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
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
function App() {
  const [ socialIconSetting,setSocialIconSetting] = useState([]);
  const [ isSocialIconSetting,setIsSocialIconSetting] = useState(false);
  const [settingNavigation,setSettingNavigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettingNavLoaded, setIsSettingNavLoaded] = useState(false);
   const [isLabGrown, setIsLabGrown] = useState(false); // Default to Mined
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [shopUrl,setShopUrl]=useState(`${import.meta.env.VITE_SHOP_URL}`);
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  useEffect(() => {
    async function fetchAppSetting(){
      try {
        const res = await appService.getAdditionalOption();  
        if(res[0]) {
          setSocialIconSetting(res[0][0]);
          setIsSocialIconSetting(true);
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

  return (
    <div>
    {loading &&
    <Routes>
      <Route path="/" element={<Settings shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown} />} />
      <Route path="/settings" element={<Settings shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown}/>} />      
      <Route path="/setting-details/:settingId" element={<SettingDetails shopUrl={shopUrl} formSetting={socialIconSetting} isLabGrown={isLabGrown} settingNavigationData={settingNavigation}/>} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/diamondtools" element={<Diamond />} />
      <Route path="/diamond-details" element={<DiamondPage />} />
      <Route path="/diamond-table" element={<DiamondTable />} />
      <Route path="/complete" element={<Complete />} />
      {/* <Route path="/diamond-table-scroll" element={<DiamondTableScroll />} /> */}
      {/* <Route path="/request-sent" element={<RequestSent />} /> */}
      {/* <Route path="/hint-sent" element={<HintSent />} /> */}
    </Routes>
    }
    </div>
  );
}
export default App;
