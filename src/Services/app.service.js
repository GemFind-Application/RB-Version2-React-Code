import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;

const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;
console.log(window)
const appUri = window.location.origin+ext;
console.log(appUri)
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const appService = {
  
  getAdditionalOption,
  getStyleData,
  getConfigSetting
};

function getAdditionalOption(option,dealerId) {
  return fetchWrapper.get(`${baseUrl}/GetDiamondsJCOptions?DealerId=${dealerId}`);
}

function getStyleData(dealerId){
  return fetchWrapper.get(`${baseUrl}/GetStyleSetting?DealerID=${dealerId}&ToolName=RB`);
}
function getConfigSetting(){
  return fetchWrapper.get(`${appUri}/reactconfig`);
}
