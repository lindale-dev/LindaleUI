import React from 'react';
import PropTypes from 'prop-types';

import MUISlider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import RCSlider from 'rc-slider';

import {numberUnitProp} from '../utils/customProps';

import 'rc-slider/assets/index.css';
import './Slider.scss';

const style = {
    trackAfter: {
        backgroundColor: '#bbb',
        opacity: 1
    },
    thumb: {
        textDecoration: 'initial', // This is just a placeholder to avoid a warning
    },
    thumbMin: {
        backgroundColor: '#fff',
        border: '2px solid #bbb',
        boxSizing: 'border-box',
    }
};

// TODO : Make this a class to properly handle value changes. See TextInput
// TODO range slider -> Check if MUI has implemented range sliders, otherwise use rc-slider
class Slider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { value: props.value };
    }

    onChange = (event, value) =>
    {
        this.setState({value: value});

        // Only commit in instantUpdate mode
        if (this.props.instantUpdate)
            this.props.onChange(value);
    }

    onDragEnd = (event) =>
    {
        // Only commit the change if we're not in instantUpdate mode,
        // in which case the commit was already made in onChange
        if (!this.props.instantUpdate)
            this.props.onChange(this.state.value);
    }

    render(){

        let startLabel = null;
        if (this.props.startLabel != '')
        {
            startLabel = <span className='slider-start-label'>{this.props.startLabel}</span>;
        }

        let endLabel = null;
        if (this.props.endLabel != '')
        {
            endLabel = <span className='slider-end-label'>{this.props.endLabel}</span>;
        }

        return(
            <div className='slider'>
                {startLabel}
                <MUISlider  classes={ { thumb: (this.state.value == this.props.min) ? this.props.classes.thumbMin : this.props.classes.thumb, // This styles the handle when it is located at the slider's minimum
                                        trackAfter: this.props.classes.trackAfter } }
                            max={this.props.max}
                            min={this.props.min}
                            onChange={this.onChange}
                            onDragEnd={this.onDragEnd}
                            step={this.props.step}
                            reverse={this.props.reverse}
                            value={this.state.value} />
                {/* If we ever need a range slider (multiple handles), revert back to using rc-slider if MUI hasn't implemented it yet
                <RCSlider value={this.state.value}
                          min={this.props.min}
                          max={this.props.max}
                          step={this.props.step}
                          onChange={this.onChange}
                          onAfterChange={this.onAfterChange}
                          handleStyle={handleStyle} />*/}
                {endLabel}
            </div>
        )
    }
}

Slider.propTypes = {
    endLabel: PropTypes.string,
    instantUpdate: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    reverse: PropTypes.bool,
    startLabel: PropTypes.string,
    step: PropTypes.number,
    value: numberUnitProp
};

Slider.defaultProps = {
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    reverse: false,
    startLabel: '',
    step: 0.01
};

export default withStyles(style)(Slider);