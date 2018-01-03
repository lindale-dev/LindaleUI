import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUIIcon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const style = {
    root: {
        '.small &':{
            height: 18,
            width: 18,
            fontSize: 18,
        }
    },
};

// Simple icon with conditonnal small size
function Icon(props)
{
    return (
        <MUIIcon
            classes={ { root: props.classes.root, } }
        >
            {props.icon}
        </MUIIcon>
    );
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
};

export default withStyles(style)(Icon);
