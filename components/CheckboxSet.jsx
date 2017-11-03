import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

// Multiple checkboxes on the same line, each with its own label
function CheckboxSet(props)
{
    const checkboxes = props.labels.map((label, i) => {

        const id = uuid();

        return <div key={i} className='col s6'>
            <input type='checkbox' id={id} className='filled-in' value={props.values[i]} onChange={e => props.onChange[i](e.target.checked)} />
            <label htmlFor={id}>{label}</label>
        </div>;
    });

    return (
        <div className='option_element row'>
            <label className='col s5'>{props.name}</label>
            <div className='col s7'>
                <div className='row'>
                    {checkboxes}
                </div>
            </div>
        </div>
    );
}

CheckboxSet.propTypes = {
    name: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.bool).isRequired,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired
};

export default CheckboxSet;
