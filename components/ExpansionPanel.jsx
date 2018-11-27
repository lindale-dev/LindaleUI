import React from 'react';
import PropTypes from 'prop-types';

import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';

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

function ExpansionPanel(props)
{
    return (
        <MUIExpansionPanel className={props.className} classes={{root: props.classes.root, expanded: props.classes.expanded}} expanded={props.expanded} onChange={props.onChange}>
            <ExpansionPanelSummary classes={{root: props.classes.summary, expanded: props.classes.summaryExpanded, content: props.classes.summaryContent, expandIcon: props.classes.expandIcon}} expandIcon={<Icon icon="mdi-chevron-down"/>}>
                
                { (props.thumbnailColor || props.thumbnailImage) &&
                    <div className={props.classes.thumbnail} style={{backgroundColor: props.thumbnailColor}}>
                        { props.thumbnailImage &&
                            <img src={props.thumbnailImage} /> }
                    </div>
                }

                <div className={props.classes.title}>{props.title}</div>
                { (props.subTitle && props.subTitle != "") &&
                    <div className={props.classes.subTitle}>{props.subTitle}</div> }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{root: props.classes.content}}>
                { props.children }
            </ExpansionPanelDetails>
        </MUIExpansionPanel>
    );
}

ExpansionPanel.propTypes = {
    expanded: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    thumbnailColor: PropTypes.string,
    thumbnailImage: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string
};

ExpansionPanel.defaultProps = {
    expanded: false
};

export default withStyles(style)(ExpansionPanel);
