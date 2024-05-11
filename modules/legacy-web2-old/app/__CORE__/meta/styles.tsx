// LafTools 

// 
// Date: Sat, 24 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

export let tw = (x) => x

export let CSS_NAV_BP_TAB_HEIGHT = 51;
export let CSS_BG_DARK_1ST = tw` dark:bg-black `
export let CSS_BG_DARK_2ND = tw` dark:bg-zinc-900 `
export let CSS_BG_COLOR_WHITE = tw('bg-white  ' + CSS_BG_DARK_2ND)

export let row_pad_clz = tw`  app-minmax-size mx-4 `
export let border_clz_top = tw`  border-t-slate-300 dark:border-t-slate-800 border-t-[1px]  `
export let border_clz = tw`  border-b-slate-300 dark:border-b-slate-800 border-b-[1px]  `
export let border_clz_common = tw`  border-slate-300 dark:border-slate-800   `
export let light_border_clz_all_no_define_border = tw`  border-slate-300 shadow-sm dark:border-slate-800   `
export let light_border_clz_all = tw`  border-slate-300 shadow-sm dark:border-slate-800 border-[1px]  `
// export let border_clz_all = tw`  border-slate-300 dark:border-slate-800 border-[1px]  `

export const CLZ_FORM_SINGLE_CLZ = "pure-u-24-24 pure-u-lg-24-24";
export const CLZ_BTN_TRANSITION_STYLE = " transition-colors "

export const CSS_TRANSITION_WIDTH_HEIGHT_ONLY = "transform 0.3s, top 0.3s, width 0.3s, height 0.3s, left 0.3s";

export let CSS_TEXT_ANCHOR_CSS =
    "text-current no-underline hover:no-underline dark:text-current";

export let CSS_TW_LAYOUT_BORDER =
    " border-[1px]    border-gray-300 dark:border-gray-600  ";


export let CSS_TW_LAYOUT_BORDER_LIGHTER =
    " border-[1px]    border-gray-200 dark:border-gray-600  ";


// styles
export const VAL_CSS_TAB_TITLE_PANEL = 30;
export const VAL_CSS_CONTROL_PANEL = 34;
export const VAL_MENU_LEFT_PANEL_WIDTH = 250;
export const VAL_CSS_MENU_TITLE_PANEL = 30;


export let CSS_TW_LAYOUT_BORDER_Y = " border-gray-300 dark:border-gray-600 border-y-2 "

// ---------------

export let CSS_TW_GRAY_TEXT = tw` text-gray-500 dark:text-gray-400 `