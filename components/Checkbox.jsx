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

function getCheckedIcon(props) {
    if(props.checkedIcon){
        return <Icon icon={props.checkedIcon} size={props.size} />;
    } else if(props.icon){
        return <Icon icon={props.icon} size={props.size} />;
    }
    return;
}
function getIcon(props) {
    if(props.icon){
        return <Icon icon={props.icon} size={props.size} />;
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
    if(props.disabled && props.disabledColor){
        color={color: props.disabledColor};
    }

    return (
        <Tooltip title={props.tooltip}>
            <MUICheckbox
                className={props.className + ' size'+props.size.toString()}
                checked={props.checked}
                checkedIcon={getCheckedIcon(props)}
                disabled={props.disabled}
                icon={getIcon(props)}
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
    icon: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string,
    uncheckedColor: PropTypes.string,
};

Checkbox.defaultProps = {
    disabled: false,
    size: 24,
    tooltip: ''
};

export default withStyles(style)(React.memo(Checkbox));
