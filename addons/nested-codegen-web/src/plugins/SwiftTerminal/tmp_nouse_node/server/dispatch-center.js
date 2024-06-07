/**
 * communication between webview and app
 * run functions in seprate process, avoid using electron.remote directly
 */

const log = require("../common/log");
const { getConfigObject } = require("../very/appUtils");

global.upgradeInsts = {};

// for remote sessions
global.sessions = {};

let tmpConfig = getConfigObject();
function verify(req) {
  const { token } = req.query;
  if (tmpConfig.token != token) {
    log.error("Invalid Token: ", token);
    throw new Error("not valid request");
  }
}

const initWs = function (app) {};

exports.verifyWs = verify;
exports.initWs = initWs;
