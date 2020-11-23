import React from 'react';
import * as MUI from '@material-ui/core';

import MUICheckbox from '@material-ui/core/Checkbox';

import Icon from './Icon';
import { Tooltip, TooltipProps } from './Tooltip';


const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            '&.size18':{
                height: 18,
                width: 18,
                fontSize: 18,
                padding: 0,
                '& svg':{
                    fontSize: 18,
                }
            },
            '&.size24':{
                height: 24,
                width: 24,
                fontSize: 24,
                '& svg':{
                    fontSize: 24,
                }
            }
        },
    }
));

const DEFAULT_ICON_SIZE = 24;

function getIcon(icon: string, size: number | undefined)
{
    return <Icon
        icon={icon}
        size={size ?? DEFAULT_ICON_SIZE}
    />;
}


type Props =
{
    checked: boolean, // TODO which are optional?

    size?: number,
    tooltip?: TooltipProps['title'],
    disabled?: boolean,
    icon?: string,
    checkedIcon?: string,
    checkedColor?: string,
    uncheckedColor?: string,
    disabledColor?: string,
    disableRipple?: boolean,
    className?: string,

    onChange?: (event: React.ChangeEvent, checked: boolean) => void
};

const defaultProps: Partial<Props> =
{
    disabled: false,
    size: DEFAULT_ICON_SIZE,
    disableRipple: false
};


// Simple checkbox with conditonnal size, and optional tooltip
const Checkbox: React.FunctionComponent<Props> = (props) =>
{
    const classes = useStyles();

    let color = { color: 'initial' };
    if (props.checked && props.checkedColor)
    {
        color = { color: props.checkedColor };
    }
    else if (!props.checked && props.uncheckedColor)
    {
        color = { color: props.uncheckedColor };
    }
    else if (props.disabled && props.disabledColor)
    {
        color = { color: props.disabledColor };
    }

    const icon = props.icon ?? 'mdi-checkbox-blank-outline';
    const checkedIcon = props.checkedIcon ?? props.icon ?? 'mdi-checkbox-marked';

    return (
        <Tooltip title={props.tooltip ?? ''}>
            <MUICheckbox
                className={props.className + ' size'+(props.size ?? DEFAULT_ICON_SIZE)}
                checked={props.checked}
                checkedIcon={getIcon(checkedIcon, props.size)}
                disabled={props.disabled}
                icon={getIcon(icon, props.size)}
                onChange={props.onChange}
                color={"primary"}
                style={{color: 'red'}}
                disableRipple={props.disableRipple}
                classes={ { root: classes.root, } }
            />
        </Tooltip>
    );
}
Checkbox.defaultProps = defaultProps;

export default React.memo(Checkbox);
