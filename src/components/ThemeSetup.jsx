import React, { useEffect } from 'react';
const themeData = JSON.parse('[[{"$id":"1","hoverEffect":[{"$id":"2","color1":"#000022","color2":"#FFFF00"}],"columnHeaderAccent":[{"$id":"3","color1":"#000000","color2":"#548DD4"}],"linkColor":[{"$id":"4","color1":"#828282","color2":"#FFFFFF"}],"callToActionButton":[{"$id":"5","color1":"#000022","color2":"#548DD4"}]}]]')[0][0];
const ThemeSetup = ({styleDataDynamic}) => {
 // console.log(styleDataDynamic.columnHeaderAccent)
  useEffect(() => {
      // if()
      /*console.log(document.getElementsByClassName('filter-dropdown'))
      //document.documentElement.style.setProperty('--hover-color-1', themeData.hoverEffect[0].color1)
      // document.documentElement.style.setProperty('--column-header-color-2', themeData.columnHeaderAccent[0].color2);
      // document.documentElement.style.setProperty('--link-color-1', themeData.linkColor[0].color1);
      // document.documentElement.style.setProperty('--cta-button-color-1', themeData.callToActionButton[0].color1);
      if(document.getElementsByClassName('step-items1').length>0){
      document.getElementsByClassName('step-items1')[0].style.borderColor =styleDataDynamic.callToActionButton ;
      // document.getElementsByClassName('border--round')[0].style.background =styleDataDynamic.columnHeaderAccent ;
      //document.getElementsByClassName('empty-options')[0].style.background =styleDataDynamic.columnHeaderAccent ;
      }
      document.documentElement.style.setProperty('--beige-00', (styleDataDynamic.columnHeaderAccent));
      // document.getElementsByClassName('step-items1').style.borderColor =styleDataDynamic.callToActionButton ;
      //document.documentElement.style.setProperty('--background', (themeData.columnHeaderAccent[0].color2 &&  themeData.columnHeaderAccent[0].color2!="")?themeData.columnHeaderAccent[0].color2:themeData.columnHeaderAccent[0].color1);
      //document.documentElement.style.setProperty('--background', (themeData.columnHeaderAccent[0].color2 &&  themeData.columnHeaderAccent[0].color2!="")?themeData.columnHeaderAccent[0].color2:themeData.columnHeaderAccent[0].color1);

      // document.documentElement.style.setProperty('--color-mediumslate', (styleDataDynamic.callToActionButton));

      document.documentElement.style.setProperty('--accent', (styleDataDynamic.callToActionButton));*/
  }, [styleDataDynamic]); // Empty dependency array ensures this runs once on mount
  return null; // This component doesn't render anything
};
export default ThemeSetup;
