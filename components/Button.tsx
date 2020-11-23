import React from 'react';
import classnames from 'classnames';

import * as MUI from '@material-ui/core';

import { Tooltip, TooltipProps } from './Tooltip';


// Simple Button with conditonnal size, and optional tooltip

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            '&.size24':{
                fontSize: 12,
                padding: '1px 8px 0px',
            },
        },
        progressWrapper: {
            position: 'relative',
        },
        progress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    })
);


type Props = Omit<MUI.ButtonProps, 'size'> &
{
    tooltip?: TooltipProps['title'],
    MUISize?: MUI.ButtonProps['size'],
    loading?: boolean,
    size?: number
};

export default function Button(props: Props)
{
    const classes = useStyles(props);

    return (
        <Tooltip title={props.tooltip ?? ''}>
            <div className={classnames(classes.progressWrapper, props.className)}>
                <MUI.Button
                    classes={ { root: classes.root, } }
                    className={props.size ? 'size'+props.size.toString()+' ' : undefined}
                    color={props.color}
                    disabled={props.disabled}
                    fullWidth={props.fullWidth}
                    onClick={props.onClick}
                    size={props.MUISize}
                    variant={props.variant}
                >
                    {props.children}
                </MUI.Button>
                {props.loading && <MUI.CircularProgress size={24} className={classes.progress} />}
            </div>
        </Tooltip>
    );
}
