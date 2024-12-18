import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowFltCostInCardDiamond({diamondDetail,configAppData}) {

  return (  
  
    <>
    {diamondDetail.showPrice ? 
      configAppData.price_row_format === 'left'     ?
        (diamondDetail.fltCaratPrice && diamondDetail.currencyFrom =='USD' )
        ? "$"+(utils.numberWithCommas(diamondDetail.fltCaratPrice))
        :  utils.numberWithCommas(diamondDetail.fltCaratPrice)+' '+diamondDetail.currencySymbol   +" "+   diamondDetail.currencyFrom  
      :
        (diamondDetail.fltCaratPrice && diamondDetail.currencyFrom =='USD' )
        ? "$"+(utils.numberWithCommas(diamondDetail.fltCaratPrice))
        :  diamondDetail.currencyFrom + " "+diamondDetail.currencySymbol+" " + utils.numberWithCommas(diamondDetail.fltCaratPrice)

    : "Call for Price"  
    
    }
  </>
  );
}
