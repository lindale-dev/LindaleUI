import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MUISlider from '@material-ui/core/Slider';
import { withStyles, withTheme } from '@material-ui/core/styles';

import {numberUnitProp} from '../utils/customProps';

const style = {
    slider: {
        display: 'flex',
        alignItems: 'center',
    },
    thumb: {
        textDecoration: 'initial', // This is just a placeholder to avoid a warning
    },
    thumbMin: {
        backgroundColor: '#fff',
        border: '2px solid #bbb',
    },
    rail: {
        backgroundColor: '#bbb',
        opacity: 1
    },
    startLabel: {
        fontSize: '0.6875rem',
        fontStyle: 'italic',
        marginRight: '10px',
    },
    endLabel: {
        fontSize: '0.6875rem',
        fontStyle: 'italic',
        marginLeft: '10px',
    },
};

// TODO range slider -> Check if MUI has implemented range sliders, otherwise use rc-slider
class Slider extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = { value: props.value };
    }

    UNSAFE_componentWillReceiveProps = (nextProps) =>
    {
        this.setState({ value: nextProps.value});
    }

    onChange = (e, value) =>
    {
        this.setState({value: value});

        // Only commit in instantUpdate mode
        if (this.props.instantUpdate)
            this.props.onChange(value);
    }
    onChangeCommitted = (e, value) =>
    {
        // Only commit the change if we're not in instantUpdate mode,
        // in which case the commit was already made in onChange
        if (!this.props.instantUpdate)
            this.props.onChange(value);
    }

    render(){

        let startLabel = null;
        if (this.props.startLabel != '')
        {
            startLabel = <span className={this.props.classes.startLabel}>{this.props.startLabel}</span>;
        }

        let endLabel = null;
        if (this.props.endLabel != '')
        {
            endLabel = <span className={this.props.classes.endLabel}>{this.props.endLabel}</span>;
        }

        return(
            <div className={classnames(this.props.classes.slider, this.props.className )}>
                {startLabel}
                <MUISlider
                    classes={{
                        thumb: (this.state.value == this.props.min) ? this.props.classes.thumbMin : this.props.classes.thumb, // This styles the thumb when it is located at the slider's minimum
                        rail: this.props.classes.rail
                    }}
                    disabled={this.props.disabled}
                    max={this.props.max}
                    min={this.props.min}
                    onChange={this.onChange}
                    onChangeCommitted={this.onChangeCommitted}
                    step={this.props.step}
                    track={this.props.reverse ? 'inverted' : 'normal'}
                    value={this.state.value}
                    valueLabelDisplay={this.props.valueLabelDisplay}
                    valueLabelFormat={this.props.valueLabelFormat}
                />
                {endLabel}
            </div>
        )
    }
}

Slider.propTypes = {
    disabled: PropTypes.bool,
    endLabel: PropTypes.string,
    instantUpdate: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    reverse: PropTypes.bool,
    startLabel: PropTypes.string,
    step: PropTypes.number,
    value: numberUnitProp,
    valueLabelDisplay: PropTypes.string,
    valueLabelFormat: PropTypes.func,
};

Slider.defaultProps = {
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    reverse: false,
    startLabel: '',
    step: 0.01,
    disabled: false,
    valueLabelDisplay: 'off',
    valueLabelFormat: x => x,
};

export default withStyles(style, {withTheme: true})(Slider);
