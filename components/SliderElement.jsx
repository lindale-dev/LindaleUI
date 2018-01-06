import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {numberUnitPropArray} from '../utils/customProps';
import ParameterElement from './ParameterElement';
import Slider from './Slider';

function toNumber(x)
{
    return parseFloat(x);
}

// TODO range slider
function SliderElement(props)
{
    return (
        <ParameterElement name={props.name} tooltip={props.tooltip} >
            <Slider values={props.values}
                    min={props.min}
                    max={props.max}
                    onChange={props.onChange} />
        </ParameterElement>
    );
}

SliderElement.propTypes = {
    name: PropTypes.string.isRequired,
    values: numberUnitPropArray,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired
};

SliderElement.defaultProps = {
    min: 0,
    max: 100
}

export default SliderElement;
