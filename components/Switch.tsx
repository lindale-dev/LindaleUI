import React from 'react';
import * as MUI from '@material-ui/core';

import { Tooltip, TooltipProps } from './Tooltip';


const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        rootTiny:
        {
            height: '22px',
            width: '34px',
            padding: '6px',
        },
        switchBaseTiny:
        {
            padding: '4px',
            '&$checked': {
                transform: 'translateX(12px)',
            }
        },
        checked: {},/* Necessary for '&$checked' to work */
        thumbTiny:
        {
            height: '14px',
            width: '14px',
        }
    }
));


type Props =
{
    checked: boolean,
    size: 'tiny' | 'small' | 'medium', // 'tiny' not supported by MUI

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


// Simple switch with conditonnal size, and optional tooltip
const Switch: React.FunctionComponent<Props> = (props) =>
{
    const classes = useStyles(props);

    return (
        <Tooltip title={props.tooltip ?? ''}>
            <MUI.Switch
                className={props.className}
                checked={props.checked}
                disabled={props.disabled}
                disableRipple={true}
                onChange={props.onChange}
                color={"primary"}
                size={props.size === 'tiny' ? 'medium' : props.size} // TODO why tiny -> medium?!
                classes={props.size == 'tiny' ? {
                    root: classes.rootTiny,
                    switchBase: classes.switchBaseTiny,
                    checked: classes.checked,
                    thumb: classes.thumbTiny
                  } :
                  {}
                }
            />
        </Tooltip>
    );
}
Switch.defaultProps = defaultProps;

export default React.memo(Switch);
