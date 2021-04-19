import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import * as MUI from '@material-ui/core';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            display: 'flex'
        },
        dot: {
            height: theme.spacing(1),
            width: theme.spacing(1),
            borderRadius: '50%',
            backgroundColor: theme.palette.action.disabled,
            boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.5)',

            '&:not(:last-child)': {
                marginRight: theme.spacing(0.75)
            },

            '&.on': {
                backgroundColor: theme.palette.primary.main
            },

            '&.clickable': {
                cursor: 'pointer'
            }
        }
    })
);

interface Props
{
    count: number;
    value: number;
    onClick?: (i: number) => void;

    // single: color current dot only
    // upto: color from the first dot to the current dot
    variant: 'single' | 'upto';
};

function DotProgress(props: Props)
{
    const classes = useStyles();

    const isColored = props.variant === 'single' ?
        (i: number) => i === props.value :
        (i: number) => i <= props.value;

    const dots = _.range(props.count).map(i =>
    {
        return <span
            className={ classnames(
                classes.dot,
                {
                    on: isColored(i),
                    clickable: props.onClick !== undefined && i !== props.value
                }
            ) }
            onClick={ () => props.onClick?.(i) }
        />
    });

    return (
        <div className={ classes.root }>
            { dots }
        </div>
    );
}

export default React.memo(DotProgress);
