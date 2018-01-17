import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import Switch from './Switch';
import ParameterElement from './ParameterElement';

function SwitchElement(props)
{
    return(
        <label>
            <ParameterElement className='switch-element' name={props.name} right tooltip={props.tooltip} actionCols={3}>
                <Switch className='small' 
                        checked={props.checked} 
                        disabled={props.disabled} 
                        onChange={props.onChange} />
            </ParameterElement>
        </label>
    )
}

SwitchElement.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string
};

SwitchElement.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default SwitchElement;