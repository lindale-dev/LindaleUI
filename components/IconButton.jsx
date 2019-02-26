import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import MUIIconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from './Tooltip';

const style = {
    root: {
        padding: 0,
        height: 24,
        width: 24,
        fontSize: 24,
        '&.size18':{
            height: 18,
            width: 18,
            fontSize: 18,
        }
    },
};

// Simple icon button with conditonnal size, and optional tooltip
function IconButton(props)
{
    let color=null;
    if(props.color){
        if(Array.isArray(props.color)){
            color={color: 'rgb(' + props.color.join(', ') + ')'};
        } else {
            color={color: props.color};
        }
    }

    return (
        <Tooltip title={props.tooltip} className={props.right ? 'align-right' : ''} >
            <MUIIconButton
                className={props.className + ' size'+props.size.toString()}
                onClick={props.onClick}
                draggable={props.draggable}
                onDragStart={props.onDragStart}
                onDragOver={props.onDragOver}
                onDragLeave={props.onDragLeave}
                onDrop={props.onDrop}
                disabled={props.disabled}
                style={color}
                classes={ { root: props.classes.root } }
            >
                <Icon icon={props.icon} size={props.size} />
            </MUIIconButton>
        </Tooltip>
    );
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDrop: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    tooltip: PropTypes.string
};

IconButton.defaultProps = {
    disabled: false,
    size: 24,
    tooltip: ''
};

export default withStyles(style)(React.memo(IconButton));
