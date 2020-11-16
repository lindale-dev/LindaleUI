import React from 'react';
import * as MUI from '@material-ui/core';

import MenuItem from './MenuItem';
import Icon from './Icon';


const useStyles = MUI.makeStyles((theme: MUI.Theme) =>
    MUI.createStyles({
        root: {
            '.small &': {
                fontSize: '0.75rem',
                height: 18,
            }
        },
        select: {
            '.small &': {
                height: 18,
                lineHeight: '18px',
                padding: '0 18px 0 0',
            }
        },
        icon: {
            '.small &': {
                height: 18,
                width: 18,
                top: 0
            }
        },
        selectMenu: {
            '.small &': {
                minWidth: 0,
            }
        }
    }
));


export type SelectItemType =
{
    value: string,
    label: string,
    icon?: string,
    iconColor?: number[],
    disabled?: boolean
};


type Props =
{
    options: SelectItemType[],
    selectedOption: string, // Must be an array if multiple == true // TODO accept string or string[]
    disabled?: boolean,
    multiple?: boolean,
    open?: boolean,
    fullWidth?: boolean,
    startAdornment?: React.ReactNode,
    className?: string,

    onChange?: (value: any) => void,
    onClose?: () => void,
    onOpen?: () => void,
    renderValue?: (value: any) => React.ReactNode
};


const defaultProps: Partial<Props> =
{
    disabled: false,
    fullWidth: false,
    multiple: false
};

const Select: React.FunctionComponent<Props> = (props) =>
{
    const classes = useStyles(props);

    const options = props.options.map((item, i) =>
    {
        const selected = props.multiple ?
            props.selectedOption.indexOf(item.value) > -1 :
            item.value == props.selectedOption;

        return (
            <MenuItem
                className={props.className}
                size='small'
                key={i}
                value={item.value}
                selected={selected}
                disabled={item.disabled}>

                {/* this.props.multiple && <Checkbox checked={selected} onChange={e => console.log('click')} size={18} /> */}

                {item.icon && <Icon size={18} icon={item.icon} color={item.iconColor} />}

                {item.label}

            </MenuItem>
        )
    });

    return (
        <MUI.Select
            disabled={props.disabled}
            multiple={props.multiple}
            value={props.selectedOption}
            onChange={props.onChange}
            onClose={props.onClose}
            onOpen={props.onOpen}
            open={props.open}
            renderValue={props.multiple ?
                selected => (selected as string[]).map((index: string) => props.options[parseInt(index)]).join(', ') :
                props.renderValue
            }
            fullWidth={props.fullWidth}
            displayEmpty
            MenuProps={{
                MenuListProps: {
                    dense:true,
                    disablePadding: true
                }
            }}
            startAdornment={props.startAdornment}
            classes={{
                root: classes.root,
                select: classes.select,
                selectMenu: classes.selectMenu,
                icon: classes.icon
            }}
            className={props.className}>

            {options}

        </MUI.Select>
    )
};
Select.defaultProps = defaultProps;

const MemoSelect = React.memo(Select);

export {MemoSelect as Select};
