import { React,useEffect,useState ,createContext} from "react";
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
import {ConfigContext} from './components/Context';
function App() {
  const location = useLocation();
  let diamondIdsToCompare = JSON.parse(localStorage.getItem('diamondIdsToCompare'));
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
  const [configAppData,setConfigAppData] =useState({});
  const pathname = location.pathname;
  const [isconfigLoaded,setIsConfigLoaded] = useState(false);
  const [shopUrl,setShopUrl]=useState('');
  const navigate = useNavigate();
  const shopUrlforEmail = `${import.meta.env.VITE_RING_URL_EXT}`;
  //console.log(window.location)
  useEffect(() => {
    async function fetchConfigSetting(){
      try {
        const res = await appService.getConfigSetting();  
        if(res) {
          let data = res.data;       
          setConfigAppData(data);
          setShopUrl(res.data.shop+shopUrlforEmail)
          setIsConfigLoaded(true);
        }       
      } catch (err) {       
        setError("Failed to fetch products. Please try again later."); 
      }
    }
    if (window.location.origin!='http://localhost:5173'){
      fetchConfigSetting();
    }else{
          let data = {
        show_powered_by:false,
        sorting_order: 'cost-l-h',
        price_row_format:'left',
        default_viewmode:'grid',   
        display_tryon:"1",
        show_filter_info:"true",
        enable_email_friend:true,
        enable_more_info:true,
        enable_print:true,
        enable_schedule_viewing:true,
        enable_hint:true,
        dealerid:1089,
        products_pp:12,
        secret_key:"6LdCz18jAAAAACbf0IhYqdKxhzLvNDqK7i-_zU0g",
        site_key:"6LdCz18jAAAAAHywVwcFZgXq0L0TDAyxjIw3uckW",
        shop:'https://gemfind-product-demo-10.myshopify.com/'
      }
      setShopUrl(data.shop+shopUrlforEmail)
      setConfigAppData(data);
      setIsConfigLoaded(true)
    }
   
  }, []);
  useEffect(() => {
    let storedFlowData = JSON.parse(localStorage.getItem('startflow'));
    //console.log(storedFlowData)
     if(storedFlowData===null){
       const pathname = location.pathname;
       localStorage.setItem('startflow',JSON.stringify({'path':pathname,'isLoaded':false}));
     }     
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {   
    async function fetchStyleData(id){
      try {
        const res = await appService.getStyleData(id);  
        if(res[0]) {                
          setStyleData(res[0][0]);        
          let styleDataObj = {
            callToActionButton_color:res[0][0].callToActionButton[0].color2 && res[0][0].callToActionButton[0].color2!==""?res[0][0].callToActionButton[0].color2:res[0][0].callToActionButton[0].color1,
            link_color:res[0][0].linkColor[0].color2 && res[0][0].linkColor[0].color2!==""?res[0][0].linkColor[0].color2:res[0][0].linkColor[0].color1,
            hoverEffect_color:res[0][0].hoverEffect[0].color2 && res[0][0].hoverEffect[0].color2!==""?res[0][0].hoverEffect[0].color2:res[0][0].hoverEffect[0].color1,
            columnHeaderAccent_color:res[0][0].columnHeaderAccent[0].color2 && res[0][0].columnHeaderAccent[0].color2!==""?res[0][0].columnHeaderAccent[0].color2:res[0][0].columnHeaderAccent[0].color1,
          }         
          setStyleDataDynamic(styleDataObj);
          setIsStyleLoaded(true);
        }       
      } catch (err) {  
        console.error("Error fetching style details:", err);  
        setError("Failed to fetch products. Please try again later.");    
      }
    }
    async function fetchAppSetting(id){
      try {
        const res = await appService.getAdditionalOption(id);  
        if(res[0]) {                
          setAdditionOptionSetting(res[0][0]);
          setIsAdditionOptionSettingLoaded(true);
        }       
      } catch (err) {        
        console.error("Error fetching app setting details:", err);  
        setError("Failed to fetch products. Please try again later.");
      }
    }
    async function fetchSettingNavigation(id){    
      try {
        let res={}
        let splitArray=location.pathname.split('/');
       console.log()
        if(splitArray[1]==='settings'){
          let isLab = splitArray[splitArray.length-2]==='islabsettings'? true:false;
          console.log("@@@@"+isLab)
          setIsLabGrown(isLab);
          res = await settingService.getSettingNavigation(id); 
          if(res[0]){
            setSettingNavigation(res[0]);
            setIsSettingNavLoaded(true);
          }
          setLoading(true);
        }
        if(splitArray[1]==='diamondtools'){
          let isLab = splitArray[splitArray.length-1]==='navlabgrown'? true: splitArray[splitArray.length-1]==='navfancycolored'?'fancy':false;
         //  isLab = ? fancy:false;
          setIsLabGrown(isLab);
          //res = await diamondService.getDiamondFilter(id); 
          setLoading(true);
        } 
       // if(res[0]) {
        //  setIsLabGrown((location.pathname.split('/'))[splitArray.length-1]==='navlabgrown'? true: false :true);
          
        //}       
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } 
    }
    if(configAppData.dealerid!==undefined){
      fetchSettingNavigation(configAppData.dealerid);
      fetchAppSetting(configAppData.dealerid);
      fetchStyleData(configAppData.dealerid);  
    }
   
  },[configAppData])
  useEffect(() => {   
   if(compareDiamondsId.length>0){
    compareDiamondsId.splice(0, compareDiamondsId.length);
   }  
  },[isLabGrown])
  useEffect(() => {
    let title = "";
    let metaDescription = "";
    let newPathName = pathname.split('/');
    console.log(newPathName)
    console.log("===="+pathname)
    switch (newPathName[1]) {
      case "/":
        title = configAppData.ring_meta_title
        metaDescription = configAppData.ring_meta_description
        break;
      case "/diamondtools/diamondtype/navlabgrown":
        title = configAppData.ring_meta_title
        metaDescription = configAppData.ring_meta_description
        break;
      case "/settings/view/path/:settingId":
        title = configAppData.ring_meta_title
        metaDescription = configAppData.ring_meta_description
        break;
      case "diamondtools/compare":
        title = configAppData.diamond_meta_title
        metaDescription = configAppData.diamond_meta_description
        break;
     
      case "/complete":
        title = "";
        metaDescription = "";
        break;
     
      case "diamondtools":
        title = configAppData.diamond_meta_title
        metaDescription = configAppData.diamond_meta_description
        break;
      case "/diamondtools":
          title = configAppData.diamond_meta_title
          metaDescription = configAppData.diamond_meta_description
          break;  
      case "settings":
        console.log(configAppData)
        title = configAppData.ring_meta_title
        metaDescription = configAppData.ring_meta_description
        break;
      case "/settings":
          console.log(configAppData)
          title = configAppData.ring_meta_title
          metaDescription = configAppData.ring_meta_description
          break;  
    }
console.log(title)
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
  }, [pathname,configAppData]);
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
    if(diamondIdArray.length > 1) {
      setCompareDiamondsId([])
    }else{
      diamondIdArray.map(diamondId=>{
        let newcompareDiamonds = compareDiamondsId.filter(item => item !== diamondId);
        setCompareDiamondsId(newcompareDiamonds);
      })
    }      
    }
  return (   
    <div>      
    <ThemeSetup />
    {loading && isStyleLoaded &&  isconfigLoaded &&   
    <Routes>
      <Route path="/" element={
        <Settings  
          className={styleDataDynamic} 
          configAppData={configAppData}  
          settingNavigationData={settingNavigation} 
          setIsLabGrown={setIsLabGrown} 
          isLabGrown={isLabGrown} 
        />} 
      />
      <Route path="/settings" element={
        <Settings 
          className={styleDataDynamic} 
          configAppData={configAppData}   
          settingNavigationData={settingNavigation} 
          setIsLabGrown={setIsLabGrown} 
          isLabGrown={isLabGrown}
        />} 
      />   
      <Route path="/settings/islabsettings/1" element={
        <Settings 
        className={styleDataDynamic} 
        configAppData={configAppData}   
        settingNavigationData={settingNavigation} 
        setIsLabGrown={setIsLabGrown} 
        isLabGrown={isLabGrown}
      />} 
      />     
      <Route path="/settings/view/path/:settingId"  element={
        <SettingDetails 
          setIsLabGrown={setIsLabGrown}
          configAppData={configAppData} 
          shopUrl={shopUrl} 
          formSetting={additionOptionSetting}
          isLabGrown={isLabGrown} 
          settingNavigationData={settingNavigation}
        />}
      />
      <Route path="/diamondtools/compare/" element={
        <Compare  
          isLabGrown={isLabGrown} 
          configAppData={configAppData} 
          removeCompareDiamondIds={removeCompareDiamondIds}
          compareDiamondsId={compareDiamondsId} 
        />} 
      />
      <Route path="/diamondtools" element={
        <Diamond 
          additionOptionSetting={additionOptionSetting} 
          configAppData={configAppData} 
          addCompareDiamondIds={addCompareDiamondIds} 
          compareDiamondsId={compareDiamondsId} 
          onCompareContainerClick={onCompareContainerClick}   
          isLabGrown={isLabGrown} setIsLabGrown={setIsLabGrown}
        />} 
      />
      <Route path="/diamondtools/product/:diamondId" element={
        <DiamondPage 
          className={styleData} 
          isLabGrown={isLabGrown} 
          shopUrl={shopUrl}  
          additionOptionSetting={additionOptionSetting} 
          configAppData={configAppData} 
          formSetting={additionOptionSetting} 
        />} 
      />       
      <Route path="/diamondtools/diamondtype/navlabgrown" element={
        <Diamond 
          additionOptionSetting={additionOptionSetting}  
          configAppData={configAppData} 
          addCompareDiamondIds={addCompareDiamondIds} 
          compareDiamondsId={compareDiamondsId} 
          onCompareContainerClick={onCompareContainerClick}  
          isLabGrown={isLabGrown} 
          setIsLabGrown={setIsLabGrown}
        />}
      />  
      <Route path="/diamondtools/diamondtype/navfancycolored" element={
        <Diamond 
          additionOptionSetting={additionOptionSetting}  
          configAppData={configAppData} 
          addCompareDiamondIds={addCompareDiamondIds} 
          compareDiamondsId={compareDiamondsId} 
          onCompareContainerClick={onCompareContainerClick}  
          isLabGrown={isLabGrown} 
          setIsLabGrown={setIsLabGrown}
        />}
      />  
      <Route path="/diamondtools/completering/" element={
          <Complete 
            shopUrl={shopUrl} 
            isLabGrown={isLabGrown}
            additionOptionSetting={additionOptionSetting}
            formSetting={additionOptionSetting} 
            configAppData={configAppData}
          />} 
      />     
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
