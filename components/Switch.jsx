import React from 'react';
import PropTypes from 'prop-types';

import MUISwitch from '@material-ui/core/Switch';
import { withTheme } from '@material-ui/core/styles';

import Tooltip from './Tooltip';

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
                size={props.size}
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

export default withTheme(React.memo(Switch));
