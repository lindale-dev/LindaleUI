import React from 'react';
import PropTypes from 'prop-types';

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
            classes={{ tooltip: props.classes.tooltip }}
            enterDelay={props.enterDelay}
        >
            {props.children}
        </MUITooltip>
    );
}

Tooltip.propTypes = {
    enterDelay: PropTypes.number,
    title: PropTypes.string
};

Tooltip.defaultProps = {
    enterDelay: 750,
    title: ''
}

export default withStyles(style)(Tooltip);
