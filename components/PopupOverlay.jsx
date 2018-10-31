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

function PopupOverlay(props){
    let actions = [];
    if (props.actions){
        props.actions.forEach(entry => {
            actions.push( <Button size={entry.size} onClick={entry.action} color={entry.color}>{entry.label}</Button> );
        });
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: props.classes.paper, }} className={props.className} fullWidth={props.fullWidth} >
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
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.object),
};

PopupOverlay.defaultProps = {
    fullWidth: false,
    open: false,
    title: "",
    actions: [],
};

export default withStyles(style)(PopupOverlay);