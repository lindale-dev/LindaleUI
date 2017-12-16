import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import './Switch.scss';

// Simple switch
function Switch(props)
{
    return (
        <div className="switch">
            <label>
                <input type='checkbox' disabled={props.disabled} checked={props.checked} onChange={props.onChange.bind(null, !props.checked)} />
                <span className='lever'></span>
            </label>
        </div>
    );
}

Switch.propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

Switch.defaultProps = {
    disabled: false
}

export default Switch;
