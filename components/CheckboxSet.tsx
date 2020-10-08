import React from 'react';
import * as MUI from '@material-ui/core';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            padding: '0.1em'
        },
        label: {
            fontSize: '12px'
        }
    })
);

type Option =
{
    value: string,
    label: string,
    checked: boolean
};

type CheckboxSetProps =
{
    options: Option[],
    disabled: boolean,
    onChange: (values: any) => void
};

export default function CheckboxSet(props: CheckboxSetProps)
{
    const classes = useStyles(props);

    const onChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) =>
    {
        // Copy the input state
        const values: any = {};
        props.options.forEach(option => values[option.value] = option.checked);

        // Inject the change
        values[value] = event.target.checked;

        props.onChange(values);
    };

    const checkboxes = props.options.map((option, i) =>

        <MUI.FormControlLabel
            classes={{ label: classes.label}}
            label={option.label}
            key={i}
            control={
                <MUI.Checkbox
                    classes={{ root: classes.root }}
                    size='small'
                    name="checkedA"
                    checked={option.checked}
                    disabled={props.disabled}
                    onChange={onChange.bind(null, option.value)}
                />
            }
        />
    );

    return (
        <MUI.Grid
            container
            direction="column"
        >
            {checkboxes}
        </MUI.Grid>
    );
}
