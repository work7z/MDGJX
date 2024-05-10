// Date: Thu, 22 Feb 2024
// Author:
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import path from "path";
export type SystemEnvFlag = "development" | "production" | "test";

let envObj: { env: SystemEnvFlag } = {
  env: process.env.NODE_ENV as any,
};

export let markEnvAsDevForcibly = () => {
  envObj.env = "development";
};

export let getSysEnv = () => {
  return envObj.env;
};

export let isDevEnv = () => {
  return envObj.env === "development";
};

export let isTestEnv = () => {
  return envObj.env === "test";
};

export let isProductionEnv = () => {
  return envObj.env === "production";
};

export let getLafELB3Root = (): string => {
  return process.env["ELB3_ROOT"] || "unknowndir";
};

export let getPreCompiledDir = (): string => {
  let file = path.join(
    getLafELB3Root(),
    "precompiled",
    isDevEnv() ? "dev" : "prod",
  );
  return file;
};
