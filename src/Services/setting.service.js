import { fetchWrapper } from '../Helpers';
import React, { useState, useEffect ,useContext} from 'react';
import { ConfigContext } from "../components/Context"
const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
const videoUrl= `${import.meta.env.VITE_APP_API_VIDEOURL}`;
const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;
const addtocartUrl = window.location.origin+ext;
//const apiurlForForms=`${import.meta.env.VITE_APP_FORM_API_URL}`;
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
  getSettingVideoUrl,  
};
//to get all setting filters
function getSettingFilters(option,dealerId) {  
  let queryParam = getQueryFilterParam(option);
  return fetchWrapper.get(`${baseUrl}/GetFilters?DealerId=${dealerId}${queryParam}`);
}
//to get setting details for particualr setting
function getSettingDetail(settingId,dealerId,isLabGrown) {
  if(isLabGrown==true){
    return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetMountingDetail?DealerId=${dealerId}&SID=${settingId}&shop=https://gemfind-product-demo-10.myshopify.com/`);
  }else{
    return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetMountingDetail?DealerId=${dealerId}&SID=${settingId}&shop=https://gemfind-product-demo-10.myshopify.com/`);
  }
  
}
//get all settings
function getAllSettings(option,dealerId) {  
  let queryParam = getQueryParam(option);
  return fetchWrapper.get(`${baseUrl}/GetMountingList?DealerId=${dealerId}${queryParam}`);
}
//to get setting vanigation
function getSettingNavigation(dealerId){ 
  if(dealerId!=null &&dealerId!=undefined ){
    return fetchWrapper.get(`${baseUrl}/GetNavigation?DealerId=${dealerId}`);
  }
}
//drop a hint call
function dropAHint(formData,sendRequest,apiCall){
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )
}
//send email to friend
function friendsEmail(formData,sendRequest,apiCall){
 return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
  )
}
//dealer info auth and get dealer info
function validateDealerPassword(data,page){
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
//schedule viewing
function scheduleViewing(formData,sendRequest,apiCall){  
 return fetchWrapper.postFormData(
   `${apiurlForForms}/${sendRequest}/${apiCall}`,
   formData
  );
}
//get video url
function getSettingVideoUrl(settingId){
  return fetchWrapper.get(`${videoUrl}?InventoryID=${settingId}&Type=Jewelry`); 
 }
 //request info popup call
function requestMoreInfo(formData,sendRequest,apiCall){
  return fetchWrapper.postFormData(
    `${apiurlForForms}/${sendRequest}/${apiCall}`,
    formData
   ); 
}
//set parameters for setting
function getQueryParam(option){
  //console.log(option)
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
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}
//set patameters for setting filters
function getQueryFilterParam(option){
 
  let filterString = "";
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
  //console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}
