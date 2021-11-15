import React from 'react';
import * as MUI from '@material-ui/core';

import { ChromePicker, ColorResult, RGBColor, CustomPicker, CustomPickerProps } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

export type { RGBColor };

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    pickerContainer: {
      // Hack to fix the pointer sometimes generating drag events
      // (react-color provides a "styles" prop but I cannot make it work)
      '& .saturation-white > div:nth-child(2)': {
        pointerEvents: 'none'
      }
    }
  })
);

function compactPicker(props: CustomPickerProps<any>) {
  const classes = useStyles();

  return (
    <MUI.Box width='100px' height='116px' p='8px'>
      <MUI.Box width='100%' height='84px' marginBottom='8px' position='relative' className={classes.pickerContainer}>
        <Saturation
          {...props}
          onChange={props.onChange}
        />
      </MUI.Box>

      <MUI.Box width='100%' height='8px' position='relative'>
        <Hue {...props} onChange={props.onChange} direction={'horizontal'} />
      </MUI.Box>
    </MUI.Box>
  );
}
const CompactPicker = CustomPicker(compactPicker);

type Props = {
  open: boolean;
  variant: 'chrome' | 'compact';
  value: RGBColor;

  anchorEl?: MUI.PopoverProps['anchorEl'];

  onClose: () => void;
  onChange: (color: ColorResult) => void;
  onChangeComplete: (color: RGBColor) => void;
};

const defaultProps: Partial<Props> = {
  open: false
};

export function ColorPicker(props: Props) {
  const [color, setColor] = React.useState<RGBColor>();

  React.useEffect(() => {
    setColor(props.value);
  }, [props.value]);

  const handleColorChange = (color: ColorResult) => {
    if (props.onChange) {
      props.onChange(color);
    }
    setColor(color.rgb);
  };

  const handleCommit = () => {
    if (color) {
      props.onChangeComplete(color);
    }
  };

  let picker = null;

  if (props.variant === 'compact') {
    // TODO same wrapper for chrome variant?
    picker = (
      <MUI.ClickAwayListener
        mouseEvent='onMouseUp'
        onClickAway={handleCommit}
      >
        <MUI.Box
          onMouseUp={handleCommit}
        >
          <CompactPicker
            color={color}
            onChange={handleColorChange} // we don't use onChangeComplete since it's triggered when keeping the mouse still, not when releasing the mouse button
          />
        </MUI.Box>
      </MUI.ClickAwayListener>
    );
  } else if (props.variant === 'chrome') {
    picker = (
      <ChromePicker
        disableAlpha
        color={color}
        onChange={handleColorChange}
        onChangeComplete={handleCommit}
      />
    );
  }

  return (
    <MUI.Popover
      anchorEl={props.anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.open}
      onClose={props.onClose}
    >
      {picker}
    </MUI.Popover>
  );
}
