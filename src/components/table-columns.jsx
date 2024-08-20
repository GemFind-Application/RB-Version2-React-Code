import { useMemo, useState,useEffect } from "react";
import PropTypes from "prop-types";
import "./table-columns.css";
import {utils} from "../Helpers/utils"
const ShowValue = ({value,keyOfObject})=>{

  if(keyOfObject==='table' || keyOfObject==='depth'){
    return value[keyOfObject]!==""&&value[keyOfObject]!==undefined?value[keyOfObject]+"%":"-";
  }
  if(keyOfObject==='price'){
    let  showP = value.fltPrice ?      
      (value.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(value.fltPrice))
          :  utils.numberWithCommas(value.fltPrice)+' '+value.currencySymbol
        : "Call for Price"  
        return showP;      
  }
  return value[keyOfObject];
}
const TableColumns = ({
  className = "", 
  propBorderBottom,
  diamond,
  showAllParam
}) => {
  let allParams = [
    { key: 'shape', value: 'Shape' },
    { key: 'skun', value: '#sku' },
    { key: 'caratWeight', value: 'Carat' },
    { key: 'table', value: 'Table' },
    { key: 'color', value: 'Color' },
    { key: 'polish', value: 'Polish' },
    { key: 'symmetry', value: 'Symmetry' },
    { key: 'clarity', value: 'Clarity' },,
    { key: 'fluorescence', value: 'fluorescence' },
    { key: 'depth', value: 'Depth' },
    { key: 'measurement', value: 'Measurement' },
    { key: 'certificate', value: 'Certificate' },
    { key: 'cut', value: 'Cut' },
    { key: 'price', value: 'Price' }]
  const [ parametersToShow,setParametersToShow] = useState(allParams)
    
    //'shape':'Shape','skun':'#sku','carat':'Carat','table':'Table', 'color':'Color','polish':'Polish','symmetry':'Symmetry','clarity':'Clarity']);
const [item ,setItem] = useState(diamond);

useEffect(() => {
  const getData = async()=>{
    if(showAllParam == false) {
      
     // let newKeysArray=[] ;
      const promises =await Promise.all(  parametersToShow.map((item,index)=>{
        let allDetails = [];  
        diamond.map(diamondDetail=>{
        allDetails.push(diamondDetail[item.key]);
        })
        let isAllValuesAreSame = allDetails.every( (val, i, arr) => val === arr[0] ) ;
       
         
         if(isAllValuesAreSame==false) {
          return (item);
         }
         else {
          return 0;
         }
      }))

       let data = promises.filter(function( element ) {
        return element !== 0 && element !==undefined;
     });
  setParametersToShow(data)
      
    }else{
      setParametersToShow(allParams)
    }
  }
  
  setItem(diamond);
  getData(); 
}, [diamond,showAllParam]);
const tableColumnsStyle = useMemo(() => {
  return {
    borderBottom: propBorderBottom,
  };
}, [propBorderBottom]); 
return (
    <div className={`table-columns ${className}`} style={tableColumnsStyle}>
        {parametersToShow.map((parameter,index)=> {
              return  <> 
              <div className="name" key={parameter.value}>
              <div className="shape3">{parameter.value}</div>
              </div> <div className="all">
              {item.map(it=>{
                  return   <div className="v11" key={parameter.it}>
                    <b className="round4">   <ShowValue value={it} keyOfObject={parameter.key}></ShowValue></b>
                  </div>
              })} 
              </div>   
              </>
        })}
      
    </div>
  );
};

TableColumns.propTypes = {
  className: PropTypes.string,
  shape: PropTypes.string,
  round: PropTypes.string,
  round1: PropTypes.string,
  round2: PropTypes.string,
  round3: PropTypes.string,
  round4: PropTypes.string,
  round5: PropTypes.string,

  /** Style props */
  propBorderBottom: PropTypes.any,
};

export default TableColumns;
