import React from 'react';
import PropTypes from 'prop-types';
import * as MUI from '@material-ui/core';

import './PopupOverlay.scss'

const style = {
    paper: {
        margin: 16,
    },
};

function PopupOverlay(props)
{
    let actions = [];

    if (props.actions)
    {
        props.actions.forEach(entry => {
            actions.push(
                <MUI.Button
                    size={entry.size}
                    onClick={entry.action}
                    color={entry.color}
                    key={entry.label}
                >
                    { entry.label }
                </MUI.Button>
            );
        });
    }

    return (
        <MUI.Dialog
            open={props.open}
            onClose={props.onClose}
            classes={{ paper: props.classes.paper, }}
            className={props.className}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            disableBackdropClick={props.disableBackdropClick}
            disableEscapeKeyDown={props.disableEscapeKeyDown}
        >

            { props.title &&
                <div className='popup-overlay-title'>
                    {props.title}
                </div>
            }

            <div className='popup-overlay-content'>
                {props.children}
            </div>

            { props.actions &&
                <MUI.DialogActions>
                    { actions }
                </MUI.DialogActions>
            }

        </MUI.Dialog>
    )
}

PopupOverlay.propTypes = {
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.object),
    disableBackdropClick: PropTypes.bool,
    disableEscapeKeyDown: PropTypes.bool
};

PopupOverlay.defaultProps = {
    fullWidth: false,
    maxWidth: false,
    open: false,
    title: "",
    actions: [],
    disableBackdropClick: false,
    disableEscapeKeyDown: false
};

export default MUI.withStyles(style)(React.memo(PopupOverlay));
