export type MiaodaDyanmicMenuItem = {
} & SystemSubModuleItem;


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
  belongTo?: "tools" | "docs" | "resources"; // children will be effetive also if its parent has set this field
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
  bodyFnProps?: any
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

export const EXT_VIEW_PREFIX='/ext-view'

export type MiaodaBasicConfig = {
  disabled?: boolean;
  cwd?: string; // by default, it's $MDGJX_EXT_PATH/$id unless you have a dedicated path
  post_fullId?: string;
  id: string;
  version: string;
  logo: string;
  iconInStr?: string;
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
      staticDirs: string[];
      baseUrl: string; // 用户需要自己定义，要求baseUrl是以EXT_VIEW_PREFIX开头
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
