import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowTotalPrice({settingDetailForCost,diamondDetail,configAppData}) {
  
  return (    
     <>
      {settingDetailForCost.showPrice && diamondDetail.showPrice ? 
        configAppData.price_row_format === 'left'     ?
          (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice)) ))
          :  utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice)))+' '+settingDetailForCost.currencySymbol+" "+ settingDetailForCost.currencyFrom        
        :
          (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice))))
          :  settingDetailForCost.currencyFrom + " "+settingDetailForCost.currencySymbol+" " + utils.numberWithCommas(Number(settingDetailForCost.cost)+(Number(diamondDetail.fltPrice)))

      : "Call for Price"  
      
      }
    </>
  );
}
