
// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3
export const GOLD_RATE = 0.618;
export const GithubRepoLink = 'https://github.com/work7z/LafTools'
export const GitHubRepoIssueLink = 'https://github.com/work7z/LafTools/issues'
export const AuthorEmail = 'work7z@outlook.com'
export const LafTools_HOME = "https://laftools.dev";
export const LafTools_DOC_HOME = `${LafTools_HOME}/documentation/view?id=welcome`;
export type LangDefinition = { [key: string]: string };
export const SQ = "'";
export const DQ = '"';
export const AT = "`";
export const TOOLTIP_OPEN_DELAY_BTN = 100
export const ICON_BTN_TRIGGER_FN = 'derive-column'
// by default, the first user is working with root permission
export const LAFTOOLS_DEFAULT_USERNAME = "root"



// concurrency 
export const KEY_CONCURRENCY_SYSTEM_INIT = "J9EXO";


// version
export const VER_FORGE_FORM = "v2023.10.05";

// url
export const URL_PREFIX_STATIC = "/static";
export const URL_PREFIX_LOCAL = "/api";

// CacheUtils need to be saved is

// zIndex
export const Z_INDEX_DIALOG = 9990;
export const Z_INDEX_CONFIRM = 9991;

export const URL_PREFIX_ONLINE_API = "/x-v2-api/api"
export const URL_LOGIN = "/login";
export const URL_WORKBENCH = "/main";
export const URL_ENTRY = "/entry";
export const URL_REDIRECT = "/redirect";
export const URL_WORKBENCH_WORKSPACE = URL_WORKBENCH;

export const ID_TOOLS = "tools";
export const ID_FILES = "files";
export const ID_AILah = "ai";
export const ID_NOTES = "notes";
export const ID_HISTORY = "history";
export const ID_RESOURCES = "resources";


export type InitForm = {
  Value: boolean;
};

export const CLZ_ROOT_DARK = `bp5-dark`;
export const CLZ_ROOT_LIGHT = `bp5-light bp5-bg-light`;
export const CLZ_SECOND_TEXT = "bp5-text-muted";
export const CLZ_SMALL_TEXT = "bp5-text-small";
export const KEY_LAFTOOLS_THEME = 'laftools-theme'

export type PayloadListData<T> = { payload: { list: T[] } };
export type PayloadValueData<T> = { payload: { value: T } };

export type LocalResponse = {};

export const LANG_ZH_CN = "zh_CN";
export const LANG_ZH_HK = "zh_HK";
export const LANG_EN_US = "en_US";

export interface ToolParamType {
  extId: string | null;
  category: string | null;
}
export type AnyMapType = { [key: string]: any };
