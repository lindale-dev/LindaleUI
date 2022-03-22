// A simpler & more compact version of MUI's Accordion.
//
// Pass the header prop to define the header.
// Pass children to define the contents.

import React from 'react';
import * as MUI from '@material-ui/core';
import * as MUIIcons from '@material-ui/icons';

const useStyles = MUI.makeStyles(() =>
  MUI.createStyles({
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
        minHeight: 36
      }
    },

    summaryExpanded: {}, // Need to keep this for '&$summaryExpanded' to work

    summaryContent: {
      margin: '8px 0',
      alignItems: 'center',
      maxWidth: '100%',
      '&$summaryExpanded': {
        margin: '8px 0'
      },

      '& > :last-child': {
        paddingRight: 22
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
  })
);

export type AccordionProps = {
  header: JSX.Element;
  onExpand?: (expanded: boolean) => void;
} & Omit<MUI.AccordionProps, 'onChange'>;

export const Accordion = React.memo(function Accordion(props: AccordionProps) {
  const classes = useStyles(props);

  const { header, onExpand, ...accordionProps } = props;

  return (
    <MUI.Accordion
      classes={{ root: classes.root, expanded: classes.expanded }}
      {...accordionProps}
      onChange={(event, expanded) => onExpand?.(expanded)}
    >
      {/* Header */}

      <MUI.AccordionSummary
        classes={{
          root: classes.summary,
          expanded: classes.summaryExpanded,
          content: classes.summaryContent,
          expandIcon: classes.expandIcon
        }}
        expandIcon={<MUIIcons.KeyboardArrowDown />}
      >
        {header}
      </MUI.AccordionSummary>

      {/* Contents */}

      <MUI.AccordionDetails classes={{ root: classes.content }}>
        {props.children}
      </MUI.AccordionDetails>
    </MUI.Accordion>
  );
});
