import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';

const styles = {
    card: {
        marginTop: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
        borderRadius: '2px',

        '&:hover': {
            transition: 'box-shadow .25s',
            boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.17), 0 2px 6px 0 rgba(0, 0, 0, 0.17), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
        }
    },
    cardTitle: {
        height: '30px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    cardTitleIcon: {
        fontSize: '20px',
    },
    cardTitleText: {
        flex: 1,
        fontWeight: 500,
        paddingLeft: '7px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    cardContent: {
        padding: props => props.disableContentPadding ? 0 : '12px',
    },
}


class Card extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            expanded: props.expanded,
        };

        this.expand = this.expand.bind(this);
    }

    expand = () => this.setState({ expanded: !this.state.expanded });

    render ()
    {
        const { classes } = this.props;
        
        const cardIcon = this.props.icon ?
            <Icon icon={this.props.icon} className={classes.cardTitleIcon} size={18} color='#757575'/> :
            null;

        const expandCallback = this.props.expandable ?
            this.expand.bind(this) :
            null;

        const expandIcon = this.props.expandable ?
            <Icon icon={this.state.expanded ? 'mdi-chevron-down' : 'mdi-chevron-left'} className={classes.cardTitleIcon} size={18} color='#757575'/> :
            null;

        const content_height = this.state.expanded ? 'auto' : 0;

        return (
            <div className={`${classes.card} ${this.props.className}`}>

                <div className={classes.cardTitle} onClick={expandCallback}>
                    {cardIcon}
                    <div className={classes.cardTitleText}>{this.props.title}</div>
                    {expandIcon}
                </div>

                <AnimateHeight duration={200} height={content_height}>
                    <div className={classes.cardContent}>
                        {this.props.children}
                    </div>
                </AnimateHeight>

            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string,
    disableContentPadding: PropTypes.bool,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool // Initial state
};

Card.defaultProps = {
    disableContentPadding: false,
    expandable: true,
    expanded: true
};

export default withStyles(styles, { withTheme: true })(Card);
