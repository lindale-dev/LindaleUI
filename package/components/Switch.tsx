// Wrapper around Material UI's Switch
//
// - adds a tooltip, even if disabled
// - simplifies event handling

import React, { memo } from 'react';
import * as MUI from '@material-ui/core';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type SwitchProps = {
  tooltip?: string;
  onChange?: (checked: boolean) => void;
} & Omit<MUI.SwitchProps, 'onChange'>;

export const Switch = memo(function Switch(props: SwitchProps) {
  return (
    <MUI.Tooltip title={props.tooltip ?? ''}>
      {/* span wrapper to enable tooltips on disabled switches */}
      <span>
        <MUI.Switch {...props} onChange={(event, checked) => props.onChange?.(checked)} />
      </span>
    </MUI.Tooltip>
  );
});

// Labelled element

export type SwitchElementProps = {
  switchProps?: SwitchProps;
} & ParameterElementProps;

export const SwitchElement = memo(function SwitchElement(props: SwitchElementProps) {
  const { switchProps, ...elementProps } = props;

  return (
    <label>
      <ParameterElement
        style={{ cursor: 'pointer' }}
        // Keep most of the width for the label by default, since switches are relatively compact
        actionCols={3}
        {...elementProps}
      >
        <Switch
          size={props.dense ? 'small' : 'medium'}
          disabled={props.disabled}
          {...props.switchProps}
        />
      </ParameterElement>
    </label>
  );
});
