// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { APP_SET_MSG, MSG_REF } from '../lib2/msg'
import {APP_SET_BRIDGE, GLOBAL_REF_KEY} from '../lib2/bridge'
import { logger } from './utils/logger'
import { contextBridge, ipcRenderer,BrowserWindow,app } from 'electron'
const appVersion =  app && app.getVersion()
console.log('d-preload is initializing')

MSG_REF.ipcRender_send = (key, value)=>{
  logger.debug(`[ipcRender_send] key=${key} value=${value}`)
  ipcRenderer.send(key, value)
}
APP_SET_BRIDGE(window, {
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
})
APP_SET_MSG(window,MSG_REF)

export default () => {};
