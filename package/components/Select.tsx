// Wrapper around Material UI's Select
//
// - adds 'tiny' and 'small' sizes
// - simplifies event handling (always returns string[] instead of unknown)

import React, { memo, useCallback, useMemo } from 'react';
import * as MUI from '@mui/material';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type SelectItemType = {
  value: string;
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
};

// Converts a Record<string, string> to a SelectItemType[]
export function mapToSelectOptions(data: Record<string, string>): SelectItemType[] {
  return Object.entries(data).map(([key, value]) => ({ value: key, label: value }));
}

export type SelectProps = {
  options: SelectItemType[];
  value: string | string[];
  size?: 'tiny' | 'small' | 'medium';

  // The change callback uses a string array to simplify event handling.
  //
  // MUI's change callback gives access to an unknown type which must be coerced
  // into a string or a string[] by each caller, which is pretty inconvenient.
  // So we do the type checking in this component and always returns an array,
  // which works for all cases (single/multiple modes).
  onChange?: (values: string[]) => void;
} & Omit<MUI.SelectProps, 'size' | 'onChange'>;

export const Select = memo(function Select(props: SelectProps) {
  props = {
    size: 'medium',
    ...props
  };

  const { options, size, onChange, ...selectProps } = props;

  const handleChange = useCallback(
    (event: MUI.SelectChangeEvent<unknown>) => {
      const value = event.target.value;

      // Returned a single string: wrap in an array
      if (typeof value == 'string') {
        onChange?.([value]);
      }
      // Returned an array: return it after checking types
      else if (Array.isArray(value)) {
        const values: string[] = [];
        for (const v of value) {
          if (typeof v == 'string') {
            values.push(v);
          } else {
            console.error('Select: unexpected type in array');
          }
        }
        onChange?.(values);
      }
    },
    [onChange]
  );

  const optionElements = useMemo(
    () =>
      props.options.map((item) => {
        return (
          <MUI.MenuItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            dense
            sx={
              props.size == 'tiny'
                ? {
                    '&.MuiMenuItem-root': {
                      fontSize: '0.75rem',
                      paddingTop: '0',
                      paddingBottom: '0'
                    }
                  }
                : null
            }
          >
            <MUI.Stack direction='row' alignItems='baseline'>
              {item.icon && <MUI.ListItemIcon>{item.icon}</MUI.ListItemIcon>}
              {item.label}
            </MUI.Stack>
          </MUI.MenuItem>
        );
      }),
    [props.options, props.size]
  );

  return (
    <MUI.FormControl
      size={props.size == 'medium' ? 'medium' : 'small'}
      fullWidth={props.fullWidth}
      variant={selectProps.variant}
    >
      <MUI.Select
        displayEmpty
        MenuProps={{
          MenuListProps: {
            // Keep the UI compact whatever the picked size
            dense: true,
            disablePadding: true
          }
        }}
        sx={
          props.size == 'tiny'
            ? {
                '.MuiSelect-select': {
                  paddingTop: 0,
                  paddingBottom: 0,
                  fontSize: '0.75rem'
                }
              }
            : null
        }
        {...selectProps}
        onChange={handleChange}
      >
        {optionElements}
      </MUI.Select>
    </MUI.FormControl>
  );
});

// Labelled select

export type SelectElementProps = {
  selectProps: SelectProps;
} & ParameterElementProps;

export const SelectElement = memo(function SelectElement(props: SelectElementProps) {
  const { selectProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <Select
        size={props.dense ? 'tiny' : 'medium'}
        fullWidth
        disabled={props.disabled}
        {...props.selectProps}
      />
    </ParameterElement>
  );
});