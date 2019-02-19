import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUIRadio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';
import Tooltip from './Tooltip';

const style = {
    root: {
        '&.size18':{
            height: 18,
            width: 18,
            fontSize: 18,
            '& svg':{
                fontSize: 14,
            }
        },
        '&.size24':{
            height: 24,
            width: 24,
            fontSize: 24,
            '& svg':{
                fontSize: 18,
            }
        }
    },
};

// Simple radio with conditonnal size, and optional tooltip
function Radio(props)
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
            <MUIRadio
                className={props.className + ' size'+props.size.toString()}
                checked={props.checked}
                disabled={props.disabled}
                onChange={props.onChange}
                color={"primary"}
                style={color}
                classes={ { root: props.classes.root, } }
            />
        </Tooltip>
    );
}

Radio.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string
};

Radio.defaultProps = {
    disabled: false,
    size: 24,
    tooltip: ''
};

export default withStyles(style)(React.memo(Radio));
