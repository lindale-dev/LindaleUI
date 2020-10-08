import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Switch from './Switch';
import ParameterElement from './ParameterElement';

function SwitchElement(props)
{
    return(
        <label>
            <ParameterElement
                className={classnames('switch-element', props.className)}
                name={props.name}
                right
                tooltip={props.tooltip}
                actionCols={3}
            >
                <Switch
                    size='tiny'
                    checked={props.checked}
                    disabled={props.disabled}
                    onChange={props.onChange}
                />
            </ParameterElement>
        </label>
    )
}

SwitchElement.propTypes =
{
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.node
};

SwitchElement.defaultProps =
{
    disabled: false,
    tooltip: ''
};

export default React.memo(SwitchElement);
