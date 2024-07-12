import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const dealerId = 4141

export const settingService = {
  getSettingFilters,
  getAllSettings,
  getSettingNavigation,
  getSettingDetail,
  dropAHint,
  friendsEmail,
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

function dropAHint(data){
  console.log(data);
 // return fetchWrapper.put(
  //  `${baseUrl}/ringbuilder/settings/resultdrophint}/`,
  //  data
  //);
}
function friendsEmail(data){
  console.log(data);
 // return fetchWrapper.put(
  //  `${baseUrl}/ringbuilder/settings/resultemailfriend}/`,
  //  data
  //);
}
function scheduleViewing(data){
  console.log(data);
 // return fetchWrapper.put(
  //  `${baseUrl}/ringbuilder/settings/resultscheview}/`,
  //  data
  //);
}
function requestMoreInfo(data){
  console.log(data);
 // return fetchWrapper.put(
  //  `${baseUrl}/ringbuilder/settings/resultreqinfo}/`,
  //  data
  //);
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
    //console.log("=====");

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
  if(option.IsLabSettingsAvailable ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable='+option.IsLabSettingsAvailable;    
  }
  //console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
function getQueryFilterParam(option){
 
  let filterString = "";
 
  console.log(filterString)
 
 
 

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
  if(option.IsLabSettingsAvailable ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable='+option.IsLabSettingsAvailable;    
  }
  console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
