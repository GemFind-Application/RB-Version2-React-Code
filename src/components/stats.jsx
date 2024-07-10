import React from "react";
import PropTypes from "prop-types";
import "./stats.css";

const Stats = ({ 
  formSetting,
  emailAFriend, 
  openDropHint, 
  openScheduleViewing, 
  openRequestInfo 
}) => {
  return (
    <div className="stats9">
      {formSetting.drop_A_Hint &&
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
      }
      {formSetting.scheduleViewing &&
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
      }
      {formSetting.email_A_Friend &&
      <div className="stat-items2" onClick={emailAFriend}>
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
      }
      {formSetting.markup_Your_Own_Inventory &&
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
      }
    </div>
  );
};

Stats.propTypes = {
  emailAFriend: PropTypes.func.isRequired,
  openDropHint: PropTypes.func.isRequired,
  openScheduleViewing: PropTypes.func.isRequired,
  openRequestInfo: PropTypes.func.isRequired,
};

export default Stats;