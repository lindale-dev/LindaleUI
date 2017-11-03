import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import mat from 'materialize-css';

function RadioSelect(props)
{
    const options = props.values.map((value, i) => {

        const id = uuid();

        return <div key={i} className='col s6'>
            <input type='radio' id={id} className='with-gap' checked={value === props.selectedValue} onChange={props.onChange.bind(null, value)}/>
            <label htmlFor={id} >{value}</label>
        </div>;
    });

    return (
        <div className='option_element row'>
            <label className='col s5'>{props.name}</label>
            <div className='col s7'>
                <form>
                    {options}
                </form>
            </div>
        </div>
    );
}

RadioSelect.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RadioSelect;
