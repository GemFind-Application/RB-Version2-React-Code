import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
//const dealerId = 3943
//const  dealerId = `${import.meta.env.VITE_DEALER_ID}`;
const addtocartPrefix = `${import.meta.env.VITE_ADD_TO_CART_PREFIX}`;
const ext = `${import.meta.env.VITE_SHOP_EXTENSION}`;
const addtocartUrl = window.location.origin+ext;
const videoUrl= `${import.meta.env.VITE_APP_API_VIDEOURL}`;
const completePurchase = `${import.meta.env.VITE_ADD_TO_CART_COMPLETE_PURCHASE_PREFIX}`;
const apiurlForForms = `${import.meta.env.VITE_APP_FORM_API_URL}`;

//console.log(window.location)
export const diamondService = {
  getDiamondFilter,
  getAllDiamond,
  getDiamondNavigation,
  getDiamondDetail,
  getFancyDiamondFilter,
  getDiamondVideoUrl,
 
  
};
//get diamond filter
function getDiamondFilter(option,dealerId) { 
  //let queryParam = getQueryFilterParam(option);
  let initialFilter='';
  let startflowPath = JSON.parse(localStorage.getItem('startflow'));         
  if(startflowPath && startflowPath.path=='/diamondtools' && startflowPath.isLoaded===false){           
    localStorage.setItem('startflow',JSON.stringify({'path':startflowPath.path,'isLoaded':true}));   
    initialFilter=true;
  }else{
    initialFilter=false;
  }
  if(option.isLabGrown==='fancy'){
    return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}&TableMin=0&TableMax=100&DepthMin=0&DepthMax=100`);
  }else{
    if( initialFilter===true){
      if(option.isLabGrown===0){
        return fetchWrapper.get(`${baseUrl}/GetInitialFilter?DealerId=${dealerId}&IsLabGrown=false`);
      }else{
        return fetchWrapper.get(`${baseUrl}/GetInitialFilter?DealerId=${dealerId}&IsLabGrown=true`);
      }    
    }else{
      if(option.isLabGrown===false){
        return fetchWrapper.get(`${baseUrl}/GetDiamondFilter?DealerId=${dealerId}&IsLabGrown=false`);
      }else{
        return fetchWrapper.get(`${baseUrl}/GetDiamondFilter?DealerId=${dealerId}&IsLabGrown=true`);
      }  
    } 
  }    
}

//get diamond video url
function getDiamondVideoUrl(diamondId){  
 return fetchWrapper.get(`${videoUrl}?InventoryID=${diamondId}&Type=Diamond`); 
}
//get fancy diamond filter
function getFancyDiamondFilter(option,settingId,dealerId) {
  return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`);
}
//get diamond details
function getDiamondDetail(diamondId,isLabGrown,dealerId) {
  if(isLabGrown!==false){
    if(isLabGrown==true){
      return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetDiamondDetail?DealerId=${dealerId}&DID=${diamondId}&IsLabGrown=labcreated&shop=gemfind-product-demo-10.myshopify.com`);
    }
    if(isLabGrown=='fancy'){
      return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetDiamondDetail?DealerId=${dealerId}&DID=${diamondId}&IsLabGrown=fancydiamonds&shop=gemfind-product-demo-10.myshopify.com`);
    }
    
  }else{
    return fetchWrapper.get(`${apiurlForForms}/reactconfig/GetDiamondDetail?DealerId=${dealerId}&DID=${diamondId}&shop=gemfind-product-demo-10.myshopify.com`);
  }  


  
}
//get all diamond list
function getAllDiamond(option,dealerId) {
  let queryParam = getQueryParam(option);
  if(option.isLabGrown==='fancy') {
    return fetchWrapper.get(`${baseUrl}/GetColorDiamond?DealerId=${dealerId}${queryParam}&IsLabGrown=false`);
  }else{
    return fetchWrapper.get(`${baseUrl}/GetDiamond?DealerId=${dealerId}${queryParam}&TableMin=0&TableMax=100&DepthMin=0&DepthMax=100`);
  }  
}

//get diamond navigation
function getDiamondNavigation(dealerId){
  return fetchWrapper.get(`${baseUrl}/GetNavigation?DealerId=${dealerId}`);  
}
//create get query 
function getQueryParam(option){
  let filterString = "";
  if(option.pageSize && option.pageSize!==undefined){   
    filterString = 'pageSize='+option.pageSize;    
  }
  if(option.pageNumber && option.pageNumber!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'pageNumber='+option.pageNumber;    
  }
  if(option.searchDiamond && option.searchDiamond!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'DID='+option.searchDiamond;    
  }
  if(option.OrderBy ){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'OrderBy='+option.orderBy+"&OrderType="+option.orderDirection  ; 
  }
  if(option.priceMin!==undefined&&option.priceMax!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'PriceMin='+option.priceMin+"&PriceMax="+option.priceMax  ;  
  }
  if(option.depth && option.depth!==undefined&&option.depth.length>0){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'DepthMin='+option.depth[0]+"&DepthMax="+option.depth[1]  ;  
  }
  if(option.depth && option.table!==undefined&&option.table.length>0){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'TableMin='+option.table[0]+"&TableMax="+option.table[1]  ;  
  }
  if(option.shape && option.shape!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Shape='+option.shape;    
  }
  if(option.symmetry && option.symmetry!==undefined && option.symmetry!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'SymmetryId='+option.symmetry;    
  }
  if(option.polish && option.polish!==undefined && option.polish!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'PolishId='+option.polish;    
  }
  console.log(option)
  if(option.certificates && option.certificates!==undefined &&  option.certificates!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'Certificate='+option.certificates;    
  }
  if(option.fluorescence && option.fluorescence!==undefined&& option.fluorescence!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'FluorescenceId='+option.fluorescence;    
  }
  if(option.carat && option.carat!==undefined && option.carat.length > 0 &&option.carat[0]!="" && option.carat[1]!=""){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CaratMin='+option.carat[0] + "&CaratMax="+option.carat[1];    
  }
  if(option.cut && option.cut!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'CutGradeId='+option.cut;    
  }
  if(option.colour && option.colour!==undefined){
    if(option.intensity && option.intensity){
      filterString += filterString.length > 0 ? `&` : '';
      filterString += 'FancyColor='+option.colour; 
    }else{
      filterString += filterString.length > 0 ? `&` : '';
      filterString += 'ColorId='+option.colour; 
    }      
  }
  if(option.clarity && option.clarity!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'ClarityId='+option.clarity;    
  }
  if(option.isLabGrown===true){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabGrown=true';    
  }
  if(option.isLabGrown===false){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'IsLabGrown=false';    
  }
  if(option.FancyColor && option.FancyColor!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'FancyColor='+option.FancyColor;    
  }
  if(option.intensity && option.intensity!==undefined){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'intIntensity='+option.intensity;    
  }

  if(option.diamondfilter && option.diamondfilter!=='all'){
    filterString += filterString.length > 0 ? `&` : '';
    filterString += 'diamondfilter='+option.diamondfilter;    
  }
  

  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}

