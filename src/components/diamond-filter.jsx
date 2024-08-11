import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Search, ChevronDown, BookmarkMinus, RotateCcw, X } from 'lucide-react';
import MultiRangeSlider from "./MultiRangeSlider";
import { debounce } from "lodash";
import "./frame-component2.css";
import { utils } from "../Helpers";
const DiamondFilter = ({ className = "",
  onItemsPerPageChange,
  advancedFilters,
  setAdvancedFilters,
  setSelectedFilters,
  selectedFilters,
  setIsGridView,
  saveFilters,
  confirmReset,
  resetFilters,
  isGridView,
  totalProducts,
  applyFilters,
  filterData,
  onSortOrderChange,
  sortOrder,
  searchSetting,
  itemsPerPage,
  applyAdvanceFilters,
  onCompareContainerClick,
  compareDiamondsId,
  selectedSettingShape,
  isLabGrown,
  setOrderDirection,
  orderDirection,
  configAppData,
  selectedCaratRange,
  setClaritySelected,
  isInHouseOrVirtualOrAll,
  setIsInHouseOrVirtualOrAll,
  showFilterDetails
}) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [priceRange, setPriceRange] = useState(selectedFilters.price.length === 0 ? [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice] : [selectedFilters.price[0], selectedFilters.price[1]]);
  const [caratRange, setCaratRange] = useState(selectedFilters.carat.length === 0 ? [filterData.caratRange[0].minCarat, filterData.caratRange[0].maxCarat] : [selectedFilters.carat[0], selectedFilters.carat[1]]);
  const [depthRange, setDepthRange] = useState(advancedFilters.depth.length === 0 ? [filterData.depthRange[0].minDepth, filterData.depthRange[0].maxDepth] : [advancedFilters.depth[0], advancedFilters.depth[1]]);
  const [tableRange, setTableRange] = useState(advancedFilters.table.length === 0 ? [filterData.tableRange[0].minTable, filterData.tableRange[0].maxTable] : [advancedFilters.table[0], advancedFilters.table[1]]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Clarity"); 
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
  const [availableFilter, setAvailableFilter] = useState(['shape', 'price', 'carat', 'cut', 'colour', 'clarity']);
  const [searchQuery, setSearchQuery] = useState(selectedFilters.search ? selectedFilters.search != "" ? selectedFilters.search : '' : '');
 
  useEffect(() => {
    if(filterData.diamondColorRange){
      setAvailableFilter(['shape', 'price', 'carat', 'diamondColorRange','intensity' ,'clarity'])
    }
    setPriceRange(selectedFilters.price.length === 0 ? [filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice] : [selectedFilters.price[0], selectedFilters.price[1]]);
    setCaratRange(selectedFilters.carat.length === 0 ? [filterData.caratRange[0].minCarat, filterData.caratRange[0].maxCarat] : [selectedFilters.carat[0], selectedFilters.carat[1]]);
    setDepthRange(advancedFilters.depth.length === 0 ? [filterData.depthRange[0].minDepth, filterData.depthRange[0].maxDepth] : [advancedFilters.depth[0], advancedFilters.depth[1]]);
    setTableRange(advancedFilters.table.length === 0 ? [filterData.tableRange[0].minTable, filterData.tableRange[0].maxTable] : [advancedFilters.table[0], advancedFilters.table[1]]);
  }, [selectedFilters,filterData,selectedCaratRange]);

 //console.log(caratRange)

  const onTableContainerClick = useCallback(() => {
    setIsGridView(false)
  }, [navigate]);
  const onGridContainerClick = useCallback(() => {
    setIsGridView(true)
    
  }, [navigate]);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const handlePriceChange = ({ min, max }) => {
    setPriceRange([min, max]);
    // setPriceRange(newRange);
    handleDebounce({ min, max });
    // You can add logic here to update filters or trigger a search
  };
  const handleCaratChange = ({ min, max }) => {
    setCaratRange([min, max]);
    handleCaratDebounce({ min, max });
  };
  const handleTableChange = ({ min, max }) => {
    setTableRange([min, max]);
    handleTableDebounce({ min, max });
  };
  const handleDepthChange = ({ min, max }) => {
    setDepthRange([min, max]);
    handleDepthDebounce({ min, max });
  };
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setActiveDropdown(null);
  };
  // memoize the callback with useCallback
  // we need it since it's a dependency in useMemo below
  const handleSetTimeRange = (value) => {
    applyFilters({ ...selectedFilters, price: [value.min, value.max] });
  };
  const handleSetCaratRange = (value) => {
    applyFilters({ ...selectedFilters, carat: [value.min, value.max] });
  };
  const handleSetTableRange = (value) => {
    applyAdvanceFilters({ ...advancedFilters, table: [value.min, value.max] });
  };
  const handleSetDepthRange = (value) => {
    applyAdvanceFilters({ ...advancedFilters, depth: [value.min, value.max] });
  };

  const handleDebounce = useCallback(
    debounce(handleSetTimeRange, 500),
    [selectedFilters],
  );
  const handleCaratDebounce = useCallback(
    debounce(handleSetCaratRange, 500),
    [selectedFilters],
  );
  const handleTableDebounce = useCallback(
    debounce(handleSetTableRange, 500),
    [advancedFilters],
  );
  const handleDepthDebounce = useCallback(
    debounce(handleSetDepthRange, 500),
    [advancedFilters],
  );

  const handleFilterChange = (filterType, value) => {
    if(filterType==='clarity'){
      setClaritySelected(true)
    }
   
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleAdvancedFilterChange = (filterType, value) => {
    if (filterType === 'depth' || filterType === 'table') {
     
    } else {
      setAdvancedFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }));
    }
  };

  const applyAdvancedFilters = () => {
    setShowAdvancedFilters(false);
    // Logic for advanced filters data query
  };

  const isFilterApplied = (filterType) => {
    if (filterType === 'price') {
      //return priceRange[0] > mockPriceData.minPrice || priceRange[1] < mockPriceData.maxPrice;
    }
    //console.log(selectedFilters[filterType].length)
    return selectedFilters[filterType] && selectedFilters[filterType].length > 0;
  };
  // POpup content of filters
  const getPopupContent = (filterType) => {
    const contents = {
      shape: "Diamond shapes affect brilliance and price. Popular shapes include round, princess, and oval.",
      price: "Price is influenced by the 4Cs: Cut, Clarity, Color, and Carat weight.",
      carat: "Carat is a measure of a diamond's weight. 1 carat equals 0.2 grams.",
      cut: "Cut determines how well a diamond interacts with light, affecting its sparkle.",
      colour: "Diamond color is graded from D (colorless) to Z (light yellow or brown).",
      clarity: "Clarity refers to the absence of inclusions and blemishes in a diamond.",
      polish: "Polish refers to the smoothness of the diamond's surface.",
      depth: "Depth percentage is the height of a diamond from the culet to the table, divided by its average girdle diameter.",
      table: "Table percentage is the width of the diamond's table expressed as a percentage of its average diameter.",
      fluorescence: "Fluorescence is the visible light some diamonds emit when exposed to UV rays.",
      symmetry: "Symmetry refers to the alignment and proportion of a diamond's facets.",
      certificates: "Diamond certificates are reports created by professional gemologists that verify a diamond's characteristics.",
    };
    return contents[filterType] || "Information not available.";
  };
const resetThisFilter=(filter)=>{
 // console.log(filter)
if(filter==='clarity'){
  setSelectedFilters({...selectedFilters,[filter]:filterData.clarityRange.map(item=>item.clarityId)})
}
if(filter==='colour'){
  setSelectedFilters({...selectedFilters,[filter]:  
    
    filterData.colorRange ? filterData.colorRange.map(item=> {return item.colorId}):filterDatadiamondColorRange?
    
    filterData.diamondColorRange.map(item=> {return (item.diamondColorName).toLowerCase()}):[]})
}
if(filter==='cut'){
  setSelectedFilters({...selectedFilters,[filter]:[]})
}
if(filter==='shape'){
  setSelectedFilters({...selectedFilters,[filter]:[]})
}
if(filter==='price'){
  setSelectedFilters({...selectedFilters,[filter]:[filterData.priceRange[0].minPrice, filterData.priceRange[0].maxPrice]})
}
if(filter==='carat'){
  setSelectedFilters({...selectedFilters,[filter]:[filterData.caratRange[0].minCarat, filterData.caratRange[0].maxCarat]})
}
if(filter==='intensity'){
  setSelectedFilters({...selectedFilters,[filter]:filterData.intensity.map(item=>item.intensityName)})
}

}
  return (
    <div className={`diamond-inner ${className}`}>
      <div className="frame-parent9">
        <div className="top-group">
          <div className="top14">
            <div className="compare--diamond-header">
              <b className="diamonds-founded2"> {/* set diamond found here */} {utils.numberWithCommas(totalProducts)} Diamonds Founded</b>
              <div className="comp2" onClick={onCompareContainerClick}>
                <div className="compare-diamonds3">Compare Diamonds</div>
                <div className="empty-button">
                  <b className="placeholder totoal--settings">{compareDiamondsId.length}</b>
                </div>
              </div>
            </div>
            <div className="settings-sort">
            <div className="settings-sort-page">
                <div className="sort-by4">View:</div>
                <select className='no-appearance' value={isInHouseOrVirtualOrAll} onChange={(e) => setIsInHouseOrVirtualOrAll(e.target.value)}>
                  <option value="all">All</option>
                  <option value="in-house">In House</option>
                  <option value="virtual">Virtual</option>                 
                   </select> 
              </div>
              <div className="settings-sort-page">
                <div className="sort-by4">Sort by:</div>
                <select className='no-appearance' value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
                  <option value="Cut">Shape</option>
                  <option value="Size">Carat</option>
                  <option value="Color">Color</option>
                  {isLabGrown==='fancy' &&
                  <option value="FancyColorIntensity">Intensity'</option> 
                   }
                  <option value="ClarityID">Clarity</option>
                  <option value="CutGrade">Cut</option>
                  <option value="Depth">Depth</option>
                  <option value="TableMeasure">Table</option>
                  <option value="Polish">Polish</option>
                  <option value="Symmetry">Symmetry</option>
                  <option value="Measurements">Measurement</option>
                  <option value="Certificate">Certificate</option> 
                  <option value="FltPrice">Price</option>
                </select>
              </div>
              <div className="settings-sort-page"> {orderDirection==='ASC' && <a onClick={()=>setOrderDirection('DESC')} ><img title='DESC' className={'imgDescAsc'} src={`${imageUrl}`+"/downarrow_dir.png"}></img></a>}
              {orderDirection==='DESC' &&<a onClick={()=>setOrderDirection('ASC')}><img className={'imgDescAsc'} title="ASC" src={`${imageUrl}`+"/uparrow_dir.png"}/></a>}</div>
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
          <div className="filters-wrapper">
            <div className="mid1">
              <div className="diamond-filters">
                <div className="filters-frame">
                  <div className="filters7">Filters:</div>
                </div>
                <div className="filters8">
                  {availableFilter.map((filter) => (
                    <div key={filter} className="filter--val" onClick={() => toggleDropdown(filter)}>
                      <div className={filter === 'shape' ? "shape-option" : ""}>
                        {<img onClick={()=>resetThisFilter(filter)}className="icon--close" alt="" src={`${imageUrl}`+"/vector2.svg"} />}
                        <div className={filter === 'shape' ? "shape5" : filter === 'price' ? "price23" : filter === 'carat' ? "carat4" : filter === 'cut' ? "cut10" : filter === 'colour' ? "filters7" : "clarity10"}>
                          
                          {filter!=='diamondColorRange'?filter.charAt(0).toUpperCase() + filter.slice(1):'color'.charAt(0).toUpperCase() + 'color'.slice(1)}
                        </div>
                      </div>
                      <img className="show-inner" alt="" src={`${imageUrl}`+"/vector-21.svg"} />
                      {filter === 'shape' && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.shape.length}</b>
                        </div>
                      )}
                      {filter === 'cut' && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.cut.length}</b>
                        </div>
                      )}
                      {( filter === 'colour'  && filterData.colorRange) && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.colour.length}</b>
                        </div>
                      )}
                      {filter === 'diamondColorRange' && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.colour.length}</b>
                        </div>
                      )}
                       {(filter === 'intensity' && selectedFilters.intensity)&&(
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.intensity.length}</b>
                        </div>
                      )}
                      {filter === 'clarity' && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.clarity.length}</b>
                        </div>
                      )}
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
                  <div className="filter--reset">
                    <div className="actions-child">
                      <div className="frame-child5" />
                    </div>
                    <div className="diamond-save-reset" >
                      <div className="save--filter" onClick={saveFilters}>
                        <button className="save--diamond_filter">
                          <img className="icons3" alt="" src={`${imageUrl}`+"/vector-4.svg"} />
                        </button>
                      </div>
                      <div className="reset--filter" onClick={confirmReset}>
                        <button className="reset--diamond_filter">
                          <img className="vector-icon26" alt="" src={`${imageUrl}`+"/vector-5.svg"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div103">
                  <div className="search4 search-products">
                    <img className="icon3" alt="" src={`${imageUrl}`+"/vector-3.svg"} />
                    <input
                      type="text"
                      onKeyUp={(e)=>searchSetting(e)}
                      placeholder="Search..."
                      className="search5"
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        // applyFilters({ ...activeFilters, search: e.target.value });
                      }}
                    />
                  </div>
                  <div className="view3 product--view">
                    <div className={isGridView ? 'grid3' : 'table7'} onClick={onGridContainerClick}>
                      <img className="fi-11034222-icon2" alt="" src={`${imageUrl}`+"/fi-110342221.svg" }/>
                      <b className="grid-view2">Grid View</b>
                    </div>
                    <div className={!isGridView ? 'grid3' : 'table7'} onClick={onTableContainerClick}>
                      <img className="fi-11034222-icon2" alt="" src={`${imageUrl}`+"/fi-142371531.svg" }/>
                      <b className="table-view2">Table View</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {activeDropdown && (
              <div className="filter-options-container">
                <div className="dropdown-content">
                  {activeDropdown === 'sort' && (
                    ['Price', 'Carat', 'Cut', 'Clarity'].map(option => (
                      <div className="dropdown-btns" key={option}>
                        <button className={`option--btn ${sortBy === option ? 'active--item' : ''}`} onClick={() => handleSortChange(option)}>{option}</button>
                      </div>
                    ))
                  )}
                  {activeDropdown === 'shape' && (
                    filterData.shapes.map(shape => (
                      <div className="dropdown-btns" key={shape.shapeName}>
                        {selectedSettingShape!="" ?
                          
                          <button className={`option--btn ${selectedFilters.shape.includes(shape.shapeName) ? 'active--item' : ''}`} >{shape.shapeName}</button>
                        :
                        <button className={`option--btn ${selectedFilters.shape.includes(shape.shapeName) ? 'active--item' : ''}`} onClick={() => handleFilterChange('shape', shape.shapeName)}>{shape.shapeName}</button>
                        }
                        </div>
                    ))
                  )}
                  {activeDropdown === 'price' && (
                    <div className="filter-options">
                      <MultiRangeSlider
                        min={parseFloat(filterData.priceRange[0].minPrice)}
                        max={parseFloat(filterData.priceRange[0].maxPrice)}
                        onChange={handlePriceChange}
                        value={priceRange}
                      />
                    </div>
                  )}
                  {activeDropdown === 'carat' && (
                    <div className="filter-options">
                      <MultiRangeSlider
                        min={parseFloat(selectedCaratRange.length>0 ? selectedCaratRange[0]:filterData.caratRange[0].minCarat)}
                        max={parseFloat(selectedCaratRange.length>0 ? selectedCaratRange[1]:filterData.caratRange[0].maxCarat)}
                        onChange={handleCaratChange}
                        value={caratRange}
                        isPrice={false}
                      />
                    </div>
                  )}
                  {(activeDropdown === 'cut' && filterData.cutRange && filterData.cutRange.length > 0) && (
                    filterData.cutRange.map(cut => (
                      <div className="dropdown-btns" key={cut.cutId}>
                        <button className={`option--btn ${selectedFilters.cut.includes(cut.cutId) ? 'active--item' : ''}`} onClick={() => handleFilterChange('cut', cut.cutId)}>{cut.cutName}</button>
                      </div>
                    ))
                  )}
                  {(activeDropdown === 'colour' &&  filterData.colorRange && filterData.colorRange.length > 0)  && (
                    filterData.colorRange.map(colour => (
                      <div className="dropdown-btns" key={colour.colorId}>
                        <button className={`option--btn ${selectedFilters.colour.includes(colour.colorId) ? 'active--item' : ''}`} onClick={() => handleFilterChange('colour', colour.colorId)}>{colour.colorName}</button>
                      </div>
                    ))
                  )}
                  {(activeDropdown === 'diamondColorRange' &&  filterData.diamondColorRange && filterData.diamondColorRange.length > 0)  && (
                    filterData.diamondColorRange.map(colour => (
                      <div className="dropdown-btns" key={colour.diamondColorName}>
                        <button className={`option--btn ${selectedFilters.colour.includes((colour.diamondColorName).toLowerCase()) ? 'active--item' : ''}`} onClick={() => handleFilterChange('colour', (colour.diamondColorName).toLowerCase())}>{colour.diamondColorName}</button>
                      </div>
                    ))
                  )}
                  {(activeDropdown === 'intensity' &&  filterData.intensity && filterData.intensity.length > 0)  && (
                    filterData.intensity.map(intensity => (
                      <div className="dropdown-btns" key={intensity.intensityName}>
                        <button className={`option--btn ${selectedFilters.intensity.includes(intensity.intensityName) ? 'active--item' : ''}`} onClick={() => handleFilterChange('intensity', intensity.intensityName)}>{intensity.intensityName}</button>
                      </div>
                    ))
                  )}
                  {(activeDropdown === 'clarity' &&filterData.clarityRange  && filterData.clarityRange.length>0) && (
                    filterData.clarityRange.map(clarity => (
                      <div className="dropdown-btns" key={clarity.clarityId}>
                        <button className={`option--btn ${(selectedFilters.clarity.includes(clarity.clarityId)) ? 'active--item' : ''}`} onClick={() => handleFilterChange('clarity', clarity.clarityId)}>{clarity.clarityName}</button>
                      </div>
                    ))
                  )}
                  
                </div>
               
              </div>
            )}
          </div>
        </div>
        
        {/* Advanced filters for diamond */}
        <div className="advances1">
          <div className="adv2" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <b className="advanced-filters2">Advanced Filters</b>
            <div className="adv-child">
              <img className="frame-child6" alt="" src={`${imageUrl}`+"/vector-24.svg"} />
            </div>
          </div>
        </div>
        {showAdvancedFilters && (
          <div className="advanced-filters-content">
            <div className="filter--content_dropdown">
              <div className="flex-advanced-filter">
                <div className="advanced-filter-group">
                  <h4>Polish</h4>
                  <div className="group-inner">
                    {filterData.polishRange.map(polish => (
                      <div className="dropdown-btns" key={polish.polishId}>
                        <button
                          className={`option--btn ${advancedFilters.polish.includes(polish.polishId) ? 'active--item' : ''}`}
                          onClick={() => handleAdvancedFilterChange('polish', polish.polishId)}
                        >
                          {polish.polishName}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="advanced--price-sliders">
                  <div className="advanced-filter-group">
                    <h4>Depth</h4>
                    <MultiRangeSlider
                        min={parseFloat(filterData.depthRange[0].minDepth)}
                        max={parseFloat(filterData.depthRange[0].maxDepth)}
                        onChange={handleDepthChange}
                        value={depthRange}
                        isPrice={false}
                        showPercent={true}
                      />
                  </div>

                  <div className="advanced-filter-group">
                    <h4>Table</h4>
                    <MultiRangeSlider
                        min={parseFloat(filterData.tableRange[0].minTable)}
                        max={parseFloat(filterData.tableRange[0].maxTable)}
                        onChange={handleTableChange}
                        value={tableRange}
                        isPrice={false}
                        showPercent={true}
                      />
                  </div>
                </div>
              </div>
              <div className="flex-advanced-filter">
                <div className="advanced-filter-group">
                  <h4>Fluorescence</h4>
                  <div className="group-inner">
                    {filterData.fluorescenceRange.map(fluorescence => (
                      <div className="dropdown-btns" key={fluorescence.fluorescenceId}>
                        <button
                          className={`option--btn ${advancedFilters.fluorescence.includes(fluorescence.fluorescenceId) ? 'active--item' : ''}`}
                          onClick={() => handleAdvancedFilterChange('fluorescence', fluorescence.fluorescenceId)}
                        >
                          {fluorescence.fluorescenceName}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="advanced-filter-group">
                  <h4>Symmetry</h4>
                  <div className="group-inner">
                    {filterData.symmetryRange.map(symmetry => (
                      <div className="dropdown-btns" key={symmetry.symmetryId}>
                        <button
                          className={`option--btn ${advancedFilters.symmetry.includes(symmetry.symmetryId) ? 'active--item' : ''}`}
                          onClick={() => handleAdvancedFilterChange('symmetry', symmetry.symmetryId)}
                        >
                          {symmetry.symmteryName}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-advanced-filter">
                <div className="advanced-filter-group">
                  <h4>Certificates</h4>
                  <div className="group-inner">
                    {filterData.certificateRange.map(certificate => (
                      <div className="dropdown-btns" key={certificate.certificateId}>
                        <button
                          className={`option--btn ${advancedFilters.certificates.includes(certificate.certificateName) ? 'active--item' : ''}`}
                          onClick={() => handleAdvancedFilterChange('certificates', certificate.certificateName)}
                        >
                          {certificate.certificateName}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="advanced-filter-btn">
                  <button className="apply-advanced-filters" onClick={applyAdvancedFilters}>
                    Apply Advanced Filters ({Object.values(advancedFilters).flat().length})
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

DiamondFilter.propTypes = {
  className: PropTypes.string,
};

export default DiamondFilter;