import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MUISlider from '@material-ui/lab/Slider';
import { withStyles, withTheme } from '@material-ui/core/styles';
import RCSlider from 'rc-slider';

import {numberUnitProp} from '../utils/customProps';

import 'rc-slider/assets/index.css';
import './Slider.scss';

/*const style = {
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
};*/

// TODO range slider -> Check if MUI has implemented range sliders, otherwise use rc-slider
class Slider extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = { value: props.value };
    }

    onChange = (value) =>
    {
        this.setState({value: value});

        // Only commit in instantUpdate mode
        if (this.props.instantUpdate)
            this.props.onChange(value);
    }
    onAfterChange = (value) =>
    {
        // Only commit the change if we're not in instantUpdate mode,
        // in which case the commit was already made in onChange
        if (!this.props.instantUpdate)
            this.props.onChange(value);
    }

    render(){

        // Styling
        // See Slider.scss for the general styling

        let handleStyle = {
            backgroundColor: this.props.theme.palette.primary.main
        };
        if(this.props.disabled){
            handleStyle = { backgroundColor: '#ccc' };
        }
        // This styles the handle when it is located at the slider's minimum
        if(!this.state.value || !this.props.reverse && this.state.value == this.props.min || this.props.reverse && this.state.value == this.props.max){
            handleStyle = {
                backgroundColor: '#fff',
                border: '2px solid #bbb',
                boxSizing: 'border-box',
            };
        }

        let railStyle = {
            height: 2,
            backgroundColor: '#bbb'
        };
        let trackStyle = {
            height: 2,
            backgroundColor: this.props.theme.palette.primary.main
        };
        if(this.props.disabled){
            railStyle = { ...railStyle, backgroundColor: '#ccc' };
            trackStyle = { ...trackStyle, backgroundColor: '#aaa' };
        }
        if(this.props.reverse){
            railStyle = { ...railStyle, backgroundColor: this.props.theme.palette.primary.main };
            trackStyle = { ...trackStyle, backgroundColor: '#bbb' };
        }
        if(this.props.disabled && this.props.reverse){
            railStyle = { ...railStyle, backgroundColor: '#aaa' };
            trackStyle = { ...trackStyle, backgroundColor: '#ccc' };
        }

        // ---

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
            <div className={classnames('slider', { 'disabled' : this.props.disabled, 'reverse' : this.props.reverse } )}>
                {startLabel}
                {/* <MUISlider  classes={ { thumb: (this.state.value == this.props.min) ? this.props.classes.thumbMin : this.props.classes.thumb, // This styles the handle when it is located at the slider's minimum
                                        trackAfter: this.props.classes.trackAfter } }
                            max={this.props.max}
                            min={this.props.min}
                            onChange={this.onChange}
                            onDragEnd={this.onDragEnd}
                            step={this.props.step}
                            reverse={this.props.reverse}
                            value={this.state.value} />*/}
                <RCSlider value={this.state.value}
                          min={this.props.min}
                          max={this.props.max}
                          step={this.props.step}
                          onChange={this.onChange}
                          onAfterChange={this.onAfterChange}
                          handleStyle={handleStyle}
                          railStyle={railStyle}
                          trackStyle={trackStyle}
                          disabled={this.props.disabled} />
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
    value: numberUnitProp,
    disabled: PropTypes.bool
};

Slider.defaultProps = {
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    reverse: false,
    startLabel: '',
    step: 0.01,
    disabled: false
};

export default withTheme()(React.memo(Slider));
