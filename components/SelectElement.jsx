import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Select from './Select';
import ParameterElement from './ParameterElement';

function SelectElement(props)
{
    return(
        <ParameterElement name={props.name} tooltip={props.tooltip} >
            <Select className='small' 
                    fullWidth 
                    options={props.options} 
                    selectedOption={props.selectedOption} 
                    onChange={props.onChange} />
        </ParameterElement>
    )
}

SelectElement.propTypes = {
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    selectedOption: PropTypes.string,
    onChange: PropTypes.func
};

export default SelectElement;