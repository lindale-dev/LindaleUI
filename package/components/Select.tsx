// Wrapper around Material UI's Select
//
// - adds a "dense" mode for compact UIs
// - simplifies event handling (always returns string[] instead of unknown)

import React, { memo, useCallback } from 'react';
import * as MUI from '@material-ui/core';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

const useDenseSelectStyles = MUI.makeStyles((theme) =>
  MUI.createStyles({
    // The "dense" class is needed to increase CSS specificity
    // or we won't be able to override MUI's default styling
    root: {
      '.dense &': {
        fontSize: '0.75rem',
        height: theme.spacing(2.5)
      }
    },
    select: {
      '.dense &': {
        height: theme.spacing(2.5),
        lineHeight: theme.spacing(2.5),
        padding: 0,
        paddingRight: theme.spacing(2)
      }
    },
    icon: {
      '.dense &': {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        top: 0
      }
    },
    selectMenu: {
      '.dense &': {
        minWidth: 0
      }
    }
  })
);

const useDenseItemStyles = MUI.makeStyles(() =>
  MUI.createStyles({
    root: {
      '&.dense': {
        minHeight: 14,
        paddingRight: 6,
        paddingLeft: 6,
        paddingTop: 2,
        paddingBottom: 2
      }
    }
  })
);

const useDenseTextStyles = MUI.makeStyles(() =>
  MUI.createStyles({
    root: {
      '&.dense': {
        fontSize: '0.75rem',
        lineHeight: '14px'
      }
    }
  })
);

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
  dense?: boolean;

  // The change callback uses a string array to simplify event handling.
  //
  // MUI's change callback gives access to an unknown type which must be coerced
  // into a string or a string[] by each caller, which is pretty inconvenient.
  // So we do the type checking in this component and always returns an array,
  // which works for all cases (single/multiple modes).
  onChange?: (values: string[]) => void;
} & Omit<MUI.SelectProps, 'onChange'>;

export const Select = memo(function Select(props: SelectProps) {
  props = {
    dense: false,
    ...props
  };

  const denseSelectClasses = useDenseSelectStyles(props);
  const denseItemClasses = useDenseItemStyles(props);
  const denseTextClasses = useDenseTextStyles(props);

  const { dense, onChange, ...selectProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
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

  const optionElements = props.options.map((item, i) => {
    const selected = item.value === props.value;

    return (
      <MUI.MenuItem
        key={i}
        value={item.value}
        selected={selected}
        disabled={item.disabled}
        dense={props.dense}
        className={props.dense ? 'dense' : ''}
        classes={denseItemClasses}
      >
        {item.icon && <MUI.ListItemIcon>{item.icon}</MUI.ListItemIcon>}

        <MUI.ListItemText
          disableTypography
          className={props.dense ? 'dense' : ''}
          classes={denseTextClasses}
        >
          {item.label}
        </MUI.ListItemText>
      </MUI.MenuItem>
    );
  });

  return (
    <MUI.Select
      displayEmpty
      fullWidth
      MenuProps={{
        MenuListProps: {
          dense: props.dense,
          disablePadding: true
        }
      }}
      style={{ textAlign: 'left' }}
      className={props.dense ? 'dense' : ''}
      classes={denseSelectClasses}
      {...selectProps}
      onChange={handleChange}
    >
      {optionElements}
    </MUI.Select>
  );
});

export type SelectElementProps = {
  selectProps: SelectProps;
} & ParameterElementProps;

export const SelectElement = memo(function SelectElement(props: SelectElementProps) {
  const { selectProps, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <Select {...props.selectProps} dense={props.dense} disabled={props.disabled} />
    </ParameterElement>
  );
});
