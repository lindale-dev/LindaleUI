// Wrapper around Material UI's slider.
//
// - more compact
// - adds start/end labels
// - simplifies event handling (no unneeded event object, single value instead of array)

import React, { memo, useCallback, useEffect, useState } from 'react';
import * as MUI from '@mui/material';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type SliderProps = {
  instantUpdate?: boolean;
  startLabel?: string;
  endLabel?: string;
  onChange?: (value: number) => void;
} & Omit<MUI.SliderProps, 'onChange'>;

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

  const { startLabel, endLabel, instantUpdate, onChange, ...sliderProps } = props;

  // Callbacks

  const handleChange = useCallback(
    (newValue: number | number[]) => {
      const result = extractValue(newValue);

      setCurrentValue(result);

      // Only commit in instantUpdate mode
      if (instantUpdate) {
        onChange?.(result);
      }
    },
    [instantUpdate, onChange]
  );

  const handleCommit = useCallback(
    (newValue: number | number[]) => {
      // Only commit the change if we're not in instantUpdate mode,
      // in which case the commit was already made in onChange
      if (!instantUpdate) {
        const result = extractValue(newValue);
        onChange?.(result);
      }
    },
    [instantUpdate, onChange]
  );

  // Render

  // TODO why specifically '0.6875rem'?!

  const startLabelElement = props.startLabel && (
    <MUI.Box sx={{ fontSize: '0.6875rem' }}>{props.startLabel}</MUI.Box>
  );

  const endLabelElement = props.endLabel && (
    <MUI.Box sx={{ fontSize: '0.6875rem' }}>{props.endLabel}</MUI.Box>
  );

  return (
    <MUI.Stack direction='row' alignItems='center' spacing={2}>
      {startLabelElement}

      <MUI.Slider
        sx={{
          // Style the thumb when it is located at the slider's minimum
          thumb:
            currentValue === props.min
              ? {
                  backgroundColor: '#fff',
                  border: '2px solid #bbb'
                }
              : {
                  textDecoration: 'initial' // prevents a warning
                },
          rail: {
            backgroundColor: '#bbb',
            opacity: 1
          }
        }}
        {...sliderProps}
        value={currentValue}
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
      <Slider {...sliderProps} />
    </ParameterElement>
  );
});