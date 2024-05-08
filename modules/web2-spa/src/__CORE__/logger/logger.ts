/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
let logger = {
  error: console.error,
  warn: console.warn,
  info: console.info,
  http: console.log,
  verbose: console.log,
  debug: console.debug,
};
export { logger };
