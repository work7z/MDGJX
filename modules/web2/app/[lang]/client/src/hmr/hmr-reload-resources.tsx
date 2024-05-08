
// Date: Mon, 20 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import axios from "axios";
import gutils from "../utils/GlobalUtils";
import $ from "jquery";
import { connectToWebSocket } from "../reducers/websocketSlice";
import hmrJSON from "./hmr.json";
import { ACTION_getLangData } from "../reducers/systemSlice";
import { FN_GetDispatch } from "../nocycle";

// TODO: make this hmr part in vite.config.js

let anyFileChangeCtn = 0;

export default () => {
  // if (gutils.IsDevMode()) {
  //   // regulary retrieve and apply for this page
  //   let moniteResources = hmrJSON.Files;
  //   let ws = connectToWebSocket({ subLink: "/ws/dev-hmr" });
  //   ws.onmessage = (e) => {
  //     anyFileChangeCtn++;
  //     moniteResources.forEach((eachPath) => {
  //       (async () => {
  //         // do reload
  //         // alert("got chagned");
  //         if (eachPath.endsWith("css")) {
  //           let optRes = await axios.get(eachPath);
  //           let cssValue = optRes.data;
  //           $("#dynamic-css").text(cssValue);
  //         } else if (eachPath.endsWith("json")) {
  //           //
  //           FN_GetDispatch()(ACTION_getLangData());
  //         }
  //       })();
  //     });
  //   };
  // }
};
