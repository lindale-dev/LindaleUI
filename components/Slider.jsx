import React from 'react';
import PropTypes from 'prop-types';

import RCSlider from 'rc-slider';
import {numberUnitPropArray} from '../utils/customProps';
import Tooltip from './Tooltip';

import 'rc-slider/assets/index.css';
import './Slider.scss';

// TODO : Make this a class to properly handle value changes. See TextInput
// TODO range slider
class Slider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { value: props.values[0] };

        this.commitChange = this.commitChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    commitChange(value)
    {
        this.props.onChange[0](value);
    }
    onChange(value)
    {
        this.setState({value: value});
        if (this.props.instantUpdate)
            this.commitChange(value);
    }
    onAfterChange(value)
    {
        if (!this.props.instantUpdate)
            this.commitChange(value);
    }

    render(){

        // This styles the handle when it is located at the slider's minimum
        // See Slider.scss for the general styling
        let handleStyle = {};
        if(this.state.value == this.props.min || !this.state.value){
            handleStyle = {
                backgroundColor: '#fff',
                border: '2px solid #bbb',
                boxSizing: 'border-box',
            };
        }

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
                <RCSlider value={this.state.value}
                          min={this.props.min}
                          max={this.props.max}
                          step={this.props.step}
                          onChange={this.onChange} 
                          onAfterChange={this.onAfterChange}
                          handleStyle={handleStyle} />
                {endLabel}
            </div>
        )
    }
}

Slider.propTypes = {
    values: numberUnitPropArray,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    startLabel: PropTypes.string,
    endLabel: PropTypes.string,
    instantUpdate: PropTypes.bool
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 0.01,
    startLabel: '',
    endLabel: '',
    instantUpdate: false
};

export default Slider;