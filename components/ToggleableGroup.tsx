// Container with a header that can expand to reveal its contents when enabled.

import { memo, useCallback } from "react";
import { Box } from "./Box";

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
    <Box>
      <Box>
        <SwitchElement
          name={props.name}
          switchProps={{
            checked: props.open,
            disabled: props.disabled,
            onChange: handleChange,
          }}
        />
      </Box>

      {props.open && props.children && (
        <Box padding="0px 4px">{props.children}</Box>
      )}
    </Box>
  );
});
