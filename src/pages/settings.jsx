import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Settingsbreadcrumb from "../components/Settingsbreadcrumb";
import SettingsFilterPanel from "../components/SettingsFilterPanel";
import SkeletonFilterPanel from "../components/SkeletonFilterPanel";
import ProductItems from "../components/product-items";
import PaginationPanel from "../components/pagination-panel";
import Header from '../components/Header';
import { BASE_URL, DEALER_ID } from '../components/api';
import "./settings.css";
import { settingService } from '../Services';
import Footer from "../components/Footer"
const SkeletonProductItem = () => (
  <div className="product-item-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-price"></div>
  </div>
);

const Settings = ({settingNavigationData,setIsLabGrown,isLabGrown}) => {
 
  const [filterData, setFilterData] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOrder, setSortOrder] = useState('High to Low');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /*const [activeFilters, setActiveFilters] = useState({
    collections: [],
    metalType: [],
    shapes: [],
    price: [0, 29678.00],
    search: ''
  });*/
  const [isProductLoaded, setIsProductLoaded] = useState(false); 
  //const [settingNavigation,setSettingNavigation] = useState(settingNavigationData);
  const [navigation, setNavigation] = useState("") ;
  const [isSettingFilterLoaded, setIsSettingFilterLoaded] = useState(false);
  const [isserachIsClicked, setIsSerachIsClicked] = useState(false) ;
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

  const fetchProducts = async (page, pageSize, isLab, sort, filters) => {
    setLoading(true);
    setError(null);
    try {
      /*let url = `${BASE_URL}/GetMountingList?DealerID=${DEALER_ID}&PageNumber=${page}&PageSize=${pageSize}&IsLabSettingsAvailable=${isLab ? 1 : 0}`;

      // Add sorting
      url += `&OrderBy=${sort === 'Low to High' ? 'cost+asc' : sort === 'High to Low' ? 'cost+desc' : 'newest'}`;

      // Add other filters
      if (filters.collections.length > 0) {
        url += `&Collection=${filters.collections.join(',')}`;
      }
      if (filters.metalType.length > 0) {
        url += `&MetalType=${filters.metalType.join(',')}`;
      }
      if (filters.shapes.length > 0) {
        url += `&Shape=${filters.shapes.join(',')}`;
      }
      url += `&PriceMin=${filters.price[0]}&PriceMax=${filters.price[1]}`;
      if (filters.search) {
        url += `&SearchTerm=${encodeURIComponent(filters.search)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.mountingList);
      setTotalProducts(data.count);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }*/
      let option = {
        pageNumber:page,    
        pageSize:pageSize,
        searchSetting:filters.search,
        orderBy:sort === 'Low to High' ? 'cost+asc' : sort === 'High to Low' ? 'cost+desc' : 'newest',       
        priceMin:filters.price[0],
        priceMax:filters.price[1],
        shape:filters.shapes.join(','),
        metalType:filters.metalType.join(','),
        style:filters.collections.join(','),
        IsLabSettingsAvailable:isLab ? 1 : 0
    }
    console.log(option)
      const data = await settingService.getAllSettings(option); 
      if(data.mountingList) {
        setProducts(data.mountingList);
        setTotalProducts(data.count);
        setIsProductLoaded(true);
        console.log(activeFilters)
      }
      

    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /*const fetchFilterData = async (isLab) => {
    try {
      const url = `${BASE_URL}/GetFilters?DealerID=${DEALER_ID}&IsLabSettingsAvailable=${isLab ? 1 : 0}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFilterData(data[1][0]);
    } catch (error) {
      console.error("Error fetching filter data:", error);
      setError("Failed to fetch filter data. Please try again later.");
    }
  };*/
  const fetchFilterData = async (isLab,filters) => {
    try {
      let option = {         
        //shape:filters.shapes.join(','),
        //metalType:filters.metalType.join(','),
        //style:filters.collections.join(','),
        IsLabSettingsAvailable:isLab ? 1 : 0
      }
      const res = await settingService.getSettingFilters(option);  
      if(res && res.length>0)     {
        setFilterData(res[1][0]); 
       
        
       //applyFilters({ ...activeFilters, price:[res[1][0].priceRange[0].minPrice,res[1][0].priceRange[0].maxPrice] });
        setIsSettingFilterLoaded(true);
       // setSettingNavigation(settingNavigationData)
      }   
    }
    catch (error) {
      console.error("Error fetching filter data:", error);
      setError("Failed to fetch filter data. Please try again later.");
    }
  };
 
  useEffect(() => {
    fetchFilterData(isLabGrown,activeFilters).then(() => fetchProducts(currentPage, itemsPerPage, isLabGrown, sortOrder, activeFilters));
  }, [isLabGrown, currentPage, itemsPerPage, sortOrder, activeFilters]);

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

  /*const handleProductClick = async (settingId) => {
    try {
      const response = await fetch(`${BASE_URL}/GetMountingDetail?DealerId=${DEALER_ID}&SID=${settingId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const productDetails = await response.json();
      navigate(`/setting-details/${settingId}`, { state: { productDetails } });
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details. Please try again later.");
    }
  };*/
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
    console.log(filterData.priceRange)
    setActiveFilters({
      collections: [],
      metalType: [],
      shapes: [],
      price: [],
      search: ''
    });
    localStorage.removeItem('activeFilters');
    setCurrentPage(1);
  };

  const saveFilters = () => {
    localStorage.setItem('activeFilters', JSON.stringify(activeFilters));
    alert('Filters saved successfully');
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
        {filterData ? (
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
              key={product.settingId} 
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
    </div>
  );
};

export default Settings;