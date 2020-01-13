import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import MUIMenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const style = {
    root:{
        '&.small':{
            fontSize: '0.75rem',
            lineHeight: '14px',
            paddingRight: 6,
            paddingLeft: 6,
            paddingTop: 4,
            paddingBottom: 4,
        },
        '&.medium':{
            fontSize: '0.875rem',
            lineHeight: '18px',
            paddingRight: 8,
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
        }
    }
};

// We need to forward the ref to the underlying MUIMenuItem component
const MenuItem = React.forwardRef((props, ref) => (
    <MUIMenuItem
        classes={ { root: props.classes.root, } }
        className={ classnames(props.size, props.className) }
        ref={ref}
        {...props}
    >
        {props.children}
    </MUIMenuItem>
));

MenuItem.propTypes = {
    selected: PropTypes.bool,
    size: PropTypes.string
};

MenuItem.defaultProps = {
    selected: false,
    size: ""
};

export default withStyles(style)(React.memo(MenuItem));
