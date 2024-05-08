import { DLinkType } from "../types";
import { getAppBootstrapInternalDir } from "../web2share-copy/appdir";
import path from "path";
import fs from "fs";
import { logger } from "../utils/logger";
import { getMinimalDIrPath } from "../items/web2";
import { readPkgInfoFromDir } from "../web2share-copy/pkginfo";
import { writeFileSync } from "fs";
import { ModuleType } from "../constant";
import fsutils from "../web2share-copy/FileUtils";
import { join } from "path";

export let getCurrentBootCheckedVersionFile = (
  moduleType: ModuleType,
  ver: string,
) => {
  return path.join(
    getCurrentBootCheckedVersionFolder(moduleType),
    ver + ".txt",
  );
};

export let getCurrentBootCheckedVersionFolder = (moduleType: ModuleType) => {
  return fsutils.mkdir(
    join(getAppBootstrapInternalDir(), "checked-" + moduleType),
  );
};
