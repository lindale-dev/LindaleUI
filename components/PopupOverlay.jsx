import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle,
       } from 'material-ui/Dialog';

function PopupOverlay(props){
    return(
        <Dialog open={props.open} onClose={props.onClose} >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
                TODO: Help GIFs
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
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

export default PopupOverlay;