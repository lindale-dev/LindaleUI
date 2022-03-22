// Row of active/inactive dots to illustrate a progression.

import classnames from 'classnames';
import React, { memo } from 'react';
import _ from 'lodash';
import * as MUI from '@material-ui/core';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    root: {
      display: 'flex'
    },
    dot: {
      height: theme.spacing(1),
      width: theme.spacing(1),
      borderRadius: '50%',
      backgroundColor: theme.palette.action.disabled,
      boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.5)',

      '&:not(:last-child)': {
        marginRight: theme.spacing(0.75)
      },

      '&.on': {
        backgroundColor: theme.palette.primary.main
      },

      '&.clickable': {
        cursor: 'pointer'
      }
    }
  })
);

export type DotProgressProps = {
  count: number;
  value: number;

  // single: color current dot only
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

  const classes = useStyles(props);

  const isColored =
    props.variant === 'single' ? (i: number) => i === props.value : (i: number) => i <= props.value;

  const dots = _.range(props.count).map((i) => {
    return (
      <span
        key={i}
        className={classnames(classes.dot, {
          on: isColored(i),
          clickable: props.onClick !== undefined && i !== props.value
        })}
        onClick={() => props.onClick?.(i)}
      />
    );
  });

  return <div className={classes.root}>{dots}</div>;
});
