import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Popover from '@material-ui/core/Popover';

import { ChromePicker, CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import './ColorPicker.scss';

const style = {
};

function ColorPicker(props)
{
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
                <ChromePicker   disableAlpha 
                                color={ props.color }
                                onChangeComplete={ props.onChangeComplete } /> }
        </Popover>
    );
}

ColorPicker.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.element.isRequired,
    color: PropTypes.object.isRequired,
    onChangeComplete: PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
};

export default CustomPicker(ColorPicker);
