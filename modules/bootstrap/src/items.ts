/**
 * Usages:
 *  node ./entrypoint.ts --type=web2|desktop2
 */

import fs from "fs";
import path from "path";
import { getAppBootstrapInternalDir } from "./web2share-copy/appdir";
import { ModuleType } from "./constant";
import web2 from "./items/web2";
import desktop2 from "./items/desktop2";
import test2 from "./items/test2";

let runType: ModuleType | null = null;
process.argv.forEach((val, index) => {
  if (val.startsWith("--type=")) {
    runType = val.substr(7).trim() as any;
  }
});
export type TypeRunItem = {
  load: (dynamicMode: boolean) => any;
};
export let runItems: {
  [key: string]: TypeRunItem;
} = {
  web2: web2,
  desktop2: desktop2,
  test2: test2,
};
