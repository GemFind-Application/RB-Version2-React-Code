import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;

const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;

const appUri = window.location.origin+ext;
const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const appService = {
  
  getAdditionalOption,
  getStyleData,
  getConfigSetting
};

function getAdditionalOption(dealerId) {
  return fetchWrapper.get(`${baseUrl}/GetDiamondsJCOptions?DealerId=${dealerId}`);
}

function getStyleData(dealerId){
  //return fetchWrapper.get(`${baseUrl}/GetStyleSetting?DealerID=${dealerId}&ToolName=RB`);
  //return fetchWrapper.get(`${apiurlForForms}/reactconfig/getcssStyle?shop=${window.location.host}`);
  return fetchWrapper.get(`${apiurlForForms}/reactconfig/getcssStyle?shop=gemfind-product-demo-10.myshopify.com`);
 
}
function getConfigSetting(){
  return fetchWrapper.get(`${appUri}/reactconfig`);
}
