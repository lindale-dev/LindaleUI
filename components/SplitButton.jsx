// Code from https://codesandbox.io/s/t3rjo

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

function SplitButton(props)
{
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const anchorRef = React.useRef(null);

    const handleClick = () =>
    {
        props.options[selectedIndex].onClick();
    };

    const handleOptionChange = (event, index, commitNow = false) =>
    {
        if (commitNow)
        {
            props.options[index].onClick();
        }

        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () =>
    {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) =>
    {
        if (anchorRef.current && anchorRef.current.contains(event.target))
        {
            return;
        }

        setOpen(false);
    };

    return <>
        <ButtonGroup
            ref={anchorRef}
        >

            <Button onClick={handleClick}>
                {props.options[selectedIndex].label}
            </Button>

            <Button
                size="small"
                onClick={handleToggle}
            >
                <ArrowDropDownIcon />
            </Button>

        </ButtonGroup>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >

                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>

                            <MenuList
                                id="split-button-menu">
                                {props.options.map((option, index) =>

                                    props.showSelectedOption || index !== selectedIndex ?
                                        <MenuItem
                                            key={index}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleOptionChange(event, index, props.commitOnChange)}
                                        >

                                            {option.label}

                                        </MenuItem> :
                                        null
                                )}
                            </MenuList>

                        </ClickAwayListener>
                    </Paper>

                </Grow>
            )}
        </Popper>
    </>;
}

SplitButton.propTypes =
{
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ).isRequired,

    // Immediately commit when switching to another option
    commitOnChange: PropTypes.bool,

    // Also show the selected option in the dropdown
    showSelectedOption: PropTypes.bool,

    size: PropTypes.string, // TODO when TS: size?: 'small' | 'medium' | 'large';
    variant: PropTypes.string
};

SplitButton.defaultProps =
{
    commitOnClick: false,
    showSelectedOption: true
}

export default SplitButton;
