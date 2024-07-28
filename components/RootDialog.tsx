// Root dialog that setups:
// - theming
// - localization
// - notifications

import * as MUI from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { I18nextProvider, I18nextProviderProps } from "react-i18next";

import "@fontsource/roboto";

const globalStyles = (
  <MUI.GlobalStyles
    styles={{
      // Fill the window
      "#root": { height: "100vh" }, // The container for the root component must have this ID
    }}
  />
);

export type RootDialogProps = {
  i18n: I18nextProviderProps["i18n"]; // TODO make optional?
  themeOptions?: MUI.ThemeOptions;
  children?: React.ReactNode;
};

export function RootDialog(props: RootDialogProps) {
  // Set the default font
  const theme = useMemo(() => {
    return MUI.createTheme({
      typography: { fontFamily: "Roboto" },
      ...props.themeOptions,
    });
  }, [props.themeOptions]);

  return (
    <MUI.ThemeProvider theme={theme}>
      <I18nextProvider i18n={props.i18n}>
        <SnackbarProvider maxSnack={5}>
          <MUI.CssBaseline />
          {globalStyles}
          {props.children}
        </SnackbarProvider>
      </I18nextProvider>
    </MUI.ThemeProvider>
  );
}
