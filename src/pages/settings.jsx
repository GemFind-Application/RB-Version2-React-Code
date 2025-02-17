import React, { useState, useEffect ,useContext,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Settingsbreadcrumb from "../components/Settingsbreadcrumb";
import SettingsFilterPanel from "../components/SettingsFilterPanel";
import SkeletonFilterPanel from "../components/SkeletonFilterPanel";
import ProductItems from "../components/product-items";
import PaginationPanel from "../components/pagination-panel";
import Header from '../components/Header';
import PortalPopup from "../components/portal-popup";
import "./settings.css";
import { diamondService, settingService } from '../Services';
import VideoTryOn from "../components/VideoTryOn";
import AlertPopUp from "../components/AlertPopUp";
import { ConfigContext } from "../components/Context"
import ShowError from "../components/ShowError"
const SkeletonProductItem = () => (
  <div className="product-item-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-price"></div>
  </div>
);

const Settings = ({settingNavigationData,setIsLabGrown,isLabGrown,configAppData,className,setShowLoading,setDocumentLoaded}) => {
  const dealerIdShop = useContext(ConfigContext);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showVirtualTryOnUrl, setShowVirtualTryOnUrl] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(configAppData.products_pp?parseInt(configAppData.products_pp):12);
  const [sortOrder, setSortOrder] = useState( configAppData.sorting_order === 'cost-l-h'  ? 'Low to High' : 'High to Low');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [isProductLoaded, setIsProductLoaded] = useState(false); 
  //const [settingNavigation,setSettingNavigation] = useState(settingNavigationData);
  const [navigation, setNavigation] = useState("") ;
  const [isSettingFilterLoaded, setIsSettingFilterLoaded] = useState(false);
  const [isserachIsClicked, setIsSerachIsClicked] = useState(false) ;
  const [showAlertPopUp,setshowAlertPopUp] =useState(false);
  const [message,setMessage] =useState('');
  const [selectedDiamondShape,setSelectedDiamondShape] = useState('');
  const [selectedDiamondCarat,setSelectedDiamondCarat] = useState([]);
  const [isResetClicked,setIsResetClicked] = useState(false);
  const [doReset,setDoReset] = useState(false);
  const [dealerId,setDealerId] = useState(dealerIdShop);
  const [showFilterDetails,setShowFilterDetails] = useState('');
  const [openFilter, setOpenFilter] = useState(null);
  let storedData = JSON.parse(localStorage.getItem('activeFilters')); 
  const scrollRef = useRef(null)
  const [activeFilters, setActiveFilters] = useState({
    collections: storedData ? storedData.collections.length > 0 ? storedData.collections:[]:[],
    metalType: storedData ? storedData.metalType.length > 0 ?storedData.metalType:[]:[],
    shapes: storedData ? storedData.shapes.length > 0 ?storedData.shapes:[]:[],
    price:storedData ?   storedData.price.length > 0 ? storedData.price :[]:[],
    search: storedData ?storedData.search!="" ? storedData.search :'':''
  });
  //const [searchQuery, setSearchQuery] = useState(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
  const navigate = useNavigate();
  useEffect(() => {
   // setIsLabGrown(false);
    localStorage.removeItem('selectedRing');    
    window.scrollTo(0, 0);
  }, []);
  const fetchProducts = async (page, pageSize, isLab, sort, filters) => {
    //setLoading(true);   
    setShowLoading(true)  
    setError(null);  
    try {    
      let option = {
        pageNumber:page,    
        pageSize:pageSize,
        searchSetting:filters.search,
        orderBy:sort === 'Low to High' ? 'cost+asc' : sort === 'High to Low' ? 'cost+desc' : 'newest',       
        priceMin:filters.price[0],
        priceMax:filters.price[1],
        shape: selectedDiamondShape!='' ? selectedDiamondShape:filters.shapes.join(','),
        metalType:filters.metalType.join(','),
        style:filters.collections.join(','),
        isLabSettingsAvailable:isLab,
        CenterStoneMinCarat:selectedDiamondShape!=""?selectedDiamondCarat[0] :'',
        CenterStoneMaxCarat :selectedDiamondShape!=""? selectedDiamondCarat[1]:''
      }
     
      const data = await settingService.getAllSettings(option,configAppData.dealerid); 
      if(data.mountingList) {
        setProducts(data.mountingList);
        setTotalProducts(data.count);
        setIsProductLoaded(true)
        setShowLoading(false)
      }     
    } catch (error) {
      console.error("Error fetching products:", error);
      setShowLoading(false)
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
     // setShowLoading(false)
    }
  };
  const showVirtualTryOnIframe = (stockNumber)=>{
    console.log("here")
    console.log(stockNumber)
    let url = `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${stockNumber}&buynow=0`;
    //console.log
    setShowVirtualTryOn(true);
    setShowVirtualTryOnUrl(url)
  }
  const confirmReset=() =>{
    setIsResetClicked(true)
  }
  const fetchFilterData = async (isLab,filters) => {
    try {
      
     
      let option = {         
        shape:filters.shapes.join(','),
        style:filters.collections.join(','),
        isLabSettingsAvailable:isLab 
      }
      const res = await settingService.getSettingFilters(option,configAppData.dealerid);  
      if(res && res.length>0)     {
        setFilterData(res[1][0]); 
        setIsSettingFilterLoaded(true);
      }   
    }    
    catch (error) {
      console.error("Error fetching filter data:", error);
      setError("Failed to fetch filter data. Please try again later.");
    }
  };

  useEffect(()=>{
    const fetchSelectedDiamondDetail= async(isLabGrown) =>{
    let selectedDiamond = JSON.parse(localStorage.getItem('selectedDiamond'));    
    if(selectedDiamond){
      const resSelectedDiamond = await diamondService.getDiamondDetail(selectedDiamond.diamondId,isLabGrown,configAppData.dealerid,configAppData.shop);  
     let selectedCaratArray = (selectedDiamond.caratDetail.split("-")) 
      setSelectedDiamondCarat(selectedCaratArray);
      if(resSelectedDiamond) {      
       setSelectedDiamondShape(resSelectedDiamond.shape);
       applyFilters({...activeFilters,shapes:[resSelectedDiamond.shape]});       
      }}
    } 
    setIsSettingFilterLoaded(false);
    setIsProductLoaded(false);
    setDocumentLoaded(true)
   fetchSelectedDiamondDetail(isLabGrown)
  },[])
  useEffect(() => {
    setShowLoading(true)
    fetchFilterData(isLabGrown,activeFilters).then(() => fetchProducts(currentPage, itemsPerPage, isLabGrown, sortOrder, activeFilters));
  }, [isLabGrown, currentPage, itemsPerPage, sortOrder, activeFilters,selectedDiamondShape]);
  //setIsLabGrown
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollRef.current.scrollIntoView();
  };

  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleLabGrownToggle = (isLab) => {
    setIsLabGrown(isLab);
    setCurrentPage(1);
  };

  const applyFilters = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };
 
  const searchSetting = event => { 
   console.log(event.target.value)
    if(event.target.value === ""){
      console.log('here is this')
      setIsSerachIsClicked(!isserachIsClicked);
      applyFilters({ ...activeFilters, search: event.target.value });
    }
    if(event.key==="Enter"){
      setIsSerachIsClicked(!isserachIsClicked);
      applyFilters({ ...activeFilters, search: event.target.value });
    }    
  }; 

  const resetFilters = () => {
    setActiveFilters({
      collections: [],
      metalType: [],
      shapes: [],
      price: [],
      search: ''
    });
    localStorage.removeItem('activeFilters');
    localStorage.removeItem('selectedDiamond');
    setSelectedDiamondCarat([]);
    setSelectedDiamondShape('');
    setCurrentPage(1);
  };

  const saveFilters = () => {
    localStorage.setItem('activeFilters', JSON.stringify(activeFilters));
    //alert('Filters saved successfully');
    setMessage('Filters saved successfully');
    setshowAlertPopUp(true);
  };

  if (error) {
    return <ShowError error={error}/>;
  }

  const updatedConfigAppData = {
    ...configAppData,
    navStandard: configAppData.navStandard || "Mined",
    navLabGrown: configAppData.navLabGrown || "Lab Grown",
  };

//console.log("===="+loading + isProductLoaded)
  return (
    <div className="settings">       
      <Settingsbreadcrumb 
        configAppData={updatedConfigAppData}
        isLabGrown={isLabGrown}
        setIsLabGrown={setIsLabGrown}
        className={className}
        settingNavigation={settingNavigationData}
      />
      <div className="settingsfilter-wrapper" ref={scrollRef}>
        {filterData && isSettingFilterLoaded ? (
        
          <SettingsFilterPanel 
            filterData={filterData}
            isLabGrown={isLabGrown}
            setIsLabGrown={handleLabGrownToggle}
            totalSettings={totalProducts}
            applyFilters={applyFilters}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            activeFilters={activeFilters}
            resetFilters={resetFilters}
            saveFilters={saveFilters}
            settingNavigation={settingNavigationData}
            searchSetting={searchSetting}   
            confirmReset={confirmReset}       
            selectedDiamondShape={selectedDiamondShape}  
            configAppData={configAppData}
            className={className}
            showFilterDetails={showFilterDetails}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />  

        ) : (
          <SkeletonFilterPanel />
        )}
      </div>
      <div className="setting-product-list" >
        {!loading && isProductLoaded ? (
           products.length===0 ? <div className='no-setting-found'>No Settings Found</div> : 
           products.map(product => (
            <ProductItems 
              configAppData ={configAppData}
              filterMetalType = {activeFilters.metalType}
              key={product.settingId} 
              showVirtualTryOnIframe={showVirtualTryOnIframe}
              product={{
                ...product,
                videoURL: product.videoURL || null,
              }}
            />
          ))
        
        ) : (
          Array(itemsPerPage).fill().map((_, index) => (
            <SkeletonProductItem key={index} />
          ))
        )}
      </div>
      {(isProductLoaded && products.length>0) &&
      <PaginationPanel 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalProducts}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      }
      {showVirtualTryOn && showVirtualTryOnUrl!="" &&
      <PortalPopup
        overlayColor="rgba(0, 0, 0, 0.3)"
        onOutsideClick={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
       <VideoTryOn
       src={showVirtualTryOnUrl}
       onClose={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
 
       </VideoTryOn></PortalPopup>
       }
      {showAlertPopUp && message!="" &&      
       <AlertPopUp       
       title={'Filter Saved'}
       message={'Filter Saved Sucessfully'}
       onClose={() => {setshowAlertPopUp(false) ; setMessage('')}}> 
       </AlertPopUp>
      }
      {isResetClicked==true &&      
       <AlertPopUp       
       title={'Reset'}
       message={'Do you reallly want to reset?'}
       onClick={() => {setIsResetClicked(false); resetFilters();setDoReset(!doReset) }}
       onClose={() => {setIsResetClicked(false);setMessage('')}}>        
       </AlertPopUp>
      }   
    </div>    
  );
};
export default Settings;