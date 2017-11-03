import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './IconButton.scss';

function IconButton(props)
{
    const className = classnames(
        props.className,
        'icon-button',
        'waves-effect btn-flat',
        {
            small: props.small,
            medium: props.medium,
            pick_button: props.medium, // TODO not super clear, pass a size props instead?
            tooltipped: props.tooltip
        }
    );

    return (
        <a className={className} data-tooltip={props.tooltip} onClick={props.onClick}>
            <i className='material-icons'>{props.icon}</i>
        </a>
    );
}

// TODO
IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    tooltip: PropTypes.string
};

export default IconButton;
