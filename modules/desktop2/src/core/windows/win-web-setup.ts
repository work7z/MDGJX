import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { DMainPassProps } from "../d-types";
import { isDevEnv } from "../web2share-copy/env";
import { cfg_getAppClientEntryPage, cfg_getAppLocalLoadingPage, cfg_getIconImg, cfg_getRootFolder } from "../d-config";
import { APP_WIN_REF } from "../d-winref";
import { logger } from "../utils/logger";
import { registerIpcMainOn } from "../d-main-msg";
import { existsSync } from "fs";
export default () => {
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
    // width: parseInt(""+(appScreenWidth*0.6)),
    // height: parseInt(""+(appScreenHeight*0.7)),
    // width: appScreenWidth,
    // height: appScreenHeight,
    autoHideMenuBar: true, // no need to show menu bar here
    icon: iconImg,
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false,
      preload: dPreloadJS,
    },
  });

  mainWindow.maximize();

  registerIpcMainOn('websetup', async (key, values) => {
    switch (key) {
      case 'updateTitle':
        mainWindow.setTitle(values)
        return true;
      default:
        return false;
    }
  })

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });


  APP_WIN_REF.setupWin = mainWindow;

  mainWindow.loadURL(cfg_getAppClientEntryPage());
  return mainWindow
};