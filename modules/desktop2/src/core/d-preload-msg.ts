// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { APP_SET_MSG, IpcMainOnTypeFn_on, IpcRenderOnTypeFn_on, MSG_REF, OBJ_MSG_TYPE_IPC_RENDER } from '../lib2/msg'
import { APP_SET_BRIDGE, GLOBAL_REF_KEY } from '../lib2/bridge'
import { logger } from './utils/logger'
import { contextBridge, ipcRenderer, BrowserWindow, app, } from 'electron'
console.log('d-preload-msg is initializing')

MSG_REF.ipcRender_send = async (key, value): Promise<any> => {
  logger.debug(`[ipcRender_send] key=${key} value=${value}`)
  ipcRenderer.send(key, value)
  return new Promise((r, j) => {
    ipcRenderer.on(key + '_r', (event, arg) => {
      logger.debug(`[ipcMain.once] receive key=${key} arg=${arg}`)
      r(JSON.parse(arg))
    })
  });
}

const allFn: { [key: string]: IpcRenderOnTypeFn_on } = {}

MSG_REF.ipcRender_on = async (key, value) => {
    logger.debug(`[ipcMain_on] key=${key} value=${value}`);
    switch (key) {
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
for (let item in OBJ_MSG_TYPE_IPC_RENDER) {
    const key = item as any
    ipcRenderer.on(key, async (event, ...args) => {
        let r = await MSG_REF.ipcMain_on(key, ...args)
        // nothing to return in ipcRender since you can use ipcRender_send to do so
        return {}
    })
}
export const registerIpcRenderOn = (key: string, fn: IpcRenderOnTypeFn_on) => {
    allFn[key] = fn
}