// LafTools
// 
// Date: Tue, 26 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3


import { Button, Card, Popover } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../../../types/workbench-types";
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch, FN_GetState, getAjaxResPayloadValue, getAjaxResPayloadValueAsString } from "../../../../../../../../nocycle";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { useCallback, useMemo, useRef, useState } from "react";
import _ from 'lodash'
import { useGetI18nLangList } from "../../../../../../../../containers/UserAskMultipleDialogs";
import { SessionViewProp } from "../../../../../../../../containers/MultipleSessionLeftView";
import { NoAvailableDataPanel, NoAvailablePanel } from "../../../../../../../../types/workbench-hook";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import SessionSlice, { SessionAttr } from "../../../../../../../../reducers/container/sessionSlice";
import { EachLang } from "../../../../../../../../types/purejs-types-READ_ONLY";
import Blink from "../../../../../../../../components/Blink";
import React, { useEffect, } from 'react';
import { Terminal } from 'xterm';
import "xterm/css/xterm.css";
import * as Xterm from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SerializeAddon } from "xterm-addon-serialize";
import { CanvasAddon } from "xterm-addon-canvas";
import { AttachAddon } from "xterm-addon-attach";
import zmodem from "zmodem.js/src/zmodem_browser";
import { Unicode11Addon } from "xterm-addon-unicode11";
import TerminalWrapper from "./TerminalWrapper";


export default (props: SessionViewProp) => {
    // TODO: recover the history of terminal
    let sessionType = props.sessionType
    let sessionId = props.sessionId;
    return <p className="w-full h-full p-2">
        {Dot("B5NLBB_Je", "For the sake of security, the terminal is not available now. Kindly stay tuned for the updates, thanks!")}
    </p>
    return <div className="w-full h-full">
        <TerminalWrapper SessionId={sessionId} />
    </div>
}