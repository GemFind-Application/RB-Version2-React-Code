import { useMemo } from "react";
import PropTypes from "prop-types";
import "./table-columns.css";

const TableColumns = ({
  className = "",
  shape,
  round,
  round1,
  round2,
  round3,
  round4,
  round5,
  propBorderBottom,
}) => {
  const tableColumnsStyle = useMemo(() => {
    return {
      borderBottom: propBorderBottom,
    };
  }, [propBorderBottom]);

  return (
    <div className={`table-columns ${className}`} style={tableColumnsStyle}>
      <div className="name">
        <div className="shape3">{shape}</div>
      </div>
      <div className="all">
        <div className="v11">
          <b className="round4">{round}</b>
        </div>
        <div className="v11">
          <b className="round4">{round1}</b>
        </div>
        <div className="v11">
          <b className="round4">{round2}</b>
        </div>
        <div className="v11">
          <b className="round4">{round3}</b>
        </div>
        <div className="v11">
          <b className="round4">{round4}</b>
        </div>
        <div className="v11">
          <b className="round4">{round5}</b>
        </div>
      </div>
    </div>
  );
};

TableColumns.propTypes = {
  className: PropTypes.string,
  shape: PropTypes.string,
  round: PropTypes.string,
  round1: PropTypes.string,
  round2: PropTypes.string,
  round3: PropTypes.string,
  round4: PropTypes.string,
  round5: PropTypes.string,

  /** Style props */
  propBorderBottom: PropTypes.any,
};

export default TableColumns;
