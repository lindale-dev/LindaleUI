import React from 'react';
import classnames from 'classnames';

import SwitchElement from './SwitchElement';
import './ToggleableGroup.scss';


type Props2 =
{
    name: string,
    toggle: boolean,

    disabled?: boolean,

    onChange?: (checked: boolean) => void
};

const defaultProps: Partial<Props2> =
{
    disabled: false
};

const ToggleableGroup: React.FunctionComponent<Props2> = (props) =>
{
    // Forward the boolean state
    const onChange = React.useCallback((e) =>
    {
        if (props.onChange) props.onChange(e.target.checked);
    }, [props.onChange]);

    const content = props.toggle && props.children !== undefined ?
        <div className='toggleable-group-body'>
            {props.children}
        </div> :
        null;

    return (
        <div className={classnames('toggleable-group', {active: props.toggle})}>
            <div className='toggleable-group-header'>
                <SwitchElement
                    name={props.name}
                    checked={props.toggle}
                    disabled={props.disabled}
                    onChange={onChange}
                />
            </div>

            {content}

        </div>
    );
}
ToggleableGroup.defaultProps = defaultProps;

export default ToggleableGroup;
