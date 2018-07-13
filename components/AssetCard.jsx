import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import Checkbox from './Checkbox';
import Icon from './Icon';
import IconButton from './IconButton';

import './AssetCard.scss';


class AssetCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { menuAnchorEl: null, };
    }

    openMenu = event => {
        this.setState({ menuAnchorEl: event.currentTarget });
    };

    closeMenu = () => {
        this.setState({ menuAnchorEl: null });
    };

    
    render(){
        const icon = this.props.icon || "mdi-folder";
        let menu = [];
        if (this.props.menuEntries){
            this.props.menuEntries.forEach(entry => {
                menu.push( <MenuItem dense onClick={() => {this.closeMenu(); entry.action()}}>{entry.label}</MenuItem> );
            });
        }

        return (
            <Paper className={classnames('asset-card', {folder: this.props.folder}, this.props.className)} onClick={this.props.onClick} >
                { !this.props.folder &&
                    <div className="image">
                        <img src={this.props.image} />
                    </div> }
                <div className="title">
                    { this.props.folder &&
                        <Icon className="title-icon" icon={icon} /> }
                    <span className="title-text">{ this.props.title }</span>
                    { (this.props.menuEntries && this.props.menuEntries.length > 0) &&
                        <span className="title-menu" onClick={e => {e.stopPropagation()}} >
                                <IconButton onClick={this.openMenu} icon={"mdi-dots-vertical"} />
                                <Menu anchorEl={this.state.menuAnchorEl}
                                        open={Boolean(this.state.menuAnchorEl)}
                                        onClose={this.closeMenu}
                                        MenuListProps={{dense: true}}
                                        anchorOrigin={{horizontal: 'right'}}
                                        transformOrigin={{horizontal: 'right'}} >
                                    {menu}
                                </Menu>
                        </span> }
                </div>
                { !this.props.folder &&
                    <div className="favorite" onClick={e => {e.stopPropagation()}}><Checkbox icon={"mdi-star-outline"} checkedIcon={"mdi-star"} checked={this.props.favorite} onChange={e => this.props.addToFavorites(e.target.checked)} /></div> }
            </Paper>
        );
    }
}

AssetCard.propTypes = {
    addToFavorites: PropTypes.func,
    menuEntries: PropTypes.arrayOf(PropTypes.object),
    favorite: PropTypes.bool,
    folder: PropTypes.bool,
    icon: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired
};

AssetCard.defaultProps = {
    folder: false
};

export default AssetCard;
