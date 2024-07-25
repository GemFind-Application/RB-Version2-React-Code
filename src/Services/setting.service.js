import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const apiurlForForms = `${import.meta.env.VITE_APP_FORM_API_URL}`;
//const dealerId = 3943
const videoUrl= `${import.meta.env.VITE_APP_API_VIDEOURL}`;
//const dealerId = 4141
const dealerId = `${import.meta.env.VITE_DEALER_ID}`;
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const settingService = {
  getSettingFilters,
  getAllSettings,
  getSettingNavigation,
  getSettingDetail,
  dropAHint,
  friendsEmail,
  validateDealerPassword,
  scheduleViewing,
  requestMoreInfo,
  getSettingVideoUrl
};

function getSettingFilters(option) {
  let queryParam = getQueryFilterParam(option);
  return fetchWrapper.get(`${baseUrl}/GetFilters?DealerId=${dealerId}${queryParam}`);
}
function getSettingDetail(settingId) {
  return fetchWrapper.get(`${baseUrl}/GetMountingDetail?DealerId=${dealerId}&SID=${settingId}`);
}

function getAllSettings(option) {
  let queryParam = getQueryParam(option);
  //console.log(`${baseUrl}/GetMountingList?DealerId=${dealerId}${queryParam}`)
  return fetchWrapper.get(`${baseUrl}/GetMountingList?DealerId=${dealerId}${queryParam}`);
}
function getSettingNavigation(){
  return fetchWrapper.get(`${baseUrl}/GetNavigation?DealerId=${dealerId}`);
  
}

function dropAHint(formData,sendRequest,apiCall){
  console.log(formData);
  
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )
}
function friendsEmail(formData,sendRequest,apiCall){
 return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )

}
function validateDealerPassword(data,page){
  console.log(data);
  if(page==='setting') {
    return fetchWrapper.postFormData(
      `${apiurlForForms}/settings/authenticate`,
       data
      );
  }else{
    return fetchWrapper.postFormData(
      `${apiurlForForms}/diamondtools/authenticate`,
       data
      );
  }
 
}
function scheduleViewing(formData){
  //console.log(formData);
 return fetchWrapper.postFormData(
   `${apiurlForForms}/${sendRequest}/${apiCall}`,
   formData
  );
}
function getSettingVideoUrl(settingId){
  return fetchWrapper.get(`${videoUrl}?InventoryID=${settingId}&Type=Jewelry`); 
 }
function requestMoreInfo(formData){
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
   );
 
}
function getQueryParam(option){
  console.log(option)
  let filterString = "";
  if(option.pageSize && option.pageSize!==undefined){   
    filterString = 'pageSize='+option.pageSize;    
  }
  //console.log(filterString)
  if(option.pageNumber && option.pageNumber!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'pageNumber='+option.pageNumber;    
  }
  if(option.searchSetting && option.searchSetting!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'SID='+option.searchSetting;    
  }
  if(option.orderBy && option.orderBy!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'OrderBy='+option.orderBy  ; 
  }
  if(option.priceMin && option.priceMax){

    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'priceMin='+option.priceMin+"&priceMax="+option.priceMax  ;  
    //console.log(filterString)
  }
  //console.log(filterString)
  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.metalType && option.metalType!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'MetalType='+option.metalType;    
  }
  if(option.style && option.style!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Collection='+option.style;    
  }
  if(option.isLabSettingsAvailable == false){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=0';    
  }
  if(option.isLabSettingsAvailable == true){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=1';    
  }

  if(option.CenterStoneMinCarat !=="" && option.CenterStoneMaxCarat !=="" ){
    
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CenterStoneMinCarat='+option.CenterStoneMinCarat+"&CenterStoneMaxCarat="+option.CenterStoneMaxCarat;    
  }

  
  console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
function getQueryFilterParam(option){
 
  let filterString = "";
 
  console.log(option)
 
 
 

  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.metalType && option.metalType!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'MetalType='+option.metalType;    
  }
  if(option.style && option.style!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Collection='+option.style;    
  }
  if(option.isLabSettingsAvailable ===true ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=1';    
  }
  if(option.isLabSettingsAvailable ===false ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=0';    
  }
  console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
