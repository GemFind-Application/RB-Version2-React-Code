import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
//const dealerId = 3943
const  dealerId = `${import.meta.env.VITE_DEALER_ID}`;
const addtocartPrefix = `${import.meta.env.VITE_ADD_TO_CART_PREFIX}`;
const addtocartUrl = `${import.meta.env.VITE_ADD_TO_CART}`;
const videoUrl= `${import.meta.env.VITE_APP_API_VIDEOURL}`;
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const diamondService = {
  getDiamondFilter,
  getAllDiamond,
  getDiamondNavigation,
  getDiamondDetail,
  getFancyDiamondFilter,
  getDiamondVideoUrl,
  addTocart
};

function getDiamondFilter(option) {
 
  //let queryParam = getQueryFilterParam(option);
  let initialFilter='';
  let startflowPath = JSON.parse(localStorage.getItem('startflow'));
         
  if(startflowPath && startflowPath.path=='/diamondtools' && startflowPath.isLoaded===false){           
    localStorage.setItem('startflow',JSON.stringify({'path':startflowPath.path,'isLoaded':true}));
   
   //setShowInitialFilter("initial");
   initialFilter=true
    // res = await diamondService.getDiamondInitialFilter(option);
  }else{
    initialFilter=false
   // setShowInitialFilter("regular");
    // res = await diamondService.getDiamondFilter(option);
  }
 if(option.isLabGrown==='fancy'){
  console.log(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`)
  return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`);
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
function getDiamondVideoUrl(diamondId){
 return fetchWrapper.get(`${videoUrl}?InventoryID=${diamondId}&Type=Diamond`); 
}
function getFancyDiamondFilter(option,settingId) {
  return fetchWrapper.get(`${baseUrl}/GetColorDiamondFilter?DealerId=${dealerId}`);
}
function getDiamondDetail(diamondId,isLabGrown) {
  console.log(isLabGrown)
  if(isLabGrown===true){
    return fetchWrapper.get(`${baseUrl}/GetDiamondDetail?DealerId=${dealerId}&DID=${diamondId}&IsLabGrown=True`);
  }else{
    return fetchWrapper.get(`${baseUrl}/GetDiamondDetail?DealerId=${dealerId}&DID=${diamondId}`);
  }
  
}

function getAllDiamond(option) {
  let queryParam = getQueryParam(option);
  if(option.isLabGrown==='fancy') {
    console.log(`${baseUrl}/GetColorDiamond?DealerId=${dealerId}${encodeURIComponent(queryParam)}&IsLabGrown=false`)
    return fetchWrapper.get(`${baseUrl}/GetColorDiamond?DealerId=${dealerId}${queryParam}&IsLabGrown=false`);
  }else{
    return fetchWrapper.get(`${baseUrl}/GetDiamond?DealerId=${dealerId}${queryParam}`);
  }  
}
function getDiamondNavigation(){
  return fetchWrapper.get(`${baseUrl}/GetNavigation?DealerId=${dealerId}`);  
}
function getQueryParam(option){
  //console.log(option)
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
  if(option.orderBy && option.orderBy!==undefined){
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
  if(option.certificates && option.certificates!==undefined &&  option.certificates!=""&&option.isLabGrown===true){
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
  //console.log(filterString)
  if(filterString!=""){
    return "&"+filterString;
  }else{
    return filterString;
  } 
}

function addTocart(diamondId){
let formData = new FormData();
  fetchWrapper.postFormData(
    `${addtocartUrl}/${addtocartPrefix}/${diamondId}`,
    formData
   );}
