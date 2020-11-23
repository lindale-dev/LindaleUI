import React from 'react';
import * as MUI from '@material-ui/core';

import { ChromePicker, ColorChangeHandler, ColorResult, CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import './ColorPicker.scss';
import { PopoverProps } from '@material-ui/core';

// Converts colors to and from the color picker module's format
//
// Color picker format: {r, g, b} in [0, 255]
// Our format:          {r, g, b} in [0,1]

type RGB =
{
    r: number,
    g: number,
    b: number
};

function normToByte(norm: RGB)
{
    return {
        r: Math.floor(norm.r * 255),
        g: Math.floor(norm.g * 255),
        b: Math.floor(norm.b * 255),
    };
}

function byteToNorm(byte: RGB)
{
    return {
        r: byte.r / 255,
        g: byte.g / 255,
        b: byte.b / 255,
    };
}


type Props =
{
    open: boolean,
    variant: 'chrome' | 'compact',
    color: RGB,
    //normalizedValues: boolean, // Returns/Expects values in [0,1] instead of [0,255]

    anchorEl?: PopoverProps['anchorEl'],

    onClose: () => void,
    onChangeComplete: (color: ColorResult) => void
};

const defaultProps: Partial<Props> =
{
    open: false,
    //normalizedValues: false
};


const ColorPicker: React.FunctionComponent<Props> = (props) =>
{
    // Converts the output color's range if necessary

    /*const onChangeComplete: ColorChangeHandler = (byteColor) =>
    {
        const color = props.normalizedValues ?
            { rgb: byteToNorm(byteColor.rgb) } : // The user code expects the values to be wrapped in 'rgb'
            byteColor;

        props.onChangeComplete(color);
    };*/

    let picker = null;

    if (props.variant === 'compact')
    {
        picker = <div className='color-picker'>

            <div className='color-picker-saturation'>
                <Saturation onChange={() => {}} {...props} />
            </div>

            <div className='color-picker-hue'>
                <Hue onChange={() => {}}
                    direction={ 'horizontal' }
                    {...props} />
            </div>

        </div>;
    }
    else if (props.variant === 'chrome')
    {
        picker = <ChromePicker
            disableAlpha
            color={props.color}
            onChangeComplete={props.onChangeComplete}
        />;
    }

    return (
        <MUI.Popover
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.open}
            onClose={props.onClose}
        >
            {picker}
        </MUI.Popover>
    );
}

// Because in some cases we handle normalized color values, we need to
// convert those BEFORE the CustomPicker wrapper is rendered.
//
// So we have to use a wrapper for the picker wrapper :/
/*
function NormalizationWrapper(props: any)
{
    // Convert the color format if necessary

    const actualColor = props.normalizedValues ?
        normToByte(props.color) :
        props.color;

    return <ColorPicker {...props} color={actualColor} />;
};

export default NormalizationWrapper(CustomPicker(ColorPicker));
*/

const Custom = CustomPicker(ColorPicker);
export { Custom as ColorPicker };

export type { ColorResult };
