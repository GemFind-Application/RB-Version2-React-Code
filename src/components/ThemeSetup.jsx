import React, { useEffect } from 'react';
const themeData = JSON.parse('[[{"$id":"1","hoverEffect":[{"$id":"2","color1":"#000022","color2":"#FFFF00"}],"columnHeaderAccent":[{"$id":"3","color1":"#000000","color2":"#548DD4"}],"linkColor":[{"$id":"4","color1":"#828282","color2":"#FFFFFF"}],"callToActionButton":[{"$id":"5","color1":"#000022","color2":"#548DD4"}]}]]')[0][0];
const ThemeSetup = () => {
  useEffect(() => {
    //document.documentElement.style.setProperty('--hover-color-1', themeData.hoverEffect[0].color1)
     // document.documentElement.style.setProperty('--column-header-color-2', themeData.columnHeaderAccent[0].color2);
   // document.documentElement.style.setProperty('--link-color-1', themeData.linkColor[0].color1);
    // document.documentElement.style.setProperty('--cta-button-color-1', themeData.callToActionButton[0].color1);
    document.documentElement.style.setProperty('--hover-color', (themeData.hoverEffect[0].color2&&themeData.hoverEffect[0].color2!=="")?themeData.hoverEffect[0].color2:themeData.hoverEffect[0].color1);
    document.documentElement.style.setProperty('--background', (themeData.columnHeaderAccent[0].color2 &&  themeData.columnHeaderAccent[0].color2!="")?themeData.columnHeaderAccent[0].color2:themeData.columnHeaderAccent[0].color1);
    //document.documentElement.style.setProperty('--background', (themeData.columnHeaderAccent[0].color2 &&  themeData.columnHeaderAccent[0].color2!="")?themeData.columnHeaderAccent[0].color2:themeData.columnHeaderAccent[0].color1);
  
    document.documentElement.style.setProperty('--link', (themeData.linkColor[0].color2&&themeData.linkColor[0].color2!=="") ?themeData.linkColor[0].color2 :themeData.linkColor[0].color1);
  
    document.documentElement.style.setProperty('--cta-button-color', (themeData.callToActionButton[0].color2&&themeData.callToActionButton[0].color2!=="")?themeData.callToActionButton[0].color2:themeData.callToActionButton[0].color1);
  }, []); // Empty dependency array ensures this runs once on mount
  return null; // This component doesn't render anything
};
export default ThemeSetup;
