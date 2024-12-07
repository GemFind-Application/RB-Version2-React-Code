import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCardDiamond({diamondDetail,configAppData}) {  
  return (    
     <>
      {diamondDetail.fltPrice ?   
        configAppData.price_row_format === 'left'     ?   
          (diamondDetail.fltPrice && diamondDetail.currencyFrom =='USD' )
              ? "$"+(utils.numberWithCommas(Math.trunc(diamondDetail.fltPrice)))
              :  utils.numberWithCommas(Math.trunc(diamondDetail.fltPrice))+' '+diamondDetail.currencySymbol
        :   (diamondDetail.fltPrice && diamondDetail.currencyFrom =='USD' )
              ? "$"+(utils.numberWithCommas(Math.trunc(diamondDetail.fltPrice)))
              :  diamondDetail.currencySymbol+ " " +utils.numberWithCommas(Math.trunc(diamondDetail.fltPrice))
        : "Call for Price"  
      }
    </>
  );
}
