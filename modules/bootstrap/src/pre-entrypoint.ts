import child_process from "child_process";
import { join } from "path";
import fs from "fs";
import { logger } from "./utils/logger";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import { ModuleType } from "./constant";
import { fn_runtype_dynamic_load } from "./pre-entrypoint-internal";

fn_runtype_dynamic_load("web2");
// keep alive
setInterval(() => {}, 1000 * 60 * 60);
