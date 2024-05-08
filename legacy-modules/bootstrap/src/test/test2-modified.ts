import { VAL_COMMON_MAP, getTestFlagTest2Launch } from "../common";
import { TypeRunItem } from "../items";
import { logger } from "../utils/logger";
import { writeFileSync } from "fs";
logger.debug("loaded modified version");

let flagFile = getTestFlagTest2Launch();
writeFileSync(flagFile, "modified");
