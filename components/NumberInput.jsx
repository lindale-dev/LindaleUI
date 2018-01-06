import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';

import {numberUnitProp} from '../utils/customProps';

import colors from '../colors.jsx';
import './NumberInput.scss';

const style = {
    root: {
        fontSize: '0.6875rem',
        
        // This styles the unit label, we revert below for the input value
        fontStyle: 'italic',
        color: '#757575',
    },
    input:{
        height: 18,
        padding: 0,

        // Revert the unit label style
        fontSize: '0.75rem',
        fontStyle: 'normal',
        color: 'initial',
    },
    inkbar: {
        '&:after':{
            backgroundColor: colors[500],
        }
    }
};

// TODO : Create custom spinner with slide behavior (see Numberfield)
class NumberInput extends React.Component
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
        let unit = null;
        if (this.props.unit != '')
        {
            unit = <InputAdornment disableTypography position="end" >{this.props.unit}</InputAdornment>;
        }

        return (
            <Input
                type="number"
                value={this.state.inFocus ? this.state.value : this.props.value}
                disabled={this.props.disabled} 
                inputRef={(input) => { this.inputRef = input; }}
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                onKeyDown={this.onKeyDown}
                onChange={this.instantChange} 
                endAdornment={unit}
                classes={{ root: this.props.classes.root, inkbar: this.props.classes.inkbar, input: this.props.classes.input }}
            />
        );
    }
}

NumberInput.propTypes = {
    value: numberUnitProp,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    speed: PropTypes.number, // Speed factor when using the slider
    disabled: PropTypes.bool,
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    unit: PropTypes.string,
};

NumberInput.defaultProps = {
    speed: 1,
    disabled: false,
    instantUpdate: false,
    unit: ''
}

export default withStyles(style)(NumberInput);
