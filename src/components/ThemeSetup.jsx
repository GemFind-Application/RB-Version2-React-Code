import React, { useEffect } from 'react';
const themeData = JSON.parse('[[{"$id":"1","hoverEffect":[{"$id":"2","color1":"#000022","color2":"#FFFF00"}],"columnHeaderAccent":[{"$id":"3","color1":"#000000","color2":"#548DD4"}],"linkColor":[{"$id":"4","color1":"#828282","color2":"#FFFFFF"}],"callToActionButton":[{"$id":"5","color1":"#000022","color2":"#548DD4"}]}]]')[0][0];
const ThemeSetup = ({styleDataDynamic,documentLoaded}) => {
 // console.log(styleDataDynamic.columnHeaderAccent)
  useEffect(() => {
      /*document.documentElement.style.setProperty('--beige-00', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--beige-05', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--accent', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--slider-color', (styleDataDynamic.slider_barmakian));
      document.documentElement.style.setProperty('--slider-thumb', (styleDataDynamic.slider_barmakian));
      document.documentElement.style.setProperty('--menus-background', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--link-color', (styleDataDynamic.linkColor));
      document.documentElement.style.setProperty('--over-effect', (styleDataDynamic.hoverEffect));
      document.documentElement.style.setProperty('--note-container', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--color-mediumslateblue', (styleDataDynamic.linkColor));      
      document.documentElement.style.setProperty('--border-color', (styleDataDynamic.callToActionButton));*/
  }, [styleDataDynamic,documentLoaded]); // Empty dependency array ensures this runs once on mount
  return null; // This component doesn't render anything
};
export default ThemeSetup;
