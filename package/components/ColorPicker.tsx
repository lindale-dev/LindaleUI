import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  ChromePicker,
  CustomPicker,
  CustomPickerProps,
  ColorResult,
  RGBColor,
  HuePicker
} from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import * as MUI from '@mui/material';

import { Icon, IconButton } from './Icon';
import { ParameterElement, ParameterElementProps } from './ParameterElement';

const CompactPicker = CustomPicker(function CustomPicker(props: CustomPickerProps<any>) {
  return (
    <MUI.Box width='100px' height='116px' p='8px'>
      <MUI.Box
        width='100%'
        height='84px'
        marginBottom='8px'
        position='relative'
        sx={{
          // Hack to fix the pointer sometimes generating drag events
          // (react-color provides a "styles" prop but I cannot make it work)
          '& .saturation-white > div:nth-child(2)': {
            pointerEvents: 'none'
          }
        }}
      >
        <Saturation {...props} onChange={props.onChange} />
      </MUI.Box>

      <MUI.Box width='100%' height='8px' position='relative'>
        <Hue {...props} onChange={props.onChange} direction={'horizontal'} />
      </MUI.Box>
    </MUI.Box>
  );
});

// Re-export the color type from react-color
export type { RGBColor } from 'react-color';

export type ColorPickerProps = {
  value: RGBColor;

  open?: boolean;
  variant?: 'chrome' | 'compact';
  disabled?: boolean;
  anchorEl?: HTMLElement | null;
  onChange?: (color: RGBColor) => void;
  onChangeComplete?: (color: RGBColor) => void;
  onClose?: () => void;
};

export const ColorPicker = memo(function ColorPicker(props: ColorPickerProps) {
  props = {
    open: true,
    variant: 'chrome',
    disabled: false,
    ...props
  };

  const [currentColor, setCurrentColor] = useState<RGBColor>();

  useEffect(() => {
    setCurrentColor(props.value);
  }, [props.value]);

  const { onChange, onChangeComplete } = props;

  const handleChange = useCallback(
    (color: ColorResult) => {
      onChange?.(color.rgb);
      setCurrentColor(color.rgb);
    },
    [onChange]
  );

  const handleCommit = useCallback(() => {
    if (currentColor) {
      onChangeComplete?.(currentColor);
    }
  }, [currentColor, onChangeComplete]);

  if (!props.open) {
    return null;
  }

  const picker =
    props.variant === 'compact' ? (
      <CompactPicker
        color={currentColor}
        onChange={handleChange} // we don't use onChangeComplete since it's triggered when keeping the mouse still, not when releasing the mouse button
      />
    ) : (
      <ChromePicker
        disableAlpha
        color={currentColor}
        onChange={handleChange}
        onChangeComplete={handleCommit}
      />
    );

  // Floating
  if (props.anchorEl) {
    return (
      <MUI.Popover
        open
        anchorEl={props.anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={props.onClose}
      >
        <MUI.ClickAwayListener mouseEvent='onMouseUp' onClickAway={handleCommit}>
          <MUI.Box onMouseUp={handleCommit}>{picker}</MUI.Box>
        </MUI.ClickAwayListener>
      </MUI.Popover>
    );
  }
  // Inline
  else {
    return picker;
  }
});

// Labelled element

export type ColorElementProps = {
  pickerProps: ColorPickerProps;
} & ParameterElementProps;

export const ColorElement = memo(function ColorElement(props: ColorElementProps) {
  const [currentColor, setCurrentColor] = useState<RGBColor>();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCurrentColor(props.pickerProps.value);
  }, [props.pickerProps.value]);

  const { onChange, onChangeComplete } = props.pickerProps;

  const handleChange = useCallback(
    (color: ColorResult) => {
      onChange?.(color.rgb);
      setCurrentColor(color.rgb);
    },
    [onChange]
  );

  const handleCommit = useCallback(() => {
    if (currentColor) {
      onChangeComplete?.(currentColor);
    }
  }, [currentColor, onChangeComplete]);

  const { pickerProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Grid container direction='row' wrap='nowrap' alignItems='center'>
        {/* Button to show the full picker */}

        <MUI.Grid item>
          <IconButton
            ref={buttonRef}
            //size={18}
            icon={<Icon name='mdi-palette' />}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
        </MUI.Grid>

        {/* Hue slider */}

        <MUI.Grid item sx={{ width: '100%', height: '100%' }}>
          <MUI.ClickAwayListener mouseEvent='onMouseUp' onClickAway={handleCommit}>
            {/* Padding on the left to avoid covering the icon, on the right to avoid overflow */}
            <MUI.Box
              sx={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                // Hack to offset the picker's handle
                // (simpler than creating a custom picker with a custom pointer)
                huePicker: {
                  '& .hue-horizontal div div': {
                    transform: 'translate(-5px, -5px) !important' // half the picker's width
                  }
                }
              }}
              onMouseUp={handleCommit}
            >
              <HuePicker
                color={props.pickerProps?.value}
                height='10px'
                width='100%'
                onChange={handleChange}
              />
            </MUI.Box>
          </MUI.ClickAwayListener>
        </MUI.Grid>
      </MUI.Grid>

      {/* Full color picker */}

      <ColorPicker
        {...props.pickerProps}
        open={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        anchorEl={buttonRef.current}
      />
    </ParameterElement>
  );
});
