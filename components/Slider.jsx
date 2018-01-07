import React from 'react';
import PropTypes from 'prop-types';

import RCSlider from 'rc-slider';
import {numberUnitPropArray} from '../utils/customProps';
import Tooltip from './Tooltip';

import 'rc-slider/assets/index.css';
import './Slider.scss';

// TODO : Make this a class to properly handle value changes. See TextInput
// TODO range slider
function Slider(props){

    // This styles the handle when it is located at the slider's minimum
    // See Slider.scss for the general styling
    let handleStyle = {};
    if(props.values[0] == props.min){
        handleStyle = {
            backgroundColor: '#fff',
            border: '2px solid #bbb',
            boxSizing: 'border-box',
        };
    }

    let startLabel = null;
    if (props.startLabel != '')
    {
        startLabel = <span className='slider-start-label'>{props.startLabel}</span>;
    }

    let endLabel = null;
    if (props.endLabel != '')
    {
        endLabel = <span className='slider-end-label'>{props.endLabel}</span>;
    }

    return(
        <div className='slider'>
            {startLabel}
            <RCSlider defaultValue={props.values[0]}
                      min={props.min}
                      max={props.max}
                      step={props.step}
                      onAfterChange={props.onChange[0]}
                      handleStyle={handleStyle} />
            {endLabel}
        </div>
    )
}

Slider.propTypes = {
    values: numberUnitPropArray,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    startLabel: PropTypes.string,
    endLabel: PropTypes.string,
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 0.01,
    startLabel: '',
    endLabel: '',
};

export default Slider;