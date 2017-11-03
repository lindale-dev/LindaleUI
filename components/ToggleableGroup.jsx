import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ToggleableGroup.scss';

function ToggleableGroup(props)
{
    const content = props.toggle && props.children ?
        <div className='toggleable-group-body'>
            {props.children}
        </div> :
        null;

    return (
        <div className={classnames('toggleable-group', {active: props.toggle})}>

            <div className='toggleable-group-header' onClick={e => {e.preventDefault(); props.onChange(!props.toggle)}}>
                <span className='toggleable-group-title'>{props.name}</span>
                <span className='switch col s4'>
                    <label className='right'>
                        <input type='checkbox' checked={props.toggle} onChange={e => props.onChange(e.target.checked)} />
                        <span className='lever wide'></span>
                    </label>
                </span>
            </div>

            {content}

        </div>
    );
}

ToggleableGroup.propTypes = {
    name: PropTypes.string.isRequired,
    toggle: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ToggleableGroup;
