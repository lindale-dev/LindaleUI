import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import {numberUnitProp} from '../utils/customProps';

import colors from '../colors.jsx';
import './NumberInput.scss';

const style = {
    input:{
        height: 18,
        padding: 0,
        fontSize: '0.75rem',
    },
    underline: {
        '&:after':{
            backgroundColor: colors[500],
        }
    }
};

const unitStyle = {
    fontSize: '0.6875rem',
    fontStyle: 'italic',
    color: '#757575',
};

// TODO : Create custom spinner with slide behavior (see Numberfield)
class NumberInput extends React.Component
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
        let unit = null;
        if (this.props.unit != '')
        {
            unit = <InputAdornment disableTypography position="end" style={unitStyle} >{this.props.unit}</InputAdornment>;
        }

        return (
            <Input
                type="number"
                value={this.state.value}
                disabled={this.props.disabled} 
                inputRef={(input) => { this.inputRef = input; }}
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                onKeyDown={this.onKeyDown}
                onChange={this.instantChange} 
                endAdornment={unit}
                fullWidth
                classes={{ root: this.props.classes.root, underline: this.props.classes.underline, input: this.props.classes.input }}
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
