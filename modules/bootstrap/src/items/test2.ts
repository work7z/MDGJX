import { VAL_COMMON_MAP, getTestFlagTest2Launch } from "../common";
import { TypeRunItem } from "../items";
import { logger } from "../utils/logger";
import { writeFileSync } from "fs";
VAL_COMMON_MAP["test2"] = "this is origin";

logger.debug("loaded original version");

let flagFile = getTestFlagTest2Launch();
writeFileSync(flagFile, "origin");
