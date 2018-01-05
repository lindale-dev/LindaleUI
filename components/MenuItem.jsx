import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { MenuItem as MUIMenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const style = {
    root:{
        '&.small':{
            fontSize: '0.75rem',
            height: 14,
            paddingRight: 6,
            paddingLeft: 6,
            paddingTop: 4,
            paddingBottom: 4,
        }
    }
};

function MenuItem(props)
{
    return (
        <MUIMenuItem 
            classes={ { root: props.classes.root, } }
            {...props}
        >
            {props.children}
        </MUIMenuItem>
    );
}

MenuItem.propTypes = {
    selected: PropTypes.bool,
};

MenuItem.defaultProps = {
    selected: false,
};

export default withStyles(style)(MenuItem);
