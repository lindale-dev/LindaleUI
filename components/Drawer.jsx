import React from 'react';
import PropTypes from 'prop-types';

import MUIDrawer from '@material-ui/core/Drawer';
import './Drawer.scss';

class Drawer extends React.PureComponent
{
    constructor(props)
    {
        super(props);

        this.state = { };

        this.startPos = null;
        this.onStartResize = this.onStartResize.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }


    onStartResize(e)
    {
        e.preventDefault();
        this.startPos = e.clientX;
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseUp(e)
    {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove(e)
    {
        if(this.startPos){
            e.preventDefault();
            let diff = e.clientX - this.startPos;
            if(diff !== 0 && this.props.width + diff >= this.props.minWidth){
                this.props.onResize(this.props.width + diff);
                this.startPos = e.clientX;
            }
        }
    }

    render ()
    {
        return (
            <MUIDrawer variant="permanent"
                       PaperProps={{style:{ position: 'fixed', width: this.props.width }}}
                       className={ this.props.className }
                       classes={ this.props.classes } >
                { this.props.children }
                { this.props.resizable &&
                    <div className="drawer-resize-handle" onMouseDown={this.onStartResize} /> }
            </MUIDrawer>
        );
    }
}

Drawer.propTypes = {
    resizable: PropTypes.bool,
    onResize: PropTypes.func,
    width: PropTypes.number
};

Drawer.defaultProps = {
    resizable: false,
    width: 200,
    minWidth: 200
};

export default Drawer;
