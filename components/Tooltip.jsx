import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUITooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const style = {
    tooltip: {
        margin: '8px 0',
    },
};

function Tooltip(props)
{
    return (
        <MUITooltip 
            title={props.title}
            className={props.className}
            classes={{ tooltip: props.classes.tooltip }} 
            enterDelay={750}
        >
            {props.children}
        </MUITooltip>
    );
}

export default withStyles(style)(Tooltip);
