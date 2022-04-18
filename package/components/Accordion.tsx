// A simpler & more compact version of MUI's Accordion.
//
// Pass the header prop to define the header.
// Pass children to define the contents.

import React from 'react';
import * as MUI from '@mui/material';
import * as MUIIcons from '@mui/icons-material';

export type AccordionProps = {
  header: JSX.Element;
  onExpand?: (expanded: boolean) => void;
} & Omit<MUI.AccordionProps, 'onChange'>;

export const Accordion = React.memo(function Accordion(props: AccordionProps) {
  const { header, onExpand, ...accordionProps } = props;

  return (
    <MUI.Accordion
      {...accordionProps}
      //sx={{ fontSize: '0.75rem' }}
      onChange={(event, expanded) => onExpand?.(expanded)}
    >
      {/* Header */}

      <MUI.AccordionSummary
        /* classes={{
          root: classes.summary,
          expanded: classes.summaryExpanded,
          content: classes.summaryContent,
          expandIcon: classes.expandIcon
        }}*/
        sx={
          {
            //minHeight: 36,
            //padding: '0 12px'
          }
        }
        expandIcon={<MUIIcons.KeyboardArrowDown />}
      >
        {header}
      </MUI.AccordionSummary>

      {/* Contents */}

      <MUI.AccordionDetails
        sx={
          {
            //display: 'block',
            //padding: '0px 12px 8px'
          }
        }
      >
        {props.children}
      </MUI.AccordionDetails>
    </MUI.Accordion>
  );
});
