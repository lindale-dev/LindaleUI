// Wrapper around Material UI's slider.
//
// - more compact
// - adds start/end labels
// - simplifies event handling (no unneeded event object, single value instead of array)

import classnames from 'classnames';
import React, { memo, useCallback, useEffect, useState } from 'react';
import * as MUI from '@material-ui/core';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

const useStyles = MUI.makeStyles(() =>
  MUI.createStyles({
    slider: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    },
    thumb: {
      textDecoration: 'initial' // This is just a placeholder to avoid a warning
    },
    thumbMin: {
      backgroundColor: '#fff',
      border: '2px solid #bbb'
    },
    rail: {
      backgroundColor: '#bbb',
      opacity: 1
    },
    startLabel: {
      fontSize: '0.6875rem',
      fontStyle: 'italic',
      marginRight: '10px'
    },
    endLabel: {
      fontSize: '0.6875rem',
      fontStyle: 'italic',
      marginLeft: '10px'
    }
  })
);

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

  const classes = useStyles(props);

  const [currentValue, setCurrentValue] = useState<number | number[]>(0);

  // The value coming from the props overrides the uncontrolled input contents
  useEffect(() => {
    setCurrentValue(props.value ?? props.defaultValue ?? 0);
  }, [props.value, props.defaultValue]);

  const { startLabel, endLabel, instantUpdate, onChange, ...sliderProps } = props;

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

  const startLabelElement = props.startLabel && (
    <span className={classes.startLabel}>{props.startLabel}</span>
  );

  const endLabelElement = props.endLabel && (
    <span className={classes.endLabel}>{props.endLabel}</span>
  );

  return (
    <div className={classnames(classes.slider, props.className)}>
      {startLabelElement}

      <MUI.Slider
        classes={{
          thumb: currentValue === props.min ? classes.thumbMin : classes.thumb, // This styles the thumb when it is located at the slider's minimum
          rail: classes.rail
        }}
        {...sliderProps}
        value={currentValue}
        onChange={(e, value) => handleChange(value)}
        onChangeCommitted={(e, value) => handleCommit(value)}
      />

      {endLabelElement}
    </div>
  );
});

function extractValue(value: number | number[]): number {
  if (Array.isArray(value)) {
    console.warn('lindale-ui slider: range sliders are not supported');
    return value[0];
  }

  return value;
}

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
