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
  const actionElements = (props.actions ?? []).map((entry, index) => (
    <MUI.Button key={index} onClick={entry.action} color={entry.color}>
      {entry.label}
    </MUI.Button>
  ));

  // Extract the title or we'll see a native tooltip with its contents whenever
  // we hover the dialog because it will be passed down to the backing div
  const { title, actions, ...dialogProps } = props;

  return (
    <MUI.Dialog {...dialogProps}>
      {title && (
        <MUI.DialogTitle disableTypography>
          <MUI.Typography variant='h5'>{title}</MUI.Typography>
        </MUI.DialogTitle>
      )}

      <MUI.DialogContent>{props.children}</MUI.DialogContent>

      {actionElements && <MUI.DialogActions>{actionElements}</MUI.DialogActions>}
    </MUI.Dialog>
  );
});
