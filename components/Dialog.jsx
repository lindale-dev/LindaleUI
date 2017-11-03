import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';

// Wraps the content of a dialog with the required i18n providers
function Dialog(props)
{
    return (
        <I18nextProvider i18n={props.i18n}>
            <div className={props.className}>
                {props.children}
            </div>
        </I18nextProvider>
    );
};

Dialog.propTypes = {
    i18n: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default Dialog;
