import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {numberUnitProp} from '../utils/customProps';

import './NumberField.scss';

function onInputChange(props, event)
{
    const value = event.target.value;

    // Remove invalid characters and convert to number
    let numberValue = value.replace(/[^\d]/,'');
    numberValue = Number(numberValue);

    if (numberValue !== props.value)
        props.onChange(numberValue);
}

class NumberField extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            dragging: false,
            currentSlidingValue: null // Only relevant when sliding
        };

        this.lastMousePos = null; // Null if not dragging, otherwise an X value

        // Bind callbacks once to avoir useless renders
        this.startDragging = this.startDragging.bind(this);
        this.updateDragging = this.updateDragging.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
    }

    render()
    {
        return (
            <div className='number-field option_element row'>
                <label className='col s5'>{this.props.name}</label>
                <input className='col s5 numerical_input' type='text' value={this.state.dragging ? this.state.currentSlidingValue : this.props.value} onChange={onInputChange.bind(null, this.props)} />
                <div className={classnames('number-field-handle col offset-s1 s1', {active: this.state.dragging})} onMouseDown={this.startDragging}></div>
            </div>
        );
    }

    startDragging()
    {
        document.addEventListener('mousemove', this.updateDragging);
        document.addEventListener('mouseup', this.stopDragging);

        this.setState({
            dragging: true,
            currentSlidingValue: parseFloat(this.props.value)
        });
    }

    updateDragging()
    {
        const mousePos = event.screenX;

        // First update: just record the current position

        if (!this.lastMousePos)
        {
            this.lastMousePos = mousePos;
            return;
        }

        // Update the current value depending on the mouse motion

        const delta = mousePos - this.lastMousePos;
        let newValue = this.state.currentSlidingValue + delta * this.props.speed;

        if (this.props.min !== undefined)
            newValue = Math.max(this.props.min, newValue);
        if (this.props.max !== undefined)
            newValue = Math.min(this.props.max, newValue);

        if (this.props.instantUpdate)
            this.props.onChange(newValue);

        this.lastMousePos = mousePos;
        this.setState({currentSlidingValue: newValue});
    }

    stopDragging()
    {
        document.removeEventListener('mousemove', this.updateDragging);
        document.removeEventListener('mouseup', this.stopDragging);

        this.lastMousePos = null;

        this.setState({dragging: false});

        if (!this.props.instantUpdate)
            this.props.onChange(this.state.currentSlidingValue);
    }
}

NumberField.propTypes = {
    name: PropTypes.string.isRequired,
    value: numberUnitProp,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    speed: PropTypes.number, // Speed factor when using the slider
    instantUpdate: PropTypes.bool // Should each change of value send an update?
};

NumberField.defaultProps = {
    speed: 1,
    instantUpdate: false
}

export default NumberField;
