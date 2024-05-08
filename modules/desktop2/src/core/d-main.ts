import { app, BrowserWindow } from "electron";
import path from "path";
import { DMainPassProps } from "./d-types";

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

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      icon: iconImg,
      webPreferences: {
        nodeIntegration: true, // is default value after Electron v5
        contextIsolation: false,
        preload: path.join(__dirname, "d-preload.js"),
      },
    });

    // and load the index.html of the app.
    if (process.env.NODE_ENV === "development") {
      // mainWindow.loadURL("http://localhost:5173/");
      mainWindow.loadFile(
        path.join(rootFolder, "webapp", "dist", "index.html"),
      );
    } else {
      mainWindow.loadFile(path.join(webappFolder, `index.html`));
    }
    mainWindow.loadFile(path.join(rootFolder, "webapp", "dist", "index.html"));

    // Open the DevTools.
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools({ mode: "detach" });
      mainWindow.webContents.executeJavaScript(
        'document.getElementsByClassName("long-click-glyph")[0].click()',
      );
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
