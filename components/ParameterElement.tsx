import React from 'react';
import * as MUI from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import classnames from 'classnames';

import { Tooltip, TooltipProps } from './Tooltip';
import './ParameterElement.scss';


type Props =
{
    tooltip?: TooltipProps['title'],
    className?: string,
    name?: string,
    nameElement?: React.ReactNode, // TODO just a single 'name' with mixed types
    actionCols?: GridSize,
    right?: boolean,
    center?: boolean,
    disabled?: boolean,
    children: React.ReactNode
};

const defaultProps: Partial<Props> =
{
    actionCols: 6,
    right: false,
    center: false,
    disabled: false,
    tooltip: ''
};


function ParameterElement(props: Props)
{
    // Dirty hack to do arithmetics with the GridSize type
    const nameSize = (12 - (props.actionCols as number)) as GridSize;

    return (
        <Tooltip title={props.tooltip ?? ''}>

            <MUI.Grid
                container
                spacing={0}
                alignItems='center'
                className={classnames('parameter-element ', props.className, { disabled: props.disabled })}
            >

                <MUI.Grid
                    item
                    xs={nameSize}
                    className='parameter-element-name'
                >
                    {props.name || props.nameElement}
                </MUI.Grid>

                <MUI.Grid
                    item
                    xs={props.actionCols}
                    className={classnames('parameter-element-action', {right: props.right, center: props.center})}
                >
                    {props.children}
                </MUI.Grid>

            </MUI.Grid>

        </Tooltip>
    )
}
ParameterElement.defaultProps = defaultProps;

export { ParameterElement };
export type { Props as ParameterElementProps };
