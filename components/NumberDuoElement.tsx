import React from 'react';
import * as MUI from '@material-ui/core';

import ParameterElement from './ParameterElement';
import NumberInput from './NumberInput';


//values: numberUnitPropArray,
type Props =
{
    name: string,
    valueA: number,
    valueB: number,
    min: number,
    max: number,

    actionCols?: number,
    decimals?: number,
    unit?: string,
    disabled?: boolean,
    spacing?: number,
    instantUpdate?: boolean,
    tooltip?: string,

    onChangeA?: (object) => void,
    onChangeB?: (object) => void
};


const defaultProps: Partial<Props> =
{
    decimals: 20,
    actionCols: 10,
    unit: '',
    disabled: false,
    spacing: 1,
    instantUpdate: false
}


const NumberDuoElement: React.FunctionComponent<Props> = (props) =>
{
    console.log('duo')

    return (
        <ParameterElement
            name={props.name}
            tooltip={props.tooltip}
            actionCols={props.actionCols}
        >
            <MUI.Grid container spacing={props.spacing}>

                <MUI.Grid item xs={6}>
                    <NumberInput
                        value={props.valueA}
                        min={props.min}
                        max={props.max}
                        decimals={props.decimals}
                        onChange={props.onChangeA}
                        unit={Array.isArray(props.unit) ? props.unit[0] : props.unit}
                        disabled={props.disabled}
                        instantUpdate={props.instantUpdate}
                    />
                </MUI.Grid>

                <MUI.Grid item xs={6}>
                    <NumberInput
                        value={props.valueB}
                        min={props.min}
                        max={props.max}
                        decimals={props.decimals}
                        onChange={props.onChangeB}
                        unit={Array.isArray(props.unit) ? props.unit[1] : props.unit}
                        disabled={props.disabled}
                        instantUpdate={props.instantUpdate}
                    />
                </MUI.Grid>

            </MUI.Grid>
        </ParameterElement>
    );
}
NumberDuoElement.defaultProps = defaultProps;

export default React.memo(NumberDuoElement);
