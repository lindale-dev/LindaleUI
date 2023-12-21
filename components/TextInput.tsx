// Wrapper around MUI's TextField component.
//
// - adds 'tiny' size
// - simplifies event handling
// - allows instant/late updates

import * as MUI from '@mui/material';
import { merge } from 'lodash';
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type TextInputProps = {
  value: string;
  tooltip?: string;
  tooltipDelay?: number;
  size?: 'tiny' | 'small' | 'medium';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  indeterminate?: boolean;
  onChange?: (value: string) => void;
  onChangeCommitted?: (value: string) => void;
} & Omit<MUI.TextFieldProps, 'size' | 'value' | 'onChange'>;

export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    props: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    const {
      value,
      tooltip,
      tooltipDelay,
      indeterminate,
      size = 'medium',
      onChange,
      onChangeCommitted,
      startAdornment,
      endAdornment,
      ...textFieldProps
    } = props;

    // Edited value, to be able to change it without committing.
    // Undefined while not editing.
    const [editedValue, setEditedValue] = useState<string>();

    const [focused, setFocused] = useState(false);
    const valueBeforeFocus = useRef<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current
    );

    // Callbacks

    const change = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        // Call onChange if provided.
        // onChangeCommitted will be called when blurring the input.
        onChange?.(event.target.value);

        setEditedValue(event.target.value);
      },
      [onChange]
    );

    const { onFocus, onBlur } = textFieldProps;

    const focus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        // Call the input's callback
        onFocus?.(event);

        // Select the text of the input, to make it easier to edit
        event.target.select();

        // Save the current value to optionally rollback later
        valueBeforeFocus.current = event.target.value;

        setFocused(true);
      },
      [onFocus]
    );

    const blur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        // Call the input's callback
        onBlur?.(event);

        // Only trigger the change callback if no instant change callback has been provided
        // as it should already have been done when typing the last character
        if (!onChange && event.target.value != value) {
          onChangeCommitted?.(event.target.value);
        }

        setEditedValue(undefined);

        setFocused(false);
      },
      [onBlur, onChange, onChangeCommitted, value]
    );

    const keyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (inputRef.current) {
          if (event.key === 'Enter') {
            // Blur (will lead to a commit in non-instant mode)
            inputRef.current.blur();
          } else if (event.key === 'Escape') {
            // Restore the previous value and then blur (will lead to a commit in non-instant mode)

            inputRef.current.value = valueBeforeFocus.current;

            setEditedValue(undefined);

            inputRef.current.blur();
          }
        }
      },
      [valueBeforeFocus]
    );

    // Render

    const isOutlined = !textFieldProps.variant || textFieldProps.variant === 'outlined';

    const inputSx =
      size == 'tiny'
        ? {
            '& .MuiInputBase-input': {
              paddingTop: 0.2,
              paddingBottom: 0.2,
              paddingLeft: isOutlined ? 1 : 0.5,
              paddingRight: isOutlined ? 1 : 0.5,
              fontSize: '0.8rem'
            }
          }
        : {};

    return (
      <MUI.Tooltip title={tooltip ?? ''} enterDelay={tooltipDelay} disableInteractive>
        <MUI.TextField
          {...textFieldProps}
          size={size == 'medium' ? 'medium' : 'small'}
          // A bit tricky: we need to merge the local InputProps with those possibly passed in textFieldProps
          InputProps={{
            ...textFieldProps.InputProps,
            sx: merge(inputSx, textFieldProps.InputProps?.sx),
            margin: size == 'medium' ? 'none' : 'dense',
            startAdornment: startAdornment && (
              <MUI.InputAdornment position='start'>{startAdornment}</MUI.InputAdornment>
            ),
            endAdornment: endAdornment && (
              <MUI.InputAdornment position='end'>{endAdornment}</MUI.InputAdornment>
            )
          }}
          inputRef={inputRef}
          value={indeterminate && !focused ? '—' : editedValue ?? value}
          onFocus={focus}
          onBlur={blur}
          onKeyDown={keyDown}
          onChange={change}
        />
      </MUI.Tooltip>
    );
  })
);

// Labelled element

export type TextElementProps = {
  textInputProps?: TextInputProps;
} & ParameterElementProps;

export const TextElement = memo(function TextElement(props: TextElementProps) {
  const { textInputProps, ...elementProps } = props;

  return (
    <label style={props.disabled ? { cursor: 'default' } : {}}>
      <ParameterElement {...elementProps}>
        {/* @ts-ignore */}
        <TextInput
          fullWidth
          size={props.dense ? 'tiny' : 'medium'}
          disabled={props.disabled}
          value={textInputProps?.value ?? ''}
          {...props.textInputProps}
        />
      </ParameterElement>
    </label>
  );
});
