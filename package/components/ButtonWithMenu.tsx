// Button with an expanding menu to select its action.
//
// Adapted from https://codesandbox.io/s/t3rjo

import React, { memo, useRef, useState } from 'react';
import * as MUI from '@material-ui/core';

import * as MUIIcons from '@material-ui/icons';

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

  const optionElements = props.options.map(
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
