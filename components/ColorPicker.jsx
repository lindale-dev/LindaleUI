import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Popover from '@material-ui/core/Popover';

import { ChromePicker, CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import './ColorPicker.scss';

const style = {
};

// Convert colors to and from the color picker module's format
//
// Color picker format: {r, g, b} in [0, 255]
// Our format:          {r, g, b} in [0,1]

function normToByte(norm)
{
    return {
        r: Math.floor(norm.r * 255),
        g: Math.floor(norm.g * 255),
        b: Math.floor(norm.b * 255),
    };
}

function byteToNorm(byte)
{
    return {
        r: byte.r / 255,
        g: byte.g / 255,
        b: byte.b / 255,
    };
}

function ColorPicker(props)
{
    // Convert the output color's range if necessary

    const onChangeComplete = (byteColor) =>
    {
        const color = props.normalizedValues ?
            { rgb: byteToNorm(byteColor.rgb) } : // The user code expects the values to be wrapped in 'rgb'
            byteColor;

        props.onChangeComplete(color);
    };

    return(
        <Popover anchorEl={props.anchorEl}
                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                 onClose={props.onClose}
                 open={props.open}
                 transformOrigin={{ vertical: 'top', horizontal: 'center',}} >

            { props.variant == 'compact' &&
                <div className='color-picker'>
                    <div className='color-picker-saturation'>
                        <Saturation {...props} />
                    </div>
                    <div className='color-picker-hue'>
                        <Hue    {...props}
                                direction={ 'horizontal' } />
                    </div>
                </div> }

            { props.variant == 'chrome' &&
                <ChromePicker disableAlpha
                              color={ props.color }
                              onChangeComplete={ onChangeComplete } /> }

        </Popover>
    );
}

ColorPicker.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.any.isRequired,
    color: PropTypes.object.isRequired,
    normalizedValues: PropTypes.bool.isRequired, // Returns/Accepts values in [0,1] instead of [0,255]
    onChangeComplete: PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
    open: false,
    normalizedValues: false
};

// Because in some cases we handle normalized color values, we need to
// convert those BEFORE the CustomPicker wrapper is rendered.
//
// So we have to use a wrapper for the picker wrapper :/

const NormalizationWrapper = (Wrapped) =>
{
    return class extends React.Component
    {
        render()
        {
            // Convert the color format if necessary

            const actualColor = this.props.normalizedValues ?
                normToByte(this.props.color) :
                this.props.color;

            return <Wrapped {...this.props} color={actualColor} />;
        }
    }
};

export default NormalizationWrapper(CustomPicker(ColorPicker));
