import { BrowserWindow } from "electron"
import winExample from "./windows/win-example"

export const APP_WIN_REF: {
    setupWin: BrowserWindow|null
    exampleWin: BrowserWindow|null
    mainEntryWin: BrowserWindow|null
}  = {
    exampleWin:null,
    mainEntryWin:null,
    setupWin: null
}