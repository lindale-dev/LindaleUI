// Number input (actually a wrapper around our own TextInput)
//
// - adds a tooltip, even if disabled
// - adds min/max clamping
// - adds slider-like controls
// - optionally shows a unit label
// - supports unit conversion

import { cloneDeep } from 'lodash';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as MUI from '@mui/material';

import { TextInput, TextInputProps } from './TextInput';
import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  decimals?: number;
  unit?: string;
  onChange?: (value: number) => void;
} & Omit<TextInputProps, 'value' | 'onChange'>;

export const NumberInput = memo(function NumberInput(props: NumberInputProps) {
  props = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    decimals: 20, // Maximum value allowed by Number.toFixed()
    unit: '',
    ...props
  };

  // Focus-related state
  const [lastValidValue, setLastValidValue] = useState<number>(props.value);
  const [isFocused, setIsFocused] = useState(false);

  // Slider-related state

  type DraggingData = {
    valueBeforeDragging: number;
    startMouseX: number;
    currentMouseX: number;
    orderOfMagnitude: number;
    speedFactor: number;
  };

  const [dragging, setDragging] = useState<DraggingData>();

  const inputRef = useRef<HTMLInputElement>(null);

  const { value: numberValue, decimals, unit, min, max, onChange, ...textInputProps } = props;

  // The value coming from the props overrides the uncontrolled input contents
  /*useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = formatNumber(value, decimals);
    }
  }, [value, decimals]);*/

  const clampValue = useCallback(
    (value: number) => {
      if (min !== undefined) {
        value = Math.max(value, min);
      }

      if (max !== undefined) {
        value = Math.min(value, max);
      }

      return value;
    },
    [min, max]
  );

  const onTextChange = useCallback(
    (textValue: string) => {
      console.log('number input change', textValue);
      onChange?.(valueAsNumber(textValue));
    },
    [onChange]
  );

  /*const commitChange = useCallback(
    (inputValue: string) => {
      const inputNumValue = clampValue(valueAsNumber(inputValue, unit));

      if (inputNumValue !== lastValidValue) {
        onChange?.(inputNumValue);
        setLastValidValue(inputNumValue);
      }

      // Update the input with the clamped value
      if (inputRef.current) {
        inputRef.current.value = formatNumber(inputNumValue, decimals);
      }
    },
    [lastValidValue, decimals, unit, clampValue, onChange]
  );*/

  /*const instantChange = useCallback(
    (newValue: string) => {
      // Only commit the change if the value is a valid number
      // (when the field's value is an empty string)
      if (instantUpdate && newValue !== '') {
        commitChange(newValue);
      }
    },
    [instantUpdate, commitChange]
  );*/

  const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    //setLastValidValue(valueAsNumber(event.target.value));

    // Select the content of the input, to make it easier to edit it on focus
    //event.target.select();

    setIsFocused(true);
  }, []);

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    // For unknown reason, the event is sometimes undefined, which crashes the UI :/
    // (It seems to happens when there are updates coming from SketchUp that update the root state)
    /*if (!event) {
      return;
    }*/

    // Only commit if not in instant mode, since it should have already been done
    /*if (!instantUpdate) {
        commitChange(event.target.value);
      }

      // Reset the field if the value is not a valid number
      if (event.target.value === '' && inputRef.current) {
        inputRef.current.value = formatNumber(lastValidValue, decimals);
      }*/

    setIsFocused(false);
  }, []);

  // Slider-like controls

  const handleDocumentMouseMove = useCallback((e: MouseEvent) => {
    setDragging((oldDragging) => {
      if (!oldDragging) {
        return;
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
  }, []);

  const handleDocumentMouseUp = useCallback(() => {
    setDragging(undefined);

    document.removeEventListener('mouseup', handleDocumentMouseUp, false);
    document.removeEventListener('mousemove', handleDocumentMouseMove, false);

    // Only commit if not in instant mode, otherwise it should have already been done
    if (!props.instantUpdate && inputRef.current) {
      onChange?.(valueAsNumber(inputRef.current.value));
    }
  }, [props.instantUpdate, onChange, handleDocumentMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // Already focused or disabled: don't start sliding
      if (isFocused || props.disabled) {
        return;
      }

      // Start sliding
      setDragging({
        startMouseX: e.clientX,
        currentMouseX: e.clientX,
        speedFactor: 1,
        valueBeforeDragging: inputRef.current ? valueAsNumber(inputRef.current.value) : 0,
        orderOfMagnitude: inputRef.current
          ? getOrderOfMagnitude(valueAsNumber(inputRef.current.value))
          : 1
      });

      document.addEventListener('mouseup', handleDocumentMouseUp, false);
      document.addEventListener('mousemove', handleDocumentMouseMove, false);

      // Prevent the focus
      e.preventDefault();
    },
    [isFocused, props.disabled, handleDocumentMouseUp, handleDocumentMouseMove]
  );

  const handleMouseUp = useCallback(() => {
    if (!dragging && inputRef.current) {
      // Focus the field since this has been prevented when clicking
      inputRef.current.focus();
    }
  }, [dragging]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    //   if (!inputRef.current) {
    //     return;
    //   }
    //   // Enter: commit
    //   if (event.key === 'Enter') {
    //     inputRef.current.blur();
    //     // The commit is actually executed in the blur callback
    //   }
    //   // Escape: restore the previous value
    //   else if (event.key === 'Escape') {
    //     inputRef.current.value = formatNumber(lastValidValue, decimals);
    //     inputRef.current.blur();
    //   }
  }, []);

  // React to the dragging getting updated

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const deltaX = dragging.currentMouseX - dragging.startMouseX;
    const offset = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / 5); // Increment offset every 5 pixel of movement

    if (offset !== 0) {
      const newValue =
        Number(dragging.valueBeforeDragging) +
        offset * dragging.orderOfMagnitude * dragging.speedFactor;

      // Round to the order of magnitude
      const roundedValue =
        Math.floor(newValue / dragging.orderOfMagnitude) * dragging.orderOfMagnitude;

      // Hack for rounding errors
      const cleanValue = clampValue(parseFloat(roundedValue.toFixed(10)));

      if (props.instantUpdate) {
        onChange?.(valueAsNumber(cleanValue));
      } else if (inputRef.current) {
        inputRef.current.value = formatNumber(cleanValue, decimals);
      }
    }
  }, [props.instantUpdate, decimals, dragging, clampValue, onChange]);

  // Render

  const unitAdornmentElement = props.unit ? (
    <MUI.InputAdornment
      sx={{
        fontSize: '0.6875rem',
        fontStyle: 'italic',
        color: '#757575'
      }}
      disableTypography
      position='end'
    >
      {props.unit}
    </MUI.InputAdornment>
  ) : null;

  const canSlide = !isFocused && !props.disabled;

  return (
    <TextInput
      {...textInputProps}
      InputProps={{
        sx: {
          cursor: canSlide ? 'ew-resize' : 'default'
        },
        endAdornment: unitAdornmentElement
      }}
      inputRef={inputRef}
      value={numberValue.toString()}
      onChange={onTextChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
});

function unitFactor(unit: string): number {
  switch (unit) {
    case '"':
    case 'in':
    case 'inch':
    case 'inchs':
    case 'inches':
      return 1;
    case "'":
    case 'ft':
    case 'feet':
    case 'feets':
    case 'foot':
    case 'foots':
      return 0.08333333333;
    case 'yd':
    case 'yds':
    case 'yard':
    case 'yards':
      return 0.0277778;
    case 'mm':
    case 'millimeter':
    case 'millimeters':
    case 'millimetre':
    case 'millimetres':
      return 25.4;
    case 'cm':
    case 'centimeter':
    case 'centimeters':
    case 'centimetre':
    case 'centimetres':
      return 2.54;
    case 'm':
    case 'meter':
    case 'meters':
    case 'metre':
    case 'metres':
      return 0.0254;
    default:
      throw new Error(`unsupported unit ${unit}`);
  }
}

// Formats a number in standard notation (xxxxx.yyyyyy)
function formatNumber(value: number, decimals?: number): string {
  // We use toLocaleString() instead of toFixed() to avoid getting a number in scientific notation for very large or small values
  return value
    .toLocaleString('en-US', { notation: 'standard', maximumFractionDigits: decimals || 20 })
    .replace(/,/g, ''); // Remove thousand separators
}

// Returns the string form of the value, with the correct amount of decimals
function valueAsString(value: number | string, toUnit?: string, decimals?: number): string {
  let valueStr = value.toString();

  // Remove all spaces (necessary at this step to ensure proper start and end of string)
  valueStr = valueStr.replace(/\s/g, '');

  // Extract unit, if any
  const unitMatch = valueStr.match(
    /("|in|inch|inches|inches|'|ft|feet|feets|foot|foots|yd|yds|yard|yards|mm|millimeter|millimeters|millimetre|millimetres|cm|centimeter|centimeters|centimetre|centimetres|m|meter|meters|metre|metres)$/g
  );

  // Normalize decimal separator
  valueStr = valueStr.replace(/,/g, '.');

  // Remove all dashes except at the start of the string
  valueStr = valueStr.replace(/(?!^)-/g, '');

  // Keep only the last occurence of the decimal separator (e.g. in case a comma was used for thousands)
  const i = valueStr.lastIndexOf('.');
  if (i !== -1) {
    valueStr = valueStr.substr(0, i).replace(/\./g, '') + valueStr.substr(i);
  }

  // Remove everything that is not a number, dot, or dash
  valueStr = valueStr.replace(/[^\d.-]/g, '');

  // Convert string to a number
  let valueNb = Number(valueStr);

  // Convert from one unit system to another if necessary
  if (toUnit && unitMatch) {
    // Remove prefixes (such as Skatter's "obj/m²")
    const toUnitBits = toUnit.split('/');
    toUnit = toUnitBits[toUnitBits.length - 1];

    // Check if we're dealing with a surface unit
    let isSurface = false;
    if (toUnit.endsWith('²')) {
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
function valueAsNumber(value: number | string, toUnit?: string, decimals?: number): number {
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

export const NumberElement = memo(function NumberElement(props: NumberElementProps) {
  const { textInputProps: inputProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <NumberInput
        fullWidth
        size={props.dense ? 'tiny' : 'medium'}
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

export const NumberDuoElement = memo(function NumberDuoElement(props: NumberDuoElementProps) {
  const { inputProps1, inputProps2, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={6}>
          <NumberInput
            fullWidth
            size={props.dense ? 'tiny' : 'medium'}
            disabled={props.disabled}
            {...props.inputProps1}
          />
        </MUI.Grid>

        <MUI.Grid item xs={6}>
          <NumberInput
            fullWidth
            size={props.dense ? 'tiny' : 'medium'}
            disabled={props.disabled}
            {...props.inputProps2}
          />
        </MUI.Grid>
      </MUI.Grid>
    </ParameterElement>
  );
});
