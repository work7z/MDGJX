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
import { internalRun } from "./internal-run";

let runType: ModuleType | null = "web2";
internalRun(runType);
