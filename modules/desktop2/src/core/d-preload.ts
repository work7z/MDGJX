// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { BrowserWindow } = require('electron')
import {APP_SET_BRIDGE} from '../lib2/bridge'
import { APP_WIN_REF } from './d-winref'
import { logger } from './utils/logger'

APP_SET_BRIDGE(window, {
  getConfig: ()=>{
    return {
      arch: 'x64',
      platform: 'windows'
    }
  },
  updateTitle(newTitle:string){
    if(!APP_WIN_REF.setupWin){
      logger.error('APP_WIN_REF.setupWin is null')
    }
  }
})

export default () => {};
