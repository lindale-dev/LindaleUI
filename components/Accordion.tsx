// A simpler & more compact version of MUI's Accordion.
//
// Pass the header prop to define the header.
// Pass children to define the contents.

import * as MUIIcons from "@mui/icons-material";
import * as MUI from "@mui/material";
import { forwardRef, memo } from "react";

export type AccordionProps = {
  header: JSX.Element;
  disableExpandIcon?: boolean;
  dense?: boolean;
  onExpand?: (expanded: boolean) => void;
} & Omit<MUI.AccordionProps, "onChange">;

export const Accordion = memo(
  forwardRef<HTMLDivElement, AccordionProps>(function Accordion(props, ref) {
    const { header, onExpand, disableExpandIcon, dense, ...accordionProps } =
      props;

    return (
      <MUI.Accordion
        ref={ref}
        {...accordionProps}
        sx={{
          fontSize: (theme) => theme.typography.body2.fontSize,
          ...accordionProps.sx,
        }}
        onChange={(_event, expanded) => onExpand?.(expanded)}
      >
        {/* Header */}

        <MUI.AccordionSummary
          sx={{
            minHeight: "36px",
            padding: accordionProps.disableGutters || dense ? "0" : "0 12px",
            flex: "1",
            overflow: "hidden",
            "&.Mui-expanded": {
              minHeight: "36px",
            },
            "& .MuiAccordionSummary-content": {
              margin: dense ? "0" : undefined,
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
          expandIcon={!disableExpandIcon && <MUIIcons.KeyboardArrowDown />}
        >
          {header}
        </MUI.AccordionSummary>

        {/* Contents */}

        <MUI.AccordionDetails
          sx={{
            // display: 'block',
            padding: accordionProps.disableGutters || dense ? "0" : "0px 12px",
            paddingBottom: "8px",
          }}
        >
          {props.children}
        </MUI.AccordionDetails>
      </MUI.Accordion>
    );
  }),
);
