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
    },
    bodyWithoutGutters: {
        padding: '0'
    }
};


function ListItem(props)
{
    let iconElement = null;
    if (props.icon && typeof props.icon === 'string') {
        iconElement = <Icon
            className='small'
            icon={props.icon}
            size={18}
            color={props.iconColor || props.theme.palette.text.secondary}
        />;
    }
    else if (props.icon) {
        iconElement = props.icon;
    }

    return (
        <MUIListItem
            ref={props.ref}
            className={props.className}
            classes={{ root: props.classes.root, gutters: props.classes.gutters }}
            style={{ ...props.style }}
            disableGutters={props.disableGutters}
        >
            <div className={props.classes.header}>

                {iconElement}

                <TextInput
                    dense
                    disableUnderline
                    outlined
                    className={props.classes.name}
                    value={props.name}
                    disabled={!props.onNameChange} // Disable the input if no change callback has been provided
                    onChange={props.onNameChange}
                />

                <span className={props.classes.actions}>
                    {props.actions}
                </span>

            </div>

            { props.children && <div className={props.disableChildrenGutters ? props.classes.body : props.classes.bodyWithoutGutters}>{props.children}</div> }

        </MUIListItem>
    );
}

ListItem.propTypes =
{
    name: PropTypes.string,
    onNameChange: PropTypes.func,
    icon: PropTypes.oneOfType([
        PropTypes.object, // React node
        PropTypes.string // Icon name
    ]),
    iconColor: PropTypes.array,
    actions: PropTypes.array,
    className: PropTypes.string,
    ref: PropTypes.object,
    style: PropTypes.object,
    disableGutters: PropTypes.boolean,
    disableChildrenGutters: PropTypes.boolean
};

ListItem.defaultProps =
{
    style: {}
};

export default withStyles(style, {withTheme: true})(React.memo(ListItem));
