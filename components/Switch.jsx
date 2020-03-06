import React from 'react';
import PropTypes from 'prop-types';

import MUISwitch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from './Tooltip';

const styles = {
    rootTiny:
    {
        height: '22px',
        width: '34px',
        padding: '6px',
    },
    switchBaseTiny:
    {
        padding: '4px',
        '&$checked': {
            transform: 'translateX(12px)',
        }
    },
    checked: {},/* Necessary for '&$checked' to work */
    thumbTiny:
    {
        height: '14px',
        width: '14px',
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
                size={props.size == 'tiny' ? 'medium' : props.size}
                classes={props.size == 'tiny' ? {
                    root: props.classes.rootTiny,
                    switchBase: props.classes.switchBaseTiny,
                    checked: props.classes.checked,
                    thumb: props.classes.thumbTiny
                  } : {}}
            />
        </Tooltip>
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
    tooltip: PropTypes.string,
};

Switch.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default withStyles(styles, { withTheme: true })(React.memo(Switch));
