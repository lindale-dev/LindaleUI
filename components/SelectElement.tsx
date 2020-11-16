import React from 'react';

import { Select, SelectItemType } from './Select';
import ParameterElement from './ParameterElement';


type Props =
{
    selectedOption: string, //PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]), // Must be an array if multiple == true
    options: SelectItemType[],
    name: string,
    actionCols?: 1 | 2 | 4 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    disabled?: boolean,
    multiple?: boolean,
    tooltip?: string,

    onChange: (value: string) => void
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

export default React.memo(SelectElement);
