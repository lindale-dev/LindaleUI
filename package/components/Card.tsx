// TODO doc: what is this? how is it different from accordion?

import React, { useState, useCallback } from 'react';
import AnimateHeight from 'react-animate-height';
import * as MUI from '@mui/material';

import { Icon } from './Icon';

/*const styles = (theme) => ({
  card: {
    marginTop: '8px',
    backgroundColor: '#fff',
    boxShadow:
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
    borderRadius: '2px',

    '&:hover': {
      transition: 'box-shadow .25s',
      boxShadow:
        '0 3px 3px 0 rgba(0, 0, 0, 0.17), 0 2px 6px 0 rgba(0, 0, 0, 0.17), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
    }
  },
  cardTitle: {
    height: '30px',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  cardTitleIcon: {
    fontSize: '20px'
  },
  cardTitleText: {
    flex: 1,
    fontWeight: 500,
    paddingLeft: '7px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: theme.typography.body1.fontSize
  },
  cardContent: {
    padding: (props) => (props.disableContentPadding ? 0 : '12px')
  }
});*/

type CardProps = {
  /*title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  disableContentPadding: PropTypes.bool,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  cardRef: PropTypes.object*/
};

/*Card.defaultProps = {
  disableContentPadding: false,
  expandable: true,
  expanded: true
};
*/

export const Card = React.memo(function Card(props: CardProps) {
  // TODO
  return null;

  /*const [expanded, setExpanded] = useState(false);

  const handleExpand = useCallback(() => setExpanded((oldExpanded) => !oldExpanded), []);

    const cardIcon = props.icon ? (
      <Icon
        icon={props.icon}
        className={classes.cardTitleIcon}
        size={18}
        color={props.theme.palette.text.secondary}
      />
    ) : null;

    const expandCallback = props.expandable ? expand.bind(this) : null;

    const expandIcon = props.expandable ? (
      <Icon
        icon={state.expanded ? 'mdi-chevron-down' : 'mdi-chevron-left'}
        className={classes.cardTitleIcon}
        size={18}
        color={props.theme.palette.text.secondary}
      />
    ) : null;

    const contentHeight = state.expanded ? 'auto' : 0;

    return (
      <MUI.Box sx={{
        marginTop: '8px',
        backgroundColor: '#fff',
        boxShadow:
          '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
        borderRadius: '2px',

        '&:hover': {
          transition: 'box-shadow .25s',
          boxShadow:
            '0 3px 3px 0 rgba(0, 0, 0, 0.17), 0 2px 6px 0 rgba(0, 0, 0, 0.17), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
        }
      }} ref={props.cardRef}>
        <MUI.Box className={classes.cardTitle} onClick={expandCallback}>
          {cardIcon}
          <MUI.Box className={classes.cardTitleText}>{props.title}</MUI.Box>
          {expandIcon}
        </MUI.Box>

        <AnimateHeight duration={200} height={contentHeight}>
          <MUI.Box className={classes.cardContent}>{props.children}</MUI.Box>
        </AnimateHeight>
      </MUI.Box>
    );*/
});
