// Wrapper around Material UI's button.
//
// - adds a tooltip, even if disabled
// - adds a "loading" state (MUI 5 has a LoadingButton but it cannot be customized that much)
//
// For simple cases, prefer using MUI.Button.

import React, { forwardRef, memo, useMemo, useRef, useState } from 'react';
import * as MUI from '@mui/material';
import * as MUIIcons from '@mui/icons-material';

// Button

type ButtonProps = {
  tooltip?: string;

  // 0 = indeterminate progress, otherwise show the value in [0, 100]
  loadingProgress?: number;
} & MUI.ButtonProps;

function Button_(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { tooltip, loadingProgress, ...buttonProps } = props;

  const isLoading = loadingProgress !== undefined;

  return (
    <MUI.Tooltip title={props.tooltip ?? ''}>
      {/* Wrapper so that the tooltip works, even if disabled */}
      <MUI.Box sx={{ position: 'relative' }}>
        {/* Main button */}

        <MUI.Button
          {...buttonProps}
          ref={ref}
          sx={{
            '&.MuiButton-root': {
              // Hide the text when loading
              color: isLoading ? 'transparent' : 'default'
            }
          }}
          disabled={props.disabled || isLoading}
        >
          {props.children}
        </MUI.Button>

        {/* Loading overlay */}

        {props.loadingProgress !== undefined && (
          <MUI.Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -1.5,
              marginLeft: -1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MUI.CircularProgress
              size={24}
              variant={props.loadingProgress === 0 ? 'indeterminate' : 'determinate'}
              value={props.loadingProgress}
            />

            {props.loadingProgress !== 0 && (
              <MUI.Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MUI.Typography variant='caption' component='div' color='textSecondary'>
                  {`${Math.round(props.loadingProgress)}%`}
                </MUI.Typography>
              </MUI.Box>
            )}
          </MUI.Box>
        )}
      </MUI.Box>
    </MUI.Tooltip>
  );
}

export const Button = memo(forwardRef(Button_));

// Button with an embedded menu

export type ButtonWithMenuProps = {
  options: {
    label: string;
    onClick: () => void;
  }[];

  // Immediately triggers the action when selecting an option in the menu
  immediateAction?: boolean;
} & MUI.ButtonGroupProps;

export const ButtonWithMenu = memo(function ButtonWithMenu(props: ButtonWithMenuProps) {
  props = {
    immediateAction: false,
    ...props
  };

  const { options, immediateAction, ...groupProps } = props;

  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const anchorRef = useRef<HTMLDivElement>(null);

  // Render

  const optionElements = useMemo(
    () =>
      props.options.map(
        (option, index) =>
          index !== selectedIndex && (
            <MUI.MenuItem
              key={index}
              selected={index == selectedIndex}
              onClick={() => {
                if (props.immediateAction) {
                  props.options[index].onClick();
                }

                setSelectedIndex(index);
                setExpanded(false);
              }}
            >
              {option.label}
            </MUI.MenuItem>
          )
      ),
    [props.options, props.immediateAction, selectedIndex]
  );

  return (
    <>
      <MUI.ButtonGroup {...groupProps} ref={anchorRef}>
        {/* Main part of the button: show the selected action and trigger it on click */}
        <MUI.Button onClick={() => props.options[selectedIndex].onClick()}>
          {props.options[selectedIndex].label}
        </MUI.Button>{' '}
        {/* Dropdown button */}
        <MUI.Button size='small' onClick={() => setExpanded((prevOpen) => !prevOpen)}>
          <MUIIcons.ArrowDropDown />
        </MUI.Button>
      </MUI.ButtonGroup>

      {/* Dropdown menu */}

      <MUI.Popper open={expanded} anchorEl={anchorRef.current} placement='bottom-start' transition>
        {({ TransitionProps }) => (
          <MUI.Grow {...TransitionProps}>
            <MUI.Paper>
              <MUI.ClickAwayListener onClickAway={() => setExpanded(false)}>
                <MUI.MenuList>{optionElements}</MUI.MenuList>
              </MUI.ClickAwayListener>
            </MUI.Paper>
          </MUI.Grow>
        )}
      </MUI.Popper>
    </>
  );
});
