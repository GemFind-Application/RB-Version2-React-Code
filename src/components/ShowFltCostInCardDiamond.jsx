import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowFltCostInCardDiamond({diamondDetail}) {

  
  return (  
  
     <>
      {diamondDetail.fltCaratPrice ?      
      (diamondDetail.fltCaratPrice && diamondDetail.currencyFrom =='USD' )
          ? "$"+(utils.numberWithCommas(diamondDetail.fltCaratPrice))
          :  utils.numberWithCommas(diamondDetail.fltCaratPrice)+' '.diamondDetail.currencySymbol
        : "Call for Price"  
      }
    </>
  );
}
