import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Tooltip from './Tooltip';

import '@mdi/font/css/materialdesignicons.min.css';
import '../icons/LindaleIcons.css';

const styles = {
    18: {
        lineHeight: '18px',
        fontSize: '18px',
    },

    24: {
        lineHeight: '24px',
        fontSize: '24px',
    },

    36: {
        lineHeight: '36px',
        fontSize: '36px',
    },

    48: {
        lineHeight: '48px',
        fontSize: '48px',
    },
}

// Simple icon with conditonnal size, color and tooltip
function Icon(props)
{
    let color=null;
    if(props.color && Array.isArray(props.color))
    {
        color = {color: 'rgb(' + props.color.join(', ') + ')'};
    }
    else
    {
        color = {color: props.color};
    }

    // Use correct library depending on icon prefix
    // l-icon : LindaleIcons
    // mdi : Material Design Icons
    let icon = null;
    if(props.icon && props.icon.includes('l-icon')){
        icon = <i className={classnames('icon l-icon', props.icon, props.classes[props.size], props.className)} style={color} onClick={props.onClick} ></i>;
    } else {
        icon = <i className={classnames('icon mdi', props.icon, props.classes[props.size], props.className)} style={color} onClick={props.onClick} ></i>;
    }

    if(props.tooltip){
        return (
            <Tooltip title={props.tooltip}>
                {icon}
            </Tooltip>
        );
    } else {
        return icon;
    }
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number, // 18, 24, 36 or 48
    className: PropTypes.string,
    color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    tooltip: PropTypes.node,
    onClick: PropTypes.func
};

Icon.defaultProps = {
    size: 24,
    tooltip: ''
};

export default withStyles(styles)(React.memo(Icon));
