import React from 'react';
import PropTypes from 'prop-types';

import { numberUnitProp } from '../utils/customProps';
import ParameterElement from './ParameterElement';
import NumberInput from './NumberInput';

function NumberElement(props)
{
    return (
        <ParameterElement name={props.name} tooltip={props.tooltip} >
            <NumberInput value={props.value}
                         min={props.min}
                         max={props.max}
                         onChange={props.onChange}
                         startLabel={props.startLabel}
                         endLabel={props.endLabel}
                         unit={props.unit} />
        </ParameterElement>
    );
}

NumberElement.propTypes = {
    value: numberUnitProp,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    unit: PropTypes.string
};

NumberElement.defaultProps = {
    min: 0,
    max: 100,
    instantUpdate: false,
    unit: ''
}

export default NumberElement;
