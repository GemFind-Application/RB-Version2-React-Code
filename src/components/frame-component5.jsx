import PropTypes from "prop-types";
import "./frame-component5.css";

const FrameComponent5 = ({ className = "" }) => {
  return (
    <section className={`top-content-wrapper ${className}`}>
      <div className="top-content">
        <div className="h14">
          <h1 className="compare-diamonds1">Compare Diamonds</h1>
          <div className="type">
            <div className="view1">
              <button className="grid1">
                <b className="all-parameters">All Parameters</b>
              </button>
              <div className="table3">
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
