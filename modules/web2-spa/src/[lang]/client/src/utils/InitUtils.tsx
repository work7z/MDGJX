
// Date: Thu, 28 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import gutils from "./GlobalUtils";
import staticDevJson from "../static/dev.json";
import PageUtils from "./PageUtils";
import { P_ACTION_readForgeFromServerViaAPI } from "../reducers/forgeSlice";
import { P_ACTION_createSystemWS } from "../reducers/websocketSlice";

// binding updates from all pages
// defien a struct for required slice parts, read function, write function, onNewDataComing
// export type SyncWithRequiredPart = {
//   sliceName: string;
//   ignoreActions: string[];
//   onNewDataComing: (value: string) => void;
//   onChangeNeedToBeUpdated: () => void;
// };
// let allSyncParts: SyncWithRequiredPart[] = [
//   {
//     sliceName: "ext",
//     ignoreActions: ["updateExtStatusMapBySessionIdAndSyncId"],
//     onNewDataComing: (value: string) => {
//       // do nothing
//     },
//     onChangeNeedToBeUpdated: () => {
//       // do nothing
//     },
//   },
// ];

const InitUtils = {
  InitAllWithDOMAfterLoginIn: async (dispatch) => {
    P_ACTION_readForgeFromServerViaAPI();
    // P_ACTION_createSystemWS();
  },
};
export default InitUtils;
