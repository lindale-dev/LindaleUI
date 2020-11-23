import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withTheme } from '@material-ui/core/styles';

import IconButton from './IconButton';
import { ParameterElement } from './ParameterElement';
import TextInput from './TextInput';

import './BrowseFileElement.scss';

class BrowseFileElement extends React.PureComponent
{
    constructor(props)
    {
        super(props);
    }

    render(){

        // Folder icon color
        //  - normal state: grey
        //  - dragging: dark grey
        //  - filled: primary color
        //  - filled disabled: transparent primary color
        //  - disabled: light grey
        let iconColor = '#aaa';
        if (this.props.path && this.props.disabled)
        {
            // Convert hex to rgba, and set opacity to 0.5
            let c = this.props.theme.palette.primary.main.substring(1).split('');
            if(c.length == 3){ c = [c[0], c[0], c[1], c[1], c[2], c[2]]; }
            c = '0x' + c.join('');
            iconColor = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
        }
        else if (this.props.path)
        {
            iconColor = this.props.theme.palette.primary.main;
        }
        else if (this.props.disabled)
        {
            iconColor = '#ccc';
        }

        return (
            <ParameterElement name={this.props.name} tooltip={this.props.tooltip} actionCols={this.props.actionCols}>
                <div className="browse-file-actions">

                    <TextInput
                        className={ classnames('path-field', { 'file-not-found' : this.props.notFound } ) }
                        disabled={true}
                        endAdornment={(this.props.path && this.props.path != "" && this.props.onClearPath) && <IconButton icon="mdi-close" size={18} onClick={this.props.onClearPath} disabled={this.props.disabled} />}
                        fullWidth
                        small
                        tooltip={this.props.notFound ? "File not found" : ""}
                        value={this.props.path} />

                    <IconButton
                        className="browse-path"
                        icon="mdi-folder"
                        size={18}
                        onClick={this.props.browse}
                        color={iconColor}
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
    notFound: PropTypes.bool,
    onClearPath: PropTypes.func,
    tooltip: PropTypes.node,
    value: PropTypes.string
};

BrowseFileElement.defaultProps = {
    disabled: false,
    notFound: false,
    path: ''
};

export default withTheme(BrowseFileElement);
