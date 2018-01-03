import React from 'react';
import PropTypes from 'prop-types';

import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

import colors from '../colors.jsx';

const style = {
    inkbar: {
        '&:after':{
            backgroundColor: colors[500],
        }
    },
};

// Wrapper around MUI's Input component, to handle value changes and key presses
class TextInput extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: props.value,
            inFocus: false };

        this.commitChange = this.commitChange.bind(this);
        this.instantChange = this.instantChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    commitChange(event)
    {
        let value = this.state.value;
        if (value !== this.props.value)
            this.props.onChange(value);
    }

    instantChange(event)
    {
        this.setState({value: event.target.value});
        if (this.props.instantUpdate)
            this.commitChange(event);
    }

    onFocus(event)
    {
        this.setState({ value: this.props.value,
                        inFocus: true });
    }

    onBlur(event)
    {
        if (!this.props.instantUpdate) // Don't commit twice
            this.commitChange(event);
        this.setState({ inFocus: false });
    }

    onKeyDown(event)
    {
        if (event.key === 'Enter') {
            this.inputRef.blur();
        } else if (event.key === 'Escape') {
            this.setState({value: this.props.value}); // Restore previous value
            this.state.value = this.props.value; // setState being async, make sure value is restored in state before blurring
            this.inputRef.blur();
        }
    }

    render()
    {
        return (
            <Input 
                className={this.props.className} 
                value={this.state.inFocus ? this.state.value : this.props.value}
                placeholder={this.props.placeholder} 
                disabled={this.props.disabled} 
                inputRef={(input) => { this.inputRef = input; }}
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                onKeyDown={this.onKeyDown}
                onChange={this.instantChange} 
                classes={{ inkbar: this.props.classes.inkbar }}
            />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    instantUpdate: PropTypes.bool // Should each change of value send an update?
};

TextInput.defaultProps = {
    disabled: false,
    instantUpdate: false
}

export default withStyles(style)(TextInput);
