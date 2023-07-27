// Number input (actually a wrapper around our own TextInput)
//
// - adds a tooltip, even if disabled
// - adds min/max clamping
// - adds decimal precision
// - adds slider-like controls
// - supports unit conversion
// - optionally shows a unit label

import * as MUI from "@mui/material";
import { cloneDeep } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";

import { ParameterElement, ParameterElementProps } from "./ParameterElement";
import { TextInput, TextInputProps } from "./TextInput";

export type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  decimals?: number;
  unit?: string; // TODO constrain?
  indeterminate?: boolean;
  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
} & Omit<TextInputProps, "value" | "instantUpdate" | "onChange">;

export const NumberInput = memo(function NumberInput(props: NumberInputProps) {
  props = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    decimals: 20, // Maximum value allowed by Number.toFixed()
    unit: "",
    ...props,
  };

  const {
    value: numberValue,
    decimals,
    unit,
    min,
    max,
    onChange,
    onChangeCommitted,
    ...textInputProps
  } = props;

  // Focus-related state

  const [lastValidValue, setLastValidValue] = useState<number>(props.value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLastValidValue(numberValue);
  }, [numberValue]);

  // Slider-related state

  type DraggingData = {
    valueBeforeDragging: number;
    startMouseX: number;
    currentMouseX: number;
    orderOfMagnitude: number;
    speedFactor: number;
  };

  const [draggingData, setDraggingData] = useState<DraggingData>();

  // Helpers

  const handleTextChange = useCallback(
    (textValue: string) => {
      const value = valueAsNumber(textValue);

      if (value != props.value) {
        onChangeCommitted?.(value);
      }
    },
    [onChangeCommitted, props.value],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Slider-like controls

  useEffect(() => {
    // NOTE: we use long-running event listeners that only do work when the slider in being dragged
    // in order to avoid bugs related to closures referencing old data (eg. old lastValidValue
    // closed on when attaching the listener on the initial mount).

    // Mouse move: update the dragged value

    const handleDocumentMouseMove = (e: MouseEvent) => {
      setDraggingData((oldDragging) => {
        // Do nothing if not dragging

        if (!oldDragging) {
          return undefined;
        }

        const newDragging = cloneDeep(oldDragging);

        newDragging.currentMouseX = e.clientX;

        // SHIFT speeds ups the change by 10.
        // CTRL slows down the change by 10.

        if (e.shiftKey) {
          newDragging.speedFactor = 10;
        } else if (e.ctrlKey) {
          newDragging.speedFactor = 0.1;
        } else {
          newDragging.speedFactor = 1;
        }

        return newDragging;
      });
    };

    // Mouse up: stop dragging

    const handleDocumentMouseUp = () => {
      if (lastValidValue != props.value) {
        onChangeCommitted?.(lastValidValue);
      }

      setDraggingData(undefined);
    };

    if (!draggingData) {
      return;
    }

    // Attach & Detach

    document.addEventListener("mouseup", handleDocumentMouseUp, false);
    document.addEventListener("mousemove", handleDocumentMouseMove, false);

    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp, false);
      document.removeEventListener("mousemove", handleDocumentMouseMove, false);
    };
  }, [draggingData, lastValidValue, onChangeCommitted, props.value]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // Already focused or disabled: don't start sliding

      if (isFocused || props.disabled) {
        return;
      }

      // Start sliding

      setDraggingData({
        startMouseX: e.clientX,
        currentMouseX: e.clientX,
        speedFactor: 1,
        valueBeforeDragging: lastValidValue,
        orderOfMagnitude: getOrderOfMagnitude(valueAsNumber(lastValidValue)),
      });

      // Prevent the focus (will be done on mouse up, if still hovering the input)
      e.preventDefault();
    },
    [isFocused, props.disabled, lastValidValue],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      // This callback is only useful when releasing the mouse OVER the field, so that
      // we can focus it now that we're done, as this has been prevented when clicking.
      //
      // The actual "mouse up" event is handled by handleDocumentMouseUp.

      if (draggingData) {
        const input = event.currentTarget.querySelector("input");
        if (input) {
          input.focus();
        }
      }
    },
    [draggingData],
  );

  // React to the dragging getting updated

  useEffect(() => {
    if (!draggingData) {
      return;
    }

    const deltaX = draggingData.currentMouseX - draggingData.startMouseX;
    const offset = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / 5); // Increment offset every 5 pixel of movement

    if (offset !== 0) {
      const newValue =
        Number(draggingData.valueBeforeDragging) +
        offset * draggingData.orderOfMagnitude * draggingData.speedFactor;

      // Round to the order of magnitude
      const roundedValue =
        Math.floor(newValue / draggingData.orderOfMagnitude) *
        draggingData.orderOfMagnitude;

      // Hack for rounding errors
      const cleanValue = clampValue(
        parseFloat(roundedValue.toFixed(10)),
        min,
        max,
      );

      setLastValidValue(cleanValue);

      onChange?.(valueAsNumber(cleanValue));
    }
  }, [decimals, draggingData, onChange, min, max, lastValidValue]);

  // Render

  const unitAdornmentElement = props.unit ? (
    <MUI.InputAdornment
      sx={{
        fontSize: "0.6875rem", // TODO why this value?
        color: "text.secondary",
      }}
      disableTypography
      position="end"
    >
      {props.unit}
    </MUI.InputAdornment>
  ) : null;

  const canSlide = !isFocused && !props.disabled;

  const currentValue = draggingData ? lastValidValue : numberValue;

  const formattedValue = formatNumber(currentValue, decimals);

  return (
    <TextInput
      {...textInputProps}
      inputProps={{
        className: canSlide ? "canSlide" : "",
        sx: {
          "&.canSlide": {
            cursor: "ew-resize",
          },
        },
      }}
      endAdornment={unitAdornmentElement}
      value={formattedValue}
      onChange={handleTextChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
      throw new Error(`unsupported unit ${unit}`);
  }
}

// Formats a number in standard notation (xxxxx.yyyyyy)
function formatNumber(value: number, decimals?: number): string {
  // We use toLocaleString() instead of toFixed() to avoid getting a number in scientific notation for very large or small values
  return value
    .toLocaleString("en-US", {
      notation: "standard",
      maximumFractionDigits: decimals || 20,
    })
    .replace(/,/g, ""); // Remove thousand separators
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
