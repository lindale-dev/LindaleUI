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
            <Slider endLabel={props.endLabel}
                    instantUpdate={props.instantUpdate}
                    max={props.max}
                    min={props.min}
                    onChange={props.onChange}
                    startLabel={props.startLabel}
                    step={props.step}
                    values={props.values} />
        </ParameterElement>
    );
}

SliderElement.propTypes = {
    actionCols: PropTypes.number,
    endLabel: PropTypes.string,
    instantUpdate: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    startLabel: PropTypes.string,
    step: PropTypes.number,
    values: numberUnitPropArray
};

SliderElement.defaultProps = {
    actionCols: 6,
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    startLabel: ''
}

export default SliderElement;
