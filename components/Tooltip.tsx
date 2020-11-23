import React from 'react';
import * as MUI from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        tooltip: {
            margin: '8px 0',
        },
    }
));


type Props =
{
    title: TooltipProps['title'],
    children: React.ReactElement<any, any>, // Needed or MUI.Tooltip will complain

    enterDelay?: number // ms
};

const defaultProps: Partial<Props> =
{
    enterDelay: 750
}


const Tooltip: React.FunctionComponent<Props> = (props) =>
{
    const classes = useStyles(props);

    return (
        <MUI.Tooltip
            title={props.title ? props.title : ''}
            classes={{ tooltip: classes.tooltip }}
            enterDelay={props.enterDelay}
        >
            {props.children}
        </MUI.Tooltip>
    );
}
Tooltip.defaultProps = defaultProps;

const memoized = React.memo(Tooltip);
export { memoized as Tooltip };

export type { Props as TooltipProps };