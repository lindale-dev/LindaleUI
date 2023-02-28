// Simplified wrapper around a Material UI Dialog

import React, { memo } from 'react';
import * as LUI from 'lindale-ui';
import * as MUI from '@mui/material';

export type DialogOverlayAction = {
  label: string;
  action: () => void;
  color?: MUI.ButtonProps['color'];
  disabled?: boolean;
};

export type DialogOverlayProps = {
  title?: string;
  actions?: DialogOverlayAction[];
  closeOnBackdropClick?: boolean;
} & MUI.DialogProps;

export const DialogOverlay = memo(function DialogOverlay(props: DialogOverlayProps) {
  const actionElements = (props.actions ?? []).map((action, actionIndex) => (
    <MUI.Button
      key={actionIndex}
      onClick={action.action}
      color={action.color}
      disabled={action.disabled}
    >
      {action.label}
    </MUI.Button>
  ));

  // NOTE: it's especially important to extract the title or we'll see
  // a native tooltip with its contents whenever we hover the dialog
  // because it will be passed down to the backing div
  const { title, actions, ...dialogProps } = props;

  return (
    <MUI.Dialog {...dialogProps}>
      {title && <MUI.DialogTitle color='primary.main'>{title}</MUI.DialogTitle>}

      <MUI.DialogContent>{props.children}</MUI.DialogContent>

      {actionElements && actionElements.length > 0 && (
        <MUI.DialogActions>{actionElements}</MUI.DialogActions>
      )}

      {props.onClose && (
        <LUI.IconButton
          icon={<LUI.Icon name='mdi-close' size='tiny' />}
          sx={{
            position: 'absolute',
            right: (theme) => theme.spacing(1),
            top: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.grey[500],
            padding: 0.25
          }}
          onClick={() => props.onClose && props.onClose({}, 'backdropClick')}
        />
      )}
    </MUI.Dialog>
  );
});
