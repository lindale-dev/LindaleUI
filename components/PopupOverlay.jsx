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
    return(
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: props.classes.paper, }} >
            {props.title && 
                <div className='popup-overlay-title'>
                    {props.title}
                </div>
            }
            <div className='popup-overlay-content'>
                {props.children}
            </div>
            {props.actionTitle && 
                <DialogActions>
                    <Button size={"small"} onClick={props.onClose} color="primary">
                        {props.actionTitle}
                    </Button>
                </DialogActions>
            }
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