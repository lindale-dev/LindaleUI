// Wrapper around Material UI's checkbox
//
// - adds a tooltip, even if disabled
// - simplifies event handling

import * as MUI from "@mui/material";
import { memo } from "react";

import { useCallback } from "react";
import { ParameterElement, ParameterElementProps } from "./ParameterElement";

export type CheckboxProps = {
  tooltip?: string;
  dense?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<MUI.CheckboxProps, "onChange">;

export const Checkbox = memo(function Checkbox(props: CheckboxProps) {
  const { tooltip, onChange, dense, ...checkboxProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      onChange?.(checked, event),
    [onChange],
  );

  return (
    <MUI.Tooltip title={tooltip ?? ""} disableInteractive>
      {/* span wrapper to enable tooltips on disabled checkboxes */}
      <span>
        <MUI.Checkbox
          {...checkboxProps}
          size={dense ? "small" : props.size}
          sx={{ padding: dense ? 0.5 : undefined, ...props.sx }}
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

export const CheckboxElement = memo(function CheckboxElement(
  props: CheckboxElementProps,
) {
  const { checkboxProps, ...elementProps } = props;

  return (
    <label>
      <ParameterElement
        sx={{ cursor: "pointer" }}
        // Keep most of the width for the label by default, since checkboxes are relatively compact
        actionCols={3}
        {...elementProps}
      >
        <Checkbox
          disabled={props.disabled}
          dense={props.dense}
          {...props.checkboxProps}
        />
      </ParameterElement>
    </label>
  );
});
