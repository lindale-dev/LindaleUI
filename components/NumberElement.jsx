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
                <NumberInput {...props} />
            </ParameterElement>
        </label>
    );
}

NumberElement.propTypes = {
    actionCols: PropTypes.number,
    disabled: PropTypes.bool,
    value: numberUnitProp, // TODO is it still used somewhere or just use a number?!
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    decimals: PropTypes.number, // Max number of decimals
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    unit: PropTypes.string
};

NumberElement.defaultProps = {
    actionCols: 6,
    disabled: false,
    min: 0,
    max: 100,
    decimals: 3,
    instantUpdate: false,
    unit: ''
}

export default React.memo(NumberElement);
