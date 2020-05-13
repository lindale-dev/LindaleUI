import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';

import Tooltip from './Tooltip';
import './ParameterElement.scss';

function ParameterElement(props)
{
    return(
        <Tooltip title={props.tooltip}>
            <Grid container spacing={0} alignItems='center' className={'parameter-element '+props.className}>
                <Grid item xs={12-props.actionCols} className='parameter-element-name'>
                    {props.name}
                </Grid>
                <Grid item xs={props.actionCols} className={classnames('parameter-element-action', {right: props.right, center: props.center})}>
                    {props.children}
                </Grid>
            </Grid>
        </Tooltip>
    )
}

ParameterElement.propTypes = {
    actionCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    right: PropTypes.bool,
    center: PropTypes.bool,
    tooltip: PropTypes.string
};

ParameterElement.defaultProps = {
    actionCols: 6,
    right: false,
    center: false,
    tooltip: ''
};

export default React.memo(ParameterElement);
