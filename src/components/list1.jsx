import DiamondListHeader1 from "./diamond-list-header1";
import DiamondListHeader from "./diamond-list-header";
import PropTypes from "prop-types";

import "./list1.css";

const List1 = ({ saveFiltersAfterDetails,className = "" ,diamond,configAppData,addCompareDiamondIds,compareDiamondsId, additionOptionSetting, isLabGrown}) => {
  
  return (
    <div className={`list5 ${className}`}>
      <DiamondListHeader1 saveFiltersAfterDetails ={saveFiltersAfterDetails} diamond={diamond} isLabGrown={isLabGrown} configAppData={configAppData} addCompareDiamondIds={addCompareDiamondIds} compareDiamondsId={compareDiamondsId} additionOptionSetting={additionOptionSetting}/>
    </div>
  );
};

List1.propTypes = {
  className: PropTypes.string,
};

export default List1;
