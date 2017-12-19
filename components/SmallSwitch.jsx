import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';

const style = {
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
function SmallSwitch(props)
{
    return (
        <Switch 
            checked={props.render_only} 
            disabled={props.disabled} 
            disableRipple={true} 
            onChange={(event, checked) => setProperty('render_only', checked)} 
            classes={{
                root: props.classes.root,
                default: props.classes.default,
                bar: props.classes.bar,
                icon: props.classes.icon,
            }}
        />
    );
}

SmallSwitch.propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

SmallSwitch.defaultProps = {
    disabled: false
}

export default withStyles(style)(SmallSwitch);
