import PropTypes from "prop-types";
import "./frame-component5.css";

const FrameComponent5 = ({ className = "",setShowAllParam,showAllParam }) => {
  console.log(showAllParam)
  return (
    <section className={`top-content-wrapper ${className}`}>
      <div className="top-content">
        <div className="h14">
          <h1 className="compare-diamonds1">Compare Diamonds</h1>
          <div className="type">
            <div className="view1">
              <button className={showAllParam==true ? "grid1":"grid1Unselected"} onClick={()=>setShowAllParam(true)}>
                <b className="all-parameters">All Parameters</b>
              </button>
              <div className={showAllParam==false ? "grid1":"table3"} onClick={()=>setShowAllParam(false)}>
                <div className="difference-only">Difference only</div>
              </div>
            </div>
            <div className="button19">
              <img
                className="fi-9742093-icon"
                loading="lazy"
                alt=""
                src="/fi-9742093.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent5;
