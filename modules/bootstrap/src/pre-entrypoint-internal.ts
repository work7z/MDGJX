import child_process from "child_process";
import { join } from "path";
import fs from "fs";
import { logger } from "./utils/logger";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import { ModuleType } from "./constant";
import _ from "lodash";
import { IsCurrentServerMode } from "./types";
import { getDLinkConfig } from "./fn";
import { isProductionEnv } from "./web2share-copy/env";
import { getBootstrapUpdateReloadFile } from "./common";
import { readPkgInfoFromDir } from "./web2share-copy/pkginfo";
import { getMinimalDIrPath } from "./items/web2";

let nodeBIN = process.execPath;
export let getFileDistDir = () => {
  return isProductionEnv() ? __dirname : join(__dirname, "..", "dist");
};
let distDIR = getFileDistDir();

let typeDefaultSets: { type: ModuleType; defaultPath: string }[] = [
  {
    type: "web2",
    defaultPath: join(distDIR, "entrypoint.js"),
  },
  {
    type: "test2",
    defaultPath: join(distDIR, "items", "test2.js"),
  },
];
logger.debug("__dirname: " + __dirname);

export let fn_runtype_dynamic_load = (runType: ModuleType) => {
  let spawn = child_process.spawn;
  let typeDefault = _.find(typeDefaultSets, (item) => {
    return runType == item.type;
  });
  if (!typeDefault) {
    logger.error(`Invalid runType: ${runType}`);
    process.exit(1);
  }

  let loadFile = typeDefault.defaultPath;
  if (!IsCurrentServerMode()) {
    try {
      let dlink = getDLinkConfig(runType);
      if (dlink) {
        if (dlink.loadPath) {
          if (fs.existsSync(dlink.loadPath)) {
            logger.info(`Found dlink.loadPath: ${dlink.loadPath}`);
            loadFile = dlink.loadPath;
          } else {
            logger.warn(
              "dlink.loadPath not found: " +
                dlink.loadPath +
                ", hence it will be skipped",
            );
          }
        }
      }
    } catch (e) {
      logger.error(e);
    }
  }

  let pkgInfo = readPkgInfoFromDir(getMinimalDIrPath());

  const spawnFN = spawn(nodeBIN, [
    loadFile,
    "--root-version=" + pkgInfo.version,
  ]);
  logger.info(`Running entrypoint: ${loadFile}, path: ${nodeBIN}`);

  spawnFN.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  spawnFN.stderr.on("data", (data) => {
    console.log(`${data}`);
  });

  spawnFN.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    let reloadFile = getBootstrapUpdateReloadFile(runType);
    if (fs.existsSync(reloadFile)) {
      logger.info(`Reloading entrypoint: ${loadFile}`);
      fs.unlinkSync(reloadFile);
      fn_runtype_dynamic_load(runType);
    } else {
      if (code != 0) {
        logger.warn(
          `child process exited with code ${code}, need to check it why it failed.`,
        );
        logger.info(
          "restarting the child_process as the duty of daemon process",
        );
        setTimeout(() => {
          fn_runtype_dynamic_load(runType);
        }, 2000);
      } else {
        logger.info(
          `No reload file found: ${reloadFile}, will end the process.`,
        );
      }
    }
  });
};
