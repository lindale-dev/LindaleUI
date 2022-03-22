// Wrapper around Material UI's checkbox
//
// - adds a tooltip, even if disabled
// - simplifies event handling

import React, { memo } from 'react';
import * as MUI from '@material-ui/core';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type CheckboxProps = {
  tooltip?: string;
  onChange?: (checked: boolean) => void;
} & Omit<MUI.CheckboxProps, 'onChange'>;

export const Checkbox = memo(function Checkbox(props: CheckboxProps) {
  const { tooltip, onChange, ...checkboxProps } = props;

  return (
    <MUI.Tooltip title={tooltip ?? ''}>
      {/* span wrapper to enable tooltips on disabled checkboxes */}
      <span>
        <MUI.Checkbox {...checkboxProps} onChange={(event, checked) => onChange?.(checked)} />
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
      <ParameterElement {...elementProps} style={{ cursor: 'pointer' }}>
        <Checkbox disabled={props.disabled} {...props.checkboxProps} />
      </ParameterElement>
    </label>
  );
});
