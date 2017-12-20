import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUIIcon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styleSmall = {
    root: {
        height: 18,
        width: 18,
        fontSize: 18,
    },
};

// Simple icon with conditonnal small size
function Icon(props)
{
    return (
        <MUIIcon
            classes={ props.small ? { // Apply style only for small icon
                root: props.classes.root,
            } : {} }
        >
            {props.icon}
        </MUIIcon>
    );
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    small: PropTypes.bool,
};

Icon.defaultProps = {
    small: false,
};

export default withStyles(styleSmall)(Icon);
