import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';

import 'mdi/css/materialdesignicons.min.css';
import './Icon.scss';

// Simple icon with conditonnal size, color and tooltip
function Icon(props)
{
    let color=null;
    if(props.color && Array.isArray(props.color)){
        color = {color: 'rgb(' + props.color.join(', ') + ')'};
    } else {
        color = {color: props.color};
    }

    const icon = <i className={'mdi mdi-'+props.icon+' mdi-'+props.size+'px '+props.className} style={color} ></i>;

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
    color: PropTypes.node,
    tooltip: PropTypes.string
};

Icon.defaultProps = {
    size: 24,
    tooltip: ''
};

export default Icon;
