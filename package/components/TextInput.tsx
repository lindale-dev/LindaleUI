// Wrapper around MUI's TextField component.
//
// - adds 'tiny' and 'small' sizes
// - simplifies event handling
// - allows instant/late updates

import { merge } from 'lodash';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as MUI from '@mui/material';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type TextInputProps = {
  value?: string;
  tooltip?: string;
  tooltipDelay?: number;
  size?: 'tiny' | 'small' | 'medium';
  instantUpdate?: boolean; // Each change of value will send an update
  onChange?: (value: string) => void;
} & Omit<MUI.TextFieldProps, 'size' | 'value' | 'onChange'>;

export const TextInput = memo(function TextInput(props: TextInputProps) {
  props = {
    instantUpdate: false,
    size: 'medium',
    ...props
  };

  const [currentValue, setCurrentValue] = useState('');
  const [valueBeforeFocus, setValueBeforeFocus] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { value, tooltip, tooltipDelay, instantUpdate, size, onChange, ...textFieldProps } = props;

  // The value coming from the props overrides the current value

  useEffect(() => {
    if (value != undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  // Helpers

  const handleInstantChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Instant update: directly update the upstream value
      if (instantUpdate) {
        onChange?.(event.target.value);
      }
      // Otherwise: update the internal value
      else {
        setCurrentValue(event.target.value);
      }
    },
    [instantUpdate, onChange]
  );

  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setValueBeforeFocus(event.target.value);

    // Select the text of the input, to make it easier to edit it on focus
    event.target.select();
  }, []);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Only commit if not in instant mode.
      // In instant mode, it should already have been done when typing the last character.
      if (!instantUpdate) {
        onChange?.(event.target.value);
      }
    },
    [instantUpdate, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!inputRef.current) {
        return;
      }

      if (event.key === 'Enter') {
        // Blur (will lead to a commit in non-instant mode)
        inputRef.current.blur();
      } else if (event.key === 'Escape') {
        // Restore the previous value and then blur (will lead to a commit in non-instant mode)

        // Set both the input's contents (used by onBlur)
        // and the current value (or it won't be updated because props.value still has the same value)
        inputRef.current.value = valueBeforeFocus;
        setCurrentValue(valueBeforeFocus);

        inputRef.current.blur();
      }
    },
    [valueBeforeFocus]
  );

  // Render

  const inputSx =
    props.size == 'tiny'
      ? {
          '& .MuiInputBase-input': {
            paddingTop: 0.2,
            paddingBottom: 0.2,
            paddingLeft: 1,
            fontSize: '0.8rem'
          }
        }
      : {};

  return (
    <MUI.Tooltip title={tooltip ?? ''} enterDelay={tooltipDelay}>
      <MUI.TextField
        {...textFieldProps}
        size={props.size == 'medium' ? 'medium' : 'small'}
        // A bit tricky: we need to merge the local InputProps with those possibly passed in textFieldProps
        InputProps={{
          ...textFieldProps.InputProps,
          sx: merge(inputSx, textFieldProps.InputProps?.sx),
          margin: props.size == 'medium' ? 'none' : 'dense'
        }}
        inputRef={inputRef}
        value={currentValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleInstantChange}
      />
    </MUI.Tooltip>
  );
});

// Labelled element

export type TextElementProps = {
  textInputProps?: TextInputProps;
} & ParameterElementProps;

export const TextElement = memo(function TextElement(props: TextElementProps) {
  const { textInputProps, ...elementProps } = props;

  return (
    <label style={props.disabled ? { cursor: 'default' } : {}}>
      <ParameterElement {...elementProps}>
        <TextInput
          fullWidth
          size={props.dense ? 'tiny' : 'medium'}
          disabled={props.disabled}
          {...props.textInputProps}
        />
      </ParameterElement>
    </label>
  );
});