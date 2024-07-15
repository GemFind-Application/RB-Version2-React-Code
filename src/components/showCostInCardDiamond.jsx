import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCardDiamond({diamondDetail}) {

  
  return (  
  
     <>
      {diamondDetail.fltPrice ?      
      (diamondDetail.fltPrice && diamondDetail.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
          :  utils.numberWithCommas(diamondDetail.fltPrice)+' '.diamondDetail.currencySymbol
        : "Call for Price"  
      }
    </>
  );
}
