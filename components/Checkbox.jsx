import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

// Simple checkbox with a label on a single line
function Checkbox(props)
{
    const id = uuid();

    return (
        <div className='option_element row'>
            <p>
                <label htmlFor={id} className='col s8'>{props.name}</label>
                <input type="checkbox" id={id} className="filled-in" checked={props.value} onChange={props.onChange.bind(null, !props.value)} />
                <label htmlFor={id}></label>
            </p>
        </div>
    );
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Checkbox;
