// File input element

import * as MUI from "@mui/material";
import { memo } from "react";

import { Icon, IconButton } from "./Icon";
import { ParameterElement, ParameterElementProps } from "./ParameterElement";
import { TextInput } from "./TextInput";

export type BrowseFileElementProps = {
  value?: string;
  buttonTooltip?: string;
  onBrowse?: () => void;
  onClear?: () => void;

  // It's the responsibility of the parent to check if selected files exist
  // because the implementation depends on the context (Electron app, C++ addon...).
  fileNotFound?: boolean;
} & ParameterElementProps;

export const BrowseFileElement = memo(function BrowseFileElement(
  props: BrowseFileElementProps,
) {
  props = {
    fileNotFound: false,
    ...props,
  };

  const {
    value,
    buttonTooltip,
    fileNotFound,
    onBrowse,
    onClear,
    ...elementProps
  } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Stack direction="row" alignItems="center" spacing={0.5}>
        {/* Path field */}

        <TextInput
          disabled={true}
          value={value ?? ""}
          tooltip={fileNotFound ? "File not found" : ""}
          size={elementProps.dense ? "tiny" : "medium"}
          fullWidth
          variant="outlined"
          sx={{
            backgroundColor: props.fileNotFound ? "#ffd69b" : "initial",
            input: {
              width: "100%",
              // Aligns text to the right to make it easier to read the filename at the end of a long path
              direction: "rtl",
              textOverflow: "ellipsis",
            },
          }}
          endAdornment={
            props.value &&
            props.value != "" &&
            props.onClear && (
              <IconButton
                icon={<Icon name="mdi-close" size="tiny" />}
                size="small"
                style={{ padding: 0 }}
                disabled={props.disabled}
                onClick={props.onClear}
              />
            )
          }
        />

        {/* Browse button */}

        <IconButton
          tooltip={buttonTooltip}
          icon={
            <Icon
              name={props.value ? "mdi-folder" : "mdi-folder-outline"}
              size={elementProps.dense ? "tiny" : "small"}
              color={
                props.disabled
                  ? "disabled"
                  : props.value
                    ? "primary"
                    : "default"
              }
            />
          }
          size="small"
          disabled={props.disabled}
          onClick={props.onBrowse}
          sx={{ marginRight: "-5px" }}
        />
      </MUI.Stack>
    </ParameterElement>
  );
});
