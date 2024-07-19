import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCard({settingDetailForCost,configAppData}) {
  
  return (    
     <>
      {settingDetailForCost.showPrice ? 
        configAppData.price_row_format === 'left'     ?
          (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(settingDetailForCost.cost))
          :  utils.numberWithCommas(settingDetailForCost.cost)+' '+settingDetailForCost.currencySymbol+" "+ settingDetailForCost.currencyFrom        
        :
          (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(settingDetailForCost.cost))
          :  settingDetailForCost.currencyFrom + " "+settingDetailForCost.currencySymbol+" " + utils.numberWithCommas(settingDetailForCost.cost)

      : "Call for Price"  
      
      }
    </>
  );
}
