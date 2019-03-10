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

// Returns the string form of the value, with the correct amount of decimals
function valueAsString(value, decimals)
{
    const valueTrimmed = value.toFixed(decimals); // removes unwanted decimals
    return Number(valueTrimmed).toString(); // also removes insignificant trailing zeros
}

// TODO : Create custom spinner with slide behavior (see Numberfield)
class NumberInput extends React.PureComponent
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            // Note: props.value is a NUMBER but state.value is a STRING
            value: valueAsString(props.value)
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({ value: valueAsString(nextProps.value, nextProps.decimals) });
    }

    commitChange = (event) =>
    {
        if (this.state.value !== this.props.value)
        {
            // Return a cleaned up value (still needs to be a number though!)
            const value = Number(valueAsString(this.state.value, this.props.decimals));

            this.props.onChange(value);
        }
    }

    instantChange = (event) =>
    {
        this.setState({value: Number(event.target.value)}, () =>
        {
            if (this.props.instantUpdate)
            {
                this.commitChange(event);
            }
        });
    }

    onBlur = (event) =>
    {
        if (!this.props.instantUpdate) // Don't commit twice
        {
            this.commitChange(event);
        }
    }

    onKeyDown = (event) =>
    {
        if (event.key === 'Enter')
        {
            this.inputRef.blur();
        }
        else if (event.key === 'Escape')
        {
            this.setState({
                value: Number(this.props.value)
            },
            () => this.inputRef.blur()); // Restore previous value before blurring
        }
    }

    render()
    {
        const unit = this.props.unit !== '' ?
            <InputAdornment disableTypography position="end" style={unitStyle} >{this.props.unit}</InputAdornment> :
            null;

        return (
            <Input
                className={this.props.className}
                type="number"
                value={this.state.value}
                disabled={this.props.disabled}
                inputRef={(input) => { this.inputRef = input; }}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                onChange={this.instantChange}
                endAdornment={unit}
                fullWidth={this.props.fullWidth}
                classes={{ root: this.props.classes.root, underline: this.props.classes.underline, input: this.props.classes.input }}
            />
        );
    }
}

NumberInput.propTypes =
{
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    decimals: PropTypes.number, // Max number of decimals
    speed: PropTypes.number, // Speed factor when using the slider
    disabled: PropTypes.bool,
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    unit: PropTypes.string,
};

NumberInput.defaultProps =
{
    fullWidth: true,
    decimals: 3,
    speed: 1,
    disabled: false,
    instantUpdate: false,
    unit: ''
}

export default withStyles(style)(NumberInput);
