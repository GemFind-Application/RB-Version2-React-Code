import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Settingsbreadcrumb from "../components/Settingsbreadcrumb";
import SettingsFilterPanel from "../components/SettingsFilterPanel";
import SkeletonFilterPanel from "../components/SkeletonFilterPanel";
import ProductItems from "../components/product-items";
import PaginationPanel from "../components/pagination-panel";
import Header from '../components/Header';
import { BASE_URL, DEALER_ID } from '../components/api';
import PortalPopup from "../components/portal-popup";
import "./settings.css";
import { diamondService, settingService } from '../Services';
import VideoModal from "../components/VideoModal";
import AlertPopUp from "../components/AlertPopUp";
const SkeletonProductItem = () => (
  <div className="product-item-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-price"></div>
  </div>
);

const Settings = ({settingNavigationData,setIsLabGrown,isLabGrown,configAppData,className}) => {
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showVirtualTryOnUrl, setShowVirtualTryOnUrl] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
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
  let storedData = JSON.parse(localStorage.getItem('activeFilters')); 

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
    setIsLabGrown(false);
    localStorage.removeItem('selectedRing');
  }, []);
  const fetchProducts = async (page, pageSize, isLab, sort, filters) => {
    setLoading(true);    
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

      const data = await settingService.getAllSettings(option); 
      if(data.mountingList) {
        setProducts(data.mountingList);
        setTotalProducts(data.count);
        setIsProductLoaded(true)
      }
      

    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const showVirtualTryOnIframe = (stockNumber)=>{
    console.log("here")
    let url = `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${stockNumber}&buynow=0`;
    setShowVirtualTryOn(true);
    setShowVirtualTryOnUrl(url)
  }
  const confirmReset=() =>{
    setIsResetClicked(true)
  }
  const fetchFilterData = async (isLab,filters) => {
    try {
      setIsSettingFilterLoaded(false);
      setIsProductLoaded(false);
      let option = {         
        shape:filters.shapes.join(','),
        style:filters.collections.join(','),
        isLabSettingsAvailable:isLab 
      }
      const res = await settingService.getSettingFilters(option);  
      if(res && res.length>0)     {
        setFilterData(res[1][0]); 
        setIsSettingFilterLoaded(true);
       // setSettingNavigation(settingNavigationData)
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
      const resSelectedDiamond = await diamondService.getDiamondDetail(selectedDiamond.diamondId,isLabGrown);  
     let selectedCaratArray = (selectedDiamond.caratDetail.split("-")) 
      setSelectedDiamondCarat(selectedCaratArray)
      console.log(resSelectedDiamond)       
      if(resSelectedDiamond) {
       // resetFilters()
       console.log()
      
       setSelectedDiamondShape(resSelectedDiamond.shape);
       applyFilters({...activeFilters,shapes:[resSelectedDiamond.shape]})
       
      }}
  }
 
   fetchSelectedDiamondDetail(isLabGrown)
},[])

 console.log(selectedDiamondCarat)
  useEffect(() => {
    fetchFilterData(isLabGrown,activeFilters).then(() => fetchProducts(currentPage, itemsPerPage, isLabGrown, sortOrder, activeFilters));
  }, [isLabGrown, currentPage, itemsPerPage, sortOrder, activeFilters,selectedDiamondShape]);
  //setIsLabGrown
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    if(event.target.value === ""){
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
    return <div>Error: {error}</div>;
  }
//console.log(settingNavigation)
  return (
    <div className="settings">
      <Header />
      <Settingsbreadcrumb />
      <div className="settingsfilter-wrapper">
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
          />
        ) : (
          <SkeletonFilterPanel />
        )}
      </div>
      <div className="setting-product-list">
        {!loading && isProductLoaded ? (
           products.length===0 ? <div>No Settings Found</div> : 
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
      <PaginationPanel 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalProducts}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
     
      {showVirtualTryOn && showVirtualTryOnUrl!="" &&
      <PortalPopup
        overlayColor="rgba(0, 0, 0, 0.3)"
        onOutsideClick={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
       <VideoModal
       src={showVirtualTryOnUrl}
       onClose={() => {setShowVirtualTryOnUrl('') ; setShowVirtualTryOn(false)}}>
 
       </VideoModal></PortalPopup>
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