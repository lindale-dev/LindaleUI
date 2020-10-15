/////////////// JS-RUBY BRIDGE /////////////

let callback_busy = false;
let callback_queue = [];

export default window.skpCallback = function(callback_name, params)
{
    if (typeof(callback_name) !== 'string')
    {
        console.error(`skpCallback: arg 0 invalid, type is ${typeof(callback_name)}, must be string`);
        return;
    }

    if (params !== undefined && typeof(params) !== 'object')
    {
        console.error(`skpCallback: arg 1 invalid, type is ${typeof(params)}, must be object`);
        return;
    }

    let callback =
    {
        name: callback_name,
        params: params ? JSON.stringify(params) : null
    };

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
