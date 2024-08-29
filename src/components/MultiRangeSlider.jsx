import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './MultiRangeSlider.css';
import { utils } from "../Helpers";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
const MultiRangeSlider = ({ min, max, onChange,value ,isPrice=true,showPercent,step}) => {
console.log("value of step=="+step)
  const [minVal, setMinVal] = useState(parseFloat(value[0]));
  const [maxVal, setMaxVal] = useState(parseFloat(value[1]));
  const [minD, setMinD] = useState(min);
  const [maxD, setMaxD] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - minD) / (maxD - minD)) * 100),
    [minD, maxD]
  );

  useEffect(() => {
    /*if (minValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      if (range.current) {

        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }*/
  }, []);

  useEffect(() => {
    setMinVal(parseFloat(value[0]));
    setMaxVal(parseFloat(value[1]));
   // setMinD(min);
    //setMaxD(max)
    //onChange({ min: minVal, max: maxVal });
  }, [value]);

  const handleMinChange = (event) => {
   // const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(event.target.value);
   // event.target.value = value.toString();
    //onChange({ min: Number(event.target.value), max: maxVal });
  };

  const handleMaxChange = (event) => {
  
    if(Number.isInteger(Number(event.target.value)) &&
    event.target.value >= 0 &&
      event.target.value <= Number(max)){
 //   if(Number.isInteger(event.target.value)){
      setMaxVal(event.target.value);
    }else{

    }
    console.log("handlemaxchange")
    console.log(event)
  //  const value = Math.max(Number(event.target.value), minVal + 1);
   
   // event.target.value = value.toString();   */ 
    //onChange({ min: minVal, max: Number(event.target.value) });
  };
  const rangeSelectorprops = (newValue) => {
    console.log(newValue)
    setMaxVal(Number(newValue[0]));
   setMinVal(Number(newValue[1]));
    onChange({min:Number(newValue[0]),max:Number(newValue[1])})
  
  };
  const callAction=()=>{
    onChange({min:Number(minVal),max:Number(maxVal)})
  }
 // onBlur={callAction}
  return (
    <div className="container price_slider_box" style={{width:'50%'}}>
      {step==1 ?
     <Nouislider
              connect
              behaviour={"tap"}
              start={[
                minVal,maxVal
              ]}    
              step={1}          
              range={{
                min:parseFloat(min),
                max: parseFloat(max),
              }}
              onChange={rangeSelectorprops}
            />: <Nouislider
            connect
            behaviour={"tap"}
            start={[
              minVal,maxVal
            ]}    
            tooltips={true}      
            range={{
              min:parseFloat(min),
              max: parseFloat(max),
            }}
            onChange={rangeSelectorprops}
          />
            }
          <div className='sliderValues'>
          {isPrice?'':''}
          <div className="sliderValues1">
          <input
                type="text"
                value={step?Number(minVal):minVal}
                onChange={(e)=>handleMinChange(e)}
                onBlur={callAction}
                className="slider__left-value"
              /><span>{showPercent?'%':''}</span>
              {isPrice?'':''}
              
          </div>
          <div className="sliderValues2">
          <input
                type="text"
              
                value={step?Number(maxVal):maxVal}
                onChange={(e)=>handleMaxChange(e)}
                onBlur={callAction}
                className="slider__right-value"
                /><span>{showPercent?'%':''}</span>
            </div>
          </div>

    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;