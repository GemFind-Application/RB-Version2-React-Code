import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MultiRangeSlider from "./MultiRangeSlider";
import "./frame-component2.css";

const DiamondFilter = ({ className = "" }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 29678]);  // Initial dummy price range
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Clarity");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedFilters, setSelectedFilters] = useState({
    shape: [],
    carat: [],
    cut: [],
    colour: [],
    clarity: [],
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    polish: [],
    depth: { min: 0, max: 100 },
    table: { min: 0, max: 100 },
    fluorescence: [],
    symmetry: [],
    certificates: [],
  });

  // Dummy mock price data (replace with API data later)
  const mockPriceData = {
    minPrice: 0,
    maxPrice: 29678
  };

  useEffect(() => {
    setPriceRange([mockPriceData.minPrice, mockPriceData.maxPrice]);
  }, []);

  const onCompContainerClick = useCallback(() => {
    navigate("/compare");
  }, [navigate]);

  const onTableContainerClick = useCallback(() => {
    navigate("/diamond-table");
  }, [navigate]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const togglePopup = (popup) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    // You can add logic here to update filters or trigger a search
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setActiveDropdown(null);
  };

  const handleItemsPerPageChange = (newValue) => {
    setItemsPerPage(newValue);
    setActiveDropdown(null);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleAdvancedFilterChange = (filterType, value) => {
    if (filterType === 'depth' || filterType === 'table') {
      setAdvancedFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
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
      return priceRange[0] > mockPriceData.minPrice || priceRange[1] < mockPriceData.maxPrice;
    }
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

  return (
    <div className={`diamond-inner ${className}`}>
      <div className="frame-parent9">
        <div className="top-group">
          <div className="top14">
            <b className="diamonds-founded2"> {/* set diamond found here */} 126 Diamonds Founded</b>
            <div className="comp2" onClick={onCompContainerClick}>
              <div className="compare-diamonds3">Compare Diamonds</div>
              <div className="empty-button">
                <b className="placeholder totoal--settings">0</b>
              </div>
            </div>
            <div className="sort6">
              <div className="sort7" onClick={() => toggleDropdown('sort')}>
                <div className="sort-by3">Sort by:</div>
                <b className="clarity9">{sortBy}</b>
                <img className="show-inner" alt="" src="/sort-show-icons.svg" />
              </div>
              <div className="show4" onClick={() => toggleDropdown('show')}>
                <div className="show5">Show:</div>
                <b className="per-page2">{itemsPerPage} per Page</b>
                <img className="show-inner" alt="" src="/sort-show-icons.svg" />
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
                  {['shape', 'price', 'carat', 'cut', 'colour', 'clarity'].map((filter) => (
                    <div key={filter} className="filter--val" onClick={() => toggleDropdown(filter)}>
                      <div className={filter === 'shape' ? "shape-option" : ""}>
                        {isFilterApplied(filter) && <img className="icon--close" alt="" src="/vector2.svg" />}
                        <div className={filter === 'shape' ? "shape5" : filter === 'price' ? "price23" : filter === 'carat' ? "carat4" : filter === 'cut' ? "cut10" : filter === 'colour' ? "filters7" : "clarity10"}>
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </div>
                      </div>
                      <img className="show-inner" alt="" src="/vector-21.svg" />
                      {filter === 'shape' && (
                        <div className="shape-placeholder">
                          <b className="placeholder1">{selectedFilters.shape.length}</b>
                        </div>
                      )}
                      <div className={filter === 'shape' ? "shape-info1" : filter === 'price' ? "empty-options" : "border--round"}>
                        <b className="filter--hover-icon" onClick={(e) => {
                          e.stopPropagation();
                          togglePopup(filter);
                        }}>i</b>
                      </div>
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
                    <div className="diamond-save-reset">
                      <div className="save--filter">
                        <button className="save--diamond_filter">
                          <img className="icons3" alt="" src="/vector-4.svg" />
                        </button>
                      </div>
                      <div className="reset--filter">
                        <button className="reset--diamond_filter">
                          <img className="vector-icon26" alt="" src="/vector-5.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div103">
                  <div className="search4 search-products">
                    <img className="icon3" alt="" src="/vector-3.svg" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="search5"
                    />
                  </div>
                  <div className="view3 product--view">
                    <div className="grid3">
                      <img className="fi-11034222-icon2" alt="" src="/fi-110342221.svg" />
                      <b className="grid-view2">Grid View</b>
                    </div>
                    <div className="table7" onClick={onTableContainerClick}>
                      <img className="fi-11034222-icon2" alt="" src="/fi-142371531.svg" />
                      <div className="table-view2">Table View</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {activeDropdown && (
              <div className="dropdown-content">
                {activeDropdown === 'sort' && (
                  ['Price', 'Carat', 'Cut', 'Clarity'].map(option => (
                    <div className="dropdown-btns" key={option}>
                      <button className={`option--btn ${sortBy === option ? 'active--item' : ''}`} onClick={() => handleSortChange(option)}>{option}</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'show' && (
                  [12, 24, 36, 48].map(option => (
                    <div className="dropdown-btns" key={option}>
                      <button className={`option--btn ${itemsPerPage === option ? 'active--item' : ''}`} onClick={() => handleItemsPerPageChange(option)}>{option} per Page</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'shape' && (
                  ['Round', 'Princess', 'Cushion', 'Oval'].map(shape => (
                    <div className="dropdown-btns" key={shape}>
                      <button className={`option--btn ${selectedFilters.shape.includes(shape) ? 'active--item' : ''}`} onClick={() => handleFilterChange('shape', shape)}>{shape}</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'price' && (
                  <MultiRangeSlider
                    min={mockPriceData.minPrice}
                    max={mockPriceData.maxPrice}
                    onChange={handlePriceChange}
                    value={priceRange}
                  />
                )}
                {activeDropdown === 'carat' && (
                  ['0.5 - 1.0', '1.0 - 1.5', '1.5 - 2.0', '2.0+'].map(range => (
                    <div className="dropdown-btns" key={range}>
                      <button className={`option--btn ${selectedFilters.carat.includes(range) ? 'active--item' : ''}`} onClick={() => handleFilterChange('carat', range)}>{range}</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'cut' && (
                  ['Excellent', 'Very Good', 'Good', 'Fair'].map(cut => (
                    <div className="dropdown-btns" key={cut}>
                      <button className={`option--btn ${selectedFilters.cut.includes(cut) ? 'active--item' : ''}`} onClick={() => handleFilterChange('cut', cut)}>{cut}</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'colour' && (
                  ['D', 'E', 'F', 'G'].map(colour => (
                    <div className="dropdown-btns" key={colour}>
                      <button className={`option--btn ${selectedFilters.colour.includes(colour) ? 'active--item' : ''}`} onClick={() => handleFilterChange('colour', colour)}>{colour}</button>
                    </div>
                  ))
                )}
                {activeDropdown === 'clarity' && (
                  ['FL', 'IF', 'VVS1', 'VVS2'].map(clarity => (
                    <div className="dropdown-btns" key={clarity}>
                      <button className={`option--btn ${selectedFilters.clarity.includes(clarity) ? 'active--item' : ''}`} onClick={() => handleFilterChange('clarity', clarity)}>{clarity}</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="advances1">
          <div className="adv2" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <b className="advanced-filters2">Advanced Filters</b>
            <div className="adv-child">
              <img className="frame-child6" alt="" src="/vector-24.svg" />
            </div>
          </div>
        </div>
        {showAdvancedFilters && (
          <div className="advanced-filters-content">
            <div className="filter--content_dropdown">
              <div className="advanced-filter-group">
                <h4>Polish</h4>
                {['Excellent', 'Very Good', 'Good', 'Fair'].map(polish => (
                  <div className="dropdown-btns" key={polish}>
                    <button
                      className={`option--btn ${advancedFilters.polish.includes(polish) ? 'active--item' : ''}`}
                      onClick={() => handleAdvancedFilterChange('polish', polish)}
                    >
                      {polish}
                    </button>
                  </div>
                ))}
              </div>

              <div className="advanced-filter-group">
                <h4>Fluorescence</h4>
                {['None', 'Faint', 'Medium', 'Strong', 'Very Strong'].map(fluorescence => (
                  <div className="dropdown-btns" key={fluorescence}>
                    <button
                      className={`option--btn ${advancedFilters.fluorescence.includes(fluorescence) ? 'active--item' : ''}`}
                      onClick={() => handleAdvancedFilterChange('fluorescence', fluorescence)}
                    >
                      {fluorescence}
                    </button>
                  </div>
                ))}
              </div>

              <div className="advanced-filter-group">
                <h4>Symmetry</h4>
                {['Excellent', 'Very Good', 'Good', 'Fair'].map(symmetry => (
                  <div className="dropdown-btns" key={symmetry}>
                    <button
                      className={`option--btn ${advancedFilters.symmetry.includes(symmetry) ? 'active--item' : ''}`}
                      onClick={() => handleAdvancedFilterChange('symmetry', symmetry)}
                    >
                      {symmetry}
                    </button>
                  </div>
                ))}
              </div>

              <div className="advanced-filter-group">
                <h4>Certificates</h4>
                {['AGS', 'EGL', 'GIA', 'IGI'].map(certificate => (
                  <div className="dropdown-btns" key={certificate}>
                    <button
                      className={`option--btn ${advancedFilters.certificates.includes(certificate) ? 'active--item' : ''}`}
                      onClick={() => handleAdvancedFilterChange('certificates', certificate)}
                    >
                      {certificate}
                    </button>
                  </div>
                ))}
              </div>

              <div className="advanced-filter-group">
                <h4>Depth</h4>
                <MultiRangeSlider
                  min={0}
                  max={100}
                  onChange={(value) => handleAdvancedFilterChange('depth', value)}
                  value={advancedFilters.depth}
                />
              </div>

              <div className="advanced-filter-group">
                <h4>Table</h4>
                <MultiRangeSlider
                  min={0}
                  max={100}
                  onChange={(value) => handleAdvancedFilterChange('table', value)}
                  value={advancedFilters.table}
                />
              </div>
            </div>
            <button className="apply-advanced-filters" onClick={applyAdvancedFilters}>
              APPLY ADVANCED FILTERS ({Object.values(advancedFilters).flat().length})
            </button>
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