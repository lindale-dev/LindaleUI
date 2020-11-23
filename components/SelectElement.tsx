import React from 'react';
import { GridSize } from '@material-ui/core';

import { Select, SelectProps, SelectItemType } from './Select';
import { ParameterElement } from './ParameterElement';


type Props =
{
    selectedOption: string, //PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]), // Must be an array if multiple == true
    options: SelectItemType[],
    name: string,

    actionCols?: GridSize,
    disabled?: boolean,
    multiple?: boolean,
    tooltip?: string,

    onChange: SelectProps['onChange']
};

const defaultProps: Partial<Props> =
{
    actionCols: 6,
    disabled: false,
    multiple: false,
}


const SelectElement: React.FunctionComponent<Props> = (props) =>
{
    return(
        <ParameterElement
            name={props.name}
            tooltip={props.tooltip}
            actionCols={props.actionCols}
        >
            <Select
                className='small'
                disabled={props.disabled}
                fullWidth
                multiple={props.multiple}
                options={props.options}
                selectedOption={props.selectedOption}
                onChange={props.onChange}
            />
        </ParameterElement>
    )
}
SelectElement.defaultProps = defaultProps;

const memo = React.memo(SelectElement);

export { memo as SelectElement };

export type
{
    Props as SelectElementProps,
    SelectProps as SelectProps
};