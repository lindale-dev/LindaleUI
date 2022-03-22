// Wrapper around MUI's TextField component.
//
// - adds a 'small' size
// - simplifies event handling
// - allows instant/late updates

import classnames from 'classnames';
import { merge } from 'lodash';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as MUI from '@material-ui/core';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

const useInputStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    input: {
      // Small variant
      '.small &': {
        height: '18px',
        padding: 0,
        fontSize: theme.spacing(1.75)
      }
    }
  })
);

export type TextInputProps = {
  value?: string;
  tooltip?: string;
  tooltipDelay?: number;
  size?: 'small' | 'medium';
  instantUpdate?: boolean; // Each change of value will send an update
  onChange?: (value: string) => void;
} & Omit<MUI.TextFieldProps, 'value' | 'onChange'>;

export const TextInput = memo(function TextInput(props: TextInputProps) {
  props = {
    instantUpdate: false,
    size: 'medium',
    ...props
  };

  const inputClasses = useInputStyles(props);

  const [currentValue, setCurrentValue] = useState('');
  const [valueBeforeFocus, setValueBeforeFocus] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { value, tooltip, tooltipDelay, instantUpdate, onChange, ...textFieldProps } = props;

  // The value coming from the props overrides the current value

  useEffect(() => {
    if (value != undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  // Helpers

  const onInstantChange = useCallback(
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

  const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setValueBeforeFocus(event.target.value);

    // Select the text of the input, to make it easier to edit it on focus
    event.target.select();
  }, []);

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Only commit if not in instant mode.
      // In instant mode, it should already have been done when typing the last character.
      if (!instantUpdate) {
        onChange?.(event.target.value);
      }
    },
    [instantUpdate, onChange]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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

  return (
    <MUI.Tooltip title={tooltip ?? ''} enterDelay={tooltipDelay}>
      <MUI.TextField
        {...textFieldProps}
        // A bit tricky: we need to merge the local InputProps with those possibly passed in textFieldProps
        InputProps={{
          ...textFieldProps.InputProps,
          classes: merge(inputClasses, textFieldProps.InputProps?.classes),
          className: classnames(textFieldProps.InputProps?.className, {
            small: props.size == 'small'
          }),
          margin: props.size == 'small' ? 'dense' : 'none'
        }}
        inputRef={inputRef}
        value={currentValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={onInstantChange}
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
          size={props.dense ? 'small' : 'medium'}
          fullWidth
          disabled={props.disabled}
          {...props.textInputProps}
        />
      </ParameterElement>
    </label>
  );
});
