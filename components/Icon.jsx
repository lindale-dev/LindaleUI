import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUIIcon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

import Tooltip from './Tooltip';

const style = {
    root: {
        '.small &, &.small':{
            height: 18,
            width: 18,
            fontSize: 18,
        },
        '.forbidden &, &.forbidden':{
            cursor: 'not-allowed',
        }
    },
};

// Simple icon with conditonnal small size
function Icon(props)
{
    let color=null;
    if(props.color){
        color={color: props.color};
    }

    return (
        <Tooltip title={props.tooltip}>
            <MUIIcon
                className={props.className}
                style={color}
                classes={ { root: props.classes.root, } }
            >
                {props.icon}
            </MUIIcon>
        </Tooltip>
    );
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    tooltip: PropTypes.string
};

Icon.defaultProps = {
    tooltip: ''
};

export default withStyles(style)(Icon);
