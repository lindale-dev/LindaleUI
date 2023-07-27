import ReactDOM from "react-dom/client";

// Waits for the page to be fully loaded before mounting a UI element

export function renderWhenLoaded(
  element: React.ReactElement,
  callback?: () => void,
) {
  window.addEventListener("load", () => {
    // Reacts discourages rendering directly at the body's root so we create a container for our dialog
    const container = document.createElement("div");
    container.id = "root";

    document.body.appendChild(container);

    // To this date, these types definitions are still missing from @types/react-dom
    /* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    // @ts-ignore
    const root = ReactDOM.createRoot(container);
    // @ts-ignore
    root.render(element);
    /* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

    if (callback) {
      callback();
    }
  });
}

// Intercepts a logging function and forwards its arguments to a custom handler
//
// `logFunctionName`   name of one of the console logging functions
// `logHandler`        callback that takes the logging level and then the same arguments as the initial logging call

export function interceptLog(
  logFunctionName: "log" | "debug" | "info" | "warn" | "error",

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logHandler: (level: string, ...args: any[]) => void,
) {
  const logFunction = console[logFunctionName];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console[logFunctionName] = (...args: any[]) => {
    // Call the original log function
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    logFunction(...args);

    // Call the custom log handler with the log level as the first argument and then the actual arguments
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    logHandler(logFunctionName, ...args);
  };
}
