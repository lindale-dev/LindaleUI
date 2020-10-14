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


type Props = MUI.MenuItemProps &
{
    button?: true|undefined,
    size?: string,
}


function MenuItem(props: Props & {forwardedRef: any})
{
    const classes = useStyles(props);

    return (
        <MUI.MenuItem
            classes={{ root: classes.root }}
            className={classnames(props.size, props.className)}
            ref={props.forwardedRef}
            {...props}
        >
            {props.children}
        </MUI.MenuItem>
    );
}

export default React.forwardRef((props: Props, ref) => <MenuItem {...props} forwardedRef={ref} />);