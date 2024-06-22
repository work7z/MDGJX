export type MiaodaDyanmicMenuItem = {
  id: string;
  icon?: any;
  name: string;
  disableFooter?: boolean;
  children?: MiaodaDyanmicMenuItem[];
};

export type MiaodaBasicConfig = {
  disabled?: boolean;
  cwd?: string; // by default, it's $MDGJX_EXT_PATH/$id unless you have a dedicated path
  id: string;
  version: string;
  logo: string;
  name: string;
  shortDesc: string;
  description: string;
  authors?: string[];
  homepage?: string[];
  development: {
    entryLink: string;
  };
  runtime: {
    type: "web-static-embedded" | "web-static-standalone";
    standalone?: {
      ports: number[]; // attempt to host the static files on these ports
      onlineURL: string; // where the static files are hosted online
    };
    embedded?: {
      // 对于embedded应用来说，baseURL 将会是 id + @version， 如果https://mdgjx.com/extview/xxx@1.0/index.html
      staticDirs: string[];
    };
  };
  keywords?: string[];
  include: string[];
  menus: MiaodaDyanmicMenuItem[];
};

export const REGISTER_CONFIG_OBJ: MiaodaBasicConfig[] = [];

export const fn_miaoda_registerConfig = (config: MiaodaBasicConfig) => {
  REGISTER_CONFIG_OBJ.push(config);
  return config;
};
