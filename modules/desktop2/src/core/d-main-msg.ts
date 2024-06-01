import { app, BrowserWindow, dialog, ipcMain, screen, shell } from "electron";
import path from "path";
import { DMainPassProps } from "./d-types";
import { isDevEnv } from "./web2share-copy/env";
import { cfg_getAppClientEntryPage } from "./d-config";
import { APP_WIN_REF } from "./d-winref";
import { logDir, logger } from "./utils/logger";
import { IpcMainOnTypeFn_on, MSG_REF, MsgTypeIpcMain, OBJ_MSG_TYPE_IPC_MAIN } from "../lib2/msg";

const allFn: { [key: string]: IpcMainOnTypeFn_on } = {}

MSG_REF.ipcMain_on = async (key, value) => {
    logger.debug(`[ipcMain_on] key=${key} value=${value}`);
    switch (key) {
        case 'openLogDir':
            // show dir
            shell.openPath(logDir)
            return;
        case 'getRunMDGJXMinimalStatus':
            return {
                timestr: Date.now()
            }
        default:
            for (let k in allFn) {
                let r = await allFn[k](key, value)
                if (r) {
                    return;
                }
            }
            logger.debug(`[ipcMain_on] key=${key} not found`)
            return;
    }
}
for (let item in OBJ_MSG_TYPE_IPC_MAIN) {
    const key = item as any
    ipcMain.on(key, async (event, ...args) => {
        let r = await MSG_REF.ipcMain_on(key, ...args)
        if (r) {
            let r_str = JSON.stringify(r)
            logger.debug(`[ipcMain.on] reply with key=${key}_r r=${r_str}`)
            const winId =event.sender.id
const contents = BrowserWindow.fromId(winId).webContents;
            contents.send(key + '_r', r_str)
        }
    })
}

MSG_REF.ipcMain_send = async (key, value): Promise<any> => {
  logger.debug(`[ipcMain_send] key=${key} value=${value}`)
  BrowserWindow.getAllWindows().forEach(win => {
    logger.debug(`[ipcMain_send] send to win.id=${win.id}`)
    win.webContents.send(key, value)
  })
  return {} // nothing to return
}

export const registerIpcMainOn = (key: string, fn: IpcMainOnTypeFn_on) => {
    allFn[key] = fn
}