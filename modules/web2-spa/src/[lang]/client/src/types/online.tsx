// LafTools
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { getFormattedLang } from "../i18n";
import TranslationUtils from "../utils/cTranslationUtils";

export const URL_UI_PREFIX = "/v2";

export const URL_LANDING_PAGE = `/landing-page`;

// current

export let getOnlineFullLink = (subLink: string): string => {
    let l = getFormattedLang(TranslationUtils.getCurrentLang())
    return `https://laftools.dev/v2/${l}${subLink}`
}
let URL_NAV_PORTAL = '/nav'
export const URL_NAV_USER_CENTRE = `${URL_NAV_PORTAL}/user/centre`;
export const URL_NAV_FORM_SIGN_IN = `${URL_NAV_PORTAL}/form/sign-in`;
export const URL_NAV_FORM_SIGN_UP = `${URL_NAV_PORTAL}/form/sign-up`;
export const URL_NAV_FORM_USER_PASSWORD = `${URL_NAV_PORTAL}/form/find-password`;

export const URL_NAV_PORTAL_OVERVIEW = `${URL_NAV_PORTAL}${"/overview"}`;
export const URL_NAV_PORTAL_PRICING = `${URL_NAV_PORTAL}/pricing`;
export const URL_NAV_PORTAL_DOWNLOAD = `${URL_NAV_PORTAL}${"/download"}`;
export const URL_NAV_PORTAL_DOWNLOAD_VERIFY = `${URL_NAV_PORTAL}${"/verify-download"}`;
export const URL_NAV_PORTAL_DOCS = `${URL_NAV_PORTAL}${"/documentation"}`;

export const PROTECTED_PATH_LIST = [URL_NAV_USER_CENTRE];
