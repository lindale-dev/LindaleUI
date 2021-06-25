import React from 'react';
import * as MUI from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import classnames from 'classnames';

import { Tooltip, TooltipProps } from './Tooltip';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
  MUI.createStyles({
    parameterElement: {
      minHeight: 24,
      alignItems: 'center'
    },

    parameterElementName: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    parameterElementActionRight: {
      textAlign: 'right'
    },

    parameterElementActionCenter: {
      textAlign: 'center'
    }
  })
);

type Props = {
  tooltip?: TooltipProps['title'];
  className?: string;
  name?: string;
  nameElement?: React.ReactNode; // TODO just a single 'name' with mixed types
  actionCols?: GridSize;
  right?: boolean;
  center?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const defaultProps: Partial<Props> = {
  actionCols: 6,
  right: false,
  center: false,
  disabled: false,
  tooltip: ''
};

function ParameterElement(props: Props) {
  const classes = useStyles(props);

  // Dirty hack to do arithmetics with the GridSize type
  const nameSize = (12 - (props.actionCols as number)) as GridSize;

  return (
    <Tooltip title={props.tooltip ?? ''}>
      <MUI.Grid
        container
        spacing={0}
        alignItems='center'
        className={classnames(classes.parameterElement, props.className, {
          disabled: props.disabled
        })}
        style={props.style}
      >
        <MUI.Grid item xs={nameSize} className={classes.parameterElementName}>
          {props.name || props.nameElement}
        </MUI.Grid>

        <MUI.Grid
          item
          xs={props.actionCols}
          className={classnames({
            [classes.parameterElementActionRight]: props.right,
            [classes.parameterElementActionCenter]: props.center
          })}
        >
          {props.children}
        </MUI.Grid>
      </MUI.Grid>
    </Tooltip>
  );
}
ParameterElement.defaultProps = defaultProps;

export { ParameterElement };
export type { Props as ParameterElementProps };
