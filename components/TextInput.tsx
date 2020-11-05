import React from 'react';
import classnames from 'classnames';

import * as MUI from '@material-ui/core';

import Tooltip from './Tooltip';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        input:{
            '.small &': {
                height: '18px',
                padding: 0,
                fontSize: theme.typography.body2.fontSize,
            },
            '.outlined &': {
                borderRadius: '4px',
                paddingLeft: '3px',
                '&:hover:not(:disabled)': {
                    border: '1px solid #ddd',
                    paddingLeft: 2,
                },
                '&:focus': {
                    border: `1px solid ${theme.palette.primary.main}`,
                    paddingLeft: 2,
                },
            }
        },
        inputMarginDense:{
            fontSize: theme.typography.body2.fontSize,
            paddingBottom: '3px',
        },
        underline: {
            '&:after':{
                backgroundColor: theme.palette.primary.main,
            }
        }
    })
);

type Props = {
    className?: string,
    dense?: boolean,
    disabled?: boolean,
    disableUnderline?: boolean,
    endAdornment?: React.ReactNode,
    fullWidth?: boolean,
    instantUpdate?: boolean, // Should each change of value send an update?
    onChange: (value: string) => void,
    outlined?: boolean,
    placeholder?: string,
    small?: boolean,
    startAdornment?: React.ReactNode,
    tooltip?: React.ReactNode,
    tooltipDelay?: number,
    value: string,
};
const defaultProps: Partial<Props> = {
    dense: false,
    disabled: false,
    disableUnderline: false,
    outlined: false,
    fullWidth: false,
    instantUpdate: false,
    small: false,
    tooltip: '',
    tooltipDelay: 750,
}

// Wrapper around MUI's Input component, to handle value changes and key presses
const TextInput: React.SFC<Props> = (props) => {
    const classes = useStyles(props);

    const inputRef = React.useRef<any>(null);
    const [valueBeforeFocus, setValueBeforeFocus] = React.useState<string>('');
    const [isFocused, setIsFocused] = React.useState(false);

    // The value coming from the props overrides the uncontrolled input contents
    React.useEffect(() => {
        inputRef.current.value = props.value;
    }, [props.value])

    const commitChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.value !== props.value)
            props.onChange(event.target.value);
    }

    const instantChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (props.instantUpdate)
            commitChange(event);
    }

    const onFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    {
        setIsFocused(true);
        setValueBeforeFocus(event.target.value);

        // Select the content of the input, to make it easier to edit it on focus
        event.target.select();
    }

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) =>
    {
        // Only commit if not in instant mode, since it should have already been done
        if (!props.instantUpdate)
            commitChange(event);

        setIsFocused(false);
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

    return (
        <Tooltip title={props.tooltip} enterDelay={props.tooltipDelay}>
            <MUI.Input
                classes={classes}
                className={classnames(props.className, {small: props.small, outlined: props.outlined})}
                defaultValue={props.value}
                disabled={props.disabled}
                disableUnderline={props.disableUnderline}
                endAdornment={props.endAdornment}
                fullWidth={props.fullWidth}
                inputRef={inputRef}
                margin={props.dense ? 'dense' : 'none'}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={instantChange}
                onKeyDown={onKeyDown}
                placeholder={props.placeholder}
                startAdornment={props.startAdornment}
            />
        </Tooltip>
    );
};
TextInput.defaultProps = defaultProps;

export default TextInput;
