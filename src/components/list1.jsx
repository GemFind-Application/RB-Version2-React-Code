import DiamondListHeader1 from "./diamond-list-header1";
import DiamondListHeader from "./diamond-list-header";
import PropTypes from "prop-types";
import "./list1.css";

const List1 = ({ className = "" ,diamond,configAppData,addCompareDiamondIds,compareDiamondsId}) => {
  return (
    <div className={`list5 ${className}`}>
      <DiamondListHeader1 diamond={diamond} configAppData={configAppData} addCompareDiamondIds={addCompareDiamondIds} compareDiamondsId={compareDiamondsId}/>
    </div>
  );
};

List1.propTypes = {
  className: PropTypes.string,
};

export default List1;
