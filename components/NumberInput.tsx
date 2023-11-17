// Number input (actually a wrapper around our own TextInput)
//
// - adds a tooltip, even if disabled
// - adds min/max clamping
// - adds decimal precision
// - adds slider-like controls
// - supports unit conversion
// - optionally shows a unit label

import * as MUI from "@mui/material";
import React, { memo, useCallback, useRef, useState } from "react";
import { formatNumber } from "../utils/format";
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

  const [focused, setFocused] = useState(false);

  // Edited value, to be able to change it without committing.
  // Undefined while not editing.
  const [editedValue, setEditedValue] = useState<number>();

  // Callbacks

  const change = useCallback(
    (textValue: string) => {
      const value = clampValue(valueAsNumber(textValue), min, max);
      console.log("change", value, valueAsNumber(textValue), min, max);

      if (value != numberValue) {
        onChange?.(value);
      }
    },
    [max, min, numberValue, onChange],
  );

  const changeCommitted = useCallback(
    (textValue: string) => {
      const value = clampValue(valueAsNumber(textValue), min, max);
      console.log("changeCommitted", value);
      if (value != numberValue) {
        onChangeCommitted?.(value);
      }
    },
    [max, min, numberValue, onChangeCommitted],
  );

  const focus = useCallback(() => {
    setFocused(true);
  }, []);

  const blur = useCallback(() => {
    setFocused(false);
  }, []);

  // Slider-like controls

  const mouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      startingValue: number,
    ) => {
      // Start dragging

      let currentValue = startingValue;
      const startMouseX = e.clientX;
      const orderOfMagnitude = getOrderOfMagnitude(startingValue);

      // Prevent the focus (will be triggered on mouse up, if still hovering the input)

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
          currentValue = clampValue(
            parseFloat(roundedValue.toFixed(10)),
            min,
            max,
          );

          setEditedValue(currentValue);

          onChange?.(currentValue);
        }
      };

      document.addEventListener("mousemove", documentMouseMove, false);

      // Mouse up: stop dragging

      const documentMouseUp = () => {
        if (currentValue != startingValue) {
          onChangeCommitted?.(currentValue);
        }

        setEditedValue(undefined);

        document.removeEventListener("mousemove", documentMouseMove, false);
        document.removeEventListener("mouseup", documentMouseUp, false);
      };

      document.addEventListener("mouseup", documentMouseUp, false);
    },
    [min, max, onChange, onChangeCommitted],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const mouseUp = useCallback(() => {
    // This callback is only useful when releasing the mouse OVER the field, so that
    // we can focus it once that we're done, as this has been prevented when clicking.
    //
    // The actual "mouse up" event is handled by handleDocumentMouseUp.

    inputRef.current?.focus();
  }, []);

  // Render

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

  const canSlide = !focused && !props.disabled;

  const currentValue = editedValue ?? numberValue;

  const formattedValue = formatNumber(currentValue, decimals);

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
      onChange={onChange ? change : undefined}
      onChangeCommitted={onChangeCommitted ? changeCommitted : undefined}
      onFocus={focus}
      onBlur={blur}
      // Don't start sliding if focused or disabled
      onMouseDown={
        !focused && !props.disabled
          ? (event) => mouseDown(event, numberValue)
          : undefined
      }
      onMouseUp={mouseUp}
    />
  );
});

function clampValue(value: number, min?: number, max?: number) {
  if (min !== undefined) {
    value = Math.max(value, min);
  }

  if (max !== undefined) {
    value = Math.min(value, max);
  }

  return value;
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

// Returns the string form of the value, with the correct amount of decimals
function valueAsString(
  value: number | string,
  toUnit?: string,
  decimals?: number,
): string {
  let valueStr = value.toString();

  // Remove all spaces (necessary at this step to ensure proper start and end of string)
  valueStr = valueStr.replace(/\s/g, "");

  // Extract unit, if any
  const unitMatch = valueStr.match(
    /("|in|inch|inches|inches|'|ft|feet|feets|foot|foots|yd|yds|yard|yards|mm|millimeter|millimeters|millimetre|millimetres|cm|centimeter|centimeters|centimetre|centimetres|m|meter|meters|metre|metres)$/g,
  );

  // Normalize decimal separator
  valueStr = valueStr.replace(/,/g, ".");

  // Remove all dashes except at the start of the string
  valueStr = valueStr.replace(/(?!^)-/g, "");

  // Keep only the last occurence of the decimal separator (e.g. in case a comma was used for thousands)
  const i = valueStr.lastIndexOf(".");
  if (i !== -1) {
    valueStr = valueStr.substr(0, i).replace(/\./g, "") + valueStr.substr(i);
  }

  // Remove everything that is not a number, dot, or dash
  valueStr = valueStr.replace(/[^\d.-]/g, "");

  // Convert string to a number
  let valueNb = Number(valueStr);

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

  return formatNumber(valueNb, decimals);
}

// Returns the numeric form of the value, with the correct amount of decimals
function valueAsNumber(
  value: number | string,
  toUnit?: string,
  decimals?: number,
): number {
  return Number(valueAsString(value, toUnit, decimals));
}

// Returns the order of magnitude by which the value will be increased when dragging
//
// For instance:
// value = 1   --> Increase by 0.1
// value = 100 --> Increase by 10
function getOrderOfMagnitude(value: number): number {
  let om = 1;
  if (value !== 0) {
    om = Math.pow(10, Math.floor(Math.log(Math.abs(value)) / Math.LN10)) / 10;
  }
  return om;
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
} & ParameterElementProps;

export const NumberDuoElement = memo(function NumberDuoElement(
  props: NumberDuoElementProps,
) {
  const { inputProps1, inputProps2, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={6}>
          <NumberInput
            fullWidth
            size={props.dense ? "tiny" : "medium"}
            disabled={props.disabled}
            {...props.inputProps1}
          />
        </MUI.Grid>

        <MUI.Grid item xs={6}>
          <NumberInput
            fullWidth
            size={props.dense ? "tiny" : "medium"}
            disabled={props.disabled}
            {...props.inputProps2}
          />
        </MUI.Grid>
      </MUI.Grid>
    </ParameterElement>
  );
});
