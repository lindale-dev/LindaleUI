// Wrapper around Material UI's slider.
//
// - more compact
// - adds start/end labels
// - simplifies event handling (no unneeded event object, single value instead of array)

import React, { memo, useCallback, useEffect, useState } from 'react';
import * as MUI from '@mui/material';
import { Box } from './Box';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type SliderProps = {
  startLabel?: string;
  endLabel?: string;
  inverted?: boolean;
  dense?: boolean;
  indeterminate?: boolean;

  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
} & Omit<MUI.SliderProps, 'onChange' | 'onChangeCommitted'>;

export const Slider = memo(function Slider(props: SliderProps) {
  props = {
    defaultValue: 0,
    ...props
  };

  const [currentValue, setCurrentValue] = useState<number | number[]>(0);

  // The value coming from the props overrides the uncontrolled input contents
  useEffect(() => {
    setCurrentValue(props.value ?? props.defaultValue ?? 0);
  }, [props.value, props.defaultValue]);

  const {
    startLabel,
    endLabel,
    inverted,
    dense,
    indeterminate,
    onChange,
    onChangeCommitted,
    ...sliderProps
  } = props;

  // Callbacks

  const handleChange = useCallback(
    (newValue: number | number[]) => {
      const result = extractValue(newValue);
      setCurrentValue(result);
      onChange?.(result);
    },
    [onChange]
  );

  const handleCommit = useCallback(
    (newValue: number | number[]) => {
      const result = extractValue(newValue);
      onChangeCommitted?.(result);
    },
    [onChangeCommitted]
  );

  // Render

  // TODO why specifically '0.6875rem'?!

  const startLabelElement = props.startLabel && (
    <Box sx={{ fontSize: '0.6875rem' }}>{props.startLabel}</Box>
  );

  const endLabelElement = props.endLabel && (
    <Box sx={{ fontSize: '0.6875rem' }}>{props.endLabel}</Box>
  );

  // Indeterminate state: hide the thumb
  const thumbVisibility = {
    visibility: props.indeterminate ? 'hidden' : 'initial'
  };

  return (
    <MUI.Stack direction='row' alignItems='center' spacing={2}>
      {startLabelElement}

      <MUI.Slider
        sx={{
          padding: dense ? 0 : undefined,

          // Style the thumb when it is located at the slider's minimum
          '& .MuiSlider-thumb':
            (currentValue === props.min && !inverted) || (currentValue === props.max && inverted)
              ? {
                  backgroundColor: '#fff',
                  border: '2px solid #bbb',
                  ...thumbVisibility
                }
              : {
                  textDecoration: 'initial', // prevents a warning
                  ...thumbVisibility
                },
          '& .MuiSlider-rail': {
            backgroundColor: (theme) =>
              // Indeterminate state: fill the rail
              props.indeterminate ? theme.palette.primary.main : !inverted ? '#bbb' : undefined,
            opacity: !inverted ? 1 : undefined
          },
          '& .MuiSlider-track': {
            backgroundColor: inverted ? '#bbb' : undefined,
            opacity: inverted ? 1 : undefined
          }
        }}
        {...sliderProps}
        size={dense ? 'small' : props.size}
        value={currentValue}
        track={inverted ? 'inverted' : 'normal'}
        onChange={(e, value) => handleChange(value)}
        onChangeCommitted={(e, value) => handleCommit(value)}
      />

      {endLabelElement}
    </MUI.Stack>
  );
});

function extractValue(value: number | number[]): number {
  if (Array.isArray(value)) {
    console.warn('lindale-ui slider: range sliders are not supported');
    return value[0];
  }

  return value;
}

// Labelled slider

export type SliderElementProps = {
  sliderProps?: SliderProps;
} & ParameterElementProps;

export const SliderElement = memo(function SliderElement(props: SliderElementProps) {
  const { sliderProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <Slider dense={elementProps.dense} {...sliderProps} />
    </ParameterElement>
  );
});
