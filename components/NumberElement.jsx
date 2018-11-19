import React from 'react';
import PropTypes from 'prop-types';

import { numberUnitProp } from '../utils/customProps';
import ParameterElement from './ParameterElement';
import NumberInput from './NumberInput';

function NumberElement(props)
{
    return (
        <label>
            <ParameterElement className='number-element' name={props.name} tooltip={props.tooltip} actionCols={props.actionCols}>
                <NumberInput disabled={props.disabled}
                             value={props.value}
                             min={props.min}
                             max={props.max}
                             onChange={props.onChange}
                             unit={props.unit} />
            </ParameterElement>
        </label>
    );
}

NumberElement.propTypes = {
    actionCols: PropTypes.number,
    disabled: PropTypes.bool,
    value: numberUnitProp,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    unit: PropTypes.string
};

NumberElement.defaultProps = {
    actionCols: 6,
    disabled: false,
    min: 0,
    max: 100,
    instantUpdate: false,
    unit: ''
}

export default NumberElement;
