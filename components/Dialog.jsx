import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {I18nextProvider} from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto'

import './Dialog.scss';

// Wraps the content of a dialog with:
// - the appropriate theme to style all MUI components
// - the required i18n providers
function Dialog(props)
{
    return (
        <MuiThemeProvider theme={props.theme}>
            <I18nextProvider i18n={props.i18n}>
                <div className={props.className}>
                    <CssBaseline />
                    {props.children}
                </div>
            </I18nextProvider>
        </MuiThemeProvider>
    );
};

Dialog.propTypes = {
    i18n: PropTypes.object.isRequired,
    className: PropTypes.string,
    theme: PropTypes.object
};

export default React.memo(Dialog);
