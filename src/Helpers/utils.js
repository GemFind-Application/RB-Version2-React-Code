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
const utils = { kFormatter,numberWithCommas,getUrl};
export { utils };
