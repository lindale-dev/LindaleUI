// A simpler & more compact version of MUI's Accordion.
//
// Pass the header prop to define the header.
// Pass children to define the contents.

import * as MUIIcons from "@mui/icons-material";
import * as MUI from "@mui/material";
import React from "react";

export type AccordionProps = {
  header: JSX.Element;
  disableExpandIcon?: boolean;
  onExpand?: (expanded: boolean) => void;
} & Omit<MUI.AccordionProps, "onChange">;

export const Accordion = React.memo(function Accordion(props: AccordionProps) {
  const { header, onExpand, ...accordionProps } = props;

  return (
    <MUI.Accordion
      {...accordionProps}
      sx={{
        fontSize: (theme) => theme.typography.body2.fontSize,
        ...accordionProps.sx,
      }}
      onChange={(event, expanded) => onExpand?.(expanded)}
    >
      {/* Header */}

      <MUI.AccordionSummary
        sx={{
          minHeight: "36px",
          padding: "0 12px",
          flex: "1",
          overflow: "hidden",
          "&.Mui-expanded": {
            minHeight: "36px",
          },
          "& .MuiAccordionSummary-content": {
            overflow: "hidden",
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "12px 0",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            marginLeft: "8px",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "transparent",
          },
        }}
        expandIcon={!props.disableExpandIcon && <MUIIcons.KeyboardArrowDown />}
      >
        {header}
      </MUI.AccordionSummary>

      {/* Contents */}

      <MUI.AccordionDetails
        sx={{
          // display: 'block',
          padding: "0px 12px 8px",
        }}
      >
        {props.children}
      </MUI.AccordionDetails>
    </MUI.Accordion>
  );
});
