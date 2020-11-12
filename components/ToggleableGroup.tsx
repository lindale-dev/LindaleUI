import React from 'react';
import classnames from 'classnames';

import SwitchElement from './SwitchElement';
import './ToggleableGroup.scss';


type Props =
{
    name: string,
    toggle: boolean,

    disabled?: boolean,

    onChange: (event: object) => void
};


const defaultProps: Partial<Props> =
{
    disabled: false
};


const ToggleableGroup: React.FunctionComponent<Props> = (props) =>
{
    const onChange = React.useCallback((e) =>
    {
        props.onChange(e.target.checked);
    }, [props.onChange]);

    const content = props.toggle && props.children ?
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

export default React.memo(ToggleableGroup);
