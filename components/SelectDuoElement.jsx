import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { Select } from './Select';
import { ParameterElement } from './ParameterElement';

function SelectDuoElement(props)
{
    return(
        <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={props.actionCols} >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Select className='small'
                            fullWidth
                            options={props.options[0]}
                            selectedOption={props.selectedOptions[0]}
                            onChange={props.onChange[0]} />
                </Grid>
                <Grid item xs={6}>
                    <Select className='small'
                            fullWidth
                            options={props.options[1]}
                            selectedOption={props.selectedOptions[1]}
                            onChange={props.onChange[1]} />
                </Grid>
            </Grid>
        </ParameterElement>
    )
}

SelectDuoElement.propTypes = {
    actionCols: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
    name: PropTypes.string.isRequired,
    selectedOption: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.arrayOf(PropTypes.func)
};

SelectDuoElement.defaultProps = {
    actionCols: 10,
}

export default React.memo(SelectDuoElement);
