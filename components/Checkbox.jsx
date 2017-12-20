import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import MUICheckbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

import Icon from './Icon';
import Tooltip from './Tooltip';

const styleSmall = {
    default: {
        height: 18,
        width: 18,
        fontSize: 18,
    },
};

function getCheckedIcon(props) {
    if(props.checkedIcon){
        return <Icon small={props.small} icon={props.checkedIcon} />;
    }
    return;
}
function getIcon(props) {
    if(props.icon){
        return <Icon small={props.small} icon={props.icon} />;
    }
    return;
}

// Simple checkbox with conditonnal small size, and optional tooltip
function Checkbox(props)
{
    return (
        <Tooltip title={props.tooltip}>
            <MUICheckbox 
                className={props.className}
                checked={props.checked}
                checkedIcon={getCheckedIcon(props)}
                icon={getIcon(props)}
                onChange={props.onChange}
                classes={ props.small ? { // Apply style only for small icon button
                    default: props.classes.default,
                } : {} }
            />
        </Tooltip>
    );
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    small: PropTypes.bool,
    tooltip: PropTypes.string
};

Checkbox.defaultProps = {
    small: false,
    tooltip: ''
};

export default withStyles(styleSmall)(Checkbox);
