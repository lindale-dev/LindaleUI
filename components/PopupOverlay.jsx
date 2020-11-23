import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

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
            actions.push(<Button
                size={entry.size}
                onClick={entry.action}
                color={entry.color}
                key={entry.label}
            >
                { entry.label }
            </Button>);
        });
    }

    return(
        <Dialog
            open={props.open}
            onClose={props.onClose}
            classes={{ paper: props.classes.paper, }}
            className={props.className}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            disableBackdropClick={props.disableBackdropClick}
            disableEscapeKeyDown={props.disableEscapeKeyDown}
        >

            {props.title &&
                <div className='popup-overlay-title'>
                    {props.title}
                </div>
            }

            <div className='popup-overlay-content'>
                {props.children}
            </div>

            {props.actions &&
                <DialogActions>
                    { actions }
                </DialogActions>
            }

        </Dialog>
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

export default withStyles(style)(React.memo(PopupOverlay));
