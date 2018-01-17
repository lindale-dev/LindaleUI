import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUISwitch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';

import Tooltip from './Tooltip';

import colors from '../colors.jsx';

const style = {
    root: {
        '&.small':{
            height: 14,
            width: 28,
        }
    },
    default: {
        color: '#eee',
        '.small &':{
            height: 14,
            width: 14,
        }
    },
    checked:{
        color: colors[500],
    },
    bar: {
        '.small &':{
            height: 10,
            width: 20,
            marginTop: -5,
            marginLeft: -10,
        }
    },
    icon: {
        '.small &':{
            width: 14,
            height: 14,
        }
    },
};

// Simple switch with conditonnal size, and optional tooltip
function Switch(props)
{
    return (
        <Tooltip title={props.tooltip}>
            <MUISwitch 
                className={props.className}
                checked={props.checked} 
                disabled={props.disabled} 
                disableRipple={true} 
                onChange={props.onChange} 
                classes={ { root: props.classes.root,
                            default: props.classes.default,
                            checked: props.classes.checked,
                            bar: props.classes.bar,
                            icon: props.classes.icon, } }
            />
        </Tooltip>
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string
};

Switch.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default withStyles(style)(Switch);
