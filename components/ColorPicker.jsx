import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Popover from 'material-ui/Popover';

import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import './ColorPicker.scss';

const style = {
};

function ColorPicker(props)
{
    return(
        <Popover open={props.open} 
                 onClose={props.onClose}
                 anchorEl={props.anchorEl}
                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
            <div className='color-picker'>
                <div className='color-picker-saturation'>
                    <Saturation {...props}
                                onChange={ props.onChange } />
                </div>
                <div className='color-picker-hue'>
                    <Hue {...props}
                         onChange={ props.onChange }
                         direction={ 'horizontal' } />
                </div>
            </div>
        </Popover>
    );
}

ColorPicker.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.element.isRequired,
    color: PropTypes.array.isRequired,
    onChangeComplete: PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
};

export default CustomPicker(ColorPicker);
