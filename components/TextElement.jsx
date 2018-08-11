import React from 'react';
import PropTypes from 'prop-types';

import ParameterElement from './ParameterElement';
import TextInput from './TextInput';

function TextElement(props)
{
    return (
        <label style={props.disabled ? {cursor: "default"} : {}}>
            <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={props.actionCols}>
                <TextInput  disabled={props.disabled}
                            endAdornment={props.endAdornment}
                            fullWidth
                            instantUpdate={props.instantUpdate}
                            onChange={props.onChange}
                            small
                            startAdornment={props.startAdornment}
                            value={props.value} />
            </ParameterElement>
        </label>
    );
}

TextElement.propTypes = {
    actionCols: PropTypes.number,
    disabled: PropTypes.bool,
    instantUpdate: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    tooltip: PropTypes.string,
    value: PropTypes.string
};

TextElement.defaultProps = {
    actionCols: 6,
    disabled: false
}

export default TextElement;
