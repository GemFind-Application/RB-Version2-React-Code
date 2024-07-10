import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const dealerId = 3943
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const diamondService = {
  getDiamondFilter,
  getAllDiamond,
  getDiamondNavigation,
  getDiamondDetail,
  getFancyDiamondFilter
};

function getDiamondFilter(option,settingId) {
  //let queryParam = getQueryFilterParam(option);
  console.log(option)
 if(option==='fancy'){
  return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`);
 }else{
  if(settingId!=""){
    return fetchWrapper.get(`${baseUrl}/GetInitialFilter?DealerId=${dealerId}&IsLabGrown=true`);
  }else{
    if(option==="mined"){
      return fetchWrapper.get(`${baseUrl}/GetDiamondFilter?DealerId=${dealerId}&IsLabGrown=false`);
    }else{
      return fetchWrapper.get(`${baseUrl}/GetDiamondFilter?DealerId=${dealerId}&IsLabGrown=true`);
    }  
  }
 
 }    
}
function getFancyDiamondFilter(option,settingId) {
  return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`);
}
function getDiamondDetail(settingId) {
  return fetchWrapper.get(`${baseUrl}/GetDiamondDetail?DealerId=${dealerId}&DID=${settingId}`);
}

function getAllDiamond(option) {
  let queryParam = getQueryParam(option);
  if(option.navigation==='fancy') {
    return fetchWrapper.get(`${baseUrl}/GetColorDiamond?DealerId=${dealerId}${queryParam}&IsLabGrown=false&TableMin=0&TableMax=100`);
  }else{
    return fetchWrapper.get(`${baseUrl}/GetDiamond?DealerId=${dealerId}${queryParam}`);
  }
  
}
function getDiamondNavigation(){
  return fetchWrapper.get(`${baseUrl}/GetNavigation?DealerId=${dealerId}`);
  
}
function getQueryParam(option){
  console.log(option)
  let filterString = "";
  if(option.pageSize && option.pageSize!==undefined){   
    filterString = 'pageSize='+option.pageSize;    
  }
  console.log(filterString)
  if(option.pageNumber && option.pageNumber!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'pageNumber='+option.pageNumber;    
  }
  if(option.searchDiamond && option.searchDiamond!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'DID='+option.searchDiamond;    
  }
  if(option.orderByType && option.orderByType!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'OrderBy='+option.orderBy+"&OrderType="+option.orderByType  ; 
  }
  if(option.priceRange && option.priceRange!==undefined&&option.priceRange.length>0){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'PriceMin='+option.priceRange[0]+"&PriceMax="+option.priceRange[1]  ;  
  }
  if(option.depth && option.depth!==undefined&&option.depth.length>0){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'DepthMin='+option.depth[0]+"&DepthMax="+option.depth[1]  ;  
  }
  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.carat && option.carat!==undefined && option.carat.length > 0 &&option.carat[0]!="" && option.carat[1]!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CaratMin='+option.carat[0] + "&CaratMax="+option.carat[1];    
  }
  if(option.cut && option.cut!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CutGradeId='+option.cut;    
  }
  if(option.color && option.color!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'ColorId='+option.color;    
  }
  if(option.clarity && option.clarity!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'ClarityId='+option.clarity;    
  }
  if(option.navigation && option.navigation=='lab'){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabGrown=true';    
  }
  if(option.FancyColor && option.FancyColor!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'FancyColor='+option.FancyColor;    
  }
  if(option.intIntensity && option.intIntensity!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'intIntensity='+option.intIntensity;    
  }
  console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
function getQueryFilterParam(option){
  console.log(option)
  let filterString = "";
 
  
  if(option.navigation && option.navigation=='lab'){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabSettingsAvailable=1';    
  }
  console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  }
 
}
