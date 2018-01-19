import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUITooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const style = {
    tooltip: {
        margin: 8,
        padding: 6,
        fontSize: '0.625rem',
        minHeight: 22,
    },
};

// Simple Tooltip wrapper to have consistent size regardless of the dialog width
function Tooltip(props)
{
    return (
        <MUITooltip 
            title={props.title} 
            disableTriggerHover={props.title == ''} // Hide the tooltip if empty
            disableTriggerFocus={props.title == ''}
            classes={{ tooltip: props.classes.tooltip }} 
            enterDelay={500}
        >
            {props.children}
        </MUITooltip>
    );
}

export default withStyles(style)(Tooltip);
