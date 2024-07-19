import React from 'react';
import { utils } from '../Helpers';
//import { chevronLeft, chevronRight } from './SVG';
export default function ShowPerCaratPrice({diamondDetail}) {
 
  return (  
  
     <>
      {diamondDetail.fltPrice &&   
         diamondDetail.showPrice ?   
                    diamondDetail.caratWeight ? 
                            (diamondDetail.currencyFrom =='USD' )
                                ? "$"+(utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0)))
                                :  diamondDetail.currencyFrom+ " "+diamondDetail.currencySymbol+" "+utils.numberWithCommas(Math.round(diamondDetail.fltPrice/diamondDetail.caratWeight).toFixed(0))
        
                    :
                    (diamondDetail.currencyFrom =='USD' )
                    ? "$"+(utils.numberWithCommas(diamondDetail.fltPrice))
                    :  diamondDetail.currencyFrom+ " "+diamondDetail.currencySymbol+" "+utils.numberWithCommas(diamondDetail.fltPrice)
         : "Call for Price"  
      }
    </>
  );
}
