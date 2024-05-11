
// Date: Wed, 18 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { logutils } from "./LogUtils";

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import { AxiosError } from "axios";
import { uuid } from "./g_ref";

let clientIdKey = "LafTools_CLIENT_ID";
let clientId = 'default';
// localStorage.getItem(clientIdKey);
// if (_.isNil(clientId)) {
//   clientId = uuid();
//   localStorage.setItem(clientIdKey, clientId);
// }

const IDUtils = {
  PAGE_ID: uuid(),
  CLIENT_ID: clientId,
};
export default IDUtils;
