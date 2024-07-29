import React, { useState, useRef ,useEffect,forwardRef} from "react";
import PropTypes from "prop-types";
import "./stats.css";
import { useReactToPrint } from 'react-to-print';
//const  ComponentToPrint=()=>{
 //class ComponentToPrint extends React.PureComponent {
  const ComponentToPrint = forwardRef((props, ref) => {
   
      return (
        <div ref={ref}>{'sss'} </div>
      );
    }
  
  )
const Stats = ({ 
  formSetting,
  configAppData,
  emailAFriend, 
  openDropHint, 
  openScheduleViewing, 
  openRequestInfo ,
  openPrintRequest
}) => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const input = componentRef.current;
   //input.select();
  }, []);

  return (
    <div className="stats9">
      {configAppData.enable_hint &&
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
      {configAppData.enable_schedule_viewing &&
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
      {configAppData.enable_email_friend &&
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
      {configAppData.enable_more_info &&
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
       {configAppData.enable_print &&
      <div className="stat-items3" onClick={openPrintRequest}>
        <img
          className="fi-8429504-icon"
          loading="lazy"
          alt=""
          src="/fi-151912.svg"
        />
       <div>
      <div
      > 
       <ComponentToPrint ref={componentRef} />
      </div>
      <div className="drop-a-hint-wrapper" onClick={handlePrint}>
          <b className="request-more-info">Print</b>
        </div>
      
    </div>
      </div>
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