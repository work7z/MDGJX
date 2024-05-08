// LafTools
// 
// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ExtHookUtils, { ExtQuickAllType } from "../utils/ExtensionHookUtils";
import CacheUtils from "../utils/CacheUtils";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { Dot } from "../utils/cTranslationUtils";
import gutils from "../utils/GlobalUtils";
import { FN_GetState } from "../nocycle";
import { PayloadValueData } from "../types/constants";
import FileUtils from "../utils/FileUtils";
import AlertUtils from "../utils/AlertUtils";

export default {
  //
};
