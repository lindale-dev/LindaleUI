import React from 'react';
import PropTypes from 'prop-types';

import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';
import IconButton from './IconButton';
import TextInput from './TextInput';

/* This is a denser version of MUI's ExpansionPanel */

const style = {
    root: {
        fontSize: '0.75rem'
    },

    expanded: {
        margin: '8px 0'
    },

    summary: {
        minHeight: 36,
        padding: '0 12px',
        '&$summaryExpanded': {
            minHeight: 36,
        },
    },

    summaryExpanded: {}, // Need to keep this for '&$summaryExpanded' to work

    summaryContent: {
        margin: '8px 0',
        alignItems: 'center',
        maxWidth: '100%',
        '&$summaryExpanded': {
            margin: '8px 0',
        },
    },

    expandIcon: {
        height: 24,
        width: 24
    },

    thumbnail: {
        width: 20,
        minWidth: 20,
        height: 20,
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: 8,

        '& img': {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            objectFit: 'cover'
        }
    },

    title: {
        flexBasis: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',

        '$summaryExpanded &': {
            fontWeight: 'bold'
        }
    },

    title: {
        flexBasis: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',

        '$summaryExpanded &': {
            fontWeight: 'bold'
        }
    },

    editTitle: {
        marginLeft: 8,
    },

    subTitle: {
        color: '#aaa',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },

    content: {
        display: 'block',
        padding: '0px 12px 8px'
    }
};

class ExpansionPanel extends React.PureComponent
{
    constructor(props)
    {
        super(props);

        this.state = { editingTitle: false };
    }

    handleExpansionChange = (e, expanded) => {
        this.toggleTitleEditing(false);
        this.props.onChange(expanded);
    }

    handleTitleChange = title => {
        this.props.onEditTitle(title);
    }

    toggleTitleEditing = (toggle) => {
        this.setState({ editingTitle: toggle });
    }

    render()
    {
        // About the "forwardRef" prop:
        // It's a bit hacky but MUI does not do ref forwarding for now so we pass a React ref
        // and attach it to the thumbnail's DOM element, which is at the top of the panel.
        //
        // That's good enough for our only use case at the moment (scrolling).
        //
        // https://github.com/mui-org/material-ui/issues/10825

        let title;
        if(this.props.expanded && this.state.editingTitle){
            title = <span onClick={e => {e.stopPropagation()}}>
                        <TextInput onChange={this.handleTitleChange} small value={this.props.title} />
                    </span>;
        } else {
            title = <div className={this.props.classes.title}>
                {this.props.title}
                {(this.props.titleEditable && this.props.expanded) &&
                    <IconButton className={this.props.classes.editTitle} icon="mdi-pencil" color="#aaa" size={18} onClick={e => {e.stopPropagation(); this.toggleTitleEditing(true)}} /> }
            </div>
        }

        return (
            <MUIExpansionPanel  className={this.props.className} 
                                classes={{root: this.props.classes.root, expanded: this.props.classes.expanded}} 
                                expanded={this.props.expanded} 
                                onChange={this.handleExpansionChange} >
                <ExpansionPanelSummary classes={{root: this.props.classes.summary, expanded: this.props.classes.summaryExpanded, content: this.props.classes.summaryContent, expandIcon: this.props.classes.expandIcon}} expandIcon={<Icon icon="mdi-chevron-down"/>}>

                    { (this.props.thumbnailColor || this.props.thumbnailImage) &&
                        <div  ref={this.props.forwardRef} className={this.props.classes.thumbnail} style={{backgroundColor: this.props.thumbnailColor}}>
                            { this.props.thumbnailImage &&
                                <img src={this.props.thumbnailImage} /> }
                        </div>
                    }

                    {title}
                    
                    { (this.props.subTitle && this.props.subTitle != "") &&
                        <div className={this.props.classes.subTitle}>{this.props.subTitle}</div> }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{root: this.props.classes.content}}>
                    { this.props.children }
                </ExpansionPanelDetails>
            </MUIExpansionPanel>
        );
    }
}

ExpansionPanel.propTypes = {
    expanded: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onEditTitle: PropTypes.func,
    thumbnailColor: PropTypes.string,
    thumbnailImage: PropTypes.string,
    title: PropTypes.string,
    titleEditable: PropTypes.bool,
    subTitle: PropTypes.string
};

ExpansionPanel.defaultProps = {
    expanded: false,
    titleEditable: false
};

export default withStyles(style)(ExpansionPanel);
