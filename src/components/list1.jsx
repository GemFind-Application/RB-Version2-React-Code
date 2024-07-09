import DiamondListHeader1 from "./diamond-list-header1";
import DiamondListHeader from "./diamond-list-header";
import PropTypes from "prop-types";
import "./list1.css";

const List1 = ({ className = "" }) => {
  return (
    <div className={`list5 ${className}`}>
      <DiamondListHeader1 />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader1 propWidth="1680px" propAlignSelf="unset" />
      <DiamondListHeader />
    </div>
  );
};

List1.propTypes = {
  className: PropTypes.string,
};

export default List1;
