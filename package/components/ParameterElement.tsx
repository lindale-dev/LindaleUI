// Base component to render a name + a control on the same row.
//
// See CheckboxElement, NumberElement, etc...

import React, { memo } from 'react';
import * as MUI from '@mui/material';
import * as LUI from 'lindale-ui';

export type ParameterElementProps = {
  name: React.ReactNode;
  tooltip?: string;
  info?: string;
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

  const theme = MUI.useTheme();

  const nameCols =
    typeof props.actionCols == 'number' ? ((12 - props.actionCols) as MUI.GridSize) : false;

  const { nameAlign, actionAlign, actionCols, dense, ...gridProps } = props;

  return (
    <MUI.Tooltip title={props.tooltip ?? ''} disableInteractive>
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
          <MUI.Stack direction='row'>
            <MUI.Typography
              variant='body1'
              align={props.nameAlign}
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: props.dense ? theme.typography.body2.fontSize : 'default'
              }}
              component='div' // Suppress a hierarchy error
            >
              {props.name}
            </MUI.Typography>
            {props.info && (
              <MUI.Tooltip title={props.info} disableInteractive>
                <LUI.Box // Supress error
                  ml={0.5}
                  style={{ cursor: 'pointer' }}
                >
                  <LUI.Icon name='mdi-information-outline' size='tiny' color='default' />
                </LUI.Box>
              </MUI.Tooltip>
            )}
          </MUI.Stack>
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
