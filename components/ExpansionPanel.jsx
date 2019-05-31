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

        '& > :last-child': {
            paddingRight: 18,
        }
    },

    expandIcon: {
        height: 24,
        width: 24
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
    }

    handleExpansionChange = (e, expanded) => this.props.onChange(expanded);

    render()
    {
        return (
            <MUIExpansionPanel  className={this.props.className} 
                                classes={{root: this.props.classes.root, expanded: this.props.classes.expanded}} 
                                expanded={this.props.expanded} 
                                onChange={this.handleExpansionChange} >
                <ExpansionPanelSummary classes={{root: this.props.classes.summary, expanded: this.props.classes.summaryExpanded, content: this.props.classes.summaryContent, expandIcon: this.props.classes.expandIcon}} expandIcon={<Icon icon="mdi-chevron-down"/>}>
                    { this.props.header }
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
};

ExpansionPanel.defaultProps = {
    expanded: false,
};

export default withStyles(style)(ExpansionPanel);
