import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { DMainPassProps } from "../d-types";
import { isDevEnv } from "../web2share-copy/env";
import { cfg_getAppClientEntryPage ,cfg_getAppLocalLoadingPage,cfg_getIconImg,cfg_getRootFolder} from "../d-config";
import { APP_WIN_REF } from "../d-winref";
import { logger } from "../utils/logger";
import { registerIpcMainOn } from "../d-main-msg";
import { existsSync } from "fs";
export  default  () => {
    let rootFolder = cfg_getRootFolder();
    let iconImg = cfg_getIconImg()

    const display = screen.getPrimaryDisplay()
    const appScreenWidth = display.bounds.width
    const appScreenHeight = display.bounds.height

    const dPreloadJS = path.join(__dirname, "preload-web-setup.js")
    if (!existsSync(dPreloadJS)) {
      logger.error(`preload file not found: ${dPreloadJS}`)
      return
    }

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      // full width and height
      width: appScreenWidth * 0.75,
      height: appScreenHeight * 0.7,
      autoHideMenuBar: true, // no need to show menu bar here
      icon: iconImg,
      webPreferences: {
        nodeIntegration: true, // is default value after Electron v5
        contextIsolation: false,
        preload: dPreloadJS,
      },
    });

    registerIpcMainOn('websetup', async (key, values) => {
      switch (key) {
        case 'updateTitle':
          mainWindow.setTitle(values)
          return true;
        default:
          return false;
      }
    })
    APP_WIN_REF.setupWin = mainWindow;

    mainWindow.loadURL(cfg_getAppClientEntryPage());
    return mainWindow
  };