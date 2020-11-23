import React from 'react';
import classnames from 'classnames';

import * as MUI from '@material-ui/core';

const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        slider: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
        },
        thumb: {
            textDecoration: 'initial', // This is just a placeholder to avoid a warning
        },
        thumbMin: {
            backgroundColor: '#fff',
            border: '2px solid #bbb',
        },
        rail: {
            backgroundColor: '#bbb',
            opacity: 1
        },
        startLabel: {
            fontSize: '0.6875rem',
            fontStyle: 'italic',
            marginRight: '10px',
        },
        endLabel: {
            fontSize: '0.6875rem',
            fontStyle: 'italic',
            marginLeft: '10px',
        },
    })
);

type Props = {
    className?: string,
    disabled?: boolean,
    endLabel?: string,
    instantUpdate?: boolean,
    max?: number,
    min?: number,
    onChange: (value: number|number[]) => void,
    reverse?: boolean,
    startLabel?: string,
    step?: number,
    sliderStyle?: any,
    value?: number|number[],
    valueLabelDisplay?: 'auto' | 'off' | 'on' | undefined,
    valueLabelFormat?: string | ((x: number, i: number) => React.ReactNode),
};

const defaultProps: Partial<Props> = {
    endLabel: '',
    instantUpdate: false,
    max: 100,
    min: 0,
    reverse: false,
    startLabel: '',
    step: 0.01,
    disabled: false,
    valueLabelDisplay: 'off',
    valueLabelFormat: (x, i) => x,
};

const Slider: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles(props);

    const [value, setValue] = React.useState<number|number[]|undefined>(0);

    // The value coming from the props overrides the uncontrolled input contents
    React.useEffect(() => {
        setValue(props.value);
    }, [props.value])

    const onChange = (e: any, newValue: number|number[]) =>
    {
        setValue(newValue);

        // Only commit in instantUpdate mode
        if (props.instantUpdate)
            props.onChange(newValue);
    }
    const onChangeCommitted = (e: any, newValue: number | number[]) =>
    {
        // Only commit the change if we're not in instantUpdate mode,
        // in which case the commit was already made in onChange
        if (!props.instantUpdate)
            props.onChange(newValue);
    }

    let startLabel = null;
    if (props.startLabel !== '')
    {
        startLabel = <span className={classes.startLabel}>{props.startLabel}</span>;
    }

    let endLabel = null;
    if (props.endLabel !== '')
    {
        endLabel = <span className={classes.endLabel}>{props.endLabel}</span>;
    }

    return(
        <div className={classnames(classes.slider, props.className )}>
            {startLabel}
            <MUI.Slider
                classes={{
                    thumb: (value === props.min) ? classes.thumbMin : classes.thumb, // This styles the thumb when it is located at the slider's minimum
                    rail: classes.rail
                }}
                disabled={props.disabled}
                max={props.max}
                min={props.min}
                onChange={onChange}
                onChangeCommitted={onChangeCommitted}
                step={props.step}
                track={props.reverse ? 'inverted' : 'normal'}
                value={value}
                valueLabelDisplay={props.valueLabelDisplay}
                valueLabelFormat={props.valueLabelFormat}
                style={props.sliderStyle}
            />
            {endLabel}
        </div>
    )
}
Slider.defaultProps = defaultProps;

export default Slider;