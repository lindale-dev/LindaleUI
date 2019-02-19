import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SwitchElement from './SwitchElement';
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
            <div className='toggleable-group-header'>
                <SwitchElement name={props.name}
                               checked={props.toggle}
                               onChange={e => props.onChange(e.target.checked)} />
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

export default React.memo(ToggleableGroup);
