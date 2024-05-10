'use client'


// Date: Sat, 30 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import { Position, Toaster, ToastProps, Intent, OverlayToaster } from "@blueprintjs/core";
import ALL_NOCYCLE, { FN_GetDispatch, copy, getErrMsg } from "../nocycle";
import systemSlice, { MessagePackItem } from "../reducers/systemSlice";
import statusSlice, {
  AlertType,
  ConfirmType,
  PrompType,
} from "../reducers/statusSlice";


const AlertUtils = {
  // copyWithAlertCopied
  copyWithAlertCopied(ctn?: string, msg?: string) {
    if (!ctn) {
      ctn = ""
    }
    copy(ctn);
    AlertUtils.popMsg(Intent.SUCCESS, {
      icon: "endorsed",
      message: msg || Dot("1Tuab", "Copied"),
    });
  },
  // for addMsg, provide other functions with different default Intent value
  // and success, use the following functions
  addMsgSuccess(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.SUCCESS;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgDanger(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.DANGER;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgWarning(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.WARNING;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgPrimary(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.PRIMARY;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgNone(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.NONE;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsg(obj: { msgId: string; msgItem: MessagePackItem }) {
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  popError(e: Error, additionalMsgLabel?: string) {
    let msg = _.isArray(e) ? _.join(e, "\n") : getErrMsg(e);
    AlertUtils.popMsg("danger", {
      message: additionalMsgLabel ? `[${additionalMsgLabel}]` : "" + msg,
    });
  },
  popCopyOK() {
    AlertUtils.popMsg("success", {
      icon: "duplicate",
      message: Dot("ip2g1", "Copied"),
    });
  },
  popNotSupport() {
    AlertUtils.popMsg("warning", {
      message: Dot("Zk7JI", "It's not yet supported"),
    });
  },
  popOK(msg?: string) {
    AlertUtils.popMsg("success", {
      message: msg || Dot("mihc3", "Completed this operation"),
    });
  },
  popRefresh() {
    AlertUtils.popMsg("success", {
      icon: "refresh",
      message: Dot("WXo6D", "Refreshed"),
    });
  },
  popCreated() {
    AlertUtils.popMsg("success", {
      icon: "add" as any,
      message: Dot("24vLI", "Created"),
    });
  },
  popCancelled() {
    AlertUtils.popMsg("danger", {
      message: Dot("ff02c", "Cancelled"),
    });
  },
  popMsg: async function (intent: Intent, config: ToastProps) {
    const rootInst: Toaster = await OverlayToaster.createAsync({
      className: " m_all_recipe",
      position: Position.TOP,
    });
    config.intent = intent;
    rootInst.show(config);
  },
  win_alert(o: AlertType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updateAlertList(o));
  },
  win_prompt(o: PrompType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updatePromptList(o));
  },
  win_confirm(o: ConfirmType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updateConfirmList(o));
  },
  // promise for win_confirm
  win_confirm_promise(o: ConfirmType): Promise<boolean> {
    return new Promise((resolve, reject) => {
      o.fn = (isOK) => {
        resolve(isOK);
      };
      let dis = FN_GetDispatch();
      dis(statusSlice.actions.updateConfirmList(o));
    });
  },
  // add deleteById for separately alert, prompt, confirm
  // delete alertList
  deleteAlertList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deleteAlertList(id));
  },
  // delete promptList
  deletePromptList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deletePromptList(id));
  },
  // delete confirmList
  deleteConfirmList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deleteConfirmList(id));
  },
};
export default AlertUtils;
