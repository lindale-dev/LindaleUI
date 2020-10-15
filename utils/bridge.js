/////////////// JS-RUBY BRIDGE /////////////

let callback_busy = false;
let callback_queue = [];

export default window.skpCallback = function(callback_name, params)
{
    let callback = {};
    callback['name'] = callback_name;
    callback['params'] = params ? JSON.stringify(params) : null;
    callback_queue.push(callback);
    skpPumpCallback();
}

function skpPumpCallback()
{
    if (!callback_busy && callback_queue.length > 0)
    {
        let callback = callback_queue.shift();
        skpPushCallback(callback);
    }
}

function skpPushCallback(callback)
{
    callback_busy = true;
    if (typeof window['sketchup'] !== 'undefined')
    {
        // HtmlDialog
        if (typeof window['sketchup'][callback['name']] !== 'undefined')
        {
            window['sketchup'][callback['name']](callback['params']);
        }
    }
    else
    {
        // WebDialog
        window.location = 'skp:' + callback['name'] + '@' + callback['params'];
    }
}

// Called from Ruby
window.skpCallbackReceived = function()
{
    callback_busy = false;
    skpPumpCallback();
}
