// dynamic load core logic
import log from 'electron-log/main';
// Optional, initialize the logger for any renderer process
log.initialize();
console.log = log.log;
import path from "path";
import { DMainPassProps } from "./core/d-types";
import dMain from "./core/d-main";

let props: DMainPassProps = {
  MAIN_WINDOW_VITE_DEV_SERVER_URL: process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL,
};

let loadPath: string | null = null;
let anyNewVersionOverrided: boolean = false; // TODO:
if (process.env.NODE_ENV === "production") {
  if (anyNewVersionOverrided) {
    loadPath = path.join(__dirname, "..", "core", "d-main.js");
  }
}
if (loadPath) {
  require(loadPath)(props);
} else {
  dMain(props);
}
