export type MiaodaBasicConfig = {
  mode: string;
  disabled?: boolean;
  cwd?: string; // by default, it's $MDGJX_EXT_PATH/$id unless you have a dedicated path 
  id: string;
  version: string;
  logo: string;
  name: string;
  shortDesc: string;
  description: string;
  development: {
    entryLink: string;
  };
  menus: string;
  init: {
    dev: string;
    build: string;
  };
  start: {
    dev: string;
    build: string;
  };
  keywords?: string[];
  include: string[];
};


export const fn_miaoda_registerConfig = (config: MiaodaBasicConfig) => {
  console.log(JSON.stringify(config, null, 2));
  return config;
};
