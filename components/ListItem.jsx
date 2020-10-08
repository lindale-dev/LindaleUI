import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import MUIListItem from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';
import TextInput from './TextInput';

const style = {
    root:{
        padding: '0 8px',
        display: 'block',
        borderTop: '1px solid #e0e0e0',
        '&:first-of-type': {
            borderTop: 'none',
        }
    },
    header: {
        width: '100%',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        padding: '0 4px',
        width: 0, // This fixes a weird width bug. The width is actually drived by the flex parameter
    },
    actions: {
        display: 'flex',
    },
    body: {
        padding: '0 8px 8px 8px',
    }
};

function ListItem(props)
{
    return (
        <MUIListItem className={props.className} classes={{ root: props.classes.root, gutters: props.classes.gutters, }} >
            <div className={props.classes.header}>
                {props.icon &&
                    <Icon className='small' icon={props.icon} size={18} color={props.theme.palette.text.secondary}/>
                }
                <TextInput dense disableUnderline outlined className={props.classes.name} value={props.name} onChange={props.onNameChange} />
                <span className={props.classes.actions}>
                    {props.actions}
                </span>
            </div>
            { props.children &&
                <div className={props.classes.body}>{props.children}</div> }
        </MUIListItem>
    );
}

ListItem.propTypes = {
    onNameChange: PropTypes.func
};

ListItem.defaultProps = {
};

export default withStyles(style, {withTheme: true})(React.memo(ListItem));
