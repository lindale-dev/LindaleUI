import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'material-ui/Icon';
import MUIIconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

import Tooltip from './Tooltip';

const style = {
    root: {
        height: 24,
        width: 24,
        '&.small':{
            height: 18,
            width: 18,
        }
    },
    icon: {
        width: 24,
        height: 24,
        fontSize: 24,
        '.small &':{
            width: 18,
            height: 18,
            fontSize: 18,
        }
    },
};

// Simple icon button with conditonnal size, and optional tooltip
function IconButton(props)
{
    return (
        <Tooltip title={props.tooltip}>
            <MUIIconButton 
                className={props.className}
                onClick={props.onClick}
                classes={ { root: props.classes.root,
                            icon: props.classes.icon, } }
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
    tooltip: PropTypes.string
};

IconButton.defaultProps = {
    disabled: false,
    tooltip: ''
};

export default withStyles(style)(IconButton);
