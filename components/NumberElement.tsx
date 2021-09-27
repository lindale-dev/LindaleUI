import React from 'react';
import { GridSize } from '@material-ui/core/Grid';

import { ParameterElement } from './ParameterElement';
import NumberInput from './NumberInput';
import { TooltipProps } from './Tooltip';

type Props = {
  name: string;
  value: number;

  actionCols?: GridSize;
  disabled?: boolean;
  min?: number;
  max?: number;
  decimals?: number; // Max number of decimals
  instantUpdate?: boolean; // Should each change of value send an update?
  unit?: string;
  tooltip?: TooltipProps['title'];

  onChange: (value: number) => void;
};

const defaultProps: Partial<Props> = {
  actionCols: 6,
  disabled: false,
  decimals: 20,
  instantUpdate: false,
  unit: ''
};

const NumberElement: React.FunctionComponent<Props> = (props) => {
  return (
    <ParameterElement
      className='number-element'
      name={props.name}
      tooltip={props.tooltip}
      actionCols={props.actionCols}
    >
      <NumberInput
        value={props.value}
        min={props.min}
        max={props.max}
        decimals={props.decimals}
        disabled={props.disabled}
        instantUpdate={props.instantUpdate}
        unit={props.unit}
        onChange={props.onChange}
      />
    </ParameterElement>
  );
};
NumberElement.defaultProps = defaultProps;

export default React.memo(NumberElement);
