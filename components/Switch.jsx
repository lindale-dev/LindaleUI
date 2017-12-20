import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import { withStyles } from 'material-ui/styles';
import MUISwitch from 'material-ui/Switch';

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

// Simple switch
function Switch(props)
{
    return (
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
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    small: PropTypes.bool
};

Switch.defaultProps = {
    disabled: false,
    small: false
}

export default withStyles(styleSmall)(Switch);
