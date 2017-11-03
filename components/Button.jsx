import React from 'react';
import PropTypes from 'prop-types';

function Button(props)
{
    return (
        <div className='option_element row'>
            <a className={'col s'+props.width+' offset-s'+props.offset+' waves-effect btn-flat-inline'} onClick={props.onClick}>{props.name}</a>
        </div>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
	width: PropTypes.number,
	offset: PropTypes.number,
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
	width: 12,
	offset: 0
};

export default Button;
