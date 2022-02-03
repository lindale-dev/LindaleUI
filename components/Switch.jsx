import React from 'react';
import PropTypes from 'prop-types';

import MUISwitch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from './Tooltip';

import colors from '../colors.jsx';

const style = {
    root: {
        '&.small':{
            height: 16,
            width: 30,
        }
    },
    switchBase: {
        color: '#eee',
        '.small &':{
            height: 16,
            width: 16,
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
                color={"primary"}
                classes={ { root: props.classes.root,
                            switchBase: props.classes.switchBase,
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

export default withStyles(style)(React.memo(Switch));
