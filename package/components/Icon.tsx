import classnames from 'classnames';
import React, { forwardRef, memo } from 'react';
import * as MUI from '@mui/material';

// Icon from Material Design / our custom icon set.
//
// This component only serves a visual purpose.
// To add interactivity, use <IconButton> like so:
//
// <IconButton icon={<Icon .../>} onClick={...} />

import '@mdi/font/css/materialdesignicons.min.css'; // Material Design icons
import '../icons/LindaleIcons.css'; // Our custom icons

type IconSize = 'tiny' | 'small' | 'medium' | 'large';
type TextColor = 'primary' | 'secondary' | 'disabled' | 'default' | 'inherit';

export type IconProps = {
  name: string;
  tooltip?: string;
  size?: IconSize;
  color?: TextColor;
  style?: React.CSSProperties; // For custom colors, use style.color
};

export const Icon = memo(function Icon(props: IconProps) {
  const size = props.size ?? 'medium';
  const color = props.color ?? 'inherit';

  const theme = MUI.useTheme();

  // Convert the optional symbolic color to a real color value
  // (props.color overrides any color passed via props.style)

  const colors: Record<TextColor, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    disabled: theme.palette.text.disabled,
    default: theme.palette.text.secondary,
    inherit: 'inherit'
  };

  const style = { color: colors[color], ...props.style }; // style.color has priority

  // Convert the optional symbolic font size to a real value
  // (the sizes match Material UI)

  const fontSizes: Record<IconSize, string> = {
    tiny: '1rem', // This one is new
    small: '1.25rem',
    medium: '1.5rem',
    large: '2.1875rem'
  };

  style['fontSize'] = fontSizes[size];

  // Use the correct library depending on the icon prefix
  //  LindaleIcons:  "l-icon-"
  //  Material Design Icons: "mdi-""

  let iconClass;
  if (props.name.startsWith('l-icon-')) {
    iconClass = 'l-icon';
  } else if (props.name.startsWith('mdi-')) {
    iconClass = 'mdi';
  } else {
    console.error(`Icon: Unknown icon library for "${props.name}"`);
    return <i>❌</i>;
  }

  // Needed to obtain correct dimensions and match Material-UI

  style['width'] = '1em';
  style['height'] = '1em';

  return (
    <MUI.Tooltip title={props.tooltip ?? ''} disableInteractive>
      <i className={classnames(iconClass, props.name)} style={style} />
    </MUI.Tooltip>
  );
});

// Wrapper around a Material UI IconButton
//
// - accepts any kind of icon element
// - adds support for tooltips, even if disabled

export type IconButtonProps = {
  icon: React.ReactElement;
  tooltip?: string;
} & MUI.IconButtonProps;

function IconButton_(props: IconButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  return (
    <MUI.Tooltip title={props.tooltip ?? ''} disableInteractive>
      {/* span needed for the tooltip to work on disabled icons */}
      <span>
        <MUI.IconButton {...props} ref={ref}>
          {props.icon}
        </MUI.IconButton>
      </span>
    </MUI.Tooltip>
  );
}

export const IconButton = memo(forwardRef(IconButton_));
