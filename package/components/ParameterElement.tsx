// Base component to render a name + a control on the same row.
//
// See CheckboxElement, NumberElement, etc...

import React, { memo } from 'react';
import * as MUI from '@material-ui/core';

export type ParameterElementProps = {
  name: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
  dense?: boolean;
  actionCols?: MUI.GridProps['xs'];
  nameAlign?: 'left' | 'center' | 'right';
  actionAlign?: 'left' | 'center' | 'right';
} & MUI.GridProps;

export const ParameterElement = memo(function ParameterElement(props: ParameterElementProps) {
  props = {
    dense: false,
    actionCols: 6,
    disabled: false,
    nameAlign: 'left',
    actionAlign: 'right',
    ...props
  };

  const nameCols =
    typeof props.actionCols == 'number' ? ((12 - props.actionCols) as MUI.GridSize) : false;

  const { nameAlign, actionAlign, actionCols, dense, ...gridProps } = props;

  return (
    <MUI.Tooltip title={props.tooltip ?? ''}>
      <MUI.Grid
        container
        direction='row'
        alignItems='center'
        style={{
          minHeight: 24,
          alignItems: 'center'
        }}
        {...gridProps}
      >
        <MUI.Grid item xs={nameCols}>
          <MUI.Typography
            variant='body1'
            align={props.nameAlign}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontSize: props.dense ? 14 : 'default'
            }}
          >
            {props.name}
          </MUI.Typography>
        </MUI.Grid>

        <MUI.Grid
          item
          xs={props.actionCols}
          style={{
            textAlign: props.actionAlign
          }}
        >
          {props.children}
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Tooltip>
  );
});
