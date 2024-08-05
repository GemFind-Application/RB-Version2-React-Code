import React, { useState, useCallback, useEffect } from "react";
import "../pages/settings.css";
import PortalPopup from "../components/portal-popup";
export default function  AlertPopUp  ({onClose,message,title,onClick})  {  
  const imageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
   /* useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);})*/
    return (
        <PortalPopup
        overlayColor="rgba(113, 113, 113, 0.3)"
          
      >
        
        <div className="popup-overlay drop-hint-popup">
          <div className="popup-content">
           {message!=="" ? 
           <>
            <button  onClick={onClose} className="close-button" >×</button>   
            <div className="success-message">
              <h2>{title}</h2>
              <p>{message}</p>
                {title==='Reset'&& <button onClick={onClick}>Reset</button> }          
            </div></>:<div><img src={imageUrl+'/diamond.gif'}/></div>}
          </div>
        </div>
     </PortalPopup>
    )
  }
  <style>
 
  </style>