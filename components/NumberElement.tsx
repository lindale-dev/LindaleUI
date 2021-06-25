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
  min: 0,
  max: 100,
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
      <NumberInput {...props} />
    </ParameterElement>
  );
};
NumberElement.defaultProps = defaultProps;

export default React.memo(NumberElement);
