// Wrapper around MUI's TextField component.
//
// - adds the 'tiny' size
// - adds an optional tooltip
// - allows instant/late updates
// - simplifies event handling (returns a string instead of an event)

import * as MUI from "@mui/material";
import _ from "lodash";
import {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ParameterElement, ParameterElementProps } from "./ParameterElement";

export type TextInputProps = {
  value: string;
  tooltip?: string;
  tooltipDelay?: number;
  size?: "tiny" | "small" | "medium";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  indeterminate?: boolean;
  transformValue?: (value: string) => string;
  onChange?: (value: string) => void;
  onChangeCommitted?: (value: string) => void;
} & Omit<MUI.TextFieldProps, "ref" | "size" | "value" | "onChange">;

export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    props: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const {
      value,
      tooltip,
      tooltipDelay,
      size = "medium",
      startAdornment,
      endAdornment,
      indeterminate,
      transformValue,
      onChange,
      onChangeCommitted,
      ...textFieldProps
    } = props;

    // Input ref

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current,
    );

    // Edited value, to be able to change it without committing.
    // Undefined while not editing.

    const [editedValue, setEditedValue] = useState<string>();

    // Focused state

    const [focused, setFocused] = useState(false);

    const valueBeforeFocus = useRef<string>("");

    // Callbacks

    const change = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =
          transformValue?.(event.target.value) ?? event.target.value;

        // Call onChange if provided.
        // onChangeCommitted will be called when blurring the input.
        onChange?.(newValue);

        setEditedValue(newValue);

        // We have to adjust the caret position because React cannot track
        // the appropriate position when manually updating an input
        // (which makes the caret jumps to the end)

        const caret = event.target.selectionStart ?? 0;
        const transformDiff = newValue.length - event.target.value.length;
        const newCaret = caret + transformDiff;
        const element = event.target;

        window.requestAnimationFrame(() => {
          element.selectionStart = newCaret;
          element.selectionEnd = newCaret;
        });
      },
      [onChange, transformValue],
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
      [onFocus],
    );

    const blur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        // Call the input's callback
        onBlur?.(event);

        // Trigger the changeComitted callback even if the instant change callback is provided
        // because some higher-level components may want to know when the value has been committed
        if (event.target.value != value) {
          const newValue =
            transformValue?.(event.target.value) ?? event.target.value;

          onChangeCommitted?.(newValue);
        }

        setEditedValue(undefined);

        setFocused(false);
      },
      [onBlur, onChangeCommitted, transformValue, value],
    );

    const keyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (inputRef.current) {
          // Enter: blur (will lead to a commit in non-instant mode)
          if (event.key === "Enter") {
            inputRef.current.blur();
          }

          // Escape: restore the previous value and then blur (will lead to a commit in non-instant mode)
          else if (event.key === "Escape") {
            inputRef.current.value = valueBeforeFocus.current;

            setEditedValue(undefined);

            inputRef.current.blur();
          }
        }
      },
      [valueBeforeFocus],
    );

    // Render

    const isOutlined =
      !textFieldProps.variant || textFieldProps.variant === "outlined";

    const inputProps = useMemo<MUI.StandardTextFieldProps["InputProps"]>(() => {
      // A bit tricky: we need to merge the local InputProps with those possibly passed in textFieldProps

      const inputSx =
        size == "tiny"
          ? {
              borderRadius: isOutlined ? "4px" : undefined,
              paddingTop: isOutlined ? "1px" : undefined,
              "&.MuiInputBase-adornedEnd": {
                paddingRight: isOutlined ? "6px" : undefined,
              },
              "&.MuiInputBase-adornedEnd .MuiInputBase-input": {
                paddingRight: isOutlined ? 0 : undefined,
              },
              "& .MuiInputBase-input": {
                paddingTop: 0.2,
                paddingBottom: 0.2,
                paddingLeft: isOutlined ? 1 : 0.5,
                paddingRight: isOutlined ? 1 : 0.5,
                fontSize: "0.8rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderStyle: props.disabled ? "dotted" : undefined,
              },
            }
          : {};

      const adornmentSx =
        size == "tiny"
          ? {
              marginLeft: "4px",
            }
          : undefined;

      return {
        ...textFieldProps.InputProps,
        sx: _.merge(inputSx, textFieldProps.InputProps?.sx),
        margin: size == "medium" ? "none" : "dense",
        startAdornment: startAdornment && (
          <MUI.InputAdornment position="start" sx={adornmentSx}>
            {startAdornment}
          </MUI.InputAdornment>
        ),
        endAdornment: endAdornment && (
          <MUI.InputAdornment position="end" sx={adornmentSx}>
            {endAdornment}
          </MUI.InputAdornment>
        ),
      };
    }, [
      endAdornment,
      isOutlined,
      props.disabled,
      size,
      startAdornment,
      textFieldProps.InputProps,
    ]);

    return (
      <MUI.Tooltip
        title={tooltip ?? ""}
        enterDelay={tooltipDelay}
        disableInteractive
      >
        <MUI.TextField
          {...textFieldProps}
          size={size == "medium" ? "medium" : "small"}
          InputProps={inputProps}
          inputRef={inputRef}
          value={indeterminate && !focused ? "—" : (editedValue ?? value)}
          onFocus={focus}
          onBlur={blur}
          onKeyDown={keyDown}
          onChange={change}
        />
      </MUI.Tooltip>
    );
  }),
);

// Labelled element

export type TextElementProps = {
  textInputProps?: TextInputProps;
} & ParameterElementProps;

export const TextElement = memo(function TextElement(props: TextElementProps) {
  const { textInputProps, ...elementProps } = props;

  return (
    <label style={props.disabled ? { cursor: "default" } : {}}>
      <ParameterElement {...elementProps}>
        <TextInput
          fullWidth
          size={props.dense ? "tiny" : "medium"}
          disabled={props.disabled}
          value={textInputProps?.value ?? ""}
          {...props.textInputProps}
        />
      </ParameterElement>
    </label>
  );
});
