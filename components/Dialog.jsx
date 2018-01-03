import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {I18nextProvider} from 'react-i18next';
import Reboot from 'material-ui/Reboot';
import 'typeface-roboto'

import './Dialog.scss';

import colors from '../colors.jsx';
const theme = createMuiTheme({
    palette: {
        primary: colors,
    },
});

// Wraps the content of a dialog with: 
// - the appropriate theme to style all MUI components
// - the required i18n providers
function Dialog(props)
{
    return (
        <MuiThemeProvider theme={theme}>
            <I18nextProvider i18n={props.i18n}>
                <div className={props.className}>
                    <Reboot />
                    {props.children}
                </div>
            </I18nextProvider>
        </MuiThemeProvider>
    );
};

Dialog.propTypes = {
    i18n: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default Dialog;
