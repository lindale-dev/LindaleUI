// Row of active/inactive dots to illustrate a progression.

import React, { memo } from 'react';
import _ from 'lodash';
import * as MUI from '@mui/material';
import { Theme } from '@mui/material';
import { Box } from './Box';

export type DotProgressProps = {
  count: number;
  value: number;

  // single: color current dot only (default)
  // upto: color from the first dot to the current dot
  variant?: 'single' | 'upto';

  onClick?: (i: number) => void;
};

export const DotProgress = memo(function DotProgress(props: DotProgressProps) {
  props = {
    variant: 'single',
    ...props
  };

  // Make sure that props make sense

  if (props.count < 1) {
    console.error(`DotProgress: invalid "count" prop: ${props.count}`);
    props.count = 1;
  }

  if (props.value < 0) {
    console.error(`DotProgress: invalid "value" prop: ${props.value}`);
    props.value = 0;
  }

  if (props.value >= props.count) {
    console.error(`DotProgress: invalid "value" prop: ${props.value}`);
    props.value = props.count - 1;
  }

  // Render

  const isColored =
    props.variant === 'single' ? (i: number) => i === props.value : (i: number) => i <= props.value;

  const dots = _.range(props.count).map((i) => {
    return (
      <Box
        key={i}
        sx={{
          height: (theme: Theme) => theme.spacing(1),
          width: (theme: Theme) => theme.spacing(1),
          backgroundColor: (theme: Theme) =>
            isColored(i) ? theme.palette.primary.main : theme.palette.action.disabled,
          borderRadius: '50%',
          boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.5)',
          cursor: props.onClick !== undefined && i !== props.value ? 'pointer' : 'default'
        }}
        onClick={() => props.onClick?.(i)}
      />
    );
  });

  return (
    <MUI.Stack direction='row' spacing={0.75}>
      {dots}
    </MUI.Stack>
  );
});
