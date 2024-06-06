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
  const dPreloadJS = path.join(__dirname, "preload-loading-pages.js")
  if (!existsSync(dPreloadJS)) {
    logger.error(`preload file not found: ${dPreloadJS}`)
    return
  }

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      // full width and height
      width: appScreenWidth * 0.8,
      height: appScreenHeight * 0.8,
      autoHideMenuBar: false,
      icon: iconImg,
      webPreferences: {
        nodeIntegration: true, // is default value after Electron v5
        contextIsolation: false,
        preload: dPreloadJS,
      },
    });

    registerIpcMainOn('example', async (key, values) => {
      switch (key) {
        case 'updateTitle':
          mainWindow.setTitle(values)
          return true;
        default:
          return false;
      }
    })
    APP_WIN_REF.exampleWin = mainWindow;

    mainWindow.loadURL(cfg_getAppLocalLoadingPage());

  };