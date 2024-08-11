function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function getUrl(metalType,name,settingId,page=""){
  let metalTypeForUrl = metalType;
  let viewUrl = metalTypeForUrl.split(" ").join("-");
 
  let newUrl = (viewUrl.split("&").join("%26")).split('/').join('-');  
  if(page==='details') {newUrl=newUrl+'-metaltype';}
  let ringName =(name.replace(/ /g,'-').replace(/&/g,'%26').replace('/','-')).toLowerCase();       
  let sku = '-sku-'+(settingId); 
  return newUrl.toLowerCase()+'-'+ringName+sku;
}
function truncateString  (string)  {
  let truncatedString=string;
  if (string.length > 20) {
    truncatedString = `${string.slice(0, 20)} ...`;
    return truncatedString
  } else {
    
    return truncatedString;
  };
}
function getskuForVirtualTryOn  (styleNumber)  {
  if (styleNumber.indexOf(':') > -1)
  {
    let colonarray =  styleNumber.split(":");

    return colonarray[0].split('-')[0];
  }else{
    return styleNumber.split('-')[0];
  }
}
function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
function getDiamondViewUrl(diamondDetail,typeD){
 
  let diamondviewurl = '';   
  let type= diamondDetail.isLabCreated? 'labcreated':'';
  let urlshape = diamondDetail.shape?diamondDetail.shape.split(" ").join("-")+'-shape-':'-shape-';
  let urlcarat = diamondDetail.carat?diamondDetail.carat.split(" ").join("-")+'-carat-':'-carat-';
  let urlcolor = diamondDetail.color?diamondDetail.color.split(" ").join("-")+'-color-':'-color-';            
  let urlclarity = diamondDetail.clarity?diamondDetail.clarity.split(" ").join("-")+'-clarity-':'-clarity-';           
  let urlcut = diamondDetail.cut ? diamondDetail.cut!==""? diamondDetail.cut.split(" ").join("-")+'-cut-':'-cut-':'-cut-';            
  let urlcert = diamondDetail.cert?diamondDetail.cert.split(" ").join("-")+'-certificate-':'-certificate-';  
  
  let urlstring = (urlshape+urlcarat+urlcolor+urlclarity+urlcut+urlcert+'sku-'+diamondDetail.diamondId).toLowerCase();
 let typeToadd = typeD=='fancy' ?'/fancydiamonds' :typeD==true?'/labcreated':''
 
      return  urlstring+  typeToadd       
//$diamondviewurl = $this->diamond_lib->getDiamondViewUrl($urlstring,$type,$base_shop_domain,$pathprefixshop); 
}
const utils = { kFormatter,numberWithCommas,getUrl,truncateString,getskuForVirtualTryOn,getDiamondViewUrl,isJsonString};
export { utils };
