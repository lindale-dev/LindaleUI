import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonBase from 'material-ui/ButtonBase';
import Paper from 'material-ui/Paper';

import Icon from './Icon';

import './AssetCard.scss';

function AssetCard(props)
{
    const icon = props.icon || "mdi-folder";
    return (
        <Paper className={classnames('asset-card', {folder: props.folder})} >
            <ButtonBase className="asset-card-button" onClick={() => { props.onOpenFolder() }} >
                { !props.folder &&
                    <div className="image">
                    </div> }
                <div className="title">
                    { props.folder &&
                        <Icon className="title-icon" icon={icon} /> }
                    { props.title }
                </div>
            </ButtonBase>
        </Paper>
    );
}

AssetCard.propTypes = {
    folder: PropTypes.bool,
    icon: PropTypes.string,
    image: PropTypes.string,
    onOpenFolder: PropTypes.func,
    title: PropTypes.string.isRequired
};

AssetCard.defaultProps = {
    folder: false
};

export default AssetCard;
