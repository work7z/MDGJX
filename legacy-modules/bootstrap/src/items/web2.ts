import { TypeRunItem } from "../items";
import path from "path";
import { core_sendAPIRequestInBE } from "../web2share-copy/api";
import { isDevEnv, isTestEnv } from "../web2share-copy/env";
import {
  getAppBootstrapImplDir,
  getAppBootstrapImplWeb2Dir,
  getAppBootstrapInternalDir,
  getAppBootstrapTempDir,
} from "../web2share-copy/appdir";
import { writeFileSync } from "fs";
import { PkgInfo, readPkgInfoFromDir } from "../web2share-copy/pkginfo";
import {
  URL_RELEASE_GET_ALL,
  URL_RELEASE_GET_LATEST,
} from "../web2share-copy/server_urls";
import {
  PkgDownloadInfo,
  ReleaseLatestResponse,
  SysResponse,
} from "../web2share-copy/server_constants";
import { DLinkType, IsCurrentServerMode } from "../types";
import crypto from "crypto";
import { isDebugMode, logger } from "../utils/logger";
import fs from "fs";
import stream from "stream";
import { computeHash } from "../utils/hash";
import compressUtils from "../utils/compressUtils";
import shelljs from "shelljs";
import {
  confirmDLinkConfig,
  getCurrentBootConfigFileWithCurrentVer,
  getDLinkConfig,
} from "../fn";
import { getLafToolsDataDir } from "../web2share-copy/homedir";
import { join } from "lodash";
import { getBootstrapUpdateReloadFile } from "../common";
import { getCurrentBootCheckedVersionFile } from "../fndir/vercheck";
import { getLAFRegion } from "../web2share-copy/api_constants";
let bootstrapInternalDir = getAppBootstrapInternalDir();
let bootStrapImplWeb2Dir = getAppBootstrapImplWeb2Dir();
let tempDir = getAppBootstrapTempDir();

let debugMode = isDebugMode(); // TODO: just mark it as debug for now
if (debugMode) {
  logger.debug("debug mode is enabled");
} else {
  logger.debug("debug mode is disabled");
}
let waitTime = debugMode ? 10000 : 10 * 60 * 1000;
let currentDIRName = __dirname;
export let getMinimalDIrPath = () => {
  return isDevEnv() || isTestEnv()
    ? path.join(currentDIRName, "..", "..", "testdata")
    : path.join(currentDIRName, "..", "..");
};
let minimalDIRPath = getMinimalDIrPath();
logger.debug("minimalDIRPath: " + minimalDIRPath);
let currentPkgInfo = readPkgInfoFromDir(minimalDIRPath);

export let getLatestVersionResponse = async (): Promise<
  SysResponse<ReleaseLatestResponse>
> => {
  let lang = process.env.APPLANG || "en_US";
  // go to check
  // TODO: actually, lang is not required in backstaged jobs. If users wanna check release notes, the lang can be selected in the page rather than this job
  let r = await core_sendAPIRequestInBE(
    {
      lang: lang,
      version: currentPkgInfo.version,
      platform: currentPkgInfo.platform,
      region: getLAFRegion(lang),
    },
    URL_RELEASE_GET_LATEST,
    {},
  );
  let json = await r.json();
  return json as SysResponse<ReleaseLatestResponse>;
};

export let getRunScriptNameByPlatform = (platform: string) => {
  let pkgInfo = { platform };
  return pkgInfo.platform == "windows-x64" ||
    pkgInfo.platform == "windows-arm64"
    ? "run.bat"
    : "run.sh";
};
export let getReleaseDateTxtInFolder = (folder: string): string[] => {
  let mFolder = shelljs.find(folder);
  if (!mFolder) {
    return [];
  }
  if (!mFolder.filter) {
    return [];
  }
  return (
    mFolder &&
    mFolder.filter((x) => {
      return x.indexOf("releaseDate.txt") !== -1;
    })
  );
};

export let quitAndRestart = () => {
  logger.info("quit and restart");
  let reloadFile = getBootstrapUpdateReloadFile("web2");
  fs.writeFileSync(reloadFile, "1");
  process.exit(0);
};

export let cleanOldUnusedFiles = async (reversedVersions: string[]) => {
  logger.info("cleanOldUnusedFiles: " + reversedVersions.join(","));
  // clean temp dir
  let tempDir = getAppBootstrapTempDir();
  logger.info("will clean temp dir: " + tempDir);
  if (fs.existsSync(tempDir)) {
    // delete all files under tempDir
    shelljs.ls(tempDir).forEach((f) => {
      logger.info("cleaned temp file: " + f);
      shelljs.rm("-rf", f);
    });
  }
  let implWeb2Dir = getAppBootstrapImplWeb2Dir();
  logger.info("will clean implWeb2Dir dir: " + implWeb2Dir);
  shelljs.ls(implWeb2Dir).forEach((f) => {
    if (reversedVersions.indexOf(f) === -1) {
      logger.info("cleaned implWeb2Dir file: " + f);
      shelljs.rm("-rf", f);
    }
  });
};

export let extractTempFileAndConfirmIt = async (
  currentTempFile: string,
  latestInfo: PkgDownloadInfo,
) => {
  let version = latestInfo.version;
  let currentPlatform = currentPkgInfo.platform;
  let currentImplDir = bootStrapImplWeb2Dir;
  let saveToWhere = path.join(bootStrapImplWeb2Dir, version);
  await compressUtils.decompress(currentTempFile, saveToWhere);
  let releaseDateFile: string | null = null;
  // iterate all files in saveToWhere until got the runScript
  let releaseDateTxtFileList = getReleaseDateTxtInFolder(saveToWhere);
  logger.info("get releasedate txt file:" + releaseDateTxtFileList);
  if (releaseDateTxtFileList.length == 0) {
    throw new Error("releaseDate.txt not found");
  }
  let finalLoadFilePath = path.join(
    releaseDateTxtFileList[0],
    "..",
    "..",
    "boot",
    "entrypoint.js",
  );
  let newValDLink: DLinkType = {
    fromVersion: currentPkgInfo.version,
    toVersion: latestInfo.version,
    dateTime: new Date().getTime() + "",
    loadPath: finalLoadFilePath,
  };
  confirmDLinkConfig("web2", newValDLink);
};

export let downloadByPkgInfo = async (latestInfo: PkgDownloadInfo) => {
  logger.info("downloadByPkgInfo: " + JSON.stringify(latestInfo));
  let currentPlatform = currentPkgInfo.platform;
  let l_fileName = latestInfo.fileName;
  let l_pkgURL = latestInfo.pkgURL;
  let randomSTR = parseInt(Math.random() * 1000 + "");
  let l_version = latestInfo.version;
  let sha256SumURL = latestInfo.sha256SumURL;
  let currentTempFile = path.join(
    tempDir,
    Date.now() + "-" + randomSTR + "-" + l_fileName,
  );
  logger.info("currentTempFile", currentTempFile);
  // download l_pkgURL to currentTempFile by using fetch and fs
  let sha256Res = await fetch(sha256SumURL);
  let sha256Text = await sha256Res.text();
  logger.info("sha256Text", sha256Text);
  // exact sha256 from sha256Text
  let expect_findSHA256Value: string | null = null;
  sha256Text.split("\n").every((line) => {
    logger.info("line: ", line);
    if (line.trim() == "") {
      return true;
    }
    let [sha256, fileName] = line.split("  ");
    sha256 = sha256.trim();
    fileName = fileName.trim();
    logger.info(`read sha256: ${sha256}, fileName: ${fileName}`);
    if (fileName == l_fileName) {
      expect_findSHA256Value = sha256;
      logger.info("detected l_fileName: " + l_fileName);
      return false;
    }
    return true;
  });
  if (!expect_findSHA256Value) {
    throw new Error("sha256 not found");
  } else {
    logger.info("expect sha256:" + expect_findSHA256Value);
  }
  let fetchRes = await fetch(l_pkgURL);
  logger.info(`fetch URL: ${fetchRes.url}, status: ${fetchRes.status}`);
  logger.info(`will download to ${currentTempFile}`);
  if (!fetchRes.ok) {
    logger.error("failed to fetch: " + fetchRes.url);
    throw new Error("fetch failed");
  } else {
    logger.info("fetch basic info success");
  }
  logger.info("reading arrayBuffer...");
  let buffer = await fetchRes.arrayBuffer();
  writeFileSync(currentTempFile, Buffer.from(buffer));

  logger.info("OK, downloaded to " + currentTempFile);
  // do sha256 sum check for currentTempFile
  let actual_sha256Value = await computeHash(currentTempFile);
  logger.info(
    "computed SHA256, expect: " +
      expect_findSHA256Value +
      " actual: " +
      actual_sha256Value,
  );

  if (actual_sha256Value != expect_findSHA256Value) {
    logger.error(
      "sha256 not match, expect: " +
        expect_findSHA256Value +
        ", actual: " +
        actual_sha256Value,
    );
    throw new Error("sha256 not match");
  } else {
    logger.info("sha256 match");
  }

  return currentTempFile;
};

export let job_runVersionCheck = async () => {
  if (IsCurrentServerMode()) {
    logger.debug("skip checking in online mode");
    return;
  }
  while (true) {
    logger.debug(
      "checking version... btw, current pkgInfo info: " +
        JSON.stringify(currentPkgInfo),
    );
    try {
      let latestVerRes = await getLatestVersionResponse();
      logger.debug("checking version result: " + JSON.stringify(latestVerRes));
      if (latestVerRes && latestVerRes.content.anyUpdate) {
        let latestInfo = latestVerRes.content.updateInfo.latest;
        let newVer = latestInfo.version;
        if (newVer.indexOf("-") === -1 || debugMode) {
          let f = getCurrentBootCheckedVersionFile("web2", newVer);
          if (fs.existsSync(f)) {
            logger.debug("already updated, ignore this update. file: " + f);
          } else {
            // ignore beta or other version
            logger.info("latest version: " + newVer);
            // STEP-1: download the latest version
            let finalFile = await downloadByPkgInfo(latestInfo);
            // STEP-2: extract the file and confirm it
            await extractTempFileAndConfirmIt(finalFile, latestInfo);
            // STEP-3: clean old unused files
            await cleanOldUnusedFiles([newVer, currentPkgInfo.version]);
            // STEP-4: mark the file as resolved, means everything is ok to proceed with
            fs.writeFileSync(f, "ts-" + Date.now());
            logger.info("update done, will restart this process now");
            await quitAndRestart();
          }
        } else {
          logger.debug(
            "ignore this update: " +
              newVer +
              " since it's not a stable version",
          );
        }
      } else {
        logger.debug("has no update");
      }
    } catch (e) {
      logger.error("an error occurred in job_runVersionCheck");
      logger.error("contain version check error:" + e);
      // sleep 10 minutes since it's not a critical error
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
    // sleep 10 minutes
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
};

let item: TypeRunItem = {
  load: (dynamicMode: boolean) => {
    logger.debug("entrypoint", bootstrapInternalDir);

    let defaultServerEntry = path.join(minimalDIRPath, "core", "server.js");

    // start launching the server
    require(defaultServerEntry);

    job_runVersionCheck();
  },
};
export default item;
