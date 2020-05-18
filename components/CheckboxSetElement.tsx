import React from 'react';
import * as MUI from '@material-ui/core';

import CheckboxSet from './CheckboxSet';
import ParameterElement from './ParameterElement';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            alignItems: 'flex-start',

            // Offset the sub-grid that contains the checkboxes
            '& .parameter-element-action': {
                paddingLeft: '0.5em'
            }
        }
    })
);

type Option = {
    value: string,
    label: string,
    checked: boolean
};

type CheckboxSetElementProps = {
    name: string,
    options: Option[],
    onChange: (values: any) => void,

    tooltip?: string
};

export default function CheckboxSetElement(props: CheckboxSetElementProps)
{
    const classes = useStyles(props);

    return <label>
        <ParameterElement
            className={classes.root}
            name={props.name}
            tooltip={props.tooltip}
            actionCols={6/*props.actionCols*/}>

            <CheckboxSet {...props} />

        </ParameterElement>
    </label>;
}
