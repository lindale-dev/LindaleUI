import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { ListItem as MUIListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Icon from './Icon';
import IconButton from './IconButton';

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
                    <Icon className='small' icon={props.icon} />
                }
                <span className='list-item-name'>
                    {props.name}
                </span>
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
};

ListItem.defaultProps = {
};

export default withStyles(style)(ListItem);
