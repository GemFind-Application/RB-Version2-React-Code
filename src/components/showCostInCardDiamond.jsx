import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowCostInCardDiamond({diamondDetail,configAppData}) {  
  return (    
     <>
      {diamondDetail.fltPrice ?   
        configAppData.price_row_format === 'left'     ?   
          (diamondDetail.fltPrice && diamondDetail.currencyFrom =='USD' )
              ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
              :  utils.numberWithCommas(diamondDetail.fltPrice)+' '+diamondDetail.currencySymbol
        :   (diamondDetail.fltPrice && diamondDetail.currencyFrom =='USD' )
              ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
              :  diamondDetail.currencySymbol+ " " +utils.numberWithCommas(diamondDetail.fltPrice)
        : "Call for Price"  
      }
    </>
  );
}
