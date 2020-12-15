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
        wrapper: {
            position: 'relative',
        },

        hiddenButtonLabel: {
            visibility: 'hidden',
        },

        progress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        progressLabel: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);


type Props = Omit<MUI.ButtonProps, 'size'> &
{
    tooltip?: TooltipProps['title'],
    MUISize?: MUI.ButtonProps['size'],
    loading?: boolean,
    loadingProgress?: number,
    size?: number,
    startIcon?: React.ReactNode,
};

export default function Button(props: Props)
{
    const classes = useStyles(props);

    return (
        <Tooltip title={props.tooltip ?? ''}>
            <MUI.Box className={classnames(classes.wrapper, props.className)}>

                <MUI.Button
                    classes={ { root: classes.root, label: props.loading && props.loadingProgress !== undefined ? classes.hiddenButtonLabel : undefined} }
                    className={props.size ? 'size'+props.size.toString()+' ' : undefined}
                    color={props.color}
                    disabled={props.disabled || props.loading}
                    fullWidth={props.fullWidth}
                    onClick={props.onClick}
                    size={props.MUISize}
                    variant={props.variant}
                    startIcon={props.startIcon}
                >
                    {props.children}
                </MUI.Button>

                {props.loading &&
                    <MUI.Box className={classes.progress}>
                        <MUI.CircularProgress size={24} variant={props.loadingProgress !== undefined ? 'determinate' : 'indeterminate'} value={props.loadingProgress} />

                        {props.loadingProgress !== undefined &&
                            <MUI.Box className={classes.progressLabel}>
                                <MUI.Typography variant='caption' component='div' color='textSecondary'>{`${Math.round(props.loadingProgress)}%`}</MUI.Typography>
                            </MUI.Box>
                        }
                    </MUI.Box>
                }

            </MUI.Box>
        </Tooltip>
    );
}
