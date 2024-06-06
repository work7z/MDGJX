// Date: Thu, 22 Feb 2024
// Author:
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

export type SystemEnvFlag = 'development' | 'production' | 'test';

let envObj: { env: SystemEnvFlag } = {
  env: import.meta.env.NODE_ENV as any,
};

export let markEnvAsDevForcibly = () => {
  envObj.env = 'development';
};

export let getSysEnv = () => {
  return envObj.env;
};

const isDevEnvVal = location.href.indexOf('http://127.0.0.1:5173') != -1;
export let isDevEnv = () => {
  return isDevEnvVal;
};

export let isTestEnv = () => {
  return envObj.env === 'test';
};

export let isProductionEnv = () => {
  return envObj.env === 'production';
};

export let getLafELB3Root = (): string => {
  return '';
};
