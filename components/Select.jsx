import React from 'react';
import PropTypes from 'prop-types';

import MUISelect from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from './Checkbox';
import MenuItem from './MenuItem';
import Tooltip from './Tooltip';

const style = {
    root:{
        '.small &':{
            fontSize: '0.75rem',
            height: 18,
        }
    },
    select:{
        '.small &':{
            height: 18,
            lineHeight: '18px',
            padding: '0 18px 0 0',
        }
    },
    icon:{
        '.small &':{
            height: 18,
            width: 18,
            top: 0
        }
    },
    selectMenu:{
        '.small &':{
            minWidth: 0,
        }
    }
};

class Select extends React.PureComponent
{

    render(){
        const options = Object.keys(this.props.options).map((value, i) => {
            const selected = this.props.multiple ? this.props.selectedOption.indexOf(value) > -1 : value == this.props.selectedOption;
            const title = typeof this.props.options[value] === 'string' ? this.props.options[value] : this.props.options[value].title;
            return(
                <MenuItem
                    className={this.props.className}
                    key={i}
                    value={value}
                    selected={selected}
                    size="small"
                    disabled={this.props.options[value].disabled}
                >
                    {this.props.multiple && <Checkbox checked={selected} onChange={e => console.log('click')} size={18} /> }
                    {title}
                </MenuItem>
            )
        });

        return(
            <MUISelect
                disabled={this.props.disabled}
                multiple={this.props.multiple}
                value={this.props.selectedOption}
                onChange={this.props.onChange}
                onClose={this.props.onClose}
                onOpen={this.props.onOpen}
                open={this.props.open}
                renderValue={this.props.multiple ? selected => selected.map(index => this.props.options[index]).join(', ') : this.props.renderValue}
                fullWidth={this.props.fullWidth}
                displayEmpty
                MenuProps={{ MenuListProps:{ dense:true,
                                             disablePadding: true }}}
                startAdornment={this.props.startAdornment}
                classes={ { root: this.props.classes.root,
                            select: this.props.classes.select,
                            selectMenu: this.props.classes.selectMenu,
                            icon: this.props.classes.icon, } }
                className={this.props.className}
            >
                {options}
            </MUISelect>
        )
    }

}

Select.propTypes = {
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    options: PropTypes.objectOf(PropTypes.node).isRequired,
    selectedOption: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]), // Must be an array if multiple == true
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    renderValue: PropTypes.func,
    fullWidth: PropTypes.bool,
    startAdornment: PropTypes.node
};

Select.defaultProps = {
    disabled: false,
    fullWidth: false,
    multiple: false,
};

export default withStyles(style)(Select);
