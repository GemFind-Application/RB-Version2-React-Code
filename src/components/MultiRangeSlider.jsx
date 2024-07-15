import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './MultiRangeSlider.css';

const MultiRangeSlider = ({ min, max, onChange,value ,isPrice=true}) => {
 
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const [minD, setMinD] = useState(min);
  const [maxD, setMaxD] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
console.log(value)
  const getPercent = useCallback(
    (value) => Math.round(((value - minD) / (maxD - minD)) * 100),
    [minD, maxD]
  );

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
    //onChange({ min: minVal, max: maxVal });
  }, [value]);

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
      />
      <input
        type="range"
        min={minD}
        max={maxD}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxChange}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="slider__left-value">{isPrice ? '$'+minVal:minVal}</div>
        <div className="slider__right-value">{isPrice ? '$'+maxVal:maxVal}</div>
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