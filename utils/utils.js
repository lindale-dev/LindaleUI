// Wait for the page to be fully loaded before mounting a UI element

import ReactDOM from 'react-dom';

export function renderWhenLoaded(element, callback)
{
    window.addEventListener('load', () => {

        // Reacts discourages rendering directly at the body's root so we create a container for our dialog
        const container = document.createElement('div');
        container.id = 'main-container';

        document.body.appendChild(container);

        ReactDOM.render(element, container);

        if (callback)
        {
            callback();
        }
    })
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
