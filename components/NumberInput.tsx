// TODO: Create custom spinner with slide behavior (see Numberfield)

import * as React from 'react';
import * as MUI from '@material-ui/core';

import colors from '../colors.jsx';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        input:{
            height: 18,
            padding: 0,
            fontSize: '0.75rem',
        },
        underline: {
            '&:after': {
                backgroundColor: colors[500],
            }
        },
        unit: {
            fontSize: '0.6875rem',
            fontStyle: 'italic',
            color: '#757575',
        }
    })
);

// Returns the string form of the value, with the correct amount of decimals
function valueAsString(value: number | string, decimals: number) : string
{
    const valueTrimmed = Number(value).toFixed(decimals); // removes unwanted decimals
    return Number(valueTrimmed).toString(); // removes insignificant trailing zeros
}

type NumberInputProps =
{
    value: number,
    min: number,
    max: number,
    className: string,
    fullWidth?: boolean,
    decimals?: number, // Max number of decimals
    speed?: number, // Speed factor when using the slider
    disabled?: boolean,
    instantUpdate?: boolean, // Should each change of value send an update?
    unit?: string,

    onChange: (value: number) => void,
};

const defaultProps: Partial<NumberInputProps> =
{
    fullWidth: true,
    decimals: 20, // Maximum value allowed by Number.toFixed()
    speed: 1,
    disabled: false,
    instantUpdate: false,
    unit: ''
};

const NumberInput: React.SFC<NumberInputProps> = (props) =>
{
    const classes = useStyles(props);

    const [valueBeforeFocus, setValueBeforeFocus] = React.useState<string>('0');

    const inputRef = React.useRef<any>(null);

    // The value coming from the props overrides the uncontrolled input contents
    React.useEffect(() => {
        inputRef.current.value = props.value;
    }, [props.value])

    const commitChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        // Return a cleaned up value (still needs to be a number though!)
        const returnValue = Number(valueAsString(event.target.value, props.decimals ? props.decimals : 2));

        props.onChange(returnValue);
    }

    const instantChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        // Only commit the change if the value is a valid number
        // (when the field's value is an empty string)

        if (props.instantUpdate && event.target.value !== '')
        {
            commitChange(event);
        }
    }

    const onFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    {
        setValueBeforeFocus(event.target.value);
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) =>
    {
        // Only commit if not in instant mode, since it should have already been done

        if (!props.instantUpdate && Number(event.target.value) !== props.value)
        {
            commitChange(event);
        }

        // Reset the field if the value is not a valid number

        if (event.target.value === '')
        {
            inputRef.current.value = valueBeforeFocus;
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    {
        if (event.key === 'Enter')
        {
            inputRef.current.blur();
        }
        else if (event.key === 'Escape')
        {
            // Restore the previous value and then blur
            inputRef.current.value = valueBeforeFocus;
            inputRef.current.blur();
        }
    }

    const unit = props.unit !== '' ?
        <MUI.InputAdornment
            className={classes.unit}
            disableTypography
            position='end'
        >
            {props.unit}
        </MUI.InputAdornment> :
        null;

    return (
        <MUI.Input
            className={props.className}
            type='number'
            defaultValue={0}
            disabled={props.disabled}
            inputRef={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onChange={instantChange}
            endAdornment={unit}
            fullWidth={props.fullWidth}
            classes={{ underline: classes.underline, input: classes.input }}
        />
    );
};

NumberInput.defaultProps = defaultProps;

export default NumberInput;
