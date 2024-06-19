// Date: Thu, 22 Feb 2024
// Author:
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import fs from "fs";
import path from "path";
import os from "os";
import fsutils from "./FileUtils";
import { isDevEnv, isTestEnv } from "./env";

let userHome = os.homedir();

export let getUserHomeDir: () => string = () => {
  return userHome;
};

export let getLafToolsDataDir = (): string => {
  let n = path.join(userHome, isTestEnv() ? '.test-mdgjx' : isDevEnv() ? '.dev-mdgjx' : '.mdgjx');
  return fsutils.mkdir(n);
};



export let getLafToolsExtDir = (): string => {
  if (isDevEnv()) {
    if (process.env.MDGJX_EXT_ROOT) {
      return path.join(process.env.MDGJX_EXT_ROOT,'extensions');
    }
  }
  let n = path.join(userHome, isTestEnv() ? '.test-mdgjx-extensions' : isDevEnv() ? '.dev-mdgjx-extensions' : '.mdgjx-extensions');
  return fsutils.mkdir(n);
};
