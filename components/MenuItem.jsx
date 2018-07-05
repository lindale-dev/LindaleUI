import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import MUIMenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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
            className={ classnames({small: props.small}, props.className) }
            {...props}
        >
            {props.children}
        </MUIMenuItem>
    );
}

MenuItem.propTypes = {
    selected: PropTypes.bool,
    small: PropTypes.bool
};

MenuItem.defaultProps = {
    selected: false,
    small: false
};

export default withStyles(style)(MenuItem);
