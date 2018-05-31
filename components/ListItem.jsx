import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import MUIListItem from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';
import IconButton from './IconButton';
import TextInput from './TextInput';

import './List.scss';

const style = {
    // See List.scss for general styling
    root:{
        padding: '0 8px',
    }
};

function ListItem(props)
{
    return (
        <MUIListItem className={'list-item '+props.className} classes={{ root: props.classes.root, gutters: props.classes.gutters, }} >
            <div className='list-item-header'>
                {props.icon &&
                    <Icon className='small' icon={props.icon} size={18} />
                }
                <TextInput dense disableUnderline className='list-item-name' value={props.name} onChange={props.onNameChange} />
                <span className='list-item-actions'>
                    {props.actions}
                </span>
            </div>
            { props.children && 
                <div className='list-item-body'>{props.children}</div> }
        </MUIListItem>
    );
}

ListItem.propTypes = {
    onNameChange: PropTypes.func
};

ListItem.defaultProps = {
};

export default withStyles(style)(ListItem);
