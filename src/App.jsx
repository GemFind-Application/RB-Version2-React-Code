import { React,useEffect,useState } from "react";
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
import AlertPopUp from "./components/AlertPopUp";
import Footer from "./components/Footer";
import ThemeSetup from './components/ThemeSetup';
function App() {
  const location = useLocation();
  let diamondIdsToCompare = JSON.parse(localStorage.getItem('diamondIdsToCompare'));
  console.log(diamondIdsToCompare)
  const [ additionOptionSetting,setAdditionOptionSetting] = useState([]);
  const [ isAdditionOptionSettingLoaded,setIsAdditionOptionSettingLoaded] = useState(false);
  const [settingNavigation,setSettingNavigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettingNavLoaded, setIsSettingNavLoaded] = useState(false);
  const [compareDiamondsId, setCompareDiamondsId] = useState(diamondIdsToCompare?diamondIdsToCompare.length > 0?diamondIdsToCompare:[]:[]);
  const [isLabGrown, setIsLabGrown] = useState(false); // Default to Mined
  const [showAlertPopUp,setshowAlertPopUp] =useState(false);
  const [message,setMessage] =useState('');
  const [initialFilter,setInitialFilter] =useState(false);
  const [styleData,setStyleData] =useState({});
  const [isStyleLoaded,setIsStyleLoaded] = useState(false);
  const [title,setTitle] =useState('Compare Diamonds');
  const action = useNavigationType();
  const [styleDataDynamic,setStyleDataDynamic] =useState({});
  
  const pathname = location.pathname;
 
  const [shopUrl,setShopUrl]=useState(`${import.meta.env.VITE_SHOP_URL}`);
  const navigate = useNavigate();
  let configAppData = {
    show_powered_by:false,
    sorting_order: 'cost-l-h',
    price_row_format:'left',
    default_viewmode:'grid',   
    display_tryon:true,
    show_filter_info:true,
    enable_email_friend:true,
    enable_more_info:true,
    enable_print:true,
    enable_schedule_viewing:true,
    enable_hint:true,
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
  }, []);
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
    
    async function fetchStyleData(){
      try {
        const res = await appService.getStyleData();  
        if(res[0]) {                
          setStyleData(res[0][0]);
        
          let styleDataObj = {
            callToActionButton_color:res[0][0].callToActionButton[0].color2 && res[0][0].callToActionButton[0].color2!==""?res[0][0].callToActionButton[0].color2:res[0][0].callToActionButton[0].color1,
            
            link_color:res[0][0].linkColor[0].color2 && res[0][0].linkColor[0].color2!==""?res[0][0].linkColor[0].color2:res[0][0].linkColor[0].color1,
         
            
            hoverEffect_color:res[0][0].hoverEffect[0].color2 && res[0][0].hoverEffect[0].color2!==""?res[0][0].hoverEffect[0].color2:res[0][0].hoverEffect[0].color1,
            
            columnHeaderAccent_color:res[0][0].columnHeaderAccent[0].color2 && res[0][0].columnHeaderAccent[0].color2!==""?res[0][0].columnHeaderAccent[0].color2:res[0][0].columnHeaderAccent[0].color1,
            
          }
          console.log(styleDataObj)
          setStyleDataDynamic(styleDataObj);
          setIsStyleLoaded(true);
        }       
      } catch (err) {        
      }
    }
    fetchStyleData();
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
          setIsLabGrown(res[0].navStandard!=null ? (location.pathname.split('/'))[3]==='navlabgrown'? true: false :true);
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
   
    compareDiamondsId.splice(0, compareDiamondsId.length);

  },[isLabGrown])


  //const MyContext = React.createContext(styleData);
  
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
      setshowAlertPopUp(true)
      setMessage('Please select minimum 2 diamonds to compare.')
    }else{
      if(compareDiamondsId.length >6 ){
        setshowAlertPopUp(true)
       setMessage('You can select a maximum of 6 diamonds to compare! Please check your compare item page you have some items in your compare list.')
      }else{
        setshowAlertPopUp(false)
        setMessage('');
        navigate("/diamondtools/compare");
      }
      
    }   
  };
  const addCompareDiamondIds = (diamondId) => {
    let newcompareDiamonds = compareDiamondsId.filter(item => item === diamondId);
    console.log(newcompareDiamonds)
    if(newcompareDiamonds.length > 0){
      //remove from array
      let newcompareArray = compareDiamondsId.filter(item => item !== diamondId);
      setCompareDiamondsId(newcompareArray);
      
    }else{
      if(compareDiamondsId.length > 5 ){
        setshowAlertPopUp(true)
       setMessage('You can select a maximum of 6 diamonds to compare! Please check your compare item page you have some items in your compare list.')
      }else{
        setCompareDiamondsId([...compareDiamondsId,diamondId]);
        
      }
      
      
    }   
    //setCurrentPage(1);
  };
  const removeCompareDiamondIds = (diamondIdArray) => {
    console.log(diamondIdArray)
    if(diamondIdArray.length > 1) {
      setCompareDiamondsId([])
    }else{
      diamondIdArray.map(diamondId=>{
        let newcompareDiamonds = compareDiamondsId.filter(item => item !== diamondId);
        setCompareDiamondsId(newcompareDiamonds);
      })
    }
      
    }
    
    
 
  




  console.log(compareDiamondsId)
  return (
   
    <div>
       <ThemeSetup />
    {loading && isStyleLoaded &&
    <Routes>
      <Route path="/" element={<Settings  className={styleDataDynamic} configAppData={configAppData} shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown} />} />
      <Route path="/settings" element={<Settings className={styleDataDynamic} configAppData={configAppData}  shopUrl={shopUrl} settingNavigationData={settingNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown}/>} />      
      <Route path="/settings/view/path/:settingId"  element={<SettingDetails 
      setIsLabGrown={setIsLabGrown}
      configAppData={configAppData} shopUrl={shopUrl} 
      formSetting={additionOptionSetting}
      isLabGrown={isLabGrown} 
      settingNavigationData={settingNavigation}/>} />
      <Route path="/diamondtools/compare/" element={
        <Compare  
        isLabGrown={isLabGrown} configAppData={configAppData} removeCompareDiamondIds={removeCompareDiamondIds}
         compareDiamondsId={compareDiamondsId} />} />
      <Route path="/diamondtools" element={<Diamond additionOptionSetting={additionOptionSetting}  configAppData={configAppData} addCompareDiamondIds={addCompareDiamondIds} compareDiamondsId={compareDiamondsId} onCompareContainerClick={onCompareContainerClick}   isLabGrown={isLabGrown} setIsLabGrown={setIsLabGrown}/>} />
      <Route path="/diamondtools/product/:diamondId" element={<DiamondPage className={styleData} isLabGrown={isLabGrown} shopUrl={shopUrl}  additionOptionSetting={additionOptionSetting} configAppData={configAppData} formSetting={additionOptionSetting} />} />   
     
     
      <Route path="/diamondtools/diamondtype/navlabgrown" element={<Diamond additionOptionSetting={additionOptionSetting}  configAppData={configAppData} addCompareDiamondIds={addCompareDiamondIds} compareDiamondsId={compareDiamondsId} onCompareContainerClick={onCompareContainerClick}   isLabGrown={isLabGrown} setIsLabGrown={setIsLabGrown}/>} />   
      
      <Route path="/diamondtools/completering/" element={<Complete 
      shopUrl={shopUrl} isLabGrown={isLabGrown}
      additionOptionSetting={additionOptionSetting}
       formSetting={additionOptionSetting} 
       configAppData={configAppData}/>} />
      {/* <Route path="/diamond-table-scroll" element={<DiamondTableScroll />} /> */}
      {/* <Route path="/request-sent" element={<RequestSent />} /> */}
      {/* <Route path="/hint-sent" element={<HintSent />} /> */}
    </Routes>
    }
    <Footer configAppData={configAppData}></Footer>
    {showAlertPopUp && message!="" &&      
       <AlertPopUp       
       title={title}
       message={message}
       onClose={() => {setshowAlertPopUp(false) ; setMessage('')}}> 
       </AlertPopUp>
      }
    </div>
    
  );
}
export default App;
