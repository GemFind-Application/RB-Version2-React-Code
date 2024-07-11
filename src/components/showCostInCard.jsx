import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCard({settingDetailForCost}) {

  
  return (  
  
     <>
      {settingDetailForCost.showPrice ?      
      (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(settingDetailForCost.cost))
          :  utils.numberWithCommas(settingDetailForCost.cost)+' '.settingDetailForCost.currencySymbol+" "+ settingDetailForCost.currencyFrom
        : "Call for Price"  
      }
    </>
  );
}
