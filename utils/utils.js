// Wait for the page to be fully loaded before mounting a UI element

import ReactDOM from 'react-dom';

export function renderWhenLoaded(element, callback)
{
    window.addEventListener('load', () => {

        const root = document.body.appendChild(document.createElement('div'));

        ReactDOM.render(element, root);

        if (callback)
          callback();
    })
}

// Set a dialog property by name

import skpCallback from './bridge';

export function setProperty(name, value, category = null, guid = null)
{
    // category is optional, for instance:
    //   - no category provided -> set_property() called
    //   - "host" category provided -> set_host_property() called with the guid

    // First, update the UI for snappy feedback, then send to ruby
    window.setProperty(name, value, category, guid, function() {
        const obj = {name, value};
        if (category)
            obj.guid = guid;

        const callbackName = `set_${category ? (category + '_') : ''}property`;
        console.info(callbackName, obj);

        skpCallback(callbackName, JSON.stringify(obj));
    });
}

// Intercepts a logging function and forwards its arguments to a custom handler
//
// `logFunctionName`   name of one of the console logging functions (eg. 'info', 'warn', ...)
// `logHandler`        callback that takes the logging level and then the same arguments as the initial logging call

export function interceptLog(logFunctionName, logHandler)
{
    const logFunction = console[logFunctionName];
    console[logFunctionName] = (...args) =>
    {
        // Call the original log function
        logFunction.apply(console, args);

        // Call the custom log handler with the log level as the first argument and then the actual arguments
        logHandler(logFunctionName, ...args);
    }
}
