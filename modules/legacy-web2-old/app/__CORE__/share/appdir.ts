// Date: Thu, 22 Feb 2024
// Author:
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import path from "path";
import { getLafToolsDataDir } from "./homedir";
import { isDevEnv } from "./env";
import fsutils from "./FileUtils";
import { join } from "path";

export let getAppDataInternalDir = (): string => {
  return fsutils.mkdir(path.join(getLafToolsDataDir(), "data"));
};

export let getAppBootstrapInternalDir = (): string => {
  return fsutils.mkdir(path.join(getLafToolsDataDir(), "bootstrap"));
};

export let getAppBootstrapImplDir = (): string => {
  return fsutils.mkdir(path.join(getAppBootstrapInternalDir(), "impl"));
};

export let getAppBootstrapTempDir = (): string => {
  return fsutils.mkdir(path.join(getAppBootstrapInternalDir(), "temp"));
};

export let getAppBootstrapImplWeb2Dir = (): string => {
  return fsutils.mkdir(path.join(getAppBootstrapImplDir(), "web2"));
};
export let getAppBootstrapImplDesktop2Dir = (): string => {
  return fsutils.mkdir(path.join(getAppBootstrapImplDir(), "desktop"));
};

export let getAppLogInternalDir = (): string => {
  return fsutils.mkdir(path.join(getLafToolsDataDir(), "logs"));
};

export let getAppDatabaseMainFile = () => {
  return path.join(getAppDataInternalDir(), "app.db");
};

export let getAppDatabaseVerFile = () => {
  return fsutils.mkdir(path.join(getAppDataInternalDir(), "app.ver"));
};

export let getAppDataTestKVDir = () => {
  if (!isDevEnv()) {
    // throw new Error('[ERROR:dyLeCZv0g]')
  }
  return fsutils.mkdir(path.join(getAppDataInternalDir(), "_kv"));
};
