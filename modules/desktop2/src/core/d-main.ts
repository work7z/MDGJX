import { app, BrowserWindow,screen } from "electron";
import path from "path";
import { DMainPassProps } from "./d-types";
import { isDevEnv } from "./web2share-copy/env";
import { cfg_getAppClientEntryPage } from "./d-config";
import { APP_WIN_REF } from "./d-winref";

export default (props: DMainPassProps) => {
  let { MAIN_WINDOW_VITE_DEV_SERVER_URL } = props;
  let MAIN_WINDOW_VITE_NAME = "unknown";
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require("electron-squirrel-startup")) {
    app.quit();
  }

  const createWindow = () => {
    let rootFolder = path.join(__dirname, "..", "..");
    let iconImg = path.join(rootFolder, "assets", "images", "icon.png");
    let webappFolder = path.join(rootFolder, "webapp");
    
    const display  = screen.getPrimaryDisplay()
    const appScreenWidth = display.bounds.width
    const appScreenHeight = display.bounds.height
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      // full width and height
      // width: appScreenWidth,
      // height: appScreenHeight,
      width: appScreenWidth*0.618,
      height: appScreenHeight*0.618,
      autoHideMenuBar: false,
      icon: iconImg,
      webPreferences: {
        nodeIntegration: true, // is default value after Electron v5
        contextIsolation: false,
        preload: path.join(__dirname, "d-preload.js"),
      },
    });
    APP_WIN_REF.setupWin=mainWindow

    // and load the index.html of the app.
    // if (isDevEnv()) {
    //   // mainWindow.loadURL("http://localhost:5173/");
    // } else {
    //   mainWindow.loadFile(path.join(webappFolder, `index.html`));
    // }
    
    mainWindow.loadURL(cfg_getAppClientEntryPage());

    // Open the DevTools.
    if (process.env.NODE_ENV === "development") {
      // mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
};
