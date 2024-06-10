const _ = require("lodash");
const log = require("../common/log");
const fs = require("fs");
let concertoFilePath = _.trim(
  _.find(process.argv, (x) => x.startsWith("--concerto")).replace(
    "--concerto=",
    ""
  )
);
log.info("The Concerto Configuration", concertoFilePath);
let appUtils = {
  getConfigObject() {
    return require(concertoFilePath);
  },
  modifyConfigIfHas(fn) {
    let obj = appUtils.getConfigObject();
    fn(obj);
    log.info("Updating the message: ", obj.message);
    fs.writeFileSync(concertoFilePath, JSON.stringify(obj));
  },
};

module.exports = appUtils;
