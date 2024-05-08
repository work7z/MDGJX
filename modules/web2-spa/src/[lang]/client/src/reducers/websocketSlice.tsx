
// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import RouteUtils from "../utils/RouteUtils";
import PageUtils from "../utils/PageUtils";
import { FN_GetDispatch } from "../nocycle";
import AlertUtils from "../utils/AlertUtils";
import { Dot } from "../utils/cTranslationUtils";
import DateUtils from "../utils/DateUtils";
import { URL_PREFIX_LOCAL } from "../types/constants";
import AjaxUtils from "../utils/AjaxUtils";
import TokenUtils from "../utils/TokenUtils";
import IDUtils from "../utils/IDUtils";
import { P_ACTION_readForgeFromServerViaAPI } from "./forgeSlice";

let wsMemMap: { [key: string]: WebSocket | null } = {
  ws_system: null,
};

type wsState = {};

const initialState = {
  ws_system: null,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {},
});

type WsResponse<T> = {
  type: string;
  status: number;
  value: T;
};

let wsUtils = {
  sendValue(ws: WebSocket, Mtype: string, obj: any): void {
    let str = JSON.stringify({
      mtype: Mtype,
      Value: obj,
    });
    ws.send(str);
  },
};

export function P_ACTION_createSystemWS() {
  let ws = connectToWebSocket({ subLink: "/ws/system" });
  let dis = FN_GetDispatch();

  let prev_ws = wsMemMap.ws_system;
  prev_ws && closeWebSocket(prev_ws);
  wsMemMap.ws_system = ws;

  ws.onopen = () => {
    console.log("WebSocket connection established.");
    // do things here
    wsUtils.sendValue(ws, "ping", "this is test");
  };

  ws.onmessage = (event) => {
    let res = JSON.parse(event.data) as WsResponse<any>;
    console.log(`Received message: ${event.data}`, res);
    switch (res.type) {
      case "FORGE_STATE_UPDATE":
        P_ACTION_readForgeFromServerViaAPI();
        break;
    }
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
    AlertUtils.addMsgNone({
      msgId: "almCW",
      msgItem: {
        Description: Dot(
          "h6AeI",
          "Websocket connection closed at {0}",
          DateUtils.formatDateTime(new Date())
        ),
        Title: Dot("k17PG", "Websocket connection closed."),
        HasReadThisMsg: false,
      },
    });
  };

  ws.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
    AlertUtils.addMsg({
      msgId: "FaUHB",
      msgItem: {
        Title: Dot("m7WZw", "System Websocket Broken"),
        Description: Dot(
          "54cwb",
          "System Websocket API encountered an error: {0}",
          error
        ),
        HasReadThisMsg: false,
        Intent: "danger",
      },
    });
  };
}

export let getWSLink = (subLink: string, extraParams = ""): string => {
  return "ws://" +
    window.location.host +
    URL_PREFIX_LOCAL +
    subLink +
    "?lut=" +
    TokenUtils.getLocalUserToken() +
    "&pd=" +
    IDUtils.PAGE_ID + (
      extraParams == "" ? "" : "&" + extraParams
    );
}

export function connectToWebSocket({ subLink }): WebSocket {
  const ws = new WebSocket(
    getWSLink(subLink)
  );
  return ws;
}

function closeWebSocket(ws: WebSocket | null) {
  if (ws) {
    ws.close();
    console.log("WebSocket connection closed.");
  }
}

export default wsSlice;
