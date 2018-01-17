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
    inputDense:{
        fontSize: '0.875rem',
        paddingBottom: 3,
    }
};

// Wrapper around MUI's Input component, to handle value changes and key presses
class TextInput extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { value: props.value };

        this.commitChange = this.commitChange.bind(this);
        this.instantChange = this.instantChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({ value: nextProps.value});
    }

    commitChange(event)
    {
        let value = this.state.value;
        if (value !== this.props.value)
            this.props.onChange(value);
    }

    instantChange(event)
    {
        this.setState({value: event.target.value}, () => {
            if (this.props.instantUpdate)
                this.commitChange(event);
        });
    }

    onBlur(event)
    {
        if (!this.props.instantUpdate) // Don't commit twice
            this.commitChange(event);
    }

    onKeyDown(event)
    {
        if (event.key === 'Enter') {
            this.inputRef.blur();
        } else if (event.key === 'Escape') {
            this.setState({value: this.props.value}, () => { this.inputRef.blur(); }); // Restore previous value before blurring
        }
    }

    render()
    {
        return (
            <Input 
                className={this.props.className} 
                value={this.state.value}
                placeholder={this.props.placeholder} 
                disabled={this.props.disabled} 
                inputRef={(input) => { this.inputRef = input; }}
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                onKeyDown={this.onKeyDown}
                onChange={this.instantChange} 
                margin={this.props.dense ? 'dense' : 'none'}
                classes={{ inkbar: this.props.classes.inkbar, inputDense: this.props.classes.inputDense }}
            />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    instantUpdate: PropTypes.bool // Should each change of value send an update?
};

TextInput.defaultProps = {
    disabled: false,
    dense: false,
    instantUpdate: false
}

export default withStyles(style)(TextInput);
