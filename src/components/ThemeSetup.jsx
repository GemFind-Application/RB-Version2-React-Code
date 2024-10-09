import React, { useEffect } from 'react';
//const themeData = JSON.parse('[[{"$id":"1","hoverEffect":[{"$id":"2","color1":"#000022","color2":"#FFFF00"}],"columnHeaderAccent":[{"$id":"3","color1":"#000000","color2":"#548DD4"}],"linkColor":[{"$id":"4","color1":"#828282","color2":"#FFFFFF"}],"callToActionButton":[{"$id":"5","color1":"#000022","color2":"#548DD4"}]}]]')[0][0];
const ThemeSetup = ({styleDataDynamic,documentLoaded,configAppData}) => {
  //console.log(Object.keys(styleDataDynamic).length)
  useEffect(() => {
    if(Object.keys(styleDataDynamic).length !== 0 && styleDataDynamic.set_default_view==0){
      document.documentElement.style.setProperty('--beige-00', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--beige-05', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--accent', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--slider-color', (styleDataDynamic.slider_barmakian));
      document.documentElement.style.setProperty('--slider-thumb', (styleDataDynamic.slider_barmakian));
      document.documentElement.style.setProperty('--menus-background', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--link-color', (styleDataDynamic.linkColor));
      document.documentElement.style.setProperty('--over-effect', (styleDataDynamic.hoverEffect));
      document.documentElement.style.setProperty('--note-container', (styleDataDynamic.columnHeaderAccent));
      document.documentElement.style.setProperty('--color-mediumslateblue', (styleDataDynamic.linkColor));      
      document.documentElement.style.setProperty('--border-color', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--backgroundtext', (styleDataDynamic.backgroundText));
      document.documentElement.style.setProperty('--backgroundmenutext', ('#fff'));
      document.documentElement.style.setProperty('--backgroundmenutextdiamond', (styleDataDynamic.backgroundText));
      document.documentElement.style.setProperty('--beige-04', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--beige-05', (styleDataDynamic.callToActionButton));
      document.documentElement.style.setProperty('--notselectedmenucolor', (styleDataDynamic.backgroundText));

     
    }
    if(configAppData.font_family=="Other" && configAppData.theme_font_family!==""){
      document.documentElement.style.setProperty('--body-14-reg', (configAppData.theme_font_family));
      document.documentElement.style.setProperty('--h4', (configAppData.theme_font_family));
      document.documentElement.style.setProperty('--font-inter', (configAppData.theme_font_family));
      document.documentElement.style.setProperty('--font-acumin-pro', (configAppData.theme_font_family));
    }else{
      document.documentElement.style.setProperty('--body-14-reg', (configAppData.font_family));
      document.documentElement.style.setProperty('--h4', (configAppData.font_family));
      document.documentElement.style.setProperty('--font-inter', (configAppData.font_family));
      document.documentElement.style.setProperty('--font-acumin-pro', (configAppData.font_family));
    }
      
  }, [styleDataDynamic,documentLoaded,configAppData]); // Empty dependency array ensures this runs once on mount
  return null; // This component doesn't render anything
};
export default ThemeSetup;
