// Base component to render a name + a control on the same row.
//
// See CheckboxElement, NumberElement, etc...

import * as MUI from "@mui/material";
import { memo } from "react";
import { Icon } from "./Icon";

export type ParameterElementProps = {
  name: React.ReactNode;
  tooltip?: string;
  info?: string;
  icon?: string; // l-icon... / mdi-...
  disabled?: boolean;
  dense?: boolean;
  actionCols?: MUI.GridProps["xs"];
  nameAlign?: "left" | "center" | "right";
  actionAlign?: "left" | "center" | "right";
} & MUI.GridProps;

export const ParameterElement = memo(function ParameterElement(
  props: ParameterElementProps,
) {
  props = {
    dense: false,
    actionCols: 6,
    disabled: false,
    nameAlign: "left",
    actionAlign: "right",
    ...props,
  };

  const theme = MUI.useTheme();

  const nameCols =
    typeof props.actionCols == "number"
      ? ((12 - props.actionCols) as MUI.GridSize)
      : false;

  const { nameAlign, actionAlign, actionCols, dense, ...gridProps } = props;

  return (
    <MUI.Tooltip title={props.tooltip ?? ""} disableInteractive>
      <MUI.Grid
        container
        direction="row"
        alignItems="center"
        style={{
          minHeight: 24,
          alignItems: "center",
        }}
        {...gridProps}
      >
        <MUI.Grid item xs={nameCols}>
          <MUI.Stack direction="row">
            {/* Icon */}

            {props.icon && (
              <MUI.Box display="flex" alignItems="center" mr={0.5}>
                <Icon
                  name={props.icon}
                  size="tiny"
                  color="default"
                  // Fix weird mis-alignment
                  style={{
                    display: "flex",
                    lineHeight: 1,
                  }}
                />
              </MUI.Box>
            )}

            {/* Name */}

            <MUI.Typography
              variant="body1"
              color={props.color}
              align={props.nameAlign}
              alignSelf="center"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: props.dense
                  ? theme.typography.body2.fontSize
                  : "default",
                opacity: props.disabled ? 0.7 : 1,
              }}
              component="div" // Suppress a hierarchy error
            >
              {props.name}
            </MUI.Typography>

            {/* Extra info */}

            {props.info && (
              <MUI.Tooltip title={props.info} disableInteractive>
                <MUI.Box // Supress error
                  mx={0.5}
                  style={{ cursor: "pointer" }}
                >
                  <Icon
                    name="mdi-information-outline"
                    size="tiny"
                    color="disabled"
                  />
                </MUI.Box>
              </MUI.Tooltip>
            )}
          </MUI.Stack>
        </MUI.Grid>

        <MUI.Grid
          item
          xs={props.actionCols}
          style={{
            textAlign: props.actionAlign,
          }}
        >
          {props.children}
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Tooltip>
  );
});
