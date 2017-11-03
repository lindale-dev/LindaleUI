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

    const obj = {name, value};
    if (category)
        obj.guid = guid;

    const callbackName = `set_${category ? (category + '_') : ''}property`;
    console.info(callbackName, obj);

    skpCallback(callbackName, JSON.stringify(obj));
}
