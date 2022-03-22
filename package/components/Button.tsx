// Wrapper around Material UI's button.
//
// - adds a tooltip, even if disabled
// - adds a "loading" state
//
// For other cases, prefer using MUI.Button.

import React, { forwardRef, memo, useMemo, useRef, useState } from 'react';
import * as MUI from '@material-ui/core';
import * as MUIIcons from '@material-ui/icons';

// Button

const useStyles = MUI.makeStyles(() =>
  MUI.createStyles({
    hiddenButtonLabel: {
      visibility: 'hidden'
    }
  })
);

type ButtonProps = {
  tooltip?: string;

  // 0 = indeterminate progress, otherwise show the value in [0, 100]
  loadingProgress?: number;
} & MUI.ButtonProps;

function Button_(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  const classes = useStyles(props);

  const isLoading = props.loadingProgress !== undefined;

  const { tooltip, loadingProgress, ...buttonProps } = props;

  return (
    <MUI.Tooltip title={props.tooltip ?? ''}>
      {/* Wrapper so that the tooltip works, even if disabled */}
      <MUI.Box style={{ position: 'relative' }}>
        {/* Main button */}

        <MUI.Button
          ref={ref}
          {...buttonProps}
          classes={{
            label: isLoading ? classes.hiddenButtonLabel : undefined
          }}
          disabled={props.disabled || isLoading}
        >
          {props.children}
        </MUI.Button>

        {/* Loading overlay */}

        {props.loadingProgress !== undefined && (
          <MUI.Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
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
                style={{
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
                <MUI.Typography
                  variant='caption'
                  component='div'
                  color='textSecondary'
                >{`${Math.round(props.loadingProgress)}%`}</MUI.Typography>
              </MUI.Box>
            )}
          </MUI.Box>
        )}
      </MUI.Box>
    </MUI.Tooltip>
  );
}

export const Button = memo(forwardRef(Button_));

// Button with embedded menu

export type ButtonWithMenuOption = {
  label: string;
  onClick: () => void;
};

export type ButtonWithMenuProps = {
  options: ButtonWithMenuOption[];

  // Immediately triggers the action when selecting an option in the menu
  immediateAction?: boolean;
};

export const ButtonWithMenu = memo(function ButtonWithMenu(props: ButtonWithMenuProps) {
  props = {
    immediateAction: false,
    ...props
  };

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
      <MUI.ButtonGroup ref={anchorRef}>
        {/* Main part of the button: show the selected action and trigger it on click */}

        <MUI.Button onClick={() => props.options[selectedIndex].onClick()}>
          {props.options[selectedIndex].label}
        </MUI.Button>

        {/* Dropdown button */}

        <MUI.Button size='small' onClick={() => setExpanded((prevOpen) => !prevOpen)}>
          <MUIIcons.ArrowDropDown />
        </MUI.Button>
      </MUI.ButtonGroup>

      {/* Dropdown menu */}

      <MUI.Popper
        open={expanded}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement='bottom-start'
      >
        {({ TransitionProps }) => (
          <MUI.Grow {...TransitionProps}>
            <MUI.ClickAwayListener onClickAway={() => setExpanded(false)}>
              <MUI.Paper>
                <MUI.MenuList>{optionElements}</MUI.MenuList>
              </MUI.Paper>
            </MUI.ClickAwayListener>
          </MUI.Grow>
        )}
      </MUI.Popper>
    </>
  );
});
