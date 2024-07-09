import DiamondListHeader1 from "./diamond-list-header1";
import DiamondListHeader from "./diamond-list-header";
import PropTypes from "prop-types";
import "./list2.css";

const List2 = ({ className = "" }) => {
  return (
    <div className={`list4 ${className}`}>
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader1 propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader propWidth="unset" propAlignSelf="stretch" />
      <DiamondListHeader propWidth="unset" propAlignSelf="stretch" />
    </div>
  );
};

List2.propTypes = {
  className: PropTypes.string,
};

export default List2;
