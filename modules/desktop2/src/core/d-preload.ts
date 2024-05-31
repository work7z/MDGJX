// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { APP_SET_MSG, MSG_REF } from '../lib2/msg'
import { APP_SET_BRIDGE, GLOBAL_REF_KEY } from '../lib2/bridge'
import { logger } from './utils/logger'
import { contextBridge, ipcRenderer, BrowserWindow, app, ipcMain } from 'electron'
import pkgInfo from './d-pkginfo'
const appVersion = pkgInfo.version
console.log('d-preload is initializing')

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
const verType = 'insider' // or 'release'
APP_SET_BRIDGE(window, {
  getConfig: () => {
    return {
      version: appVersion,
      buildInfo: `${pkgInfo.version}-${verType} on ${pkgInfo.releaseDate}`,
      arch: 'x64',
      platform: 'windows'
    }
  },
  updateTitle(newTitle: string) {
    MSG_REF.ipcRender_send('updateTitle', newTitle)
  },
})
APP_SET_MSG(window, MSG_REF)

export default () => { };
