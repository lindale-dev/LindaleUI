import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { numberUnitPropArray } from '../utils/customProps';
import ParameterElement from './ParameterElement';
import NumberInput from './NumberInput';

function NumberDuoElement(props)
{
    return (
        <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={props.actionCols} >
            <Grid container spacing={props.spacing}>
                <Grid item xs={6}>
                    <NumberInput value={props.values[0]}
                                 decimals={props.decimals}
                                 onChange={props.onChange[0]}
                                 unit={Array.isArray(props.unit) ? props.unit[0] : props.unit}
                                 disabled={props.disabled} />
                </Grid>
                <Grid item xs={6}>
                    <NumberInput value={props.values[1]}
                                 decimals={props.decimals}
                                 onChange={props.onChange[1]}
                                 unit={Array.isArray(props.unit) ? props.unit[1] : props.unit}
                                 disabled={props.disabled} />
                </Grid>
            </Grid>
        </ParameterElement>
    );
}

NumberDuoElement.propTypes = {
    actionCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    values: numberUnitPropArray,
    onChange: PropTypes.arrayOf(PropTypes.func).isRequired,
    min: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.arrayOf(PropTypes.number),
    decimals: PropTypes.number, // Max number of decimals
    unit: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    disabled: PropTypes.bool,
    spacing: PropTypes.number,
};

NumberDuoElement.defaultProps = {
    decimals: 3,
    actionCols: 10,
    unit: '',
    disabled: false,
    spacing: 1,
}

export default React.memo(NumberDuoElement);
