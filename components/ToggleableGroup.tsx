// Container with a header that can expand to reveal its contents when enabled.

import * as MUI from "@mui/material";
import { memo, useCallback } from "react";
import { SwitchElement } from "./Switch";

export type ToggleableGroupProps = {
  name: string;
  open: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (opened: boolean) => void;
};

export const ToggleableGroup = memo(function ToggleableGroup(
  props: ToggleableGroupProps,
) {
  props = {
    disabled: false,
    ...props,
  };

  const { onChange } = props;

  const handleChange = useCallback(
    (checked: boolean) => onChange?.(checked),
    [onChange],
  );

  return (
    <MUI.Box>
      <MUI.Box>
        <SwitchElement
          name={props.name}
          switchProps={{
            checked: props.open,
            disabled: props.disabled,
            onChange: handleChange,
          }}
        />
      </MUI.Box>

      {props.open && props.children && (
        <MUI.Box padding="0px 4px">{props.children}</MUI.Box>
      )}
    </MUI.Box>
  );
});
