// Wrapper around Material UI's Switch
//
// - adds a tooltip, even if disabled
// - simplifies event handling

import React, { memo, useCallback } from 'react';
import * as MUI from '@mui/material';

import { ParameterElement, ParameterElementProps } from './ParameterElement';

export type SwitchProps = {
  tooltip?: string;
  onChange?: (checked: boolean) => void;
} & Omit<MUI.SwitchProps, 'onChange'>;

export const Switch = memo(function Switch(props: SwitchProps) {
  const { tooltip, onChange, ...switchProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.checked),
    [onChange]
  );

  return (
    <MUI.Tooltip title={props.tooltip ?? ''} disableInteractive>
      {/* span wrapper to enable tooltips on disabled switches */}
      <span>
        <MUI.Switch {...switchProps} onChange={handleChange} />
      </span>
    </MUI.Tooltip>
  );
});

// Labelled switch

export type SwitchElementProps = {
  switchProps?: SwitchProps;
} & ParameterElementProps;

export const SwitchElement = memo(function SwitchElement(props: SwitchElementProps) {
  const { switchProps, ...elementProps } = props;

  return (
    <label style={{ width: '100%' }}>
      <ParameterElement
        sx={{ cursor: props.disabled ? undefined : 'pointer' }}
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
