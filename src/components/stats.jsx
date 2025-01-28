import React, { useState, useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./stats.css";
import { useReactToPrint } from 'react-to-print';
const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
//const  ComponentToPrint=()=>{
//class ComponentToPrint extends React.PureComponent {
const ComponentToPrint = forwardRef(({ data }, ref) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(data, 'text/html');
  // const myDiv = doc.querySelector('.printDiv');
  //const RenderHTML = (props) => (<span dangerouslySetInnerHTML={{__html:props.HTML}}></span>)
  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: data }} />
  );
}

)

const Stats = ({
  formSetting,
  configAppData,
  emailAFriend,
  openDropHint,
  openScheduleViewing,
  openRequestInfo,
  openPrintRequest,
  diamondContent,
  showPrint
}) => {
  //console.log('here 1')
  //console.log(diamondContent)
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const input = componentRef.current;
    //input.select();
  }, []);
  //console.log(configAppData)
  return (
    <div className="details4Info">
      {configAppData.enable_hint && configAppData.enable_hint == "true" &&
        <div className="stat-items" onClick={openDropHint}>
          <div className="stat-item dropAHint">
            <b>Drop A Hint</b>
          </div>
        </div>
      }
      {configAppData.enable_schedule_viewing && configAppData.enable_schedule_viewing == "true" &&
        <div className="stat-items" onClick={openScheduleViewing}>
          <div className="stat-item scheduleViewing">
            <b>Schedule Viewing</b>
          </div>
        </div>
      }
      {configAppData.enable_email_friend && configAppData.enable_email_friend == "true" &&
        <div className="stat-items" onClick={emailAFriend}>
          <div className="stat-item emailAFriend">
            <b>Email A Friend</b>
          </div>
        </div>
      }
      {configAppData.enable_more_info && configAppData.enable_more_info == "true" &&
        <div className="stat-items" onClick={openRequestInfo}>
          <div className="stat-item requestMoreInfo">
            <b>Request More Info</b>
          </div>
        </div>
      }
      {showPrint && showPrint !== false &&
        <div className="stat-items3" onClick={openPrintRequest}>
          <div>
            {<div style={{ display: 'none' }}> <ComponentToPrint ref={componentRef} data={[diamondContent ? diamondContent : '']} /></div>}

            <div className="stat-item statPrint" onClick={handlePrint}>
              <b>Print</b>
            </div>
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