// Intercepts a logging function and forwards its arguments to a custom handler
//
// `logFunctionName`   name of one of the console logging functions
// `logHandler`        callback that takes the logging level and then the same arguments as the initial logging call

export type LogLevel = "log" | "debug" | "info" | "warn" | "error";

export function interceptLog(
  logFunctionName: LogLevel,
  logHandler: (level: LogLevel, ...args: unknown[]) => void,
) {
  const logFunction = console[logFunctionName];

  console[logFunctionName] = (...args: unknown[]) => {
    // Call the original log function
    logFunction(...args);

    // Call the custom log handler with the log level as the first argument and then the actual arguments
    logHandler(logFunctionName, ...args);
  };
}
