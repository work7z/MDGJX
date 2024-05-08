import { join } from "path";
import { getLafToolsDataDir } from "./web2share-copy/homedir";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import { ModuleType } from "./constant";

export let VAL_COMMON_MAP: { [key: string]: string } = {};

export let getTestFlagTest2Launch = (): string => {
  return join(getLafToolsDataDir(), "test-flag.txt");
};

export let getBootstrapUpdateReloadFile = (type: ModuleType) => {
  return join(getAppBootstrapInternalDir(), "reload-flag" + type + ".txt");
};
