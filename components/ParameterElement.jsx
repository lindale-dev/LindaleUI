import React from 'react';
import PropTypes, { any } from 'prop-types';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';

import Tooltip from './Tooltip';
import './ParameterElement.scss';

function ParameterElement(props)
{
    return (
        <Tooltip title={props.tooltip}>

            <Grid
                container
                spacing={0}
                alignItems='center'
                className={classnames('parameter-element ', props.className)}
            >

                <Grid
                    item
                    xs={12-props.actionCols}
                    className='parameter-element-name'
                >
                    {props.name || props.nameElement}
                </Grid>

                <Grid
                    item
                    xs={props.actionCols}
                    className={classnames('parameter-element-action', {right: props.right, center: props.center})}
                >
                    {props.children}
                </Grid>

            </Grid>

        </Tooltip>
    )
}

ParameterElement.propTypes = {
    actionCols: PropTypes.number,
    children: PropTypes.element,
    className: PropTypes.string,
    name: PropTypes.string,
    nameElement: PropTypes.element,
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
