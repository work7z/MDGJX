// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { BrowserWindow } = require('electron')
import {APP_SET_BRIDGE} from '../lib2/bridge'

APP_SET_BRIDGE(window, {
  getConfig: ()=>{
    return {
      arch: 'x64',
      platform: 'windows'
    }
  }
})

export default () => {};
