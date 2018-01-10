import React from 'react';
import PropTypes from 'prop-types';

import MUIButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const style = {
    root: {
        height: 18,
        minHeight: 18,
        width: '100%',
        fontSize: '0.75rem',
        padding: 0,
        border: '1px solid #eee',
    },
};

function CompactButton(props)
{
    return (
        <MUIButton mini onClick={props.onClick} classes={ { root: props.classes.root, } } >{props.name}</MUIButton>
    );
}

CompactButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

CompactButton.defaultProps = {
};

export default withStyles(style)(CompactButton);
