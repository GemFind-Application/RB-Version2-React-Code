import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowTotalPrice({settingDetailForCost,diamondDetail,configAppData}) {
  console.log(diamondDetail)
  return (    
     <>
      {settingDetailForCost.showPrice && diamondDetail.showPrice ? 
        configAppData.price_row_format === 'left'     ?
          (settingDetailForCost.cost && diamondDetail.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice)) ))
          :  utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice)))+' '+diamondDetail.currencySymbol+" "+ diamondDetail.currencyFrom        
        :
          (settingDetailForCost.cost && diamondDetail.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice))))
          :  diamondDetail.currencyFrom + " "+diamondDetail.currencySymbol+" " + utils.numberWithCommas((Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice))).toFixed(2))

      : "Call for Price"  
      
      }
    </>
  );
}
