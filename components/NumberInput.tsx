import * as React from 'react';
import * as MUI from '@material-ui/core';
import classnames from 'classnames';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            '&.slider': {
                cursor: 'ew-resize',
            }
        },
        input: {
            height: 18,
            padding: 0,
            fontSize: '0.75rem',
            '.slider &': {
                cursor: 'ew-resize',
            }
        },
        underline: {
            '&:after': {
                backgroundColor: theme.palette.primary.main,
            }
        },
        unit: {
            fontSize: '0.6875rem',
            fontStyle: 'italic',
            color: '#757575',
        }
    })
);

type Props = {
    value: number,
    min: number,
    max: number,
    className: string,
    fullWidth?: boolean,
    decimals?: number, // Max number of decimals
    disabled?: boolean,
    instantUpdate?: boolean, // Should each change of value send an update?
    unit?: string,
    onChange: (value: number) => void,
};
const defaultProps: Partial<Props> = {
    fullWidth: true,
    decimals: 20, // Maximum value allowed by Number.toFixed()
    disabled: false,
    instantUpdate: false,
    unit: ''
};

const NumberInput: React.SFC<Props> = (props) => {
    const classes = useStyles(props);

    const [valueBeforeFocus, setValueBeforeFocus] = React.useState<number>(0);
    const [isFocused, setIsFocused] = React.useState(false);

    const [valueBeforeDragging, setValueBeforeDragging] = React.useState<number>(0);
    const [dragging, setDragging] = React.useState(false);
    const [startMouseX, setStartMouseX] = React.useState<number|undefined>(undefined);
    const [currentMouseX, setCurrentMouseX] = React.useState<number|undefined>(undefined);
    const [orderOfMagnitude, setOrderOfMagnitude] = React.useState(1);
    const [draggingModifier, setDraggingModifier] = React.useState(1);

    const inputRef = React.useRef<any>(null);

    // The value coming from the props overrides the uncontrolled input contents
    React.useEffect(() => {
        inputRef.current.value = props.value;
    }, [props.value])

    // Returns the string form of the value, with the correct amount of decimals
    const valueAsString = (value: number | string, decimals?: number) =>
    {
        const valueTrimmed = Number(value).toFixed(decimals || props.decimals || 20); // removes unwanted decimals
        return Number(valueTrimmed).toString(); // removes insignificant trailing zeros
    }
    const valueAsNumber = (value: number | string, decimals?: number) =>
    {
        return Number(valueAsString(value, decimals));
    }

    // Returns the order of magnitude by which the value will be increased when dragging
    // For instance:
    // value = 1   --> Increase by 0.1
    // value = 100 --> Increase by 10
    const getOrderOfMagnitude = (value: number) => {
        let om = 1;
        if (value !== 0) {
            om =
                Math.pow(
                    10,
                    Math.floor(Math.log(Math.abs(value)) / Math.LN10)
                ) / 10;
        }
        return om;
    };

    const commitChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        // Return a cleaned up value
        props.onChange(valueAsNumber(event.target.value));
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
        setIsFocused(true);
        setValueBeforeFocus(valueAsNumber(event.target.value));

        // Select the content of the input, to make it easier to edit it on focus
        event.target.select();
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

        setIsFocused(false);
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isFocused) {
            setStartMouseX(e.clientX);
            setCurrentMouseX(undefined);
            setValueBeforeDragging(valueAsNumber(inputRef.current.value));
            setOrderOfMagnitude(getOrderOfMagnitude(valueAsNumber(inputRef.current.value)));
            setDraggingModifier(1);
            e.preventDefault();
            document.addEventListener('mouseup', handleDocumentMouseUp, false);
            document.addEventListener('mousemove', handleDocumentMouseMove, false);
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!dragging) {
            inputRef.current.focus();
        }
    };

    const handleDocumentMouseUp = (e: MouseEvent) => {
        setDragging(false);
        setStartMouseX(undefined);
        setCurrentMouseX(undefined);
        setDraggingModifier(1);

        document.removeEventListener('mouseup', handleDocumentMouseUp, false);
        document.removeEventListener('mousemove', handleDocumentMouseMove, false);

        // Only commit if not in instant mode, since it should have already been done
        if (!props.instantUpdate && Number(inputRef.current.value) !== props.value)
        {
            props.onChange(valueAsNumber(inputRef.current.value));
        }
    };

    const handleDocumentMouseMove = (e: MouseEvent) => {
        setCurrentMouseX(e.clientX);

        // Use SHIFT to change the value 10 times faster. CTRL to change it 10 times slower.
        if (e.shiftKey) {
            setDraggingModifier(10);
        } else if (e.ctrlKey) {
            setDraggingModifier(0.1);
        } else {
            setDraggingModifier(1);
        }
    };

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

    // Change the value when dragging the mouse
    React.useEffect(() => {
        if (currentMouseX && startMouseX) {
            const deltaX = currentMouseX - startMouseX;
            const offset = Math.sign(deltaX) * Math.floor(Math.abs(deltaX) / 5); // Increment offset every 5 pixel of movement

            if (offset !== 0) {
                setDragging(true);
                const newValue =
                    Number(valueBeforeDragging) + offset * orderOfMagnitude * draggingModifier;

                // Round to the order of magnitude
                const roundedValue =
                    Math.floor(newValue / orderOfMagnitude) * orderOfMagnitude;

                // Hack for rounding errors
                const cleanValue = parseFloat(roundedValue.toFixed(10));

                if (props.instantUpdate)
                {
                    props.onChange(valueAsNumber(cleanValue));
                } else {
                    inputRef.current.value = cleanValue;
                }
            }
        } else {
            setDragging(false);
        }
    }, [startMouseX, currentMouseX, valueBeforeDragging, orderOfMagnitude, draggingModifier]);

    
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
            className={classnames(props.className, {slider: !isFocused})}
            defaultValue={0}
            disabled={props.disabled}
            inputRef={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onChange={instantChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            endAdornment={unit}
            fullWidth={props.fullWidth}
            classes={{ root: classes.root, underline: classes.underline, input: classes.input }}
        />
    );
};
NumberInput.defaultProps = defaultProps;

export default NumberInput;