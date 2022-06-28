// Wrapper around Material UI's checkbox
//
// - adds a tooltip, even if disabled
// - simplifies event handling

import React, { memo } from 'react';
import * as MUI from '@mui/material';

import { ParameterElement, ParameterElementProps } from './ParameterElement';
import { useCallback } from 'react';

export type CheckboxProps = {
  tooltip?: string;
  dense?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<MUI.CheckboxProps, 'onChange'>;

export const Checkbox = memo(function Checkbox(props: CheckboxProps) {
  const { tooltip, onChange, ...checkboxProps } = props;

  const handleChange = useCallback(
    (event: any, checked: boolean) => onChange?.(checked),
    [onChange]
  );

  return (
    <MUI.Tooltip title={tooltip ?? ''}>
      {/* span wrapper to enable tooltips on disabled checkboxes */}
      <span>
        <MUI.Checkbox
          {...checkboxProps}
          size={props.dense ? 'small' : props.size}
          sx={{ padding: props.dense ? 0.5 : undefined, ...props.sx }}
          onChange={handleChange}
        />
      </span>
    </MUI.Tooltip>
  );
});

// Labelled element

export type CheckboxElementProps = {
  checkboxProps?: CheckboxProps;
} & ParameterElementProps;

export const CheckboxElement = memo(function CheckboxElement(props: CheckboxElementProps) {
  const { checkboxProps, ...elementProps } = props;

  return (
    <label>
      <ParameterElement
        sx={{ cursor: 'pointer' }}
        // Keep most of the width for the label by default, since checkboxes are relatively compact
        actionCols={3}
        {...elementProps}
      >
        <Checkbox disabled={props.disabled} dense={props.dense} {...props.checkboxProps} />
      </ParameterElement>
    </label>
  );
});
