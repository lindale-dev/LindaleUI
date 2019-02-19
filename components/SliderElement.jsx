import React from 'react';
import PropTypes from 'prop-types';

import {numberUnitProp} from '../utils/customProps';
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
                    value={props.value} />
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
    onChange: PropTypes.func.isRequired,
    startLabel: PropTypes.string,
    step: PropTypes.number,
    value: numberUnitProp
};

SliderElement.defaultProps = {
    actionCols: 6,
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    startLabel: '',
    step: 0.01
}

export default React.memo(SliderElement);
