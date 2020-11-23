import React from 'react';
import classnames from 'classnames';

import { ParameterElement } from './ParameterElement';
import Switch from './Switch';
import { TooltipProps } from './Tooltip';


type Props =
{
    name: string,
    checked: boolean,

    tooltip?: TooltipProps['title'],
    disabled?: boolean,
    className?: string,

    onChange?: (event: React.ChangeEvent, checked: boolean) => void
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
                    size='small'
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
