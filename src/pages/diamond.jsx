import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
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
const Diamond = ({isLabGrown,setIsLabGrown,onCompareContainerClick,compareDiamondsId,addCompareDiamondIds,configAppData,additionOptionSetting}) => {

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
  const [sortOrder, setSortOrder] = useState('Size');
  const [selectedSettingShape, setSelectedSettingShape] = useState('');
  const [showAlertPopUp,setshowAlertPopUp] =useState(false);
  const [message,setMessage] =useState('');
  const [showInitialFilter,setShowInitialFilter] = useState('');
  const [isResetClicked,setIsResetClicked] = useState(false);
  const [doReset,setDoReset] = useState(false);
  const [orderDirection,setOrderDirection] = useState('ASC');
  const [selectedCaratRange,setSelectedCaratRange] = useState([]);
  const [currentLabGrown,setCurrentLabGrown] = useState(isLabGrown);
  const location = useLocation();
  console.log("====="+isLabGrown)
  /*if(isLabGrown===true){
     storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersLab')); 
     advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersLab')); 
  }else if(isLabGrown==='fancy'){
    storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersFancy')); 
    advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersFancy')); 
  }else{
     storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersMined')); 
     advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersMined')); 
  }*/
  const [selectedFilters, setSelectedFilters] = useState({ shape:  [],
    carat:  [],
    cut: [],
    colour:  [],
    clarity: [],  
    price:  [],
    intensity:[],
    search: ''});
  const [advancedFilters, setAdvancedFilters] = useState([])
  //console.log(storedData.carat)
  /*const [selectedFilters, setSelectedFilters] = useState({
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
  });*/
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
    localStorage.removeItem('selectedDiamond');
    fetchDiamondNavigation();
  },[])
 


  useEffect(() => {   
    
   
  },[])





 



    const fetchDiamondFilter=async(isLab) => {
      try {    
          let storedData=[];
  let advanceFilterStoredData=[]; 

  setIsDiamondLoaded(false)
        if(isLabGrown===true){
          storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersLab')); 
          advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersLab')); 
       }else if(isLabGrown==='fancy'){
         storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersfancy')); 
         advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersFancy')); 
       }else{
          storedData = JSON.parse(localStorage.getItem('saveDiamondFiltersMined')); 
          advanceFilterStoredData =  JSON.parse(localStorage.getItem('saveAdvanceDiamondFiltersMined')); 
       }
        console.log(storedData)
     
        setIsDiamondFilterLoaded(false)
        let selectedRingSetting = JSON.parse(localStorage.getItem('selectedRing'));        
        //console.log(selectedRingSetting)
        let selectedRingShape = '';
        let selectedCaratRangeForSetting = [];
        if(selectedRingSetting){
          const resSetting = await settingService.getSettingDetail(selectedRingSetting.settingId);          
          if(resSetting) {
           // resetFilters()
            selectedRingShape = resSetting.centerStoneFit;
            setSelectedSettingShape(selectedRingShape);
            selectedCaratRangeForSetting = [resSetting.centerStoneMinCarat,resSetting.centerStoneMaxCarat];
            setSelectedCaratRange([resSetting.centerStoneMinCarat,resSetting.centerStoneMaxCarat]);
          }}
         
        
        
          const res = await diamondService.getDiamondFilter({ isLabGrown:isLab =='fancy'?isLab:isLab==true?true:false});  
           console.log("in getting diamonds filter");
          console.log(selectedFilters) 
          
        
          if(res){

            if(res[0].message === 'Success') {
              setSelectedFilters({ shape:  [],
                carat:  [],
                cut: [],
                colour:  [],
                clarity: [],  
                price:  [],
                intensity:[],
                search: ''});

             
              setFilterData(res[1][0]);
             setSelectedFilters({
                search: storedData ?storedData.search!="" ? (storedData.search) :'':'',
                cut:((storedData==null || (storedData&&storedData.cut.length==0))) ? []:storedData?storedData.cut:[],
                shape: selectedRingShape!="" ? [selectedRingShape]:storedData?storedData.shape:[],
                colour: ((storedData==null || (storedData && storedData.colour.length==0)) ) ?   res[1][0].colorRange? res[1][0].colorRange.map(item=> {return item.colorId}):res[1][0].diamondColorRange?res[1][0].diamondColorRange.map(item=> {return (item.diamondColorName).toLowerCase()}):[]:storedData ? storedData.colour:[],
               
               
                intensity:((storedData==null || (storedData && storedData.intensity.length===0))) ? 


                res[1][0].intensity ? (res[1][0].intensity.map(item=> {return (item.intensityName)})): []:storedData.intensity?storedData.intensity:[],
                
                
                clarity:((storedData==null || (storedData && storedData.clarity.length===0))) ? 
                                   res[1][0].clarityRange.map(item=> {return item.clarityName}):storedData?storedData.clarity:[],
                price: ((storedData==null || (storedData&&storedData.price.length===0)) )? [res[1][0].priceRange[0].minPrice,res[1][0].priceRange[0].maxPrice]:storedData?storedData.price:[],
                carat: (selectedRingShape!="" && selectedCaratRangeForSetting.length >0) ?  selectedCaratRangeForSetting  :  ( (storedData==null || (storedData  &&storedData.carat.length=== 0)))?[res[1][0].caratRange[0].minCarat,res[1][0].caratRange[0].maxCarat]:storedData?storedData.carat:[],
              });
              //console.log(selectedFilters);
/*let shape =  selectedRingShape !=""?selectedRingShape:'';
let savedRingShape = storedData.shape;
let  selectedShapeFilter = selectedFilters.shape;



let carat =  selectedCaratRange.length >0 ? selectedCaratRange:[];
let savedcarat= storedData.carat;
let  selectedcarat = selectedFilters.carat;

              setSelectedFilters({
                shape: shape!="" ?shape:savedRingShape?savedRingShape:selectedShapeFilter?selectedShapeFilter:[],
                carat:  carat.length>0 ? carat ? savedcarat.length>0:savedcarat?selectedcarat.length>0?selectedcarat:[res[1][0].caratRange[0].minCarat,res[1][0].caratRange[0].maxCarat]:
                cut:  storedData ? storedData.cut.length > 0 ?storedData.cut:[]:[],
                colour:  storedData ? storedData.colour.length > 0 ?storedData.colour:[]:[],
                clarity:  storedData ? storedData.clarity.length > 0 ?storedData.clarity:[]:[],  
                price:  storedData ?   storedData.price.length > 0 ? storedData.price :[]:[],
                search: storedData ?storedData.search!="" ? storedData.search :'':''
              });*/
              setAdvancedFilters({
                polish:  advanceFilterStoredData ? advanceFilterStoredData.polish.length > 0 ?advanceFilterStoredData.polish:[]:[],
                depth:  advanceFilterStoredData ? advanceFilterStoredData.depth.length > 0 ?advanceFilterStoredData.depth:[]:[],
                table:advanceFilterStoredData ? advanceFilterStoredData.table.length > 0 ?advanceFilterStoredData.table:[]:[],
                fluorescence: advanceFilterStoredData ? advanceFilterStoredData.fluorescence.length > 0 ?advanceFilterStoredData.fluorescence:[]:[],
                symmetry: advanceFilterStoredData ? advanceFilterStoredData.symmetry.length > 0 ?advanceFilterStoredData.symmetry:[]:[],
                certificates:advanceFilterStoredData ? advanceFilterStoredData.certificates.length > 0 ?advanceFilterStoredData.certificates:[]:[],
              });
              setIsDiamondFilterLoaded(true);            
          }
        }
               
      } catch (err) {
        console.error("Error fetching diamond filter data:", err);
        setError("Failed to fetch diamond  filter data. Please try again later.");
      }
    }  
    useEffect(() => {
      fetchDiamondFilter(isLabGrown);
    }, [isLabGrown, doReset ]);


    const fetchDiamond = async(page, pageSize, isLab, sort, selectedFilters,advancedFilters,orderDirection)=> {
     
      if(isDiamondFilterLoaded){   
       /*let fancyClarityArray =[];
       let dataC;
      if(filterData.intensity){
          dataC = selectedFilters.clarity.map(item=>{
          console.log(item);
              return (filterData.clarityRange.filter(itemC=> itemC.clarityId===item))[0]
        })
        console.log(dataC)
        fancyClarityArray = dataC.map((item)=>{
          console.log(item)
          return item.clarityName;
        })
        
      }

      console.log(fancyClarityArray)
        console.log("in getting diamonds");
        console.log(selectedFilters) */
        //setIsResetClicked(false)    
            try {       
              let option = {
                pageNumber:page,    
                pageSize:pageSize,
                searchDiamond:selectedFilters.search,           
                shape:selectedFilters.shape.length>0?selectedFilters.shape.join(','):'',
                cut:selectedFilters.cut.length>0?selectedFilters.cut.join(','):'',
                colour:selectedFilters.colour.length>0?selectedFilters.colour.join(','):'',
                intensity:selectedFilters.intensity.length>0?selectedFilters.intensity.join(','):'',
                clarity:selectedFilters.clarity.length>0?selectedFilters.clarity.join(','):'',
                isLabGrown:isLab==='fancy'?isLab:isLab===true?true:false,
                priceMin:selectedFilters.price[0],
                priceMax:selectedFilters.price[1],
                carat: selectedFilters.carat.length > 0 ? [selectedFilters.carat[0],selectedFilters.carat[1]]:[],
                orderBy:sort ,
                orderDirection:orderDirection,
                fluorescence:advancedFilters.fluorescence.length>0 ?advancedFilters.fluorescence.join(','):'',
                certificates:advancedFilters.certificates.length>0 ?advancedFilters.certificates.join(','):'',
                symmetry:advancedFilters.symmetry.length>0 ?advancedFilters.symmetry.join(','):'',
                polish:advancedFilters.polish.length>0 ?advancedFilters.polish.join(','):'',
                table:advancedFilters.table.length > 0 ? [advancedFilters.table[0],advancedFilters.table[1]]:[],
                depth:advancedFilters.depth.length > 0?[advancedFilters.depth[0],advancedFilters.depth[1]]:[],
              }      
              console.log(option)  
              const res = await diamondService.getAllDiamond(option);
              if(res.diamondList ) {
                
                setDiamond(res.diamondList);  
                setTotalProducts(res.count);        
                setIsDiamondLoaded(true);
              }
              
            } catch (err) {
              console.error("Error fetching diamond  data:", error);
              setError("Failed to fetch diamond  data. Please try again later.");        
            }
          
        
      
      }
     
    } 
   
 
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
    fetchDiamond(currentPage, itemsPerPage, isLabGrown,  sortOrder, selectedFilters,advancedFilters,orderDirection);
  }, [ currentPage, itemsPerPage, sortOrder, selectedFilters,advancedFilters,orderDirection]);

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
  const confirmReset=() =>{
    setIsResetClicked(true)
  }
  const resetFilters = () => {
    setSelectedFilters({
      shape: [],
      cut: [],
      colour: [],
      clarity: [],
      intensity:[],
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
    
    localStorage.removeItem('saveDiamondFiltersMined');
    localStorage.removeItem('saveAdvanceDiamondFiltersMined');
    localStorage.removeItem('saveDiamondFiltersLab');
    localStorage.removeItem('saveAdvanceDiamondFiltersLab');
    localStorage.removeItem('saveDiamondFiltersfancy');
    localStorage.removeItem('saveAdvanceDiamondFiltersFancy');
    localStorage.removeItem('selectedRing');
    setSelectedSettingShape('')
    setSelectedCaratRange([])
    setCurrentPage(1);
   // setIsResetClicked(false)
  };
  
  const saveFilters = () => {
    if(isLabGrown===false){
      localStorage.setItem('saveDiamondFiltersMined', JSON.stringify(selectedFilters));
      localStorage.setItem('saveAdvanceDiamondFiltersMined', JSON.stringify(advancedFilters));
    }
    if(isLabGrown===true){
      localStorage.setItem('saveDiamondFiltersLab', JSON.stringify(selectedFilters));
      localStorage.setItem('saveAdvanceDiamondFiltersLab', JSON.stringify(advancedFilters));
    }
    if(isLabGrown==='fancy'){
      localStorage.setItem('saveDiamondFiltersfancy', JSON.stringify(selectedFilters));
      localStorage.setItem('saveAdvanceDiamondFiltersFancy', JSON.stringify(advancedFilters));
    }
    //localStorage.setItem('saveDiamondFilters', JSON.stringify(selectedFilters));
    //localStorage.setItem('saveAdvanceDiamondFilters', JSON.stringify(advancedFilters));
    //alert('Filters saved successfully');
    setMessage('Filters saved successfully');
    setshowAlertPopUp(true);
  };
 
 
 
  return (
    <div className="diamond">
      <Header />
      <DiamondNavigation diamondNavigation={diamondNavigation} setIsLabGrown={setIsLabGrown} isLabGrown={isLabGrown}/>
      {isDiamondFilterLoaded ? 
      isDiamondFilterLoaded &&
      <DiamondFilter 
       filterData={filterData}
       selectedFilters={selectedFilters}
       isGridView={isGridView}
       setIsGridView={setIsGridView} 
       applyFilters={applyFilters}
       applyAdvanceFilters={applyAdvanceFilters}
       resetFilters={resetFilters}
       confirmReset={confirmReset}
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
       selectedSettingShape={selectedSettingShape}
       isLabGrown:isLabGrown
       setOrderDirection={setOrderDirection}
       orderDirection={orderDirection}
       configAppData={configAppData}
       selectedCaratRange={selectedCaratRange}
       />
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
            additionOptionSetting={additionOptionSetting}
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
        <div className="list2">
        {Array(itemsPerPage).fill().map((_, index) => (
          <SkeletonProductItem key={index} />
        ))}
        </div>
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

export default Diamond;
