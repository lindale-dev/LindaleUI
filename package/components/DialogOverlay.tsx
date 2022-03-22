// Simplified wrapper around a Material UI Dialog

import React, { memo } from 'react';
import * as MUI from '@material-ui/core';

export type DialogOverlayAction = {
  label: string;
  action: () => void;
  color?: MUI.PropTypes.Color;
};

export type DialogOverlayProps = {
  title?: string;
  actions?: DialogOverlayAction[];
} & MUI.DialogProps;

export const DialogOverlay = memo(function DialogOverlay(props: DialogOverlayProps) {
  const actions = (props.actions ?? []).map((entry, index) => (
    <MUI.Button key={index} onClick={entry.action} color={entry.color}>
      {entry.label}
    </MUI.Button>
  ));

  return (
    <MUI.Dialog {...props}>
      {props.title && (
        <MUI.DialogTitle disableTypography>
          <MUI.Typography variant='h5'>{props.title}</MUI.Typography>
        </MUI.DialogTitle>
      )}

      <MUI.DialogContent>{props.children}</MUI.DialogContent>

      {actions && <MUI.DialogActions>{actions}</MUI.DialogActions>}
    </MUI.Dialog>
  );
});
