import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {autorun, observable, reaction}  from 'mobx'
import gstore from "../store.jsx";
import LoadingPage from "../routes/loading/index";
import MainPage from "../routes/main/index";
import "../index.less";
import _ from "lodash";
import SoftwareDetailView from "../components/SoftwareDetailView";
window.reaction = reaction;

const reqInfo = {
  lastCount: -1,
};
// debugger;
window.chk_when_pre_crt = () => {
  // debugger;
  setTimeout(() => {
    if (
      _.isNil(
        window.getThatPrivateKey(gstore.localSettings.pre_currentWorkspaceId)
      ) &&
      gstore.localSettings.pre_currentWorkspaceId != "default" &&
      !_.isNil(gstore.localSettings.pre_currentWorkspaceId)
    ) {
      gstore.localSettings.currentWorkspaceId = "default";
      if (
        _.isNil(
          _.find(
            gstore.preliAllData.configs.workspace_list,
            (x) => x.value == gstore.localSettings.pre_currentWorkspaceId
          )
        )
      ) {
        gstore.localSettings.currentWorkspaceId = "default";
        gstore.localSettings.pre_currentWorkspaceId = "default";
        // do thing
      } else {
        gstore.user.overlayForInputtingPrivateKey.open = true;
      }
    } else {
      gstore.localSettings.currentWorkspaceId =
        gstore.localSettings.pre_currentWorkspaceId;
    }
  }, 20);
};

const myapi = {
  updates: {
    downloadAndInstall: async (updateObj) => {
      // download and install
      gstore.sysBootServer.updates.isInstalling = true;
      let { VERSION } = updateObj;
      if (VERSION == null || VERSION == "") {
        await gutils.win_alert("Unexpected version string." + VERSION);
        return;
      }
      if (VERSION.indexOf("v") == -1) {
        VERSION = "v" + _.trim(VERSION);
      }
      let updateMsgFn = (str) => {
        gstore.sysBootServer.updates.installMessage = str;
      };
      try {
        let baseRoot = `/prod/${VERSION}/procedures-${VERSION}-${gstore.apiInfo.direct_platform}.zip`;

        let serviceLink = gutils.getUpdateServiceLink(baseRoot);
        if (window.ipc.dev) {
          // serviceLink = `http://192.168.2.181:3000/procedures-v1.3.0.zip`;
        }
        let res = await gutils.opt("/download/push", {
          url: serviceLink,
        });
        let uid = _.get(res, "content.uid");
        updateMsgFn(t("Pushed the request into the queue list, uid={0}", uid));
        while (true) {
          let eachRes = await gutils.opt("/download/status", {
            uid: uid,
          });
          let isOk = _.get(eachRes, "content.isOk");
          let isFail = _.get(eachRes, "content.isFail");
          let message = _.get(eachRes, "content.message");
          updateMsgFn(message || "");
          if (isOk) {
            break;
          }
          if (isFail) {
            throw new Error(message);
          }
          await gutils.sleep(300);
        }
        updateMsgFn(t(`Cleaning previous files...`));
        await gutils.opt("/download/clean", {
          uid: uid,
        });
        updateMsgFn(
          t(
            `Decompressing updates package file, it might spend a few minutes...`
          )
        );
        await gutils.opt("/updates/exact", {
          version: VERSION,
          arr: [
            {
              uid: uid,
              type: "procedures",
            },
          ],
        });
        updateMsgFn(`Decompressed.`);
        localStorage.setItem("lastReleaseOKID", _.get(updateObj, "ID"));
        let VERSION_STR = _.get(updateObj, "VERSION");
        if (!_.isNil(VERSION_STR)) {
          if (!VERSION_STR.startsWith("v")) {
            VERSION_STR = "v" + VERSION_STR;
          }
          localStorage.setItem("lastReleaseOKVersion", VERSION_STR);
        } else {
          await gutils.win_alert(
            `Unknown version str, please check the response`
          );
        }
        if (
          await gutils.win_confirm(
            t(
              `Upgrade to version {0} successfully, Do you want to restart right now? (If your answer would be yes, then CodeGen service will open launch page to restart local service by using this selected version)`,
              VERSION
            )
          )
        ) {
          await window.fn_call_update_to_new();
          // ipc.quit();
        }
        updateMsgFn(
          t(
            `Upgrade to the new version successfully! Please click restart button to start.`
          )
        );
        gstore.sysBootServer.updates.restartNeeded = true;
        gstore.sysBootServer.updates.isInstalling = false;
      } catch (e) {
        gstore.sysBootServer.updates.isInstalling = false;
        updateMsgFn(gutils.getErrMsg(e));
        console.log(e);
      }
      // try {
      //   let myfilepathsub =
      //     false && gutils.dev()
      //       ? `test/v1.0.2/updates.zip`
      //       : `${gstore.localSettings.softwareUpdatesTabId}/${VERSION}/updates.zip`;
      //   let mysplitArr = myfilepathsub.split("/");
      //   let serviceLink = gutils.getUpdateServiceLink("/" + myfilepathsub);
      //   let savefilepath = gutils.ipc().getReleaseDir(...mysplitArr);
      //   updateMsgFn(`Removing previous download files...`);
      //   let parentpath = gutils
      //     .ipc()
      //     .getReleaseDir(mysplitArr[0], mysplitArr[1]);
      //   ipc.deleteDir(parentpath);
      //   updateMsgFn(`Already clean previous files`);
      //   updateMsgFn(`Start downloading the updates package file...`);
      //   console.log("got link and savefilepath", serviceLink, savefilepath);
      //   // gstore.sysBootServer.updates.isInstalling = false;
      //   await new Promise((resolve, reject) => {
      //     ipc.downloadFile(serviceLink, savefilepath, {
      //       onProgress: (e) => {
      //         console.log("download progress", e);
      //         updateMsgFn(
      //           t(
      //             `Downloading updates package file, current progress: (${e.loaded}/${e.total})[${e.rate}]`
      //           )
      //         );
      //       },
      //       onSuccess(e) {
      //         updateMsgFn(
      //           `Downloaded successfully, will upgrade your app version then, wait a moments please.`
      //         );
      //         resolve();
      //       },
      //       onFail(e) {
      //         updateMsgFn(
      //           `Error: cannot download since the reason: ${gutils.getErrMsg(
      //             e
      //           )}`
      //         );
      //         reject(e);
      //       },
      //     });
      //   });
      //   updateMsgFn(
      //     `Decompressing updates package file, it might spend a few minutes...`
      //   );
      //   await ipc.decompress(savefilepath);
      //   updateMsgFn(`Decompressed updates package file`);
      //   let baseapppath = ipc.joinPath(
      //     parentpath,
      //     ..."dist/win-unpacked/resources/app".split("/")
      //   );
      //   ipc.writeNextSetupPath({
      //     path: baseapppath,
      //   });
      //   await ipc.rm(savefilepath);
      //   localStorage.setItem("lastReleaseOKID", _.get(updateObj, "ID"));
      //   if (
      //     await gutils.win_confirm(
      //       t(
      //         `Upgrade to version {0} successfully, Do you want to restart right now? (System will quit current process, please then launch the app again manually)`,
      //         VERSION
      //       )
      //     )
      //   ) {
      //     ipc.quit();
      //   }
      //   gstore.sysBootServer.updates.isInstalling = false;
      //   gstore.sysBootServer.updates.restartNeeded = true;
      // } catch (err) {
      //   if (_.isNil(err)) {
      //     err = { message: "unknown error" };
      //   }
      //   updateMsgFn(err.message || err);
      //   gstore.sysBootServer.updates.isInstalling = false;
      //   console.log(err);
      // }
    },
  },
  bootService: async () => {
    // // console.log("start booting the server");
    const t1 = "The Local Service is Loading...";
    gstore.sysBootServer.text = t1;
    gstore.sysBootServer.err = null;

    try {
      // finding the available ports
      let finalPortValue = -1;
      for (let i = 35000 + parseInt(Math.random() * 2000); i < 50000; i++) {
        let checkArr = [i, i + 1, i + 2, i + 3, i + 4, i + 5];
        let isAnyErrorHas = false;
        for (let checkPort of checkArr) {
          try {
            const iscrtuse = await ipc.getAvailablePort(checkPort);
            if (iscrtuse) {
              isAnyErrorHas = true;
            }
          } catch (err) {
            // // console.log("got failed");
            isAnyErrorHas = true;
          }
        }
        if (!isAnyErrorHas) {
          finalPortValue = i;
          window.ipc.setPort(i);
          break;
        }
      }
      if (finalPortValue == -1) {
        gstore.sysBootServer.text = `Sorry, cannot the available service ports on this PC. Please check if the network interface is working normally.`;
        gstore.sysBootServer.err = "No available listen ports to be used";
        return;
      }

      // gstore.sysBootServer.text =
      // "gstore.sysBootServer.textgstore.sysBootServer.textgstore.sysBootServer.textgstore.sysBootServer.textgstore.sysBootServer.textgstore.sysBootServer.textgstore.sysBootServer.text";
      // if (true) {
      //   return;
      // }

      // run the process
      let cmd = ipc.getRunMainBackendTotalCmd(finalPortValue);
      console.log("using cmd", cmd);
      await new Promise((resolve, reject) => {
        let gotLogs = {
          ctn_data: 0,
          err: "",
          close: "",
        };
        window.crt_ps_path = ipc.execCommand(cmd, {
          data(str) {
            let isFirstBoot = gutils.ipc().isFirstBoot();
            if (isFirstBoot) {
              window.clearTimeout(window.firstbootref);
              window.firstbootref = window.setTimeout(() => {
                location.reload();
              }, 40000);
            }
            gotLogs.ctn_data += _.size(str);
            console.log("data", str);
            //  `${_.trim(t1.replace("...", ""))}[${
            //   gotLogs.ctn_data
            // }]`;
            if (
              str.indexOf("APP_BOOT_DONE") != -1 ||
              str.indexOf("DONE_FLAG") != -1 ||
              window.ipc.isBootFlagDone()
            ) {
              // ipc.keepEmptyFile(crt_ps_path);
              resolve();
            } else {
              gutils.ipc().setFirstBoot();
              gstore.sysBootServer.text = str;
            }
          },
          err(error) {
            // // console.log("error", error);
            gotLogs.err += error;
          },
          close(str) {
            // // console.log("close", str);
            gotLogs.close += str;
            if (str == false && !_.isEmpty(gotLogs.err)) {
              gstore.sysBootServer.text = `Sorry, cannot boot the local service. If this issue still exists after having re-tried, please contact us work7z@outlook.com`;
              gstore.sysBootServer.err = gotLogs.err;
            }
          },
        });
        // (async function () {
        //   while (true) {
        //     try {
        //       let res = await gutils.opt(
        //         "/system/health-check",
        //         {},
        //         {
        //           port: finalPortValue,
        //         }
        //       );
        //       // // console.log("finish the boot", res);
        //       resolve();
        //     } catch (err) {
        //       // // console.log("not inited", err);
        //     }
        //     await gutils.sleep(5000);
        //   }
        // })();
      });

      window.ipc.writeBootLog();

      gstore.sysBootServer.text = `The Local Service has been Booted.`;
      gstore.sysBootServer.err = null;
      // // console.log("finished this boot process");

      location.reload();
    } catch (err) {
      console.log(err);
      gstore.sysBootServer.err = gutils.getErrMsg(err);
    }
  },
  restoreAllSettings: async () => {
    if (
      !(await gutils.win_confirm(
        "Are you sure that you want to restore all of these system settings? It means that the previous customer settings will be reinstated to the factory settings"
      ))
    ) {
      return;
    }
    await gutils.opt("/system/setting-restore");
    gutils.alertOk("Restored system settings successfully");
    setTimeout(() => {
      location.reload();
    }, 1000);
  },
  openSettingAPI: async (view_key) => {
    if (
      gstore.settings.drawerConfig.open &&
      gstore.settings.drawerConfig.view_key == view_key
    ) {
      gstore.settings.drawerConfig.open = false;
      return;
    }
    gstore.settings.drawerConfig.open = true;
    gstore.settings.drawerConfig.view_key = view_key;
    gstore.settings.other.temp_model = gutils.clone(gstore.settings.model);
  },
  confirmAndUpdateSetting: async () => {
    gstore.settings.model = {
      ...gutils.clone(gstore.settings.other.temp_model),
    };
    myapi.saveSettingDirectly();
  },
  saveSettingDirectly: async function () {
    gstore.settings.loading = true;
    await gutils.opt("/system/setting-save-all", gstore.settings.model);
    gutils.alertOk(
      "Updating the settings successfully, some of these config will be effected after the reboot of the application."
    );
    await gutils.api.system.preInit.loadingAllSettings();
    // save langs
    gutils.saveLangToDisk();
    gstore.settings.loading = false;
    if (
      await gutils.win_confirm(`Would you like to reload the page right now?`)
    ) {
      location.reload();
    }
  },
  preInit: {
    updateLatestNavHome: async function () {
      if (!p_mode()) {
        let { content } = await gutils.opt("/infra/customize-menu-query-all");
        console.log("ctn", content);
        if (!_.isEqual(gstore.sysinfo.customize_menu_list, content)) {
          gstore.sysinfo.customize_menu_list = content;
        }
      }
    },
    initAllCharset: async function () {
      let { content } = {
    "content": [
        {
            "label": "Big5",
            "value": "Big5"
        },
        {
            "label": "Big5-HKSCS",
            "value": "Big5-HKSCS"
        },
        {
            "label": "CESU-8",
            "value": "CESU-8"
        },
        {
            "label": "EUC-JP",
            "value": "EUC-JP"
        },
        {
            "label": "EUC-KR",
            "value": "EUC-KR"
        },
        {
            "label": "GB18030",
            "value": "GB18030"
        },
        {
            "label": "GB2312",
            "value": "GB2312"
        },
        {
            "label": "GBK",
            "value": "GBK"
        },
        {
            "label": "IBM-Thai",
            "value": "IBM-Thai"
        },
        {
            "label": "IBM00858",
            "value": "IBM00858"
        },
        {
            "label": "IBM01140",
            "value": "IBM01140"
        },
        {
            "label": "IBM01141",
            "value": "IBM01141"
        },
        {
            "label": "IBM01142",
            "value": "IBM01142"
        },
        {
            "label": "IBM01143",
            "value": "IBM01143"
        },
        {
            "label": "IBM01144",
            "value": "IBM01144"
        },
        {
            "label": "IBM01145",
            "value": "IBM01145"
        },
        {
            "label": "IBM01146",
            "value": "IBM01146"
        },
        {
            "label": "IBM01147",
            "value": "IBM01147"
        },
        {
            "label": "IBM01148",
            "value": "IBM01148"
        },
        {
            "label": "IBM01149",
            "value": "IBM01149"
        },
        {
            "label": "IBM037",
            "value": "IBM037"
        },
        {
            "label": "IBM1026",
            "value": "IBM1026"
        },
        {
            "label": "IBM1047",
            "value": "IBM1047"
        },
        {
            "label": "IBM273",
            "value": "IBM273"
        },
        {
            "label": "IBM277",
            "value": "IBM277"
        },
        {
            "label": "IBM278",
            "value": "IBM278"
        },
        {
            "label": "IBM280",
            "value": "IBM280"
        },
        {
            "label": "IBM284",
            "value": "IBM284"
        },
        {
            "label": "IBM285",
            "value": "IBM285"
        },
        {
            "label": "IBM290",
            "value": "IBM290"
        },
        {
            "label": "IBM297",
            "value": "IBM297"
        },
        {
            "label": "IBM420",
            "value": "IBM420"
        },
        {
            "label": "IBM424",
            "value": "IBM424"
        },
        {
            "label": "IBM437",
            "value": "IBM437"
        },
        {
            "label": "IBM500",
            "value": "IBM500"
        },
        {
            "label": "IBM775",
            "value": "IBM775"
        },
        {
            "label": "IBM850",
            "value": "IBM850"
        },
        {
            "label": "IBM852",
            "value": "IBM852"
        },
        {
            "label": "IBM855",
            "value": "IBM855"
        },
        {
            "label": "IBM857",
            "value": "IBM857"
        },
        {
            "label": "IBM860",
            "value": "IBM860"
        },
        {
            "label": "IBM861",
            "value": "IBM861"
        },
        {
            "label": "IBM862",
            "value": "IBM862"
        },
        {
            "label": "IBM863",
            "value": "IBM863"
        },
        {
            "label": "IBM864",
            "value": "IBM864"
        },
        {
            "label": "IBM865",
            "value": "IBM865"
        },
        {
            "label": "IBM866",
            "value": "IBM866"
        },
        {
            "label": "IBM868",
            "value": "IBM868"
        },
        {
            "label": "IBM869",
            "value": "IBM869"
        },
        {
            "label": "IBM870",
            "value": "IBM870"
        },
        {
            "label": "IBM871",
            "value": "IBM871"
        },
        {
            "label": "IBM918",
            "value": "IBM918"
        },
        {
            "label": "ISO-2022-CN",
            "value": "ISO-2022-CN"
        },
        {
            "label": "ISO-2022-JP",
            "value": "ISO-2022-JP"
        },
        {
            "label": "ISO-2022-JP-2",
            "value": "ISO-2022-JP-2"
        },
        {
            "label": "ISO-2022-KR",
            "value": "ISO-2022-KR"
        },
        {
            "label": "ISO-8859-1",
            "value": "ISO-8859-1"
        },
        {
            "label": "ISO-8859-13",
            "value": "ISO-8859-13"
        },
        {
            "label": "ISO-8859-15",
            "value": "ISO-8859-15"
        },
        {
            "label": "ISO-8859-2",
            "value": "ISO-8859-2"
        },
        {
            "label": "ISO-8859-3",
            "value": "ISO-8859-3"
        },
        {
            "label": "ISO-8859-4",
            "value": "ISO-8859-4"
        },
        {
            "label": "ISO-8859-5",
            "value": "ISO-8859-5"
        },
        {
            "label": "ISO-8859-6",
            "value": "ISO-8859-6"
        },
        {
            "label": "ISO-8859-7",
            "value": "ISO-8859-7"
        },
        {
            "label": "ISO-8859-8",
            "value": "ISO-8859-8"
        },
        {
            "label": "ISO-8859-9",
            "value": "ISO-8859-9"
        },
        {
            "label": "JIS_X0201",
            "value": "JIS_X0201"
        },
        {
            "label": "JIS_X0212-1990",
            "value": "JIS_X0212-1990"
        },
        {
            "label": "KOI8-R",
            "value": "KOI8-R"
        },
        {
            "label": "KOI8-U",
            "value": "KOI8-U"
        },
        {
            "label": "Shift_JIS",
            "value": "Shift_JIS"
        },
        {
            "label": "TIS-620",
            "value": "TIS-620"
        },
        {
            "label": "US-ASCII",
            "value": "US-ASCII"
        },
        {
            "label": "UTF-16",
            "value": "UTF-16"
        },
        {
            "label": "UTF-16BE",
            "value": "UTF-16BE"
        },
        {
            "label": "UTF-16LE",
            "value": "UTF-16LE"
        },
        {
            "label": "UTF-32",
            "value": "UTF-32"
        },
        {
            "label": "UTF-32BE",
            "value": "UTF-32BE"
        },
        {
            "label": "UTF-32LE",
            "value": "UTF-32LE"
        },
        {
            "label": "UTF-8",
            "value": "UTF-8"
        },
        {
            "label": "windows-1250",
            "value": "windows-1250"
        },
        {
            "label": "windows-1251",
            "value": "windows-1251"
        },
        {
            "label": "windows-1252",
            "value": "windows-1252"
        },
        {
            "label": "windows-1253",
            "value": "windows-1253"
        },
        {
            "label": "windows-1254",
            "value": "windows-1254"
        },
        {
            "label": "windows-1255",
            "value": "windows-1255"
        },
        {
            "label": "windows-1256",
            "value": "windows-1256"
        },
        {
            "label": "windows-1257",
            "value": "windows-1257"
        },
        {
            "label": "windows-1258",
            "value": "windows-1258"
        },
        {
            "label": "windows-31j",
            "value": "windows-31j"
        },
        {
            "label": "x-Big5-HKSCS-2001",
            "value": "x-Big5-HKSCS-2001"
        },
        {
            "label": "x-Big5-Solaris",
            "value": "x-Big5-Solaris"
        },
        {
            "label": "x-COMPOUND_TEXT",
            "value": "x-COMPOUND_TEXT"
        },
        {
            "label": "x-euc-jp-linux",
            "value": "x-euc-jp-linux"
        },
        {
            "label": "x-EUC-TW",
            "value": "x-EUC-TW"
        },
        {
            "label": "x-eucJP-Open",
            "value": "x-eucJP-Open"
        },
        {
            "label": "x-IBM1006",
            "value": "x-IBM1006"
        },
        {
            "label": "x-IBM1025",
            "value": "x-IBM1025"
        },
        {
            "label": "x-IBM1046",
            "value": "x-IBM1046"
        },
        {
            "label": "x-IBM1097",
            "value": "x-IBM1097"
        },
        {
            "label": "x-IBM1098",
            "value": "x-IBM1098"
        },
        {
            "label": "x-IBM1112",
            "value": "x-IBM1112"
        },
        {
            "label": "x-IBM1122",
            "value": "x-IBM1122"
        },
        {
            "label": "x-IBM1123",
            "value": "x-IBM1123"
        },
        {
            "label": "x-IBM1124",
            "value": "x-IBM1124"
        },
        {
            "label": "x-IBM1166",
            "value": "x-IBM1166"
        },
        {
            "label": "x-IBM1364",
            "value": "x-IBM1364"
        },
        {
            "label": "x-IBM1381",
            "value": "x-IBM1381"
        },
        {
            "label": "x-IBM1383",
            "value": "x-IBM1383"
        },
        {
            "label": "x-IBM300",
            "value": "x-IBM300"
        },
        {
            "label": "x-IBM33722",
            "value": "x-IBM33722"
        },
        {
            "label": "x-IBM737",
            "value": "x-IBM737"
        },
        {
            "label": "x-IBM833",
            "value": "x-IBM833"
        },
        {
            "label": "x-IBM834",
            "value": "x-IBM834"
        },
        {
            "label": "x-IBM856",
            "value": "x-IBM856"
        },
        {
            "label": "x-IBM874",
            "value": "x-IBM874"
        },
        {
            "label": "x-IBM875",
            "value": "x-IBM875"
        },
        {
            "label": "x-IBM921",
            "value": "x-IBM921"
        },
        {
            "label": "x-IBM922",
            "value": "x-IBM922"
        },
        {
            "label": "x-IBM930",
            "value": "x-IBM930"
        },
        {
            "label": "x-IBM933",
            "value": "x-IBM933"
        },
        {
            "label": "x-IBM935",
            "value": "x-IBM935"
        },
        {
            "label": "x-IBM937",
            "value": "x-IBM937"
        },
        {
            "label": "x-IBM939",
            "value": "x-IBM939"
        },
        {
            "label": "x-IBM942",
            "value": "x-IBM942"
        },
        {
            "label": "x-IBM942C",
            "value": "x-IBM942C"
        },
        {
            "label": "x-IBM943",
            "value": "x-IBM943"
        },
        {
            "label": "x-IBM943C",
            "value": "x-IBM943C"
        },
        {
            "label": "x-IBM948",
            "value": "x-IBM948"
        },
        {
            "label": "x-IBM949",
            "value": "x-IBM949"
        },
        {
            "label": "x-IBM949C",
            "value": "x-IBM949C"
        },
        {
            "label": "x-IBM950",
            "value": "x-IBM950"
        },
        {
            "label": "x-IBM964",
            "value": "x-IBM964"
        },
        {
            "label": "x-IBM970",
            "value": "x-IBM970"
        },
        {
            "label": "x-ISCII91",
            "value": "x-ISCII91"
        },
        {
            "label": "x-ISO-2022-CN-CNS",
            "value": "x-ISO-2022-CN-CNS"
        },
        {
            "label": "x-ISO-2022-CN-GB",
            "value": "x-ISO-2022-CN-GB"
        },
        {
            "label": "x-iso-8859-11",
            "value": "x-iso-8859-11"
        },
        {
            "label": "x-JIS0208",
            "value": "x-JIS0208"
        },
        {
            "label": "x-JISAutoDetect",
            "value": "x-JISAutoDetect"
        },
        {
            "label": "x-Johab",
            "value": "x-Johab"
        },
        {
            "label": "x-MacArabic",
            "value": "x-MacArabic"
        },
        {
            "label": "x-MacCentralEurope",
            "value": "x-MacCentralEurope"
        },
        {
            "label": "x-MacCroatian",
            "value": "x-MacCroatian"
        },
        {
            "label": "x-MacCyrillic",
            "value": "x-MacCyrillic"
        },
        {
            "label": "x-MacDingbat",
            "value": "x-MacDingbat"
        },
        {
            "label": "x-MacGreek",
            "value": "x-MacGreek"
        },
        {
            "label": "x-MacHebrew",
            "value": "x-MacHebrew"
        },
        {
            "label": "x-MacIceland",
            "value": "x-MacIceland"
        },
        {
            "label": "x-MacRoman",
            "value": "x-MacRoman"
        },
        {
            "label": "x-MacRomania",
            "value": "x-MacRomania"
        },
        {
            "label": "x-MacSymbol",
            "value": "x-MacSymbol"
        },
        {
            "label": "x-MacThai",
            "value": "x-MacThai"
        },
        {
            "label": "x-MacTurkish",
            "value": "x-MacTurkish"
        },
        {
            "label": "x-MacUkraine",
            "value": "x-MacUkraine"
        },
        {
            "label": "x-MS932_0213",
            "value": "x-MS932_0213"
        },
        {
            "label": "x-MS950-HKSCS",
            "value": "x-MS950-HKSCS"
        },
        {
            "label": "x-MS950-HKSCS-XP",
            "value": "x-MS950-HKSCS-XP"
        },
        {
            "label": "x-mswin-936",
            "value": "x-mswin-936"
        },
        {
            "label": "x-PCK",
            "value": "x-PCK"
        },
        {
            "label": "x-SJIS_0213",
            "value": "x-SJIS_0213"
        },
        {
            "label": "x-UTF-16LE-BOM",
            "value": "x-UTF-16LE-BOM"
        },
        {
            "label": "X-UTF-32BE-BOM",
            "value": "X-UTF-32BE-BOM"
        },
        {
            "label": "X-UTF-32LE-BOM",
            "value": "X-UTF-32LE-BOM"
        },
        {
            "label": "x-windows-50220",
            "value": "x-windows-50220"
        },
        {
            "label": "x-windows-50221",
            "value": "x-windows-50221"
        },
        {
            "label": "x-windows-874",
            "value": "x-windows-874"
        },
        {
            "label": "x-windows-949",
            "value": "x-windows-949"
        },
        {
            "label": "x-windows-950",
            "value": "x-windows-950"
        },
        {
            "label": "x-windows-iso2022jp",
            "value": "x-windows-iso2022jp"
        }
    ],
    "customerReturned": false,
    "directStrValue": null,
    "extraMap": {},
    "message": null,
    "status": 1,
    "timestamp": 1717783805607
      }// await gutils.opt("/pub/getAllCharset");
      gstore.common_app.model_charset_listings = content;
    },
    workspace_base_init: async function () {
      reaction(() => {
        return [gstore.localSettings.pre_currentWorkspaceId];
      }, chk_when_pre_crt);
      gutils.defer(() => {
        chk_when_pre_crt();
      });
      await gutils.api.user.refreshWorkspaceList();
    },
    checkLangLogic: function () {
      // let crtLocale = ipc.locale;
      // let fn_engtell = (str) => {
      //   return `Software just detected your system language is Chinese, Would you like to switch the software language to ${str}?`;
      // };
      // let hkobj = {
      //   text: `系統檢測到您的系統語言是繁體中文，需要為您切換到繁體中文嗎？? ${fn_engtell(
      //     "Chinese"
      //   )}`,
      //   afterText: "程序將重載當前頁以進行應用，點擊確認繼續",
      //   targetLang: "zh_HK",
      // };
      // let mappingLang = {
      //   "zh-CN": {
      //     text: `系统检测到您的系统语言是简体中文，需要为您切换到简体中文吗(zh-CN)? ${fn_engtell(
      //       "Chinese"
      //     )}`,
      //     afterText: "程序将重载当前页以进行应用，点击确认继续",
      //     targetLang: "zh_CN",
      //   },
      //   "zh-TW": hkobj,
      //   "zh-HK": hkobj,
      // };
      // let mappingItem = mappingLang[crtLocale];
      // let fn_call_update_switch = async () => {
      //   gutils.changeLang(mappingItem.targetLang);
      //   gutils.saveLangToDisk();
      //   if (mappingItem.afterText) {
      //     await gutils.win_alert(mappingItem.afterText);
      //   }
      // };
      // if (mappingItem) {
      //   if (true || p_mode()) {
      //     // gutils.onceDisk(`${"ask-lang-for" + crtLocale}`,()=>{
      //     //    fn_call_update_switch();
      //     // })
      //   } else {
      //     gutils.confirmIfNotClickOk(
      //       "ask-lang-for" + crtLocale,
      //       mappingItem.text,
      //       () => {},
      //       {
      //         fn_first: () => {
      //           fn_call_update_switch();
      //           location.reload();
      //         },
      //         needBothSet: true,
      //         title: "System Language Detected",
      //         cancelText: "Switch",
      //         cancelIntent: "primary",
      //       }
      //     );
      //   }
      // }
    },
    startHandlingAllKeyMaps: function () {
      // ipcRenderer
      window.ipc.addKeyMapListen((e, obj) => {
        if (obj) {
          // if (true) {
          //   return;
          // }
          switch (obj.TYPE) {
            case "open-settings":
              // gutils.api.system.openSettingAPI("general");
              break;
            case "toggle-app-view":
              // gutils.toggleViewType();
              break;
            case "toggle-left-menu":
              // gstore.localSettings.isLeftMenuOpen =
              //   !gstore.localSettings.isLeftMenuOpen;
              break;
            case "open-software-updates":
              gutils.api.system.openSettingAPI("updates");
              break;
            case "open-software-abouts":
              gutils.api.system.openSettingAPI("abouts");
              break;
          }
        }
      });
    },
    loadingAllSettings: async () => {
      try {
        // let codeTypeRes = await gutils.opt("/code_type/list");
        // gstore.settings.langArr = codeTypeRes.content;
        // await gutils.opt("/infra/close-download", {
        //   type: ["system", "db-driver"],
        // });
        try {
          if (!p_mode()) {
            // let res = await gutils.opt("/system/setting-query-all");
            // let finModel = {};
            // _.forEach(res.content, (x, d, n) => {
            //   finModel[x.MYKEY] = x.MYVALUE;
            // });
            // gstore.settings.model = finModel;
          }
        } catch (e) {
          console.log("e", e);
        }
        // let devModeRes = await gutils.opt("/portal_private/dev-mode");
        gstore.settings.dev_mode = false // devModeRes.content;
      } catch (e) {
        console.log("e2", e);
      }
    },
    loadingAllLocalProject: async () => {
      await gutils.api.common_app.init();
    },
    verifyFunc: async function () {
      gutils.once("verify-page", async () => {
        while (true) {
          if (gutils.dev()) {
            return;
          }
          if(true)return;
          try {
            let res = await gutils.optCentreWithDeviceInfo(
              "/release-notes/json/verify-version",
              {
                CHECKING: true,
              }
            );
            console.log("res value", res);
            if (res && res.content && res.content.FORCE_UPDATE_VERSION) {
              await gutils.win_alert(
                `Current version is no longer supported now, please upgrade the latest version. ` +
                  (res.content.FORCE_UPDATE_VERSION_MSG || "")
              );
            }
          } catch (err) {
            // got err
            console.log(err);
          }
          await gutils.sleep(1000 * 60 * 30);
        }
      });
      gutils.once("get-latest-version", async () => {
        try {
          if (p_mode()) {
            return;
          }
        } catch (e) {}
        while (true) {
          try {
            let res = await gutils.optCentreWithDeviceInfo(
              "/release-notes/json/get-latest-version",
              {
                TYPE: "prod",
              }
            );
            let { content } = res;
            if (content) {
              let { VERSION, BLOG_CODE, DESCRIPTION } = content;
              if (!_.isNil(VERSION)) {
                if (
                  _.trim(VERSION).replace("v", "") >
                  _.trim(gutils.app_version).replace("v", "")
                ) {
                  if (
                    !_.isNil(window.show_confirm_logic) &&
                    window.show_confirm_logic == true
                  ) {
                    return;
                  }
                  window.show_confirm_logic = true;
                  gutils.confirmOrJustTimeout({
                    timeout: 60 * 60 * 24 * 3, // 3 days later
                    // timeout: 60, // 3 days later
                    savekey: "upgrade-version" + VERSION,
                    title: `New Version ${VERSION} Released Now`,
                    fn() {
                      gstore.localSettings.softwareUpdatesTabId = `prod`;
                      gutils.api.system.openSettingAPI("updates");
                      window.show_confirm_logic = false;
                    },
                    msg: (
                      <SoftwareDetailView
                        VERSION={VERSION}
                        obj={content}
                        DESCRIPTION={DESCRIPTION}
                        BLOG_CODE={BLOG_CODE}
                      />
                    ),
                  });
                }
              }
            }
            console.log("res value need upgrade", res);
          } catch (err) {
            // got err
            console.log(err);
          }
          await gutils.sleep(1000 * 60 * 30);
        }
      });
    },
  },
  // if want to auto run or init, add methods below
  init: {
    keepUpdatingLatestMsgCount: async () => {
      if (true) {
        return;
      }
      while (true) {
        try {
          await gutils.api.msg.runSingleUpdatingMsgCount();
          await gutils.sleep(500);
          if (gstore.sysinfo.isOpenNotification) {
            await gutils.api.msg.readCurrentNotifcation();
          }
        } catch (e) {
          // // console.log("got error", e);
          gutils.defer(() => {
            // if (gutils.hist.location.pathname != "/handling") {
            //   gutils.opt("/system/health-check").catch((e) => {
            //     let localCheckFunc = async () => {
            //       while (true) {
            //         try {
            //           let res = await gutils.opt("/system/health-check");
            //           // // console.log("check res", res);
            //           if (res && res.status) {
            //             break;
            //           }
            //         } catch (e) {
            //           // // console.log("still failed", e);
            //         }
            //         await gutils.sleep(5000);
            //       }
            //       // // console.log("system resumed");
            //       window.location.reload();
            //     };
            //     localCheckFunc();
            //     // gutils.hist.push("/handling");
            //   });
            // }
          });
          await gutils.sleep(5000);
        }
      }
    },
  },
};
export default myapi;
