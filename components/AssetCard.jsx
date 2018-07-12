import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';

import Icon from './Icon';

import './AssetCard.scss';

function AssetCard(props)
{
    const icon = props.icon || "mdi-folder";
    return (
        <Paper className={classnames('asset-card', {folder: props.folder}, props.className)} onClick={props.onClick} >
            { !props.folder &&
                <div className="image">
                    <img src={props.image} />
                </div> }
            <div className="title">
                { props.folder &&
                    <Icon className="title-icon" icon={icon} /> }
                <span className="title-text">{ props.title }</span>
                <span className="title-actions" onClick={e => {e.stopPropagation()}} >{ props.actions }</span>
            </div>
        </Paper>
    );
}

AssetCard.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
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
