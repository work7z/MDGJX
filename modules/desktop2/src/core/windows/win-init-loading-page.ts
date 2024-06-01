import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { DMainPassProps } from "../d-types";
import { isDevEnv } from "../web2share-copy/env";
import { cfg_getAppClientEntryPage, cfg_getAppLocalLoadingPage, cfg_getRootFolder } from "../d-config";
import { APP_WIN_REF } from "../d-winref";
import { logger } from "../utils/logger";
import { registerIpcMainOn } from "../d-main-msg";
import { existsSync } from "original-fs";
import { MSG_REF } from "../../lib2/msg";
import { sleep } from "../d-utils";
import { RES_PushMDGJXStatus } from "src/lib2/types";

const RefStartStatus = {
  isStarted: false,
  msg: ''
}
const fn_startMinimalService = async () => {
      const fn_updateMsgToRenderer = (msg: string, pct: number) => {
      const v: RES_PushMDGJXStatus = {
        msg: msg,
        pct: pct
      } 
      MSG_REF.ipcMain_send('pushInitStatusToRender', v)
    }
  try {
    if (RefStartStatus.isStarted) {
      logger.info(`startMinimalService: already started, do not start again`)
      return
    }

    RefStartStatus.isStarted = true
    logger.debug(`startMinimalService: start`)
    fn_updateMsgToRenderer('正在启动本地核心服务...', 5)

    for (let i = 0; i < 50; i++) {
      await sleep(100)
      fn_updateMsgToRenderer('正在读取服务模块' + i + '...', i + 10)
    }
    fn_updateMsgToRenderer(`服务模块读取完毕`, 90)
  } catch (e) {
    logger.error(`startMinimalService: ${e.message} ${e}`)
    RefStartStatus.isStarted = false
    fn_updateMsgToRenderer('无法启动，错误原因： '+(e.message||e), 20)
  }
}

export default () => {
  let rootFolder = cfg_getRootFolder();
  let iconImg = path.join(rootFolder, "assets", "images", "icon.png");

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
    // width: appScreenWidth,
    // height: appScreenHeight,
    width: 620,
    height: 330,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    icon: iconImg,
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      preload: dPreloadJS,
    },
  });

  registerIpcMainOn('setup', async (key, values) => {
    switch (key) {
      case 'updateTitle':
        mainWindow.setTitle(values)
        return true;
      case 'startRunMDGJXMinimal':
        logger.debug(`ok, ipcMain has received the request startRunMDGJXMinimal`)
        fn_startMinimalService()
        return true;
      default:
        return false;
    }
  })

  APP_WIN_REF.setupWin = mainWindow;

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  mainWindow.loadURL(cfg_getAppLocalLoadingPage());

  if (isDevEnv()) {
    mainWindow.webContents.openDevTools();
  }
};