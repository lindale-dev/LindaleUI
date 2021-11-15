import * as MUI from '@material-ui/core';
import * as MUIIcons from '@material-ui/icons';
import React, { useState } from 'react';
import { Hue } from 'react-color/lib/components/common';
import { ColorResult, CustomPicker, CustomPickerProps, HuePicker } from 'react-color';

import { ParameterElement } from './ParameterElement';

import { ColorPicker, RGBColor } from '../../lindaleui/components/ColorPicker';
import IconButton from './IconButton';
import { useTranslation } from 'react-i18next';

// Main element

type Props =
  {
    name: string,
    value: RGBColor,
    tooltip?: string,
    onChange: (color: RGBColor) => void;
  };

const defaultProps: Partial<Props> =
{
}

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    // Hack to offset the picker's handle
    // (simpler than creating a custom picker with a custim pointer)
    huePicker: {
      '& .hue-horizontal div div': {
        transform: 'translate(-5px, -5px) !important' // half the picker's width
      }
    }
  })
);

function ColorElement(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [color, setColor] = React.useState<RGBColor>();

  React.useEffect(() => {
    setColor(props.value);
  }, [props.value]);

  const handleColorChange = (color: ColorResult) => {
    setColor(color.rgb);
  };

  const handleCommit = () => {
    if (color) {
      props.onChange(color);
    }
  };

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<Element | null>(null);

  const openColorPicker = (e: React.MouseEvent) => {
    setShowColorPicker(true);
    setColorPickerAnchor(e.currentTarget);
  };

  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  return (
    <ParameterElement
      name={props.name}
      tooltip={props.tooltip}
    >
      {/* Hue slider */}
      <MUI.Grid container direction='row' wrap='nowrap' alignItems='center'>
        <MUI.Grid item>
          <IconButton
            size={18}
            icon='mdi-palette'
            tooltip={t('objects.openPalette')}
            onClick={(e) => showColorPicker ? closeColorPicker() : openColorPicker(e)}
          />
        </MUI.Grid>

        <MUI.Grid item style={{ width: '100%', height: '100%' }}>
          <MUI.ClickAwayListener
            mouseEvent='onMouseUp'
            onClickAway={handleCommit}
          >
            {/* Padding on the left to avoid covering the icon, on the right to avoid overflow */}
            <MUI.Box paddingLeft='1rem' paddingRight='1rem' onMouseUp={handleCommit}>
              <HuePicker color={color} height='10px' width='100%' onChange={handleColorChange} className={classes.huePicker}
              />
            </MUI.Box>
          </MUI.ClickAwayListener>
        </MUI.Grid>
      </MUI.Grid>

      {/* Full color picker */}
      <ColorPicker
        open={showColorPicker}
        variant='compact'
        anchorEl={colorPickerAnchor}
        value={props.value}
        onChange={(res) => handleColorChange(res)}
        onChangeComplete={handleCommit}
        onClose={closeColorPicker}
      />
    </ParameterElement>
  )
}
ColorElement.defaultProps = defaultProps;

const memo = React.memo(ColorElement);

export default memo;
