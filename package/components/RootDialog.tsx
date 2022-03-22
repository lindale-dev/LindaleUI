// Root dialog that setups:
// - theming
// - localization
// - notifications

import { SnackbarProvider } from 'notistack';
import React, { useMemo } from 'react';
import { I18nextProvider, I18nextProviderProps } from 'react-i18next';
import * as MUI from '@material-ui/core';

import '@fontsource/roboto';

// Fill the window
const useStyles = MUI.makeStyles(() =>
  MUI.createStyles({
    '@global': {
      html: {
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        width: '100%'
      },
      // The container for the root component must have this ID
      '#root': {
        height: '100%',
        width: '100%'
      }
    }
  })
);

export type RootDialogProps = {
  i18n: I18nextProviderProps['i18n']; // TODO make optional?
  themeOptions?: MUI.ThemeOptions;
  children?: React.ReactNode;
};

export function RootDialog(props: RootDialogProps) {
  useStyles(props);

  // Set a default font
  const theme = useMemo(() => {
    return MUI.createTheme({ typography: { fontFamily: 'Roboto' }, ...props.themeOptions });
  }, [props.themeOptions]);

  return (
    <MUI.ThemeProvider theme={theme}>
      <I18nextProvider i18n={props.i18n}>
        <SnackbarProvider maxSnack={5}>
          <MUI.CssBaseline />
          {props.children}
        </SnackbarProvider>
      </I18nextProvider>
    </MUI.ThemeProvider>
  );
}
