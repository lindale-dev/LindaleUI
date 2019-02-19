import React from 'react';
import PropTypes from 'prop-types';

// TODO remove number handling (should use NumberField)

function onChange(props, event)
{
    const value = event.target.value;

    // Strings: just return the typed value
    if (props.type === 'string')
    {
        if (value !== props.value)
            prop.onChange(value);
    }
    // Numbers: remove invalid characters, convert to number
    else
    {
        let numberValue = value.replace(/[^\d]/,'');
        numberValue = Number(numberValue);

        if (numberValue !== props.value)
            props.onChange(numberValue);
    }
}

function TextField(props)
{
    return (
        <div className='option_element row'>
            <label htmlFor='warning_time' className='col s6'>{props.name}</label>
            <input type='text' className='col s6 numerical_input' value={props.value} onChange={onChange.bind(null, props)} />
        </div>
    );
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['string', 'number']).isRequired, // TODO redundant? just use typeof value?
    value: validateValueType,
    onChange: PropTypes.func.isRequired
};

// TODO refactor, no need for types

// Make sure that the provided data has the appropriate type
function validateValueType(props)
{
    if (props.value === undefined)
        throw new Error('TextField: "value" props is required');

    if (typeof props.value !== props.type)
        throw new Error(`TextField: type of "value" props (${typeof props.value}) does not match "type" props (${props.type})`);
}

export default React.memo(TextField);
