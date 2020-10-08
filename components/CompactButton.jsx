import React from 'react';
import PropTypes from 'prop-types';

import MUIButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const style = {
    root: {
        height: 18,
        minHeight: 18,
        width: '100%',
        fontSize: '0.75rem',
        padding: 0,
        border: '1px solid #eee',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
};

function CompactButton(props)
{
    return (
        <MUIButton
            disabled={props.disabled}
            onClick={props.onClick}
            classes={ { root: props.classes.root, } }
        >
            {props.name}
        </MUIButton>
    );
}

CompactButton.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

CompactButton.defaultProps = {
    disabled: false
};

export default withStyles(style)(React.memo(CompactButton));
