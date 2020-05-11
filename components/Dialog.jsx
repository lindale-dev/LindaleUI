import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {I18nextProvider} from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto'

// This sets html and body to 100% height and width
// TODO Is there another way to do it in JSX? Couldn't find a way with CssBaseline nor Theme
import './Dialog.scss'

const styles = {
    dialog: {
        fontFamily: 'Roboto',
    }
};

// Wraps the content of a dialog with:
// - the appropriate theme to style all MUI components
// - the required i18n providers
function Dialog(props)
{
    return (
        <MuiThemeProvider theme={props.theme}>
            <I18nextProvider i18n={props.i18n}>
                <div className={classnames(props.classes.dialog, props.className)}>
                    <CssBaseline />
                    {props.children}
                </div>
            </I18nextProvider>
        </MuiThemeProvider>
    );
};

Dialog.propTypes = {
    i18n: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.object
};

export default withStyles(styles)(React.memo(Dialog));
