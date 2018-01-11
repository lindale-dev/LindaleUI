import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle,
       } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

import './PopupOverlay.scss'

const style = {
    paper: {
        margin: 16,
    },
};

function PopupOverlay(props){
    return(
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: props.classes.paper, }} >
            <div className='popup-overlay-title'>
                {props.title}
            </div>
            <div className='popup-overlay-content'>
                {props.children}
                TODO: Help GIFs
            </div>
            <DialogActions>
                <Button dense onClick={props.onClose} color="primary">
                    {props.actionTitle}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

PopupOverlay.propTypes = {
    open: PropTypes.bool.isRequiered,
    onClose: PropTypes.func.isRequiered,
    title: PropTypes.string,
    actionTitle: PropTypes.string,
};

export default withStyles(style)(PopupOverlay);