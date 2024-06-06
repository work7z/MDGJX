import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { DMainPassProps } from "./d-types";
import { isDevEnv } from "./web2share-copy/env";
import { cfg_getAppClientEntryPage ,cfg_getAppLocalLoadingPage,cfg_getRootFolder} from "./d-config";
import { APP_WIN_REF } from "./d-winref";
import { logger } from "./utils/logger";
import { MSG_REF } from "../lib2/msg";
import { registerIpcMainOn } from "./d-main-msg";
import winInitLoadingPage from "./windows/win-init-loading-page";


export default (props: DMainPassProps) => {
  let { MAIN_WINDOW_VITE_DEV_SERVER_URL } = props;
  let MAIN_WINDOW_VITE_NAME = "unknown";



  
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require("electron-squirrel-startup")) {
    app.quit();
  }


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", winInitLoadingPage);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
      app.quit();
      process.exit(0)
    // if (process.platform !== "darwin") {
    //   app.quit();
    // }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      // winInitLoadingPage()
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.

};
