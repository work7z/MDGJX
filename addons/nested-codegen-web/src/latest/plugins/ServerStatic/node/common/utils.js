const _ = require("lodash");
const log4js = require("log4js");
const fs = require("fs");
const path = require("path");
let logger = log4js.getLogger("system");
logger.level = "debug";

const common_utils = {
  init: {
    getAllFileInfo() {
      let config_file = process.argv[2];
      if (_.isNil(config_file)) {
        config_file =
          "/Users/jerrylai/mincontent/PersonalProjects/denote-fe/public_repository/server/node/ServerStatic/test/test_config.json";
        common_utils.fs.copy(
          `/Users/jerrylai/mincontent/PersonalProjects/denote-fe/public_repository/server/node/ServerStatic/test/test_status_example.json`,
          "/Users/jerrylai/mincontent/PersonalProjects/denote-fe/public_repository/server/node/ServerStatic/test/test_status.json"
        );
      }
      common_utils.log.info(`Found config file: ${config_file}`);
      let config_file_json = require(config_file);
      common_utils.log.debug(`Config File Content`, config_file_json);
      let status_file = config_file_json["statusFile"];
      common_utils.log.info(`Found status file: ${status_file}`);
      let status_file_json = require(status_file);
      common_utils.log.debug(`Status File Content`, status_file_json);
      return {
        fn_save_status_file: () => {
          status_file_json.updateTime = new Date().getTime();
          common_utils.fs.write_json_to_file(status_file, status_file_json);
        },
        status_file_json,
        status_file,
        config_file,
        config_file_json,
      };
    },
  },
  log: logger,
  fs: {
    copy(a, b) {
      if (fs.existsSync(b)) {
        fs.rmSync(b);
      }
      common_utils.fs.write_str_to_file(
        b,
        common_utils.fs.read_str_from_file(a)
      );
    },
    read_str_from_file(a) {
      return fs.readFileSync(a, { encoding: "utf-8" });
    },
    write_str_to_file(file_path, str) {
      // common_utils.log.debug(
      //   `writing str to file, ${file_path}, content: ${str}`
      // );
      fs.writeFileSync(file_path, str);
    },
    write_json_to_file: (file_path, file_json_obj) => {
      // common_utils.log.debug(`writing JSON to file, ${file_path}`);
      common_utils.fs.write_str_to_file(
        file_path,
        JSON.stringify(file_json_obj, 0, 2)
      );
    },
  },
};

module.exports = common_utils;
