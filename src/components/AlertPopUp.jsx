import React, { useState, useCallback, useEffect } from "react";
import "../pages/settings.css";
export default function  AlertPopUp  ({onClose,message})  {
   

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1000);})


        
    return (
        <div className="video-popup-overlay "  >
        <div className="video-popup-content">
          <button className="close-button" onClick={onClose}>×</button>
          {message}
        </div>
        </div>
    )
  }
  <style>
 
  </style>