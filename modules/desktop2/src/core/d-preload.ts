// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { BrowserWindow } = require('electron')
import { MSG_REF } from '../lib2/msg'
import {APP_SET_BRIDGE, GLOBAL_REF_KEY} from '../lib2/bridge'
import { APP_WIN_REF } from './d-winref'
import { logger } from './utils/logger'
import { contextBridge, ipcRenderer } from 'electron'

const { app } = require('electron')
MSG_REF.ipcRender_send = (key, value)=>{
  logger.debug(`[ipcRender_send] key=${key} value=${value}`)
  ipcRenderer.send(key, value)
}
const appVersion = app.getVersion()

contextBridge.exposeInMainWorld(GLOBAL_REF_KEY, APP_SET_BRIDGE(window, {
  getConfig: ()=>{
    return {
      version: appVersion,
      buildInfo: `Built with ${appVersion}`,
      arch: 'x64',
      platform: 'windows'
    }
  },
  updateTitle(newTitle:string){
    MSG_REF.ipcRender_send('updateTitle', newTitle)
  },
}))

export default () => {};
