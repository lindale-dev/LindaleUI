import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import Checkbox from './Checkbox';
import ParameterElement from './ParameterElement';
import './CheckboxDuoElement.scss';

// Two checkboxes on the same line, with separate sub-labels
function CheckboxDuoElement(props)
{
    return(
        <ParameterElement name={props.name} tooltip={props.tooltip}>
            <Grid container spacing={0}>
                <Grid item xs={6} className='checkbox-duo-col'>
                    <Checkbox className='checkbox-duo-checkbox'
                              size={18}
                              checked={props.checkedValues[0]} 
                              onChange={props.onChange[0]} />
                    <span className='checkbox-duo-label'>{props.labels[0]}</span>
                </Grid>
                <Grid item xs={6} className='checkbox-duo-col'>
                    <span className='checkbox-duo-label checkbox-duo-label-right'>{props.labels[1]}</span>
                    <Checkbox className='checkbox-duo-checkbox' 
                              size={18}
                              checked={props.checkedValues[1]} 
                              onChange={props.onChange[1]} />
                </Grid>
            </Grid>
        </ParameterElement>
    )
}

CheckboxDuoElement.propTypes = {
    name: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.bool).isRequired,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    tooltip: PropTypes.string
};

CheckboxDuoElement.defaultProps = {
    tooltip: ''
};

export default CheckboxDuoElement;