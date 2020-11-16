import React from 'react';
import * as MUI from '@material-ui/core';


const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        tooltip: {
            margin: '8px 0',
        },
    }
));


type Props =
{
    children: React.ReactElement,
    title?: React.ReactNode,
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

export default React.memo(Tooltip);
