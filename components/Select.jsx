import React from 'react';
import PropTypes from 'prop-types';

import MUISelect from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';

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
            paddingRight: 18,
            paddingBottom: 0
        }
    },
    icon:{
        '.small &':{
            height: 18,
            width: 18,
            top: 0
        }
    }
};

class Select extends React.Component
{

    render(){
        const options = Object.keys(this.props.options).map((value, i) =>
            <MenuItem 
                className={this.props.className} 
                key={i} 
                value={value}
                selected={value == this.props.selectedOption}
            >
                {this.props.options[value]}
            </MenuItem>);

        return(
            <MUISelect
                value={this.props.selectedOption}
                onChange={this.props.onChange}
                fullWidth={this.props.fullWidth}
                displayEmpty
                MenuProps={{ MenuListProps:{ dense:true, 
                                             disablePadding: true }}}
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
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool
};

Select.defaultProps = {
    fullWidth: false,
};

export default withStyles(style)(Select);