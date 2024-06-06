// Number input
// (actually a wrapper around our own TextInput)
//
// - adds min/max clamping
// - adds decimal precision
// - adds slider-like controls
// - supports unit conversion
// - Adds an optional unit label
// - adds an optional tooltip
// - allows instant/late updates
// - simplifies event handling (returns a number instead of an event)

import * as MUIIcons from "@mui/icons-material";
import * as MUI from "@mui/material";
import _ from "lodash";
import React, { memo, useCallback, useRef, useState } from "react";
import { formatNumber } from "../utils/format";
import { Icon, IconButton } from "./Icon";
import { ParameterElement, ParameterElementProps } from "./ParameterElement";
import { TextInput, TextInputProps } from "./TextInput";

export type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  decimals?: number;
  unit?: string; // TODO constrain?
  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
} & Omit<TextInputProps, "value" | "onChange" | "onChangeCommitted">;

export const NumberInput = memo(function NumberInput(props: NumberInputProps) {
  const {
    value: numberValue,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    decimals = 20, // Maximum value allowed by Number.toFixed(),
    unit = "",
    onChange,
    onChangeCommitted,
    ...textInputProps
  } = props;

  // Focused state

  const [focused, setFocused] = useState(false);

  const focus = useCallback(() => {
    setFocused(true);
  }, []);

  const blur = useCallback(() => {
    setFocused(false);
  }, []);

  // Edited value, to be able to change it without committing.
  // Undefined while not editing.

  const [editedValue, setEditedValue] = useState<number>();

  // Callbacks

  const change = useCallback(
    (textValue: string) => {
      const value = clampValue(valueAsNumber(textValue), min, max);

      if (value != numberValue) {
        onChange?.(value);
      }
    },
    [max, min, numberValue, onChange],
  );

  const changeCommitted = useCallback(
    (textValue: string) => {
      const value = clampValue(valueAsNumber(textValue), min, max);

      if (value != numberValue) {
        onChangeCommitted?.(value);
      }
    },
    [max, min, numberValue, onChangeCommitted],
  );

  // Slider-like controls

  const inputRef = useRef<HTMLInputElement>(null);

  const mouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      startingValue: number,
    ) => {
      // Start dragging

      let draggingValue = startingValue;
      const startMouseX = e.clientX;
      const orderOfMagnitude = getOrderOfMagnitude(startingValue);

      // Prevent the focus (will be triggered on mouse up if still hovering the input)

      e.preventDefault();

      // Mouse move: update the dragged value

      const documentMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startMouseX;
        const offset = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / 5); // Increment offset every 5 pixel of movement

        if (offset != 0) {
          // SHIFT speeds ups the change by 10.
          // CTRL slows down the change by 10.

          let speedFactor = 1;
          if (e.shiftKey) {
            speedFactor = 10;
          } else if (e.ctrlKey) {
            speedFactor = 0.1;
          }

          const newValue =
            startingValue + offset * orderOfMagnitude * speedFactor;

          // Round to the order of magnitude
          const roundedValue =
            Math.floor(newValue / orderOfMagnitude) * orderOfMagnitude;

          // Hack for rounding errors
          draggingValue = clampValue(
            parseFloat(roundedValue.toFixed(10)),
            min,
            max,
          );

          setEditedValue(draggingValue);

          onChange?.(draggingValue);
        }
      };

      document.addEventListener("mousemove", documentMouseMove, false);

      // Mouse up: stop dragging

      const documentMouseUp = () => {
        if (draggingValue != startingValue) {
          onChangeCommitted?.(draggingValue);
        }

        setEditedValue(undefined);

        document.removeEventListener("mousemove", documentMouseMove, false);
        document.removeEventListener("mouseup", documentMouseUp, false);
      };

      document.addEventListener("mouseup", documentMouseUp, false);

      // This callback is only useful when releasing the mouse OVER the field, so that
      // we can focus it once we're done, as this has been prevented when pressing the
      // mouse button down to initiate sliding.
      //
      // The actual "mouse up" event is handled by handleDocumentMouseUp.

      const inputMouseUp = () => {
        // Only focus the input if the value remained the same
        // (most likely case = the user hasn't dragged)

        if (draggingValue == startingValue) {
          inputRef.current?.focus();
        }

        inputRef.current?.removeEventListener("mouseup", inputMouseUp, false);
      };

      inputRef.current?.addEventListener("mouseup", inputMouseUp, false);
    },
    [min, max, onChange, onChangeCommitted],
  );

  // Render

  const transformValue = useCallback((valueStr: string) => {
    return validateNumberString(valueStr);
  }, []);

  const canSlide = !focused && !props.disabled;

  const cleanValue = valueAsNumber(
    editedValue ?? numberValue,
    undefined,
    decimals,
  );

  const formattedValue = formatNumber(cleanValue, decimals);

  const unitAdornmentElement = unit ? (
    <MUI.InputAdornment
      sx={{
        fontSize: (theme) => theme.typography.overline.fontSize,
        color: "text.secondary",
      }}
      disableTypography
      position="end"
    >
      {unit}
    </MUI.InputAdornment>
  ) : null;

  return (
    <TextInput
      {...textInputProps}
      ref={inputRef}
      inputProps={{
        sx: {
          cursor: canSlide ? "ew-resize" : "default",
        },
      }}
      endAdornment={unitAdornmentElement}
      value={formattedValue}
      transformValue={transformValue}
      onChange={change}
      onChangeCommitted={changeCommitted}
      onFocus={focus}
      onBlur={blur}
      onMouseDown={
        // Don't start sliding if focused or disabled
        !focused && !props.disabled
          ? (event) => mouseDown(event, numberValue)
          : undefined
      }
      //onMouseUp={mouseUp}
    />
  );
});

function clampValue(value: number, min?: number, max?: number) {
  return _.clamp(value, min ?? Number.MAX_VALUE, max ?? Number.MAX_VALUE);
}

function unitFactor(unit: string): number {
  switch (unit.toLowerCase()) {
    case '"':
    case "in":
    case "inch":
    case "inchs":
    case "inches":
      return 1;

    case "'":
    case "ft":
    case "feet":
    case "feets":
    case "foot":
    case "foots":
      return 0.08333333333;

    case "yd":
    case "yds":
    case "yard":
    case "yards":
      return 0.0277778;

    case "mm":
    case "millimeter":
    case "millimeters":
    case "millimetre":
    case "millimetres":
      return 25.4;

    case "cm":
    case "centimeter":
    case "centimeters":
    case "centimetre":
    case "centimetres":
      return 2.54;

    case "m":
    case "meter":
    case "meters":
    case "metre":
    case "metres":
      return 0.0254;

    default:
      console.warn(`NumberInput: unsupported unit "${unit}"`);
      return 1;
  }
}

function validateNumberString(valueStr: string): string {
  // Remove all the spaces (necessary at this step to ensure proper start and end of string)

  valueStr = valueStr.replace(/\s/g, "");

  // Normalize the decimal separators

  valueStr = valueStr.replace(/,/g, ".");

  // Remove all the dashes except at the start of the string for negative numbers

  valueStr = valueStr.replace(/(?!^)-/g, "");

  // Keep only the last occurrence of the decimal separator (e.g. in case a comma was used for thousands)

  const i = valueStr.lastIndexOf(".");
  if (i != -1) {
    valueStr =
      valueStr.substring(0, i).replace(/\./g, "") + valueStr.substring(i);
  }

  // Remove everything that is not a number, a dot or a dash

  valueStr = valueStr.replace(/[^\d.-]/g, "");

  return valueStr;
}

// Returns the numeric form of the value, with the correct amount of decimals
function valueAsNumber(
  value: number | string,
  toUnit?: string,
  decimals?: number,
): number {
  let initialValueStr = value.toString();

  let valueStr = validateNumberString(initialValueStr);
  let valueNb = Number(valueStr);

  // Extract unit, if any
  const unitMatch = initialValueStr.match(
    /("|in|inch|inches|inches|'|ft|feet|feets|foot|foots|yd|yds|yard|yards|mm|millimeter|millimeters|millimetre|millimetres|cm|centimeter|centimeters|centimetre|centimetres|m|meter|meters|metre|metres)$/g,
  );

  // Convert from one unit system to another if necessary
  if (toUnit && unitMatch) {
    // Remove prefixes (such as Skatter's "obj/m²")
    const toUnitBits = toUnit.split("/");
    toUnit = toUnitBits[toUnitBits.length - 1];

    // Check if we're dealing with a surface unit
    let isSurface = false;
    if (toUnit.endsWith("²")) {
      isSurface = true;
      toUnit = toUnit.slice(0, -1);
    }

    const fromUnit = unitMatch[0];
    const fromUnitFactor = unitFactor(fromUnit);
    const toUnitFactor = unitFactor(toUnit);

    // Could be undefined
    if (fromUnitFactor && toUnitFactor) {
      const ratio = fromUnitFactor / toUnitFactor;

      if (isSurface) {
        const side = Math.sqrt(valueNb) / ratio;
        valueNb = side * side;
      } else {
        valueNb = valueNb / ratio;
      }
    }
  }

  return Number(formatNumber(valueNb, decimals));
}

// Returns the order of magnitude by which the value will be increased when dragging
//
// For instance:
// value = 1   --> Increase by 0.1
// value = 100 --> Increase by 10
function getOrderOfMagnitude(value: number): number {
  return value == 0
    ? 1
    : Math.pow(10, Math.floor(Math.log(Math.abs(value)) / Math.LN10)) / 10;
}

// Labelled element

export type NumberElementProps = {
  textInputProps: NumberInputProps;
} & ParameterElementProps;

export const NumberElement = memo(function NumberElement(
  props: NumberElementProps,
) {
  const { textInputProps: inputProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <NumberInput
        fullWidth
        size={props.dense ? "tiny" : "medium"}
        disabled={props.disabled}
        {...props.textInputProps}
      />
    </ParameterElement>
  );
});

// Labelled element with two fields

export type NumberDuoElementProps = {
  inputProps1: NumberInputProps;
  inputProps2: NumberInputProps;

  // The linked prop is for display only
  // It prevents the second field from being editable
  // But the actual onChange logic must be handled by the parent
  linked: boolean;
  onToggleLinked: (linked: boolean) => void;
} & ParameterElementProps;

export const NumberDuoElement = memo(function NumberDuoElement(
  props: NumberDuoElementProps,
) {
  const { inputProps1, inputProps2, linked, onToggleLinked, ...elementProps } =
    props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Stack spacing={1} direction="row">
        <MUI.Box flex={1}>
          <NumberInput
            fullWidth
            size={props.dense ? "tiny" : "medium"}
            disabled={props.disabled}
            {...props.inputProps1}
          />
        </MUI.Box>

        <IconButton
          size="small"
          icon={
            <Icon
              name={props.linked ? "mdi-link" : "mdi-link-off"}
              size="tiny"
            />
          }
          onClick={() => props.onToggleLinked(!props.linked)}
        />

        <MUI.Box flex={1}>
          <NumberInput
            fullWidth
            size={props.dense ? "tiny" : "medium"}
            disabled={props.disabled || props.linked}
            {...props.inputProps2}
          />
        </MUI.Box>
      </MUI.Stack>
    </ParameterElement>
  );
});
