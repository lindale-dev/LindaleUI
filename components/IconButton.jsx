import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import MUIIconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { Tooltip } from './Tooltip';

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
    let color = 'default';

    let style = { ...props.style };

    if (props.color && !props.disabled)
    {
        // Material-UI theme colors
        if (['default', 'primary', 'secondary'].includes(props.color))
        {
            color = props.color;
        }
        // RGB color
        else if (Array.isArray(props.color))
        {
            style['color'] = 'rgb(' + props.color.join(', ') + ')';
        }
        // CSS color name
        else
        {
            style['color'] = props.color;
        }
    }

    return (
        <Tooltip title={props.tooltip ?? ''} >
            <span className={props.className}>
                <MUIIconButton
                    className={'size'+props.size.toString()}
                    color={ color }
                    onClick={props.onClick}
                    draggable={props.draggable}
                    onDragStart={props.onDragStart}
                    onDragOver={props.onDragOver}
                    onDragLeave={props.onDragLeave}
                    onDrop={props.onDrop}
                    disabled={props.disabled}
                    classes={ { root: props.classes.root } }
                    style={style}
                >
                    <Icon
                        icon={props.icon}
                        size={props.size}
                    />
                </MUIIconButton>
            </span>
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
    tooltip: PropTypes.node,
    style: PropTypes.object
};

IconButton.defaultProps = {
    disabled: false,
    size: 24,
    tooltip: ''
};

export default withStyles(style)(React.memo(IconButton));
