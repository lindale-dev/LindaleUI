import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import Checkbox from './Checkbox';
import ParameterElement from './ParameterElement';

function CheckboxElement(props)
{
    return(
        <ParameterElement name={props.name} right tooltip={props.tooltip} actionCols={2}>
            <Checkbox className='small' 
                      checked={props.checked} 
                      disabled={props.disabled} 
                      onChange={props.onChange} />
        </ParameterElement>
    )
}

CheckboxElement.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string
};

CheckboxElement.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default CheckboxElement;