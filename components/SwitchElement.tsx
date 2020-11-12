import React from 'react';
import classnames from 'classnames';

import Switch from './Switch';
import ParameterElement from './ParameterElement';


type Props =
{
    name: string,
    checked: boolean,
    tooltip?: React.ReactNode,
    disabled?: boolean,

    onChange?: (event: object) => void
};


const defaultProps: Partial<Props> =
{
    disabled: false,
    tooltip: ''
};


const SwitchElement: React.FunctionComponent<Props> = (props) =>
{
    return (
        <label>
            <ParameterElement
                className={classnames('switch-element', props.className)}
                name={props.name}
                right
                tooltip={props.tooltip}
                actionCols={3}
                disabled={props.disabled}
            >
                <Switch
                    size='tiny'
                    checked={props.checked}
                    disabled={props.disabled}
                    onChange={props.onChange}
                />
            </ParameterElement>
        </label>
    );
}
SwitchElement.defaultProps = defaultProps;

export default React.memo(SwitchElement);
