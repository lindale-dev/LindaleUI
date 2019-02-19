import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import colors from '../colors.jsx';
import Tooltip from './Tooltip';

const style = {
    inputSmall:{
        height: 18,
        padding: 0,
        fontSize: '0.75rem',
    },
    inputMarginDense:{
        fontSize: '0.875rem',
        paddingBottom: 3,
    },
    underline: {
        '&:after':{
            backgroundColor: colors[500],
        }
    }
};

// Wrapper around MUI's Input component, to handle value changes and key presses
class TextInput extends React.PureComponent
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
        let classes = { underline: this.props.classes.underline, inputMarginDense: this.props.classes.inputMarginDense };
        if(this.props.small)
            classes.input = this.props.classes.inputSmall;

        return (
            <Tooltip title={this.props.tooltip} >
                <Input
                    classes={classes}
                    className={this.props.className}
                    disabled={this.props.disabled}
                    disableUnderline={this.props.disableUnderline}
                    endAdornment={this.props.endAdornment}
                    fullWidth={this.props.fullWidth}
                    inputRef={(input) => { this.inputRef = input; }}
                    margin={this.props.dense ? 'dense' : 'none'}
                    onBlur={this.onBlur}
                    onChange={this.instantChange}
                    onFocus={this.onFocus}
                    onKeyDown={this.onKeyDown}
                    placeholder={this.props.placeholder}
                    startAdornment={this.props.startAdornment}
                    value={this.state.value}
                />
            </Tooltip>
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    disableUnderline: PropTypes.bool,
    endAdornment: PropTypes.node,
    fullWidth: PropTypes.bool,
    instantUpdate: PropTypes.bool, // Should each change of value send an update?
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    small: PropTypes.bool,
    startAdornment: PropTypes.node,
    tooltip: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextInput.defaultProps = {
    dense: false,
    disabled: false,
    disableUnderline: false,
    fullWidth: false,
    instantUpdate: false,
    small: false,
    tooltip: ''
}

export default withStyles(style)(TextInput);
