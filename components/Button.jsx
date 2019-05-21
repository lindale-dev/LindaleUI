import React from 'react';
import PropTypes from 'prop-types';

import MUIButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from './Tooltip';

const style = {
    root: {
        '&.size24':{
            fontSize: 12,
            padding: '1px 8px 0px',
        },
    },
};

// Simple Button with conditonnal size, and optional tooltip
function Button(props)
{
    return (
        <Tooltip title={props.tooltip}>
            <MUIButton
                classes={ { root: props.classes.root, } }
                className={props.className + ' size'+props.size.toString()}
                color={props.color}
                disabled={props.disabled}
                fullWidth={props.fullWidth}
                onClick={props.onClick}
                size={props.MUISize}
                variant={props.variant}
            >
                {props.children}
            </MUIButton>
        </Tooltip>
    );
}

Button.propTypes = {
    // See https://material-ui.com/api/button/
    disabled: PropTypes.bool,
    MUIsize: PropTypes.number,
    size: PropTypes.number,
    tooltip: PropTypes.string,
};

Button.defaultProps = {
    disabled: false,
    size: 0,
    tooltip: '',
};

export default withStyles(style)(React.memo(Button));
