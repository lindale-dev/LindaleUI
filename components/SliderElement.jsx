import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {numberUnitPropArray} from '../utils/customProps';
import ParameterElement from './ParameterElement';
import Slider from './Slider';

// TODO range slider
function SliderElement(props)
{
    return (
        <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={props.actionCols} >
            <Slider values={props.values}
                    min={props.min}
                    max={props.max}
                    onChange={props.onChange}
                    startLabel={props.startLabel}
                    endLabel={props.endLabel}
                    instantUpdate={props.instantUpdate} />
        </ParameterElement>
    );
}

SliderElement.propTypes = {
    actionCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    values: numberUnitPropArray,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    startLabel: PropTypes.string,
    endLabel: PropTypes.string,
    instantUpdate: PropTypes.bool
};

SliderElement.defaultProps = {
    actionCols: 6,
    min: 0,
    max: 100,
    startLabel: '',
    endLabel: '',
    instantUpdate: false
}

export default SliderElement;
