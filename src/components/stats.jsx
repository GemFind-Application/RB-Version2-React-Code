import React from "react";
import PropTypes from "prop-types";
import "./stats.css";

const Stats = ({ 
  openRingSpecs, 
  openDropHint, 
  openScheduleViewing, 
  openRequestInfo 
}) => {
  return (
    <div className="stats9">
      <div className="stat-items" onClick={openDropHint}>
        <img
          className="fi-8429504-icon"
          loading="lazy"
          alt=""
          src="/fi-8429504.svg"
        />
        <div className="drop-a-hint-wrapper">
          <b className="drop-a-hint1">Drop A Hint</b>
        </div>
      </div>
      <div className="stat-items1" onClick={openScheduleViewing}>
        <img
          className="fi-8429504-icon"
          loading="lazy"
          alt=""
          src="/fi-956926.svg"
        />
        <div className="drop-a-hint-wrapper">
          <b className="schedule-viewing1">Schedule Viewing</b>
        </div>
      </div>
      <div className="stat-items2">
        <img
          className="fi-8429504-icon"
          loading="lazy"
          alt=""
          src="/fi-2989993.svg"
        />
        <div className="drop-a-hint-wrapper">
          <b className="email-a-friend">Email A Friend</b>
        </div>
      </div>
      <div className="stat-items3" onClick={openRequestInfo}>
        <img
          className="fi-8429504-icon"
          loading="lazy"
          alt=""
          src="/fi-151912.svg"
        />
        <div className="drop-a-hint-wrapper">
          <b className="request-more-info">Request More Info</b>
        </div>
      </div>
    </div>
  );
};

Stats.propTypes = {
  openRingSpecs: PropTypes.func.isRequired,
  openDropHint: PropTypes.func.isRequired,
  openScheduleViewing: PropTypes.func.isRequired,
  openRequestInfo: PropTypes.func.isRequired,
};

export default Stats;