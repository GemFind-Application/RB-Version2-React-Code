import { fetchWrapper } from '../Helpers';

let baseUrl = `${import.meta.env.VITE_APP_API_URL}`;

const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;

const appUri = window.location.origin+ext;
const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
let shop="";
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;
function getSubstringTillCom(url) {
  const index = url.indexOf(".com");
  if (index !== -1) {
    //console.log(url.substring(0, index + 4))
    return url.substring(0, index + 4); // +4 to include ".com"
  } else {
   // console.log(url)
    return url; // Return the original URL if ".com" is not found
  }
}


async function getDomainURL(){
  try {
    console.log("getting domain");
    const res = await this.getConfigSetting(); 
    console.log("getting res"); 
    if(res) {
      console.log("getting resinside");
      let data = res.data;  
      console.log(data)  ;   
      baseUrl=getSubstringTillCom(res.data.dealerauthapi)+"/api/RingBuilder";
      //shop=res.data.shop;
    }       
  } catch (err) {       
    //setError("Failed to fetch products. Please try again later.");         
  }
}
getDomainURL();
export const appService = {
  
  getAdditionalOption,
  getStyleData,
  getConfigSetting
};

function getAdditionalOption(dealerId,url) {
  return fetchWrapper.get(`${url}/GetDiamondsJCOptions?DealerId=${dealerId}`);
}

function getStyleData(dealerId,shop){
  //return fetchWrapper.get(`${baseUrl}/GetStyleSetting?DealerID=${dealerId}&ToolName=RB`);
  //return fetchWrapper.get(`${apiurlForForms}/reactconfig/getcssStyle?shop=${window.location.host}`);
  return fetchWrapper.get(`${apiurlForForms}/reactconfig/getcssStyle?shop=${shop}`);
 
}
function getConfigSetting(){
  return fetchWrapper.get(`${appUri}/reactconfig`);
}
