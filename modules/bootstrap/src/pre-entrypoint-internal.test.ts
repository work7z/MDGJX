import { expect, test } from "vitest";
import { runItems } from "./items";
import {
  extractTempFileAndConfirmIt,
  downloadByPkgInfo,
  getLatestVersionResponse,
  getReleaseDateTxtInFolder,
} from "./items/web2";
import { computeHash } from "./utils/hash";
import path from "path";
import { logger } from "./utils/logger";
import { PkgDownloadInfo } from "./web2share-copy/server_constants";
import {
  confirmDLinkConfig,
  deleteDLinkConfig,
  getCurrentBootConfigFileWithCurrentVer,
  getDLinkConfig,
} from "./fn";
import { internalRun } from "./internal-run";
import { writeFileSync } from "fs";
import { DLinkType } from "./types";
import { getTestFlagTest2Launch } from "./common";
import {
  fn_runtype_dynamic_load,
  getFileDistDir,
} from "./pre-entrypoint-internal";
import fs from "fs";

let sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

test(
  "test-version-switch",
  async () => {
    console.log("where i am: " + getFileDistDir());
    let testFlagFile = getTestFlagTest2Launch();
    // delete if have
    deleteDLinkConfig("test2");
    writeFileSync(testFlagFile, "");
    // original ver
    console.log("original ver:");
    fn_runtype_dynamic_load("test2");
    await sleep(3000);
    // verify the content
    let testFlagFileCtn = fs.readFileSync(testFlagFile, "utf-8");
    // expect to be origin
    expect(testFlagFileCtn).toBe("origin");

    // update version
    let loadPath = path.join(getFileDistDir(), "test", "test2-modified.js");
    logger.debug("loadPath: " + loadPath);
    let newValDLink: DLinkType = {
      fromVersion: "origin-ver",
      toVersion: "modified-ver",
      dateTime: new Date().getTime() + "",
      loadPath: loadPath,
    };
    confirmDLinkConfig("test2", newValDLink);
    // modified ver
    console.log("modified ver:");
    fn_runtype_dynamic_load("test2");

    await sleep(3000);
    // verify the content
    let testFlagFileCtn2 = fs.readFileSync(testFlagFile, "utf-8");
    // expect to be origin
    expect(testFlagFileCtn2).toBe("modified");
  },
  {
    timeout: 20000,
  },
);
