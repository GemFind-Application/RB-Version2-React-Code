import React, { useState, useEffect,useCallback,useMemo,useHover } from 'react';
import PropTypes from 'prop-types';
import { Search, ChevronDown, BookmarkMinus, RotateCcw, X } from 'lucide-react';
import './SettingsFilterPanel.css';
import MultiRangeSlider from './MultiRangeSlider';
import PopupAlert from './PopupAlert';
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
  selectedDiamondShape,
  configAppData,
  showFilterDetails,
  openFilter,
  setOpenFilter
}) => {
 
  const [searchQuery, setSearchQuery] = useState(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
  const [priceRange, setPriceRange] = useState(filterData.priceRange.length > 0 ?activeFilters.price.length===0 ? [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]: [activeFilters.price[0], activeFilters.price[1]]:[]);
  const [availableFilter, setAvailableFilter] = useState([]);   
  // const [activePopup, setActivePopup] = useState(null);
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;

  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
   // setPriceRange(activeFilters.price || [0, 29678.00]);
    let filterAvailable = [];
    filterData.collections.length>0 && filterAvailable.push('collections');  
    filterData.metalType.length>0 && filterAvailable.push('metalType');  
    filterData.shapes.length>0 && filterAvailable.push('shapes');
    setSearchQuery(activeFilters.search ? activeFilters.search!=""? activeFilters.search: '':'');
    setAvailableFilter(filterAvailable)
   // setOpenFilter(openFilter!=="" ? null : filter);
   // openFilter === filter ? null : filter
    
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
    //console.log(openFilter)
    //setOpenFilter(openFilter === filter ? null : filter);
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

  // const togglePopup = (popup) => {
  //   setActivePopup(activePopup === popup ? null : popup);
  // };
  const getPopupContent = (filterType) => { 
    console.log(filterType)
    const contents = {
      shapes : '<p>A diamond’s shape is not the same as a diamond’s cut. The shape refers to the general outline of the stone, and not its light refractive qualities. Look for a shape that best suits the ring setting you have chosen, as well as the recipient’s preference and personality. Here are some of the more common shapes that '+window.location.origin+' offers:</p><div class="popup-Diamond-Table"><ol class="list-unstyled"><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/round.png" alt="round"></span><span>Round</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/asscher.png" alt="asscher"></span><span>Asscher</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/marquise.png" alt="marquise"></span><span>Marquise</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/oval.png" alt="oval"></span><span>Oval</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/cushion.png" alt="cushion"></span><span>Cushion</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/radiant.png" alt="radiant"></span><span>Radiant</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/pear-v2.png" alt="pear"></span><span>Pear</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/emerald.png" alt="emerald"></span><span>Emerald</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/heart.png" alt="heart_tn"></span><span>Heart</span></li><li><span class="popup-Dimond-Sketch"><img src="'+imageUrl+'/princess.png" alt="princess"></span><span>Princess</span></li></ol></div>',
      price: "<p>This refer to different type of Price to filter and select the appropriate ring as per your requirements. Look for best suit price of your chosen ring.</p>",
      metalType: "<p>This refer to different type of Metal Type to filter and select the appropriate ring as per your requirements. Look for a metal type best suit of your chosen ring.</p>",
      collections: "",
      mined: "<p>Formed over billions of years, natural diamonds are mined from the earth. Diamonds are the hardest mineral on earth, which makes them an ideal material for daily wear over a lifetime. Our natural diamonds are conflict-free and GIA certified.</p>",
      labgrown: "<p>Lab-grown diamonds are created in a lab by replicating the high heat and high pressure environment that causes a natural diamond to form. They are compositionally identical to natural mined diamonds (hardness, density, light refraction, etc), and the two look exactly the same. A lab-grown diamond is an attractive alternative for those seeking a product with less environmental footprint.</p>",
    };
    return contents[filterType] || "Information not available.";
  };

  // popup - use this for setting the content
  const handleInfoClick = (filterType) => {
    const content = getPopupContent(filterType);
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };
 
  return (
    <div className={`SettingsFilterPanel ${className}`}>
      <div className="settingsfilter-wrapper">
        <div className="mined-lab-wrapper">
          {settingNavigation.navStandard && 
            <div className={`mined-settings ${!isLabGrown ? 'active' : ''}`} 
                onClick={() => handleLabGrownToggle(false)}>
              <div className={`mined2`}>
                {settingNavigation.navStandard}
              </div>
              {(configAppData.show_filter_info === "true") &&
                <div className="empty-row">
                  <b className="filter--hover-icon" onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick('mined');
                  }}>i</b>
                </div>
              }
            </div>
          }
          {settingNavigation.navLabGrown && 
            <div className={`lab-settings ${isLabGrown ? 'active' : ''}`} 
                onClick={() => handleLabGrownToggle(true)}>
              <div className={`lab-growned2`}>
                {settingNavigation.navLabGrown}
              </div>
              {(configAppData.show_filter_info === "true") &&
                <div className="empty-row">
                  <b className="filter--hover-icon" onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick('labgrown');
                  }}>i</b>
                </div>
              }
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
                  {(configAppData.show_filter_info === "true") && (filter === 'price' || filter === 'metalType' || filter === 'shapes') &&
                    <div className={filter === 'shapes' ? "shape-info1" : filter === 'price' ? "empty-options" : "border--round"}>
                      <b className="filter--hover-icon" onClick={(e) => {
                        e.stopPropagation();
                        handleInfoClick(filter);
                      }}>i</b>
                    </div>
                  }
                </div>
              ))}
              {filterData.priceRange.length > 0 &&
                <div className="filter-dropdown">
                  <button
                    className={`filter-button ${openFilter === 'price' ? 'active' : ''}`}
                    onClick={() => toggleFilter('price')}
                  >
                    <div className="filter-label">Price</div>
                    <ChevronDown size={16} />
                  </button>
                  {configAppData.show_filter_info === "true" &&
                    <div className="empty-options">
                      <b className="filter--hover-icon" onClick={(e) => {
                        e.stopPropagation();
                        handleInfoClick('price');
                      }}>i</b>
                    </div>
                  }
                </div>
              }
            </div>
              {filterData.priceRange.length > 0 &&
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
               }
            </div>
           
            <div className="search6">
              <div className="search-input">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onKeyUp={(e)=>searchSetting(e)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                 // applyFilters({ ...activeFilters, search: e.target.value });
                }}
                className="search7"
              />
            </div>
          </div>
        </div>
        <div className="filters-label searchView">{showFilterDetails}</div>
      {popupContent && (
        <PopupAlert content={popupContent} onClose={closePopup} />
      )}
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
      <div className="filters-label searchView">{showFilterDetails}</div>
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