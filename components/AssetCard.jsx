import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';

import Icon from './Icon';

import './AssetCard.scss';

function AssetCard(props)
{
    return (
        <Paper className={classnames('asset-card', {folder: props.folder})} >
            { !props.folder &&
                <div className={"image"}>
                </div> }
            <div className={"title"}>
                { props.folder &&
                    <Icon className={"title-icon"} icon="mdi-folder" /> }
                { props.title }
            </div>
        </Paper>
    );
}

AssetCard.propTypes = {
    folder: PropTypes.bool,
    image: PropTypes.string,
    title: PropTypes.string.isRequired
};

AssetCard.defaultProps = {
    folder: false
};

export default AssetCard;
