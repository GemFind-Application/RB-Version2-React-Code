import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const dealerId = `${import.meta.env.VITE_DEALER_ID}`;
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const appService = {
  getAdditionalOption,
  getStyleData
};

function getAdditionalOption(option) {
  return fetchWrapper.get(`${baseUrl}/GetDiamondsJCOptions?DealerId=${dealerId}`);
}

function getStyleData(){
  return fetchWrapper.get(`${baseUrl}/GetStyleSetting?DealerID=${dealerId}&ToolName=RB`);
}