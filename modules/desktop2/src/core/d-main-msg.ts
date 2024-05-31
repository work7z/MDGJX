import { app, BrowserWindow, dialog, ipcMain, screen, shell } from "electron";
import path from "path";
import { DMainPassProps } from "./d-types";
import { isDevEnv } from "./web2share-copy/env";
import { cfg_getAppClientEntryPage } from "./d-config";
import { APP_WIN_REF } from "./d-winref";
import { logDir, logger } from "./utils/logger";
import { IpcMainOnTypeFn, MSG_REF, MsgType, OBJ_MSG_TYPE } from "../lib2/msg";

const allFn: { [key: string]: IpcMainOnTypeFn } = {}

MSG_REF.ipcMain_on = async (key, value) => {
    logger.debug(`[ipcMain_on] key=${key} value=${value}`);
    // PREDEFINED LOGIC PART BEGIN
    switch(key){
        case 'openLogDir':
            // show dir
            shell.openPath(logDir)
            return;
            break;
    }
    // PREDEFINED LOGIC PART END

    // OTHER ALL FN
    for (let k in allFn) {
        let r = await allFn[k](key, value)
        if (r) {
            return true;
        }
    }
    return false;
}
for (let item in OBJ_MSG_TYPE) {
    const key = item as any
    ipcMain.on(key, async (event, ...args) => {
        let r = await MSG_REF.ipcMain_on(key, ...args)
        event.returnValue = r
    })
}

export const registerIpcMainOn = (key: string, fn: IpcMainOnTypeFn) => {
    allFn[key] = fn
}