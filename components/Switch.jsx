import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUISwitch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const styleSmall = {
    root: {
        height: 14,
        width: 28,
    },
    default: {
        height: 14,
        width: 14,
    },
    bar: {
        height: 10,
        width: 20,
        marginTop: -5,
        marginLeft: -10,
    },
    icon: {
        width: 14,
        height: 14,
    },
};

// Simple switch with conditonnal small size, and optional tooltip
function Switch(props)
{
    return (
        <Tooltip title={props.tooltip} disableTriggerHover={props.tooltip == ''} disableTriggerFocus={props.tooltip == ''}>
            <MUISwitch 
                checked={props.render_only} 
                disabled={props.disabled} 
                disableRipple={true} 
                onChange={props.onChange} 
                classes={ props.small ? { // Apply style only for small switch
                    root: props.classes.root,
                    default: props.classes.default,
                    bar: props.classes.bar,
                    icon: props.classes.icon,
                } : {} }
            />
        </Tooltip>
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    small: PropTypes.bool,
    tooltip: PropTypes.string
};

Switch.defaultProps = {
    disabled: false,
    small: false,
    tooltip: ''
};

export default withStyles(styleSmall)(Switch);
