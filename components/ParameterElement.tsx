import React from 'react';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';

import Tooltip from './Tooltip';
import './ParameterElement.scss';


type Props =
{
    className?: string,
    name?: string,
    nameElement?: React.ReactNode, // TODO just a single 'name' with mixed types
    actionCols?: 1 | 2 | 4 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    right?: boolean,
    center?: boolean,
    tooltip?: React.ReactNode,
    disabled?: boolean,
    children?: React.ReactElement
};

const defaultProps: Partial<Props> =
{
    actionCols: 6,
    right: false,
    center: false,
    disabled: false,
    tooltip: ''
};


const ParameterElement: React.FunctionComponent<Props> = (props) =>
{
    return (
        <Tooltip title={props.tooltip}>

            <Grid
                container
                spacing={0}
                alignItems='center'
                className={classnames('parameter-element ', props.className, { disabled: props.disabled })}
            >

                <Grid
                    item
                    // @ts-ignore
                    xs={12-props.actionCols}
                    className='parameter-element-name'
                >
                    {props.name || props.nameElement}
                </Grid>

                <Grid
                    item
                    xs={props.actionCols}
                    className={classnames('parameter-element-action', {right: props.right, center: props.center})}
                >
                    {props.children}
                </Grid>

            </Grid>

        </Tooltip>
    )
}
ParameterElement.defaultProps = defaultProps;

export default React.memo(ParameterElement);
