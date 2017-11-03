import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';

import {numberUnitPropArray} from '../utils/customProps';

function toNumber(x)
{
    return parseFloat(x);
}

class Slider extends React.Component
{
    render()
    {
        return (
            <div className='option_element row uniform grid'>
                <label className='col s5'>{this.props.name}</label>
                <div className='col s7'>
                    <div className='left slider_label pointer_transparent'><i>{this.props.unit}</i></div>
                    <div className='right slider_label'>
                        <div className='slider_input_placeholder'>{toNumber(this.props.values[0]).toFixed(2)}</div>
                    </div>
                    <div className='input_slider adaptive_slider' ref={this.initSlider.bind(this)}></div>
                </div>
            </div>
        );
    }

    initSlider(element)
    {
        if (element && !element.noUiSlider)
        {
            noUiSlider.create(element, {
                start: this.props.values,
                connect: this.props.connect,
                behaviour: 'snap',
                range: {
                    min: toNumber(this.props.min),
                    max: toNumber(this.props.max)
                }
            });

            element.noUiSlider.on('end', (values, handle, rawValues) => {
                this.props.onChange[handle](rawValues[handle]);
            });
        }
    }
}

Slider.propTypes = {
    name: PropTypes.string.isRequired,
    values: numberUnitPropArray,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    connect: PropTypes.arrayOf(PropTypes.bool).isRequired
};

Slider.defaultProps = {
}

export default Slider;
