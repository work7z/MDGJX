/**
 * Usages:
 *  node ./entrypoint.ts --type=web2|desktop2|bootstrap
 */

import fs from "fs";
import path from "path";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import { ModuleType } from "./constant";
import web2 from "./items/web2";
import desktop2 from "./items/desktop2";
import { runItems } from "./items";
import { DLinkType, IsCurrentServerMode } from "./types";
import { logger } from "./utils/logger";
import { getDLinkConfig } from "./fn";
import child_process from "child_process";

export let internalRun = (runType: ModuleType | null) => {
  let runItem = runItems[runType];
  if (!runItem) {
    logger.error("Invalid runType", runType);
    process.exit(1);
  }
  let bootStrapInternalDir = getAppBootstrapInternalDir();
  // mkdir if not exist
  if (!fs.existsSync(bootStrapInternalDir)) {
    fs.mkdirSync(bootStrapInternalDir, { recursive: true });
  }

  // write timestamp to log
  logger.info("start entrypoint");

  runItem.load(false);
};
