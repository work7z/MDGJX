import { DLinkType } from "./types";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import path from "path";
import fs from "fs";
import { logger } from "./utils/logger";
import { getMinimalDIrPath } from "./items/web2";
import { readPkgInfoFromDir } from "./web2share-copy/pkginfo";
import { writeFileSync } from "fs";
import { ModuleType } from "./constant";
import fsutils from "./web2share-copy/FileUtils";
import { join } from "path";

export let confirmDLinkConfig = (
  moduleType: ModuleType,
  newValDLink: DLinkType,
) => {
  let currentBootConfig = getCurrentBootConfigFileWithCurrentVer(moduleType);
  writeFileSync(currentBootConfig, JSON.stringify(newValDLink, null, 4));
};
export let getOriginalLaunchVersion = () => {
  let originalLafVersion = process.env.ORIGIN_LAF_VERSION;
  logger.debug("originalLafVersion: " + originalLafVersion);
  return originalLafVersion;
};
export let getParentRootVersion = (): string | null => {
  // get arg value from --root-version=xxx
  let rootVersion = process.argv.find((arg) =>
    arg.startsWith("--root-version="),
  );
  if (rootVersion) {
    rootVersion = rootVersion.split("=")[1];
    logger.debug("rootVersion: " + rootVersion);
    return rootVersion;
  } else {
    logger.debug("no rootVersion found");
    return null;
  }
};
export let getCurrentBootConfigFileWithCurrentVer = (
  moduleType: ModuleType,
) => {
  let bootStrapInternalDir = getAppBootstrapInternalDir();
  let pkgInfo = readPkgInfoFromDir(getMinimalDIrPath());
  let finalVersion = pkgInfo.version;
  let rootVer = getParentRootVersion();
  if (rootVer) {
    finalVersion = rootVer;
  }
  logger.debug("finalVersion: " + finalVersion);
  let currentBootConfig = path.join(
    bootStrapInternalDir,
    `dlink-${moduleType}-${finalVersion}.json`,
  );
  return currentBootConfig;
};
export let deleteDLinkConfig = (moduleType: ModuleType) => {
  let currentBootConfig = getCurrentBootConfigFileWithCurrentVer(moduleType);
  if (fs.existsSync(currentBootConfig)) {
    fs.unlinkSync(currentBootConfig);
  }
};
export let getDLinkConfig = (moduleType: ModuleType): DLinkType | null => {
  let currentBootConfig = getCurrentBootConfigFileWithCurrentVer(moduleType);
  if (fs.existsSync(currentBootConfig)) {
    let dlink: DLinkType = JSON.parse(
      fs.readFileSync(currentBootConfig, "utf-8"),
    );
    return dlink;
  } else {
    logger.error("no available dlink.json");
  }
  return null;
};
