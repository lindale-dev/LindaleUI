import * as React from 'react';
import * as MUI from '@material-ui/core';
import classnames from 'classnames';
import { TooltipProps } from './Tooltip';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

function unitFactor(unit: string) {
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
      return undefined;
  }
}

// Returns the string form of the value, with the correct amount of decimals
function valueAsString(value: number | string, toUnit?: string, decimals?: number) {
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
  console.log(toUnit, unitFactor)
  if (toUnit && unitMatch) {
    const fromUnit = unitMatch[0];
    const fromUnitFactor = unitFactor(fromUnit);
    const toUnitFactor = unitFactor(toUnit);

    // Could be undefined
    if (fromUnitFactor && toUnitFactor) {
      const ratio = fromUnitFactor / toUnitFactor;
      valueNb = valueNb / ratio;
    }
  }

  const valueTrimmed = valueNb.toFixed(decimals || 20); // removes unwanted decimals
  return Number(valueTrimmed).toString(); // removes insignificant trailing zeros
}

// Returns the numeric form of the value, with the correct amount of decimals
function valueAsNumber(value: number | string, toUnit?: string, decimals?: number) {
  return Number(valueAsString(value, toUnit, decimals));
}

// Returns the order of magnitude by which the value will be increased when dragging
// For instance:
// value = 1   --> Increase by 0.1
// value = 100 --> Increase by 10
function getOrderOfMagnitude(value: number) {
  let om = 1;
  if (value !== 0) {
    om = Math.pow(10, Math.floor(Math.log(Math.abs(value)) / Math.LN10)) / 10;
  }
  return om;
}

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    root: {
      '&.slider': {
        cursor: 'ew-resize'
      }
    },
    input: {
      height: 18,
      padding: 0,
      fontSize: '0.75rem',
      '.slider &': {
        cursor: 'ew-resize'
      }
    },
    underline: {
      '&:after': {
        backgroundColor: theme.palette.primary.main
      }
    },
    unit: {
      fontSize: '0.6875rem',
      fontStyle: 'italic',
      color: '#757575'
    }
  })
);

type Props = {
  value: number;

  min?: number;
  max?: number;
  className?: string;
  fullWidth?: boolean;
  decimals?: number; // Max number of decimals
  disabled?: boolean;
  instantUpdate?: boolean; // Should each change of value send an update?
  unit?: string;
  tooltip?: string;
  style?: CSSProperties

  onChange?: (value: number) => void;
};

const defaultProps: Partial<Props> = {
  fullWidth: true,
  decimals: 20, // Maximum value allowed by Number.toFixed()
  disabled: false,
  instantUpdate: false,
  unit: ''
};

const NumberInput: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);

  // Focus-related state
  const [lastValidValue, setLastValidValue] = React.useState<number>(props.value);
  const [isFocused, setIsFocused] = React.useState(false);

  // Slider-related state
  const [valueBeforeDragging, setValueBeforeDragging] = React.useState<number>(0);
  const [dragging, setDragging] = React.useState(false);
  const [startMouseX, setStartMouseX] = React.useState<number | undefined>(undefined);
  const [currentMouseX, setCurrentMouseX] = React.useState<number | undefined>(undefined);
  const [orderOfMagnitude, setOrderOfMagnitude] = React.useState(1);
  const [draggingModifier, setDraggingModifier] = React.useState(1);

  const inputRef = React.useRef<any>(null);

  const clampValue = (value: number) => {
    if (props.min !== undefined) {
      value = Math.max(value, props.min);
    }
    if (props.max !== undefined) {
      value = Math.min(value, props.max);
    }
    return value;
  };

  // The value coming from the props overrides the uncontrolled input contents
  React.useEffect(() => {
    inputRef.current.value = props.value;
  }, [props.value]);

  const commitChange = React.useCallback(
    (inputValue: string) => {
      const inputNumValue = clampValue(valueAsNumber(inputValue, props.unit));

      if (inputNumValue !== lastValidValue) {
        if (props.onChange) props.onChange(inputNumValue);
        setLastValidValue(inputNumValue);
      }
    },
    [lastValidValue, props.onChange]
  );

  const instantChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Only commit the change if the value is a valid number
      // (when the field's value is an empty string)
      if (props.instantUpdate && event.target.value !== '') {
        commitChange(event.target.value);
      }
    },
    [commitChange]
  );

  const onFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setLastValidValue(valueAsNumber(event.target.value));

      // Select the content of the input, to make it easier to edit it on focus
      event.target.select();

      setIsFocused(true);
    },
    [setIsFocused, setLastValidValue, dragging]
  );

  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // For unknown reason, the event is sometimes undefined, which crashes the UI :/
      // (It seems to happens when there are updates coming from SketchUp that update the root state)
      /*if (!event)
            return;*/

      // Only commit if not in instant mode, since it should have already been done
      if (!props.instantUpdate) {
        commitChange(event.target.value);
      }

      // Reset the field if the value is not a valid number
      if (event.target.value === '') {
        inputRef.current.value = lastValidValue;
      }

      setIsFocused(false);
    },
    [commitChange, setIsFocused, dragging]
  );

  const handleDocumentMouseUp = React.useCallback(
    (e: MouseEvent) => {
      setDragging(false);
      setStartMouseX(undefined);
      setCurrentMouseX(undefined);
      setDraggingModifier(1);

      document.removeEventListener('mouseup', handleDocumentMouseUp, false);
      document.removeEventListener('mousemove', handleDocumentMouseMove, false);

      // Only commit if not in instant mode, since it should have already been done
      if (!props.instantUpdate) {
        commitChange(inputRef.current.value);
      }
    },
    [commitChange, props.instantUpdate]
  );

  const handleDocumentMouseMove = React.useCallback((e: MouseEvent) => {
    setCurrentMouseX(e.clientX);

    // Use SHIFT to change the value 10 times faster. CTRL to change it 10 times slower.
    if (e.shiftKey) {
      setDraggingModifier(10);
    } else if (e.ctrlKey) {
      setDraggingModifier(0.1);
    } else {
      setDraggingModifier(1);
    }
  }, []);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isFocused && !props.disabled) {
        setStartMouseX(e.clientX);
        setCurrentMouseX(undefined);
        setValueBeforeDragging(valueAsNumber(inputRef.current.value));
        setOrderOfMagnitude(getOrderOfMagnitude(valueAsNumber(inputRef.current.value)));
        setDraggingModifier(1);

        document.addEventListener('mouseup', handleDocumentMouseUp, false);
        document.addEventListener('mousemove', handleDocumentMouseMove, false);

        // Prevent the focus
        e.preventDefault();
      }
    },
    [handleDocumentMouseUp, handleDocumentMouseMove, isFocused, props.disabled]
  );

  const handleMouseUp = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!dragging) {
        // Focus the field since this has been prevented when clicking
        inputRef.current.focus();
      }
    },
    [dragging]
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter: commit
      if (event.key === 'Enter') {
        inputRef.current.blur();
        // The commit is actually executed in the blur callback
      }
      // Escape: restore the previous value
      else if (event.key === 'Escape') {
        inputRef.current.value = lastValidValue;
        inputRef.current.blur();
      }
    },
    [lastValidValue]
  );

  // Change the value when dragging the mouse
  React.useEffect(() => {
    if (currentMouseX && startMouseX) {
      const deltaX = currentMouseX - startMouseX;
      const offset = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / 5); // Increment offset every 5 pixel of movement

      if (offset !== 0) {
        setDragging(true);
        const newValue = Number(valueBeforeDragging) + offset * orderOfMagnitude * draggingModifier;

        // Round to the order of magnitude
        const roundedValue = Math.floor(newValue / orderOfMagnitude) * orderOfMagnitude;

        // Hack for rounding errors
        const cleanValue = clampValue(parseFloat(roundedValue.toFixed(10)));

        if (props.instantUpdate) {
          if (props.onChange) props.onChange(valueAsNumber(cleanValue));
        } else {
          inputRef.current.value = cleanValue;
        }
      }
    } else {
      setDragging(false);
    }
  }, [startMouseX, currentMouseX, valueBeforeDragging, orderOfMagnitude, draggingModifier]);

  // Add a unit adornment if requested

  const unit =
    props.unit !== '' ? (
      <MUI.InputAdornment className={classes.unit} disableTypography position='end'>
        {props.unit}
      </MUI.InputAdornment>
    ) : null;

  return (
    <MUI.Tooltip title={props.tooltip ?? ''}>
      <MUI.Input
        className={classnames(props.className, { slider: !isFocused && !props.disabled })}
        defaultValue={0}
        disabled={props.disabled}
        inputRef={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={instantChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        endAdornment={unit}
        fullWidth={props.fullWidth}
        classes={{ root: classes.root, underline: classes.underline, input: classes.input }}
        style={props.style}
      />
    </MUI.Tooltip>
  );
};
NumberInput.defaultProps = defaultProps;

export default React.memo(NumberInput);
