import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';

import {i18n} from '../utils/i18n';

// Wraps the content of a dialog with the required i18n providers
function Dialog(props)
{
    return (
        <I18nextProvider i18n={i18n} className="test">
            <div className={props.className}>
                {props.children}
            </div>
        </I18nextProvider>
    );
};

Dialog.propTypes = {
    className: PropTypes.string
};

export default Dialog;
