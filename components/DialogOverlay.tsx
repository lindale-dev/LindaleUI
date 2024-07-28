// Simplified wrapper around a Material UI Dialog

import * as MUI from "@mui/material";
import { memo, useMemo } from "react";

export type DialogOverlayAction = {
  label: string;
  action: () => void;
  color?: MUI.ButtonProps["color"];
  variant?: MUI.ButtonProps["variant"];
  size?: MUI.ButtonProps["size"];
  disabled?: boolean;
};

export type DialogOverlayProps = {
  title?: string;
  titleIcon?: string;
  actions?: DialogOverlayAction[];
  closeOnBackdropClick?: boolean;
} & MUI.DialogProps;

export const DialogOverlay = memo(function DialogOverlay(
  props: DialogOverlayProps,
) {
  // NOTE: it's especially important to extract the title or we'll see
  // a native tooltip with its contents whenever we hover the dialog
  // because it will be passed down to the backing div
  const { title, titleIcon, actions, ...dialogProps } = props;

  const actionElements = useMemo(
    () =>
      (props.actions ?? []).map((action, actionIndex) => (
        <MUI.Button
          key={actionIndex}
          onClick={action.action}
          color={action.color}
          variant={action.variant}
          size={action.size}
          disableElevation
          disabled={action.disabled}
        >
          {action.label}
        </MUI.Button>
      )),
    [props.actions],
  );

  return (
    <MUI.Dialog {...dialogProps}>
      {title && (
        <MUI.DialogTitle color="primary.main">
          <MUI.Stack direction="row" alignItems="center">
            {titleIcon && (
              <MUI.Avatar
                variant="square"
                src={titleIcon}
                sx={{ marginRight: 2 }}
              />
            )}
            {title}
          </MUI.Stack>
        </MUI.DialogTitle>
      )}

      <MUI.DialogContent>{props.children}</MUI.DialogContent>

      {actionElements.length > 0 && (
        <MUI.DialogActions>{actionElements}</MUI.DialogActions>
      )}
    </MUI.Dialog>
  );
});
