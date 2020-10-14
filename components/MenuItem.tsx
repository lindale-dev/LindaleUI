import classnames from 'classnames';
import React from 'react';
import * as MUI from '@material-ui/core';


const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            '&.small':{
                fontSize: '0.75rem',
                lineHeight: '14px',
                minHeight: '14px',
                paddingRight: 6,
                paddingLeft: 6,
                paddingTop: 4,
                paddingBottom: 4,
            },
            '&.medium':{
                fontSize: '0.875rem',
                lineHeight: '18px',
                minHeight: '18px',
                paddingRight: 8,
                paddingLeft: 8,
                paddingTop: 4,
                paddingBottom: 4,
            }
        }
    })
);


type Props =
{
    dense: boolean,
    selected: boolean,
    size: string,
    className: string,
    children: React.ReactNode,
    onClick: Function,

    ref: any
}


export default React.forwardRef((props, ref) =>
{
    const classes = useStyles(props);

    return (
        <MUI.MenuItem
            classes={{ root: classes.root, }}
            className={classnames(props.size, props.className)}
            ref={ref}
            {...props}
        >
            {props.children}
        </MUI.MenuItem>
    );
});
