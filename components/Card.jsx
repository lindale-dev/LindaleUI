import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

import Icon from './Icon';
import IconButton from './IconButton';

import './Card.scss';

function CardIcon(props)
{
    return <Icon className={'card_icon'} icon={props.icon} size={18} />;
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
        const cardIcon = this.props.icon ?
            <CardIcon icon={this.props.icon} className='card_icon'/> :
            null;

        const expandCallback = this.props.expandable ?
            this.expand.bind(this) :
            null;

        const expandIcon = this.props.expandable ?
            <CardIcon icon={this.state.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_left'} className='right-icon more'/> :
            null;

        const content_height = this.state.expanded ? 'auto' : 0;

        return (
            <div className={`card ${this.props.className}`}>

                <div className='card-title' onClick={expandCallback}>
                    {cardIcon}
                    {expandIcon}
                    <div className='card-title-text'>{this.props.title}</div>
                </div>

                <AnimateHeight duration={200} height={content_height}>
                    <div className={this.props.list ? 'card-content card-list-content' : 'card-content'}>
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
    expandable: PropTypes.bool,
    expanded: PropTypes.bool // Initial state
};

Card.defaultProps = {
    expandable: true,
    expanded: true
};

export default Card;
