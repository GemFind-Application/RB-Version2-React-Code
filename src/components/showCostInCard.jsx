import React from 'react';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCard({settingDetailForCost}) {

  
  return (  
  
     <>
      {settingDetailForCost.showPrice ?      
      (settingDetailForCost.cost && settingDetailForCost.currencyFrom =='USD' )
          ? "$"+(settingDetailForCost.cost)
          :  (settingDetailForCost.cost)+' '.settingDetailForCost.currencySymbol+" "+ settingDetailForCost.currencyFrom
        : "Call for Price"  
      }
    </>
  );
}
