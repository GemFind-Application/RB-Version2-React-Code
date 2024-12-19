import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowPerCaratPrice({diamondDetail,configAppData}) {
 
  return (  
  
     <>
      {diamondDetail.fltPrice &&   
         diamondDetail.showPrice ? 

                    diamondDetail.caratWeight ? 

                        configAppData.price_row_format === 'left'?

                            (diamondDetail.currencyFrom =='USD' )
                                ? "$"+(utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0)))
                                :  utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0))+' '+diamondDetail.currencySymbol+" "+ diamondDetail.currencyFrom 
       
                        :
                                (diamondDetail.currencyFrom =='USD' )
                                ?  "$"+(utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0)))
                                :  diamondDetail.currencyFrom+ " "+diamondDetail.currencySymbol+" "+utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0))
                    :
                    configAppData.price_row_format === 'left'?
                      (diamondDetail.currencyFrom =='USD' )
                      ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
                      : utils.numberWithCommas(diamondDetail.fltPrice) +" "+diamondDetail.currencySymbol+ " "+diamondDetail.currencyFrom
                    :
                    (diamondDetail.currencyFrom =='USD' )
                    ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
                    : diamondDetail.currencyFrom+ " "+diamondDetail.currencySymbol+" "+utils.numberWithCommas(diamondDetail.fltPrice)

                    : "Call for Price"  
      }
    </>
  );
}
