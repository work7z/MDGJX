import { join } from "path";
import fs from "fs";
import _ from "lodash";

export type PkgInfo = {
  version: string;
  releaseDate: string;
  platform: string;
};

export let readPkgInfoFromDir = (dir: string): PkgInfo => {
  let infoDIR = join(dir, "info");
  let versionTxt = fs.readFileSync(join(infoDIR, "version.txt"), "utf-8");
  let releaseDateTxt = fs.readFileSync(
    join(infoDIR, "releaseDate.txt"),
    "utf-8",
  );
  let platformTxt = fs.readFileSync(join(infoDIR, "platform.txt"), "utf-8");
  return {
    version: _.trim(versionTxt),
    releaseDate: _.trim(releaseDateTxt),
    platform: _.trim(platformTxt),
  };
};
