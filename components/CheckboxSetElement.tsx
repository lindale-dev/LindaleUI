import React from 'react';
import * as MUI from '@material-ui/core';

import CheckboxSet from './CheckboxSet';
import ParameterElement from './ParameterElement';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            alignItems: 'flex-start',

            '& .parameter-element-action': {
                // Offset the sub-grid that contains the checkboxes
                paddingLeft: '0.5em',

                // Scroll if too long
                maxHeight: '5rem',
                overflowY: 'auto'
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

    tooltip?: string,
    disabled: boolean
};

export default function CheckboxSetElement(props: CheckboxSetElementProps)
{
    const classes = useStyles(props);

    return <label>
        <ParameterElement
            className={classes.root}
            name={props.name}
            tooltip={props.tooltip}
            actionCols={6/*props.actionCols*/}
        >

            <CheckboxSet {...props} />

        </ParameterElement>
    </label>;
}
