import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import { numberUnitPropArray } from '../utils/customProps';
import ParameterElement from './ParameterElement';
import NumberInput from './NumberInput';

function NumberDuoElement(props)
{
    return (
        <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={8} >
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <NumberInput value={props.values[0]}
                                 onChange={props.onChange[0]}
                                 unit={props.unit} />
                </Grid>
                <Grid item xs={6}>
                    <NumberInput value={props.values[1]}
                                 onChange={props.onChange[1]}
                                 unit={props.unit} />
                </Grid>
            </Grid>
        </ParameterElement>
    );
}

NumberDuoElement.propTypes = {
    name: PropTypes.string.isRequired,
    values: numberUnitPropArray,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    min: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.arrayOf(PropTypes.number),
    unit: PropTypes.string
};

NumberDuoElement.defaultProps = {
    unit: ''
}

export default NumberDuoElement;
