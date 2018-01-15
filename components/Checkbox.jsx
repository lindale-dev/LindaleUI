import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUICheckbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

import Icon from './Icon';
import Tooltip from './Tooltip';

const style = {
    default: {
        '&.small':{
            height: 18,
            width: 18,
            fontSize: 18,
        }
    },
};

function getCheckedIcon(props) {
    if(props.checkedIcon){
        return <Icon icon={props.checkedIcon} />;
    }
    return;
}
function getIcon(props) {
    if(props.icon){
        return <Icon icon={props.icon} />;
    }
    return;
}

// Simple checkbox with conditonnal size, and optional tooltip
function Checkbox(props)
{
    let color=null;
    if(props.checked && props.checkedColor){
        color={color: props.checkedColor};
    }
    if(!props.checked && props.uncheckedColor){
        color={color: props.uncheckedColor};
    }
    
    return (
        <Tooltip title={props.tooltip}>
            <MUICheckbox 
                className={props.className}
                checked={props.checked}
                checkedIcon={getCheckedIcon(props)}
                disabled={props.disabled}
                icon={getIcon(props)}
                onChange={props.onChange}
                style={color}
                classes={ { default: props.classes.default, } }
            />
        </Tooltip>
    );
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string
};

Checkbox.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default withStyles(style)(Checkbox);
