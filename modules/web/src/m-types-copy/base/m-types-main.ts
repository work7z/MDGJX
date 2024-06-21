
export type MiaodaDyanmicMenuItem = {
  id: string;
  icon?: any;
  name: string;
  disableFooter?: boolean;
  children?: MiaodaDyanmicMenuItem[];
};


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
    setup: {
      dev: string;
      prod: string;
    };
    run: {
      dev: string;
      prod: string;
    };
  };
  keywords?: string[];
  include: string[];
  menus: []
};


export const REGISTER_CONFIG_OBJ:MiaodaBasicConfig[] = []

export const fn_miaoda_registerConfig = (config: MiaodaBasicConfig) => {
  REGISTER_CONFIG_OBJ.push(config)
  return config;
};
