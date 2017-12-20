import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'material-ui/Icon';
import MUIIconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const styleSmall = {
    root: {
        height: 18,
        width: 18,
    },
    icon: {
        width: 18,
        height: 18,
        fontSize: 18,
    },
};

// Simple icon button with conditonnal small size, and optional tooltip
function IconButton(props)
{
    return (
        <Tooltip title={props.tooltip} disableTriggerHover={props.tooltip == ''} disableTriggerFocus={props.tooltip == ''}>
            <MUIIconButton 
                className={props.className}
                onClick={props.onClick}
                classes={ props.small ? { // Apply style only for small icon button
                    root: props.classes.root,
                    icon: props.classes.icon,
                } : {} }
            >
                <Icon>{props.icon}</Icon>
            </MUIIconButton>
        </Tooltip>
    );
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    small: PropTypes.bool,
    tooltip: PropTypes.string
};

IconButton.defaultProps = {
    disabled: false,
    small: false,
    tooltip: ''
};

export default withStyles(styleSmall)(IconButton);
