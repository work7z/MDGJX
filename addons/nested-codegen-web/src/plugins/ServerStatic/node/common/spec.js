const _ = require("lodash");
const common_utils = require("./utils");

function fn_create_api_spec_inst(args) {
  common_utils.log.info(`received args: ${process.argv}`);
  return args;
}

module.exports = {
  fn_create_api_spec_inst,
};
