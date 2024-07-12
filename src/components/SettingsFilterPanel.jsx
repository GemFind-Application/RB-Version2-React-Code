import React, { useState, useEffect,useCallback,useMemo } from 'react';
import PropTypes from 'prop-types';
import { Search, ChevronDown, BookmarkMinus, RotateCcw, X } from 'lucide-react';
import './SettingsFilterPanel.css';
import MultiRangeSlider from './MultiRangeSlider';
import { debounce } from "lodash";
const FilterOption = ({ label, icon, isActive, onClick ,isCollectionisActive}) => (
  <>
 {!isActive&&isCollectionisActive && isCollectionisActive==0 ?
  <div className={`filter-option`}>
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
  className = "", 
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
  searchSetting  

}) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
  const [priceRange, setPriceRange] = useState(activeFilters.price.length===0 ? [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]: [activeFilters.price[0], activeFilters.price[1]]);
  const [availableFilter, setAvailableFilter] = useState([]); 
  useEffect(() => {
    //setPriceRange(activeFilters.price || [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]);
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

  const handlePriceChange = ({ min, max }) => {
    console.log(min)
    setPriceRange([min, max]);
    //console.log(activeFilters)
    
    //console.log(activeFilters)
    //setValue(value);
    handleDebounce({min,max});
  };

  const handleLabGrownToggle = (value) => {
    setIsLabGrown(value);
  };
  // memoize the callback with useCallback
  // we need it since it's a dependency in useMemo below
  const handleSetTimeRange = (value) => {
   
  
    console.log("myFilter: ", value);
    applyFilters({ ...activeFilters, price: [value.min,value.max] });
  };
  const handleDebounce = useCallback(
    debounce(handleSetTimeRange, 500),
    [activeFilters],
  );

 // const debounced = React.useCallback(debounce(handlePriceChange, 1500), []);
  //console.log(settingNavigation)
  return (
    <div className={`SettingsFilterPanel ${className}`}>
      <div className="settingsfilter-wrapper">
        <div className="mined-lab-wrapper">
        {settingNavigation.navStandard && 
          <div className={`mined-settings ${!isLabGrown ? 'active' : ''}`} 
              onClick={() => handleLabGrownToggle(false)}>
            <div 
              className={`mined2`}
            >
              {settingNavigation.navStandard}
            </div>
            <div className="separator"><b className="i22">i</b></div>
          </div>
           }
           {settingNavigation.navLabGrown && 
          <div className={`lab-settings ${isLabGrown ? 'active' : ''}`} 
              onClick={() => handleLabGrownToggle(true)}>
            <div 
              className={`lab-growned2`} 
            >
             {settingNavigation.navLabGrown}
            </div>
            <div className="separator"><b className="i22">i</b></div>
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
                      {activeFilters[filter].length > 0 && (
                        <div className="filter-count">{activeFilters[filter].length}</div>
                      )}
                    </button>
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
                </div>
              </div>
              <div className="actions13">
                <button className="button30" onClick={saveFilters}>
                  <BookmarkMinus size={16} />
                </button>
                <button className="button31" onClick={() => {
                  resetFilters();
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