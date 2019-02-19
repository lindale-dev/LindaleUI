import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';

import Checkbox from './Checkbox';
import Icon from './Icon';
import IconButton from './IconButton';
import MenuItem from './MenuItem';

import './AssetCard.scss';


class AssetCard extends React.PureComponent
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
        let menu = [];
        if (this.props.menuEntries){
            this.props.menuEntries.forEach(entry => {
                menu.push( <MenuItem dense size="medium" onClick={() => {this.closeMenu(); entry.action()}}>{entry.label}</MenuItem> );
            });
        }

        return (
            <Paper className={classnames('asset-card', {folder: this.props.folder}, this.props.className)} onClick={this.props.onClick} >

                { !this.props.folder &&
                    <div className="image" style={{backgroundImage: "url("+this.props.image+")"}} /> }

                <div className="title">
                    { (this.props.icon && this.props.icon != "") &&
                        <Icon className="title-icon" icon={this.props.icon} /> }
                    <span className="title-text">{ this.props.title }</span>
                    { !this.props.folder &&
                        <span className="favorite" onClick={e => {e.stopPropagation()}}>
                            <Checkbox icon={"mdi-star-outline"}
                                      checkedIcon={"mdi-star"}
                                      checked={this.props.favorite}
                                      tooltip={"Add to favorites"}
                                      onChange={e => this.props.addToFavorites(e.target.checked)} />
                        </span> }
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

                { this.props.selectable &&
                    <div className={classnames("select", {selected: this.props.selected})} onClick={e => {e.stopPropagation()}}>
                        <div className="select-background" />
                        <Checkbox icon={"mdi-checkbox-marked-circle"}
                                  checkedIcon={"mdi-checkbox-marked-circle"}
                                  uncheckedColor={"#fff"}
                                  checked={this.props.selected}
                                  onChange={e => this.props.onSelect(e.target.checked)} />
                    </div> }

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
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    title: PropTypes.string.isRequired
};

AssetCard.defaultProps = {
    folder: false,
    favorite: false,
    selectable: false,
    selected: false,
};

export default AssetCard;
