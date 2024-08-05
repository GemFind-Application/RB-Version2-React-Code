import React, { useState, useEffect,useCallback,useMemo,useHover } from 'react';
import PropTypes from 'prop-types';
import { Search, ChevronDown, BookmarkMinus, RotateCcw, X } from 'lucide-react';
import './SettingsFilterPanel.css';
import MultiRangeSlider from './MultiRangeSlider';
import { debounce } from "lodash";
const FilterOption = ({ label, icon, isActive, onClick ,isCollectionisActive,selectedDiamondShape,filterType}) => (
  <>
 {((!isActive&&isCollectionisActive && isCollectionisActive==0)|| (selectedDiamondShape!=""&&filterType==='shapes')) ?
  <div className={`filter-option noCursor ${selectedDiamondShape ? 'active spaceInbetween' : ''}`} >
    {isActive && <X size={10} />}
    {icon && <img src={icon} alt={label} className="filter-option-icon" />}
    <span>{label}</span>
  </div>
  :
  <div    className={`filter-option ${isActive ? 'active' : ''}`}      onClick={onClick}>
      {isActive && <X size={10} />}
      {icon && <img src={icon} alt={label} className="filter-option-icon" />}
      <span>{label}</span>
    </div>
    }
    </>
);

const SettingsFilterPanel = ({ 
  className, 
  filterData, 
  isLabGrown, 
  setIsLabGrown, 
  applyFilters, 
  totalSettings,
  sortOrder,
  onSortOrderChange,
  itemsPerPage,
  onItemsPerPageChange,
  activeFilters,
  resetFilters,
  saveFilters,
  settingNavigation,
  searchSetting  ,
  confirmReset,
  selectedDiamondShape
  ,configAppData
}) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
  const [priceRange, setPriceRange] = useState(activeFilters.price.length===0 ? [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]: [activeFilters.price[0], activeFilters.price[1]]);
  const [availableFilter, setAvailableFilter] = useState([]);   
  const [activePopup, setActivePopup] = useState(null);
  
  useEffect(() => {
   // setPriceRange(activeFilters.price || [0, 29678.00]);
    let filterAvailable = [];
    filterData.collections.length>0 && filterAvailable.push('collections');  
    filterData.metalType.length>0 && filterAvailable.push('metalType');  
    filterData.shapes.length>0 && filterAvailable.push('shapes');
    setSearchQuery(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
    setAvailableFilter(filterAvailable)
    
  }, []);
  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };
 
  const toggleFilterOption = (filter, option) => {
    applyFilters({
      ...activeFilters,
      [filter]: activeFilters[filter].includes(option)
        ? activeFilters[filter].filter(item => item !== option)
        : [ option]
    });
  };

  /*const handlePriceChange = ({ min, max }) => {
    setPriceRange([min, max]);
    applyFilters({
      ...activeFilters,
      price: [min, max]
    });
  };*/
  //console.log(configAppData)
  const handlePriceChange = ({ min, max }) => {    
    setPriceRange([min, max]);  
    handleDebounce({min,max});
  };

  const handleLabGrownToggle = (value) => {
    setIsLabGrown(value);
  };
   // memoize the callback with useCallback
  // we need it since it's a dependency in useMemo below
  const handleSetTimeRange = (value) => {     
    applyFilters({ ...activeFilters, price: [value.min,value.max] });
  };
  const handleDebounce = useCallback(
    debounce(handleSetTimeRange, 500),
    [activeFilters],
  ); 

  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };
  const getPopupContent = (filterType) => { 
    const contents = {
      shapes: "",
      price: "This refer to different type of Price to filter and select the appropriate ring as per your requirements. Look for best suit price of your chosen ring.",
      metalType: "This refer to different type of Metal Type to filter and select the appropriate ring as per your requirements. Look for a metal type best suit of your chosen ring.",
      collections: "",
      mined: "Formed over billions of years, natural diamonds are mined from the earth. Diamonds are the hardest mineral on earth, which makes them an ideal material for daily wear over a lifetime. Our natural diamonds are conflict-free and GIA certified.",
      labgrown: "Lab-grown diamonds are created in a lab by replicating the high heat and high pressure environment that causes a natural diamond to form. They are compositionally identical to natural mined diamonds (hardness, density, light refraction, etc), and the two look exactly the same. A lab-grown diamond is an attractive alternative for those seeking a product with less environmental footprint.",
    };
    return contents[filterType] || "Information not available.";
  };
 
  return (
    <div className={`SettingsFilterPanel ${className}`}>
      <div className="settingsfilter-wrapper">
        <div className="mined-lab-wrapper">
        {settingNavigation.navStandard && 
          <div  className={`mined-settings ${!isLabGrown ? 'active' : ''}` } 
              onClick={() => handleLabGrownToggle(false)}>
            <div 
              className={`mined2`}
            >
              {settingNavigation.navStandard}
            </div>
            {(configAppData.show_filter_info =="true") &&
             <div className="empty-row">
                    <b className="i10" onClick={(e) => {
                      e.stopPropagation();
                      togglePopup('mined');
                    }}>i</b>
                  </div>
                  
            }
            {activePopup == 'mined' && (
                  <div className="filter-popup">
                 {getPopupContent('mined')}
                  </div>
                )}
          </div>
           }
           {settingNavigation.navLabGrown && 
          <div   className={`lab-settings ${isLabGrown ? 'active' : ''}`} 
              onClick={() => handleLabGrownToggle(true)}                
              >
            <div 
              className={`lab-growned2`} 
            >
             {settingNavigation.navLabGrown}
            </div>
            {(configAppData.show_filter_info =="true") &&
            <div className="empty-row">
            <b className="i10" onClick={(e) => {
              e.stopPropagation();
              togglePopup('labgrown');
            }}>i</b>
          </div>}
          {activePopup == 'labgrown' && (
            <div className="filter-popup">
            {getPopupContent('mined')}
            </div>
          )}
          </div>
          }
        </div>
      </div>
      <div className="list-header">
        <div className="settingfilter-top">
          <b className="settings-founded">{totalSettings || 0} Settings Found</b>
          <div className="settings-sort">
            <div className="settings-sort-page">
              <div className="sort-by4">Sort by:</div>
              <select className='no-appearance' value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
            <div className="settings-sort-page">
              <div className="show7">Show:</div>
              <select className='no-appearance' value={itemsPerPage} onChange={(e) => onItemsPerPageChange(Number(e.target.value))}>
                <option value={8}>8 per Page</option>
                <option value={12}>12 per Page</option>
                <option value={24}>24 per Page</option>
                <option value={48}>48 per Page</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filters-setting">
          <div className="mid2">
            <div className="filters9">
              <div className="filters-wrapper1">
                <div className="filters-label">Filters:</div>
              </div>
              <div className="filter-container">
                {availableFilter.map((filter) => (
                  <div key={filter} className="filter-dropdown">
                    <button
                      className={`filter-button ${openFilter === filter ? 'active' : ''}`}
                      onClick={() => toggleFilter(filter)}
                    >
                      <div className="filter-label">{filter.charAt(0).toUpperCase() + filter.slice(1)}</div>
                      <ChevronDown size={16} />
                      {activeFilters[filter].length  > 0  && (
                        <div className="filter-count">{activeFilters[filter].length}</div>
                      )}
                    </button>
                    {configAppData.show_filter_info ==="true" &&
                      <div className={filter === 'shape' ? "shape-info1" : filter === 'price' ? "empty-options" : "border--round"}>
                        <b className="filter--hover-icon" onClick={(e) => {
                          e.stopPropagation();
                          togglePopup(filter);
                        }}>i</b>
                      </div>}
                      {activePopup === filter && (
                        <div className="filter-popup">
                          {getPopupContent(filter)}
                        </div>
                      )}
                  </div>
                ))}
                <div className="filter-dropdown">
                  <button
                    className={`filter-button ${openFilter === 'price' ? 'active' : ''}`}
                    onClick={() => toggleFilter('price')}
                  >
                    <div className="filter-label">Price</div>
                    <ChevronDown size={16} />
                  </button>
                  {configAppData.show_filter_info ==="true" &&
                      <div className={ "empty-options" }>
                        <b className="filter--hover-icon" onClick={(e) => {
                          e.stopPropagation();
                          togglePopup('price');
                        }}>i</b>
                      </div>}
                      {activePopup === 'price' && (
                        <div className="filter-popup">
                          {getPopupContent('price')}
                        </div>
                      )}
                </div>
              </div>
              <div className="actions13">
                <button className="button30" onClick={saveFilters}>
                  <BookmarkMinus size={16} />
                </button>
                <button className="button31" onClick={() => {
                  confirmReset();
                  setPriceRange([filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]);
                }}>
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
            <div className="search6">
              <div className="search-input">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onKeyDown={searchSetting}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                 // applyFilters({ ...activeFilters, search: e.target.value });
                }}
                className="search7"
              />
            </div>
          </div>
        </div>
      </div>
      {openFilter && (
        <div className="filter-options-container">
          {openFilter === 'collections' && filterData.collections && filterData.collections.map(collection => (
            <FilterOption
              key={collection.collectionName}
              label={collection.collectionName}
              icon={collection.collectionImage}
              isActive={activeFilters.collections.includes(collection.collectionName)}
              onClick={() => toggleFilterOption('collections', collection.collectionName)}
              isCollectionisActive={collection.isActive}
            />
          ))}
          {openFilter === 'metalType' && filterData.metalType && filterData.metalType.length>0 && filterData.metalType.map(metal => (
            <FilterOption
              key={metal.metalType}
              label={metal.metalType}
              isActive={activeFilters.metalType.includes(metal.metalType)}
              onClick={() => toggleFilterOption('metalType', metal.metalType)}
            />
          ))}
          {openFilter === 'shapes' && filterData.shapes && filterData.shapes.map(shape => (
            <FilterOption
              key={shape.shapeName}
              label={shape.shapeName}
              icon={shape.shapeImage}
              isActive={activeFilters.shapes.includes(shape.shapeName)}
              onClick={() => toggleFilterOption('shapes', shape.shapeName)}
              selectedDiamondShape={selectedDiamondShape}
              filterType={'shapes'}
            />
          ))}
          {openFilter === 'price' && (
            <div className="filter-options">
              <MultiRangeSlider
                min={parseFloat(filterData.priceRange[0].minPrice)}
                max={parseFloat(filterData.priceRange[0].maxPrice)}
                onChange={handlePriceChange}
                value={priceRange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SettingsFilterPanel.propTypes = {
  className: PropTypes.string,
  filterData: PropTypes.shape({
    collections: PropTypes.array,
    metalType: PropTypes.array,
    shapes: PropTypes.array,
    priceRange: PropTypes.array,
    totalCount: PropTypes.number
  }),
  isLabGrown: PropTypes.bool.isRequired,
  setIsLabGrown: PropTypes.func.isRequired,
  totalSettings: PropTypes.number.isRequired,
  applyFilters: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortOrderChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired,
  resetFilters: PropTypes.func.isRequired,
  saveFilters: PropTypes.func.isRequired
};

export default SettingsFilterPanel;