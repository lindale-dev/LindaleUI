import React from 'react';
import PropTypes from 'prop-types';

import RCSlider from 'rc-slider';
import {numberUnitPropArray} from '../utils/customProps';
import Tooltip from './Tooltip';

import 'rc-slider/assets/index.css';
import './Slider.scss';

// TODO range slider
function Slider(props){
    return(
        <RCSlider defaultValue={props.values[0]}
                  min={props.min}
                  max={props.max}
                  step={props.step}
                  onAfterChange={props.onChange[0]} />
    )
}

Slider.propTypes = {
    values: numberUnitPropArray,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 0.01
};

export default Slider;