import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const fs = require('fs');

import IconButton from './IconButton';
import ParameterElement from './ParameterElement';
import TextInput from './TextInput';

import colors from '../colors.jsx';
import './BrowseFileElement.scss';

class BrowseFileElement extends React.PureComponent
{
    constructor(props)
    {
        super(props);
    }

    render(){
        const notFound = this.props.path && this.props.path != "" && !fs.existsSync(this.props.path);

        return (
            <ParameterElement name={this.props.name} tooltip={this.props.tooltip} actionCols={this.props.actionCols}>
                <div className="material-entry-actions">

                    <TextInput  
                        className={ classnames('path-field', { 'file-not-found' : notFound } ) }
                        disabled={true}
                        endAdornment={(this.props.path && this.props.path != "") && <IconButton icon="mdi-close" size={18} onClick={this.props.onClearPath} />}
                        fullWidth
                        small
                        tooltip={notFound ? "File not found" : ""}
                        value={this.props.path} />

                    <IconButton
                        className="browse-path"
                        icon="mdi-folder"
                        size={18}
                        onClick={this.props.browse}
                        color={(this.props.path && this.props.path != "") ? colors[500] : "#aaa"}
                        disabled={this.props.disabled} />

                </div>
            </ParameterElement>
        );
    }
}

BrowseFileElement.propTypes = {
    disabled: PropTypes.bool,
    actionCols: PropTypes.number,
    browse: PropTypes.func,
    path: PropTypes.string,
    name: PropTypes.string,
    onClearPath: PropTypes.func,
    tooltip: PropTypes.string,
    value: PropTypes.string
};

BrowseFileElement.defaultProps = {
    disabled: false,
    path: ''
};

export default BrowseFileElement;
