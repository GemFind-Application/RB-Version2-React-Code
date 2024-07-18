import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import DiamondNavigation from "../components/diamond-navigation";
import DiamondFilter from "../components/diamond-filter";
import Items from "../components/items";
import PaginationPanel from "../components/pagination-panel";
import "./diamond.css";
import SkeletonFilterPanel from "../components/SkeletonFilterPanel";
import AlertPopUp from "../components/AlertPopUp";
import List1 from "../components/list1";
import { diamondService } from '../Services';
import { settingService } from '../Services';
import Footer from '../components/Footer';
const SkeletonProductItem = () => (
  <div className="product-item-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-price"></div>
  </div>
);
const Diamond = ({isLabGrown,setIsLabGrown,onCompareContainerClick,compareDiamondsId,addCompareDiamondIds,configAppData}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isGridView, setIsGridView] = useState(configAppData.default_viewmode==='grid'?true:false);
  const [diamond, setDiamond] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const [diamondNavigation,setDiamondNavigation] = useState([]);
  const [isDiamondNavLoaded, setIsDiamondNavLoaded] = useState(false);
  const [isDiamondFilterLoaded, setIsDiamondFilterLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDiamondLoaded, setIsDiamondLoaded] = useState(false);  
  const [isserachIsClicked, setIsSerachIsClicked] = useState(false) ;
  const [sortOrder, setSortOrder] = useState('ASC');
  const [selectedSettingShape, setSelectedSettingShape] = useState();
  const [showAlertPopUp,setshowAlertPopUp] =useState(false);
  const [message,setMessage] =useState('');
  let storedData = JSON.parse(localStorage.getItem('saveDiamondFilters')); 
  let advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFilters'));  
  //console.log(storedData.carat)
  const [selectedFilters, setSelectedFilters] = useState({
    shape:  storedData ? storedData.shape.length > 0 ?storedData.shape:[]:[],
    carat:  storedData ? storedData.carat.length > 0 ?storedData.carat:[]:[],
    cut:  storedData ? storedData.cut.length > 0 ?storedData.cut:[]:[],
    colour:  storedData ? storedData.colour.length > 0 ?storedData.colour:[]:[],
    clarity:  storedData ? storedData.clarity.length > 0 ?storedData.clarity:[]:[],  
    price:  storedData ?   storedData.price.length > 0 ? storedData.price :[]:[],
    search: storedData ?storedData.search!="" ? storedData.search :'':''
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    polish:  advanceFilterStoredData ? advanceFilterStoredData.polish.length > 0 ?advanceFilterStoredData.polish:[]:[],
    depth:  advanceFilterStoredData ? advanceFilterStoredData.depth.length > 0 ?advanceFilterStoredData.depth:[]:[],
    table:advanceFilterStoredData ? advanceFilterStoredData.table.length > 0 ?advanceFilterStoredData.table:[]:[],
    fluorescence: advanceFilterStoredData ? advanceFilterStoredData.fluorescence.length > 0 ?advanceFilterStoredData.fluorescence:[]:[],
    symmetry: advanceFilterStoredData ? advanceFilterStoredData.symmetry.length > 0 ?advanceFilterStoredData.symmetry:[]:[],
    certificates:advanceFilterStoredData ? advanceFilterStoredData.certificates.length > 0 ?advanceFilterStoredData.certificates:[]:[],
  });
  useEffect(() => {   
    async function fetchDiamondNavigation(){
      try {      
        const res = await diamondService.getDiamondNavigation(); 
        if(res[0]) {
          setDiamondNavigation(res[0]);
        }         
        setIsDiamondNavLoaded(true);
      } catch (err) {        
      }
    }
    fetchDiamondNavigation();
  },[])
 
    const fetchDiamondFilter=async() => {
      try {     
        let selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));
        //console.log(selectedRingSetting)
        let selectedRingShape = '';
        let selectedCaratRange = [];
        if(selectedRingSetting){
          const resSetting = await settingService.getSettingDetail(selectedRingSetting.settingId);          
          if(resSetting) {
            selectedRingShape = resSetting.centerStoneFit;
            setSelectedSettingShape(selectedRingShape);
            selectedCaratRange = [resSetting.centerStoneMinCarat,resSetting.centerStoneMaxCarat];
          }     }
          let option = {                  
            isLabGrown:isLabGrown ? 1 : 0       
          }
          console.log(JSON.parse(localStorage.getItem('startflow')))
          let startflowPath = JSON.parse(localStorage.getItem('startflow'));
          let initialFilter=false;
          /*if(startflowPath && startflowPath.path=='/diamondtools' && startflowPath.isLoaded===false){           
            localStorage.setItem('startflow',JSON.stringify({'path':startflowPath.path,'isLoaded':true}));
            initialFilter=true;
            // res = await diamondService.getDiamondInitialFilter(option);
          }else{
            // res = await diamondService.getDiamondFilter(option);
          }*/
          const res = await diamondService.getDiamondFilter(option,initialFilter);         
          if(res){
            if(res[0].message === 'Success'){
              setFilterData(res[1][0]);
              applyFilters({...selectedFilters,
                shape: selectedRingShape!="" ? [selectedRingShape]:[],
                colour: selectedFilters.colour.length===0 ? res[1][0].colorRange.map(item=> {return item.colorId}):selectedFilters.colour,
                clarity: selectedFilters.clarity.length===0 ? res[1][0].clarityRange.map(item=> {return item.clarityName}):selectedFilters.clarity,
                price:selectedFilters.price.length===0 ? [res[1][0].priceRange[0].minPrice,res[1][0].priceRange[0].maxPrice]:selectedFilters.price,
                carat:selectedCaratRange.length > 0 ?selectedCaratRange:selectedFilters.carat.length===0 ?[res[1][0].caratRange[0].minCarat,res[1][0].caratRange[0].maxCarat]:selectedFilters.carat,
              });
              //console.log(selectedFilters)
              setIsDiamondFilterLoaded(true);            
          }
        }
               
      } catch (err) {
        console.error("Error fetching diamond filter data:", error);
        setError("Failed to fetch diamond  filter data. Please try again later.");
      }
    }  
 
 
    const fetchDiamond = async(page, pageSize, isLab, sort, selectedFilters,advancedFilters)=> {
      if(isDiamondFilterLoaded){    
        console.log(selectedFilters)     
            try {       
              let option = {
                pageNumber:page,    
                pageSize:pageSize,
                searchDiamond:selectedFilters.search,           
                shape:selectedFilters.shape.length>0?selectedFilters.shape.join(','):'',
                cut:selectedFilters.cut.length>0?selectedFilters.cut.join(','):'',
                colour:selectedFilters.colour.length>0?selectedFilters.colour.join(','):'',
                clarity:selectedFilters.clarity.length>0?selectedFilters.clarity.join(','):'',
                isLabGrown:isLab==='fancy'?isLab:isLab===true?true:false,
                priceMin:selectedFilters.price[0],
                priceMax:selectedFilters.price[1],
                carat: selectedFilters.carat.length > 0 ? [selectedFilters.carat[0],selectedFilters.carat[1]]:[],
                orderBy:sort ,
                fluorescence:advancedFilters.fluorescence.length>0 ?advancedFilters.fluorescence.join(','):'',
                certificates:advancedFilters.certificates.length>0 ?advancedFilters.certificates.join(','):'',
                symmetry:advancedFilters.symmetry.length>0 ?advancedFilters.symmetry.join(','):'',
                polish:advancedFilters.polish.length>0 ?advancedFilters.polish.join(','):'',
                table:advancedFilters.table.length > 0 ? [advancedFilters.table[0],advancedFilters.table[1]]:[],
                depth:advancedFilters.depth.length > 0?[advancedFilters.depth[0],advancedFilters.depth[1]]:[],
              }      
              console.log(option)  
              const res = await diamondService.getAllDiamond(option);
              if(res.diamondList && res.diamondList.length > 0) {
                setDiamond(res.diamondList);  
                setTotalProducts(res.count);        
                setIsDiamondLoaded(true)
              }
              
            } catch (err) {
              console.error("Error fetching diamond  data:", error);
              setError("Failed to fetch diamond  data. Please try again later.");        
            }
          
        
      
      }
     
    } 
    useEffect(() => {
      fetchDiamondFilter(selectedFilters);
    }, [isLabGrown ]);

 
  /*useEffect(() => {
    console.log(filterData)
    if(isDiamondFilterLoaded){
      setSelectedFilters({ 
        shape: [], 
        colour: selectedFilters.colour.length===0?filterData.colorRange.map(item=> {return item.colorId}):"",
        clarity: selectedFilters.clarity.length===0?filterData.clarityRange.map(item=> {return item.clarityName}):"",
        cut: [],
        search:'',
        price:selectedFilters.price.length===0?[filterData.priceRange[0].minPrice,filterData.priceRange[0].maxPrice]:[],
        carat:selectedFilters.carat.length===0?[filterData.caratRange[0].minCarat,filterData.caratRange[0].maxCarat]:[],
      });
    }
   
  }, [ isDiamondFilterLoaded]);*/

  useEffect(() => {
    fetchDiamond(currentPage, itemsPerPage, isLabGrown,  sortOrder, selectedFilters,advancedFilters);
  }, [ currentPage, itemsPerPage, isLabGrown,sortOrder, selectedFilters,advancedFilters]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
  };
  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };
  const applyAdvanceFilters = (filters) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
  };
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };
 
  const searchSetting = event => { 
    if(event.target.value === ""){
      setIsSerachIsClicked(!isserachIsClicked);
      applyFilters({ ...selectedFilters, search: event.target.value });
    }
    if(event.key==="Enter"){
      setIsSerachIsClicked(!isserachIsClicked);
      applyFilters({ ...selectedFilters, search: event.target.value });
    }    
  }; 
  const resetFilters = () => {
    setSelectedFilters({
      shape: [],
      cut: [],
      colour: [],
      clarity: [],
      carat:[filterData.caratRange[0].minCarat,filterData.caratRange[0].maxCarat],
      price: [filterData.priceRange[0].minPrice,filterData.priceRange[0].maxPrice],
      search: ''
    });
    setAdvancedFilters({
      polish: [],
      depth: [filterData.depthRange[0].minDepth,filterData.depthRange[0].maxDepth],
      table: [filterData.tableRange[0].minTable,filterData.tableRange[0].maxTable],
      fluorescence: [],
      symmetry: [],
      certificates: [],
    });
    localStorage.removeItem('saveDiamondFilters');
    localStorage.removeItem('selectedRing');
    setSelectedSettingShape('')
    setCurrentPage(1);
  };
  
  const saveFilters = () => {
    localStorage.setItem('saveDiamondFilters', JSON.stringify(selectedFilters));
    localStorage.setItem('saveAdvanceDiamondFilters', JSON.stringify(advancedFilters));
    //alert('Filters saved successfully');
    setMessage('Filters saved successfully');
    setshowAlertPopUp(true);
  };
 
 
 
  return (
    <div className="diamond">
      <Header />
      <DiamondNavigation diamondNavigation={diamondNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown}/>
      {filterData ? 
      isDiamondFilterLoaded &&
      <DiamondFilter 
       filterData={filterData}
       selectedFilters={selectedFilters}
       isGridView={isGridView}
       setIsGridView={setIsGridView} 
       applyFilters={applyFilters}
       applyAdvanceFilters={applyAdvanceFilters}
       resetFilters={resetFilters}
       saveFilters={saveFilters}
       totalProducts={totalProducts}
       onSortOrderChange={handleSortOrderChange}
       onItemsPerPageChange={handleItemsPerPageChange}
       sortOrder={sortOrder}
       searchSetting={searchSetting}
       advancedFilters={advancedFilters}
       setAdvancedFilters={setAdvancedFilters} 
       setSelectedFilters={setSelectedFilters}
       itemsPerPage={itemsPerPage}
       compareDiamondsId={compareDiamondsId}
       onCompareContainerClick={onCompareContainerClick}
       selectedSettingShape={selectedSettingShape}/>
       : (
        <SkeletonFilterPanel />
      )}
      
      { isDiamondLoaded ?(
      <>{
      isGridView ?
      <div className="list2">
      {
        diamond.map(product => (
          <Items   
           configAppData={configAppData}
            key={product.diamondId}
            addCompareDiamondIds={addCompareDiamondIds}
            diamond={{
              ...product,
              videoURL: product.videoURL || null,
            }} /> 
          
          ))
        }            
      </div>
      :   diamond.map(product => (
        <List1   
        configAppData={configAppData}
          key={product.diamondId}
          diamond={{
            ...product,
            videoURL: product.videoURL || null,
          }} /> 
        
        ))}
        </>
      ) : (
        Array(itemsPerPage).fill().map((_, index) => (
          <SkeletonProductItem key={index} />
        ))
      )}
      
      <PaginationPanel 
       currentPage={currentPage}
       itemsPerPage={itemsPerPage}
       totalItems={totalProducts}
       onPageChange={handlePageChange}
       onItemsPerPageChange={handleItemsPerPageChange}
       />   
     
     {showAlertPopUp && message!="" &&      
       <AlertPopUp       
       message={'Filter Saved Sucessfully'}
       onClose={() => {setshowAlertPopUp(false) ; setMessage('')}}> 
       </AlertPopUp>
      }
    
</div>
  );
};

export default Diamond;
