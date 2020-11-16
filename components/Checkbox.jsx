import React from 'react';
import PropTypes from 'prop-types';

import MUICheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';
import Tooltip from './Tooltip';

const style = {
    root: {
        '&.size18':{
            height: 18,
            width: 18,
            fontSize: 18,
            padding: 0,
            '& svg':{
                fontSize: 18,
            }
        },
        '&.size24':{
            height: 24,
            width: 24,
            fontSize: 24,
            '& svg':{
                fontSize: 24,
            }
        }
    },
};

function getIcon(icon, size) {
    return <Icon
        icon={icon}
        size={size}
    />;
}

// Simple checkbox with conditonnal size, and optional tooltip
function Checkbox(props)
{
    let color=null;
    if (props.checked && props.checkedColor)
    {
        color={color: props.checkedColor};
    }
    if (!props.checked && props.uncheckedColor)
    {
        color={color: props.uncheckedColor};
    }
    if (props.disabled && props.disabledColor)
    {
        color={color: props.disabledColor};
    }

    const icon = props.icon || 'mdi-checkbox-blank-outline';
    const checkedIcon = props.checkedIcon || props.icon || 'mdi-checkbox-marked';

    return (
        <Tooltip title={props.tooltip}>
            <MUICheckbox
                className={props.className + ' size'+props.size.toString()}
                checked={props.checked}
                checkedIcon={getIcon(checkedIcon, props.size)}
                disabled={props.disabled}
                icon={getIcon(icon, props.size)}
                onChange={props.onChange}
                onClick={props.onClick}
                color={"primary"}
                style={color}
                classes={ { root: props.classes.root, } }
            />
        </Tooltip>
    );
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    checkedColor: PropTypes.string,
    checkedIcon: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledColor: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    tooltip: PropTypes.node,
    uncheckedColor: PropTypes.string,
};

Checkbox.defaultProps = {
    disabled: false,
    size: 24,
    tooltip: ''
};

export default withStyles(style)(React.memo(Checkbox));
