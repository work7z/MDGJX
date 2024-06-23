export type MiaodaDyanmicMenuItem = {
  id: string;
  icon?: any;
  name: string;
  disableFooter?: boolean;
  children?: MiaodaDyanmicMenuItem[];
  belongTo?: "tools" | "docs" | "resources" // children will be effetive also if its parent has set this field
};


export type SubToolItem = {
    name: string,
    searchKW?: string,
    isNew: boolean,
    path: string,
    id?: string,
    description: string,
    keywords: string[],
    icon?: {
        name?: string
    },
    redirectFrom?: string[],
    createdAt?: string
}
export type ToolNavInfoType = {
    name: string,
    icon?: any,
    id: string,
    iconInStr: string,
    defaultSubToolId?: string,
    bodyFnIfHave?: LoadModuleType,
    subTools?: SubToolItem[]
}


export type LoadModuleType = () => any;
export type SystemSubModuleItem = {
  id: string;
  icon?: any;
  href?: string;
  firstRouteId?: string;
  iconInStr?: string;
  rootMainModuleId?: string;
  name: string;
  seoName?: string;
  disableFooter?: boolean;
  defaultSubToolId?: string;
  children?: SystemSubModuleItem[];
  keywords?: string[];
  description?: string;
  ignoreInNav?: boolean;
  bodyFn?: LoadModuleType;
};
export type SystemModuleItem = {
  id: string;
  icon?: any;
  label: string;
  defaultHref: string;
  hide?: boolean;
  fixedAtBottom?: boolean;
  children?: SystemSubModuleItem[];
};
export type RedirectLinkItem = {
  path: string;
  url: string;
};
export const redirectLinks: RedirectLinkItem[] = [];


export type MiaodaBasicConfig = {
  disabled?: boolean;
  cwd?: string; // by default, it's $MDGJX_EXT_PATH/$id unless you have a dedicated path
  post_fullId?: string;
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
      baseUrl?: string
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
