import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './MultiRangeSlider.css';
import { utils } from "../Helpers";
const MultiRangeSlider = ({ min, max, onChange,value ,isPrice=true,showPercent}) => {

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
    if (minValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
console.log(minPercent)
console.log(maxPercent)
console.log(range.current.id)
      if (range.current) {
        console.log(maxPercent)

        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    setMinVal(parseFloat(value[0]));
    setMaxVal(parseFloat(value[1]));
    setMinD(min);
    setMaxD(max)
    //onChange({ min: minVal, max: maxVal });
  }, [value,min,max]);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (event) => {
    console.log(event.target.value)
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();    
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="container">
      <input
        type="range"
        min={minD}
        max={maxD}
        value={minVal}
        ref={minValRef}
        onChange={handleMinChange}
        className={classnames('thumb thumb--zindex-3', {
          'thumb--zindex-5': minVal > max - 100,
        })}
        id='rangestart'
      />
      <input
        type="range"
        min={minD}
        max={maxD}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxChange}
        className="thumb thumb--zindex-4"
        id="rangeend"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="slider__left-value">{isPrice ? '$'+  utils.numberWithCommas(minVal):showPercent ?minVal+"%":minVal}</div>
        <div className="slider__right-value">{isPrice ? '$'+  utils.numberWithCommas(maxVal):showPercent ?maxVal+"%":maxVal}</div>
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