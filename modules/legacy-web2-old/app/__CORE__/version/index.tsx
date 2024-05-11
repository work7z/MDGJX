import { sleep } from "@/app/[lang]/client/src/utils/SyncUtils";
import { logger } from "../logger/logger";
import kvUtils from "../utils/kvUtils";

logger.debug("version/index.ts loaded");

// 10 minutes
const VERSION_CHECK_INTERVAL = 10 * 60 * 1000;
const VERSION_JOB_KEY = "i8LHXGMl7";

// start checking reguarly
(async () => {
  // let crtJobKeyValue = Date.now() + "";
  // kvUtils.setKey(VERSION_JOB_KEY, crtJobKeyValue);
  // while (true) {
  //   try {
  //   //   let jobKeyValue = kvUtils.getKey(VERSION_JOB_KEY);
  //   //   if (jobKeyValue !== crtJobKeyValue) {
  //   //     logger.debug("Another version check job is running, skipping this one");
  //   //     break;
  //   //   }
  //   //   logger.debug("Checking for new version");
  //   // } catch (e) {
  //   //   logger.error(e);
  //   // }
  //   // await sleep(VERSION_CHECK_INTERVAL);
  // }
})();
