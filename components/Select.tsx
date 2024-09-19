// Wrapper around Material UI's Select
//
// - adds 'tiny' and 'small' sizes
// - simplifies event handling (always returns string[] instead of unknown)

import * as MUI from "@mui/material";
import _ from "lodash";
import {
  memo,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Icon } from "./Icon";
import { ParameterElement, ParameterElementProps } from "./ParameterElement";

export type SelectItemType = {
  value: string;
  label: string | React.ReactElement;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  disabled?: boolean;
  tooltip?: string;
  info?: ReactNode;
};

// Converts a Record<string, string> to a SelectItemType[]
export function mapToSelectOptions(
  data: Record<string, string>,
): SelectItemType[] {
  return Object.entries(data).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}

export type SelectProps = {
  options: SelectItemType[];
  value: string | string[];
  size?: "tiny" | "small" | "medium";
  disableGutters?: boolean;

  // The change callback uses a string array to simplify event handling.
  //
  // MUI's change callback gives access to an unknown type which must be coerced
  // into a string or a string[] by each caller, which is pretty inconvenient.
  // So we do the type checking in this component and always returns an array,
  // which works for all cases (single/multiple modes).
  onChange?: (values: string[]) => void;
} & Omit<MUI.SelectProps, "size" | "onChange">;

export const Select = memo(function Select(props: SelectProps) {
  props = {
    size: "medium",
    ...props,
  };

  const { options, size, disableGutters, onChange, ...selectProps } = props;

  const isOutlined = !selectProps.variant || selectProps.variant === "outlined";

  const handleChange = useCallback(
    (event: MUI.SelectChangeEvent<unknown>) => {
      const value = event.target.value;

      // Returned a single string: wrap in an array
      if (typeof value == "string") {
        onChange?.([value]);
      }
      // Returned an array: return it after checking types
      else if (Array.isArray(value)) {
        const values: string[] = [];
        for (const v of value) {
          if (typeof v == "string") {
            values.push(v);
          } else {
            console.error("Select: unexpected type in array");
          }
        }
        onChange?.(values);
      }
    },
    [onChange],
  );

  const optionElements = useMemo(
    () =>
      props.options.map((item) => {
        return (
          <MUI.MenuItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            dense
            sx={
              props.size == "tiny"
                ? {
                    "&.MuiMenuItem-root": {
                      fontSize: (theme) => theme.typography.body2.fontSize,
                      paddingTop: "0",
                      paddingBottom: "0",
                      paddingX: "8px",
                    },
                  }
                : null
            }
          >
            <MUI.Tooltip title={item.tooltip ?? ""} disableInteractive>
              <MUI.Stack direction="row" width={1}>
                {item.startIcon && (
                  <MUI.ListItemIcon>{item.startIcon}</MUI.ListItemIcon>
                )}

                {item.label}

                {item.endIcon && (
                  <MUI.ListItemIcon sx={{ marginLeft: 1 }}>
                    {item.endIcon}
                  </MUI.ListItemIcon>
                )}

                {item.info && (
                  <MUI.Box sx={{ flexGrow: 1, textAlign: "end" }}>
                    <MUI.Tooltip title={item.info}>
                      <span>
                        <Icon
                          name="mdi-information-outline"
                          size="tiny"
                          color="disabled"
                        />
                      </span>
                    </MUI.Tooltip>
                  </MUI.Box>
                )}
              </MUI.Stack>
            </MUI.Tooltip>
          </MUI.MenuItem>
        );
      }),
    [props.options, props.size],
  );

  // To prevent the Select from resizing when changing its value,
  // we measure the widths of all the possible labels and use the largest

  const [labelMinWidth, setLabelMinWidth] = useState<number>(0);

  const labelRefs = useRef<Record<string, HTMLSpanElement>>({}); // <option value, element>

  useLayoutEffect(() => {
    const width = Math.max(
      ...Object.values(labelRefs.current).map(
        (label) => label.getBoundingClientRect().width,
      ),
    );

    setLabelMinWidth(width);
  }, []);

  // Render

  const sxSize: MUI.SxProps =
    props.size == "tiny"
      ? {
          borderRadius: isOutlined ? "4px" : undefined,
          ".MuiSelect-select": {
            height: "20px",
            paddingTop: "1px",
            paddingBottom: 0,
            paddingLeft: isOutlined ? 1 : 0.5,
            fontSize: "0.8rem",
          },
          ".MuiSelect-outlined": {
            paddingRight: "24px !important",
          },
          ".MuiSelect-iconOutlined": {
            right: 0,
          },
        }
      : {};

  const sxGutters: MUI.SxProps = disableGutters
    ? {
        ".MuiSelect-select": {
          paddingRight: "18px !important",
          paddingLeft: "0px !important",
        },
        ".MuiSelect-icon": {
          right: "-6px",
        },
      }
    : {};

  const sx: MUI.SxProps = _.merge(sxSize, sxGutters, selectProps.sx);

  return (
    <MUI.FormControl
      size={props.size == "medium" ? "medium" : "small"}
      fullWidth={props.fullWidth}
      variant={selectProps.variant}
    >
      {selectProps.label && (
        <MUI.InputLabel>{selectProps.label}</MUI.InputLabel>
      )}

      <MUI.Select
        displayEmpty
        MenuProps={{
          MenuListProps: {
            // Keep the UI compact whatever the picked size
            dense: true,
            disablePadding: true,
          },
        }}
        {...selectProps}
        sx={sx}
        onChange={handleChange}
        renderValue={(value) => (
          <>
            {/* Actual label */}

            <MUI.Typography variant="body2" sx={{ minWidth: labelMinWidth }}>
              {props.options.find((o) => o.value == value)?.label}
            </MUI.Typography>

            {/* All the possible labels, hidden to measure their width */}

            {props.options.map((o1) => (
              <MUI.Typography
                key={o1.value}
                ref={(element) => {
                  if (element) {
                    labelRefs.current[o1.value] = element;
                  }
                }}
                variant="body2"
                sx={{
                  visibility: "hidden",
                  position: "absolute",
                }}
              >
                {props.options.find((o2) => o2.value == o1.value)?.label}
              </MUI.Typography>
            ))}
          </>
        )}
      >
        {optionElements}
      </MUI.Select>
    </MUI.FormControl>
  );
});

// Labelled select

export type SelectElementProps = {
  selectProps: SelectProps;
} & ParameterElementProps;

export const SelectElement = memo(function SelectElement(
  props: SelectElementProps,
) {
  const { selectProps, ...elementProps } = props;

  return (
    <ParameterElement actionAlign="left" {...elementProps}>
      <Select
        size={props.dense ? "tiny" : "medium"}
        fullWidth
        disabled={props.disabled}
        {...props.selectProps}
      />
    </ParameterElement>
  );
});
