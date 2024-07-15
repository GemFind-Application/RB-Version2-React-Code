import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import DiamondNavigation from "../components/diamond-navigation";
import DiamondFilter from "../components/diamond-filter";
import Items from "../components/items";
import PaginationPanel from "../components/pagination-panel";
import "./diamond.css";
import SkeletonFilterPanel from "../components/SkeletonFilterPanel";

import List1 from "../components/list1";
import { diamondService } from '../Services';
const SkeletonProductItem = () => (
  <div className="product-item-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-price"></div>
  </div>
);
const Diamond = ({isLabGrown}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isGridView, setIsGridView] = useState(true);
  const [diamond, setDiamond] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const [diamondNavigation,setDiamondNavigation] = useState([]);
  const [isDiamondNavLoaded, setIsDiamondNavLoaded] = useState(false);
  const [isDiamondFilterLoaded, setIsDiamondFilterLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDiamondLoaded, setIsDiamondLoaded] = useState(false);
  
  const [isserachIsClicked, setIsSerachIsClicked] = useState(false) ;
  const [sortOrder, setSortOrder] = useState('High to Low');
  let storedData = JSON.parse(localStorage.getItem('activeDiamondFilters')); 
  console.log(storedData.carat)
  const [selectedFilters, setSelectedFilters] = useState({
    shape:  storedData ? storedData.shape.length > 0 ?storedData.shape:[]:[],
    carat:  storedData ? storedData.carat.length > 0 ?storedData.carat:[]:[],
    cut:  storedData ? storedData.cut.length > 0 ?storedData.cut:[]:[],
    colour:  storedData ? storedData.colour.length > 0 ?storedData.colour:[]:[],
    clarity:  storedData ? storedData.clarity.length > 0 ?storedData.clarity:[]:[],  
    price:storedData ?   storedData.price.length > 0 ? storedData.price :[]:[],
    search: storedData ?storedData.search!="" ? storedData.search :'':''
  });
  console.log(selectedFilters)
  const [advancedFilters, setAdvancedFilters] = useState({
    polish: [],
    depth: { min: 0, max: 100 },
    table: { min: 0, max: 100 },
    fluorescence: [],
    symmetry: [],
    certificates: [],
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
        const res = await diamondService.getDiamondFilter();         
        if(res){
          if(res[0].message === 'Success'){
            setFilterData(res[1][0]);
            setIsDiamondFilterLoaded(true);            
          }
        }
      } catch (err) {
        console.error("Error fetching diamond filter data:", error);
        setError("Failed to fetch diamond  filter data. Please try again later.");
      }
    }  
 
 
    const fetchDiamond = async(page, pageSize, isLab, sort, selectedFilters)=> {
      console.log(selectedFilters)
      try {       
        let option = {
          pageNumber:page,    
          pageSize:pageSize,
          searchSetting:selectedFilters.search,           
          shape:selectedFilters.shape.join(','),
          cut:selectedFilters.cut.length>0?selectedFilters.cut.join(','):'',
          colour:selectedFilters.colour.length>0?selectedFilters.colour.join(','):'',
          clarity:selectedFilters.clarity.length>0?selectedFilters.clarity.join(','):'',
          isLabGrown:isLabGrown,
          priceMin:selectedFilters.price[0],
          priceMax:selectedFilters.price[1],
          carat:[selectedFilters.carat[0],selectedFilters.carat[1]],
          depth:[0,100],
          table:[0,100]
        }
        
        const res = await diamondService.getAllDiamond(option);
        console.log(option)
        if(res.diamondList && res.diamondList.length > 0) {
          setDiamond(res.diamondList);  
          console.log(res.count)
          setTotalProducts(res.count);        
          setIsDiamondLoaded(true)
        }
        
      } catch (err) {
        console.error("Error fetching diamond  data:", error);
        setError("Failed to fetch diamond  data. Please try again later.");
        
      }
    } 
    useEffect(() => {
      fetchDiamondFilter(selectedFilters);
    }, [ ]);

 
  useEffect(() => {
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
   
  }, [ isDiamondFilterLoaded]);

  useEffect(() => {
    fetchDiamond(currentPage, itemsPerPage, isLabGrown,  sortOrder, selectedFilters);
  }, [ currentPage, itemsPerPage, sortOrder, selectedFilters]);

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
  const saveFilters = () => {
    localStorage.setItem('activeDiamondFilters', JSON.stringify(selectedFilters));
    alert('Filters saved successfully');
  };
  const resetFilters = () => {
    console.log("sdfdsfdsf")
    setSelectedFilters({
      shape:  [],
    carat:  [],
    cut:  [],
    colour:  [],
    clarity: [],  
    price:[],
    search: ''
    });
    localStorage.removeItem('activeDiamondFilters');
    setCurrentPage(1);
  };
 
 
  return (
    <div className="diamond">
      <Header />
      <DiamondNavigation />
      {filterData ? 
      isDiamondFilterLoaded &&
      <DiamondFilter 
       filterData={filterData}
       selectedFilters={selectedFilters}
       isGridView={isGridView}
       setIsGridView={setIsGridView} 
       applyFilters={applyFilters}
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
       itemsPerPage={itemsPerPage}/>
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
            key={product.diamondId}
            diamond={{
              ...product,
              videoURL: product.videoURL || null,
            }} /> 
          
          ))
        }
            
      </div>
      :   diamond.map(product => (
        <List1   
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
       onItemsPerPageChange={handleItemsPerPageChange}/>   
    
    
</div>
  );
};

export default Diamond;
