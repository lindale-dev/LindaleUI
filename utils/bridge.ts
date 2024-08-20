/* eslint-disable */

// JS-RUBY BRIDGE

declare global {
  interface Window {
    set_state: (json: string) => void;
    sketchup: any;
    skpCallback: any;
    skpCallbackReceived: any;
  }
}

type Callback = {
  name: string;
  params?: string;
};

let callbackBusy = false;
let callbackQueue: Callback[] = [];

export default window.skpCallback = function (
  callbackName: string,
  params?: any,
) {
  console.info(`skpCallback: ${callbackName}, ${JSON.stringify(params)}`);

  if (typeof callbackName !== "string") {
    console.error(
      `skpCallback: arg 0 invalid, type is ${typeof callbackName}, must be string`,
    );
    return;
  }

  if (params !== undefined && typeof params !== "object") {
    console.error(
      `skpCallback: arg 1 invalid, type is ${typeof params}, must be object`,
    );
    return;
  }

  const callback = {
    name: callbackName,
    params: params ? JSON.stringify(params) : undefined,
  };

  callbackQueue.push(callback);

  skpPumpCallback();
};

function skpPumpCallback() {
  if (!callbackBusy && callbackQueue.length > 0) {
    let callback = callbackQueue.shift();
    skpPushCallback(callback);
  }
}

function skpPushCallback(callback: any) {
  callbackBusy = true;
  if (typeof window["sketchup"] !== "undefined") {
    // HtmlDialog
    if (typeof window["sketchup"][callback["name"]] !== "undefined") {
      window["sketchup"][callback["name"]](callback["params"]);
    }
  } else {
    // WebDialog
    window.location.href = "skp:" + callback["name"] + "@" + callback["params"];
  }
}

// Called from Ruby
window.skpCallbackReceived = function () {
  callbackBusy = false;
  skpPumpCallback();
};
