import _, { update } from "lodash";
import pkgInfo from "./pkginfo";
function uuid(str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return str
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}
import zh_CN from './zh_CN.json'
import zh_CNOverwrite from './zh_CN_overwrite.json'
if (_.isNil(localStorage.getItem("machineID"))) {
  localStorage.setItem("machineID", uuid());
}
if (undefined == window.n_ext) {
  window.n_ext = {
    plugins: {
      getUpdateValue: async function (folderName) {
        let ok = await window.n_ext.plugins.getDetailById(folderName, {
          only_timestamp: true,
        });
        return ok.timestamp;
      },
      readList: async function () {
        let { content } = {
    "content": [
        "EncryptSM2",
        "MavenRepo",
        "TextHanTools200",
        "CurlParser",
        "MorseCode",
        "ASymRSA",
        "SQLToBean200",
        "JDKJRE100",
        "YamlJSONTool",
        "DMLToJSON200",
        "RenderDoT",
        "TimeCrontab",
        "BasicCalc",
        "IPLongConverter",
        "TextHelperUniquer",
        "SymBlowfish",
        "TranslateForCustomizer",
        "QRCodeDecoder",
        "SoftwareCenter",
        "SiteBrowser",
        "TranslateForJSON",
        "SwaggerOpenAPI",
        "ReactReplaceClz",
        "JSONConverter",
        "TextMultipleToOne",
        "CDNTool100",
        "Caniuse",
        "EncryptSM3",
        "RegexTester",
        "JSONProbe",
        "TextJoinTools",
        "CurlToAPI",
        "Base32",
        "PowerDiff200",
        "Monolithic",
        "SymDES",
        "QRCodeCreator",
        "SymRC4",
        "QueryStringConversion",
        "SymDESede",
        "SymARCFOUR",
        "ColorPicker",
        "XMLJSoup",
        "MathBCD",
        "BizXMLToCodeM",
        "TextHelperShuffle",
        "LinuxManPage",
        "JSONQMapper",
        "ReactReplaceStyle",
        "JSONFilter",
        "KeyboardListen",
        "SymPBEWithSHA1AndRC240",
        "LoremC",
        "UnicodeConversion",
        "SymPBEWithMD5AndDES",
        "JSONFlattenDeep",
        "TextHelperFilter",
        "JWTEncoder",
        "SQLToJSON200",
        "RenderHandleBars",
        "JWTDecoder",
        "Cool",
        "XMLXPath",
        "IPv4Calculator",
        "SymPBEWithSHA1AndDESede",
        "JSONQFilter",
        "BizJSONToCode",
        "TextASCIITools200",
        "TextRandomText",
        "FRPCodeG",
        "IPAddrMasker",
        "SymAES",
        "ZipText",
        "NumberDigits",
        "SymRC6",
        "TextHelperSorter",
        "TextRandomMock",
        "TextHexConverter",
        "SymRC2",
        "EncryptSM4",
        "NamePubC",
        "JSONXPath",
        "Base64Previewer",
        "SystemFormat",
        "SymRC5",
        "TranslateForProperties",
        "HexBaseBiConverter",
        "DateCalcTool100",
        "JSONZipper",
        "WebWorld"
    ],
    "customerReturned": false,
    "directStrValue": null,
    "extraMap": {
        "tunedList": [
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            },
            {
                "a": 1
            }
        ],
        "configExt": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    "message": null,
    "status": 1,
    "timestamp": 1717783807166
} // await gutils.opt("/ext/list");
        return content;
      },
      getDetailById: async function (folderName, myconfig = {}) {
        let obj = {
          dir: {
            root: folderName,
          },
          timestamp: "",
          entryJs: "",
          entryCss: "",
        };
        try {
          let { content } = await gutils.opt(
            `/ext/getDetailById?p=${folderName}`,
            {
              name: folderName,
              ...myconfig,
            }
          );
          let data = content;
          _.merge(obj, data);
        } catch (e) {
          // error
          console.log(e);
        }
        // let mytmparr = [
        //   {
        //     path: "timestamp.txt",
        //     result: "timestamp",
        //   },
        //   {
        //     path: "frontend/entry.css",
        //     result: "entryCss",
        //   },
        //   {
        //     path: "frontend/entry.jsx",
        //     result: "entryJs",
        //   },
        // ];
        // for (let eachItem of mytmparr) {
        // }
        window.tmp_obj = obj;
        return obj;
      },
    },
  };
}

window.safeParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log(e);
    return {};
  }
};

let store_key = "CODEGEN_SAVE_STORE_KEY";
if (localStorage.getItem(store_key) == null) {
  localStorage.setItem(store_key, "{}");
}
let locale_str = navigator.language;
window.CODEGEN_STORE = window.safeParse(localStorage.getItem(store_key)) || {};
let finalLang = "en_US";
if (locale_str == "zh-CN") {
  finalLang = "zh_CN";
} else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
  finalLang = "zh_HK";
}
if (location && location.host) {
  if (location.host == "hk.1024doc.com") {
    finalLang = "zh_HK";
  } else if (location.host == "cn.1024doc.com") {
    finalLang = "zh_CN";
  }
}
let crt_lang = finalLang;
_.defaultsDeep(window.CODEGEN_STORE, {
  apphome: "unsupport",
  appdata: "unsupport",
  token: "N/A",
  isUserInChina: false,
  lang: crt_lang,
  mirror: "global",
  local_settings: {},
});
window.get_store = (key) => {
  if (_.isNil(key)) {
    return window.CODEGEN_STORE;
  } else {
    return window.CODEGEN_STORE[key];
  }
};
window.set_store = (key, object) => {
  window.CODEGEN_STORE[key] = object;
  // _.mergeWith(window.CODEGEN_STORE, object, (objValue, srcValue) => {
  //   if (_.isArray(objValue)) {
  //     return objValue;
  //   }
  // });
  //
  localStorage.setItem(store_key, JSON.stringify(window.CODEGEN_STORE));
};

window.flag_setDev = (isDev) => {
  if (_.isNil(isDev)) {
    isDev = "true";
  }
  localStorage.setItem("DEV_FLAG", isDev + "");
  location.reload();
};
window.flag_removeDev = () => {
  localStorage.removeItem("DEV_FLAG");
  location.reload();
};
window.flag_isDev = () => {
  return localStorage.getItem("DEV_FLAG") == "true";
};

if (undefined === window.ipc) {
  let fileAPI = {
    rm: async (key) => {
      await gutils.opt("/fs/del_value", {
        save_key: key,
      });
    },
    writeStrToFile: async (myfilepath, str) => {
      await gutils.opt("/fs/set_value", {
        save_key: myfilepath,
        save_value: str,
      });
    },
    copyFileContent: async (a, b) => {
      let a_str = await fileAPI.readFileToStr(a);
      await fileAPI.writeStrToFile(b, a_str);
    },
    readFile: async (a) => {
      let res = await fileAPI.readFileToStr(a);
      return res;
    },
    readFileToStr: async (a) => {
      let cc = await gutils.opt("/fs/get_value", {
        save_key: a,
      });
      return cc.content;
    },
    // not supported
    mkdirDir: async (link) => {
      await gutils.opt("/fs/mkdirs", {
        link: link,
      });
    },
    openFile: async (link) => {
      await gutils.opt("/fs/openFile", {
        link: link,
      });
    },
    openDir: async () => {
      await gutils.opt("/fs/openFile", {
        link: link,
      });
    },
    selectDir: async function (func) {
      // await gutils.opt("/fs/select_dir", {});
      // gutils.opt("/common/openDir");
      await gutils.win_alert(
        t(
          `Sorry, selecting directory is still under testing, please input the directory value into the textbox directly. We will finished this function ASAP.`
        )
      );
    },
  };
  let nouseIpc = {
    cleanDebugFiles: () => {},
    createDebug: () => {},
    hasDebug: () => {},
    deleteDebug: () => {},
    loggingsFolder: () => {},
    getDebugFileSize: () => {},
    getErrFileSize: () => {},
    getPageFileSize: () => {},
    getFileSize: () => {},
    crt_feboot_json_path: () => {},
    raw_feboot_json_path: () => {},
    dirname: () => {},
    isHasWhiteShots: () => {},
    raw_app_version: () => {},
    all_files_placed: () => {},
    isBootFlagDone: () => {},
    cleanVersionFile: () => {},
    isFirstBoot: () => {},
    setFirstBoot: () => {},
    i18n: () => {},
    cleanLogFile: () => {},
    appendLogFile: () => {},
    isInstallCore: () => {},
    isInstallRuntime: () => {},
    markAsCoreInstalled: () => {},
    markAsRuntimeInstalled: () => {},
    isFileNeedRefreshCore: () => {},
    rmFileNeedRefreshCore: () => {},
    quit: async () => {
      try {
        await gutils.optWithNoWin("/dg/app_exit");
      } catch (e) {
        // do nothing
      }
      location.reload();
    },
    relaunch: () => {},
    writeNextSetupPath: () => {},
    getReleaseDir: () => {},
    getDbFileSize: () => {},
    makeVacuumFlag: () => {},
    backupDir: () => {},
    isDevCentreLink: window.flag_isDev(),
    addKeyMapListen: () => {},
    ipcRenderer: () => {},
    release: () => {},
    openBackupsDir: () => {},
    kill: () => {},
    getAvailablePort: () => {},
    setPort: () => {},
    getPort: () => {},
    markAsNeedRefresh: () => {},
    keepEmptyFile: () => {},
    execCommand: () => {},
    puid: () => {},
    writeBootLog: () => {},
    getLastModifiedForFile: () => {},
    getBootLog: () => {},
    testFunc: () => {},
    getRunMainBackendTotalCmd: () => {},
    getRunBackendServerCmd: () => {},
    getMachineId: () => {},
    decompress: () => {},
    getRepoJSON: () => {},
    getOriginalRepoJSON: () => {},
    getClientJarFilePath: () => {},
    testDownloadFile: () => {},
    sep: () => {},
    clzSep: () => {},
    e_appHome: () => {},
    nn_appHome: () => {},
    downloadJar: () => {},
    getMavenBase: () => {},
    downloadFile: () => {},
    setGStore: () => {},
    hasFile: () => {},
    hasFileInHome: () => {},
    getCrtDirPath: () => {},
    isBrandNewAndNeedDownloadInfra: () => {},
    isLocalServerNotStartedUp: () => {},
    saveInitJson: () => {},
    localSettingJsonFilePath: () => {},
    getAppHomePath: () => {},
    getAppDownloadPath: () => {},
    testDir: () => {},
    getAppDownloadPathByJoin: () => {},
    joinPath: () => {},
    deleteDir: () => {},
    deleteDirForItsParent: () => {},
    deleteOldData: () => {},
    handleWhenFirstBoot: () => {},
    writeCurrentVersion: () => {},
    markFirstBootOk: () => {},
    hasFileInDownloadHome: () => {},

    homedir: () => {},
    port: () => {},
    send: () => {},
    sendSync: () => {},
    receive: () => {},
    receiveOnce: () => {},
  };
  window.ipc = {
    isCurrentCloudClientMode() {
      return false;
    },
    selectFile: async function (func) {
      var input = document.createElement("input");
      input.type = "file";
      $(input).change(async (e) => {
        console.log("update the files", input.files);
        let thatFile = _.first(input.files);
        window.mymyipt = input;
        let handleFunc = async () => {
          console.log(thatFile);
          let updateObj = {
            num: 0,
            ref: null,
            done: false,
            err: false,
          };
          let dismiss = () => {
            if (updateObj.num != 100 && !updateObj.err) {
              updateObj.err = true;
              if (updateObj.ref) {
                updateObj.ref();
              }
            }
          };
          let myrandId = _.uniqueId("loading");
          let key = -1;
          // gutils.alert(
          //   gutils.showProcessLoader(updateObj.num, dismiss)
          // );
          let mFunc = () => {
            if (updateObj.err) {
              return;
            }
            if (updateObj.num >= 100) {
              AppToaster("fixed_len").show(
                gutils.showProcessLoader(100, dismiss),
                key
              );
              return;
            }
            console.log(key);
            updateObj.num +=
              updateObj.num >= 80
                ? Math.random() * 1 + 0.5
                : Math.random() * 5 + 2;
            if (updateObj.num >= 100) {
              updateObj.num = 99.99;
            } else {
            }
            if (updateObj.done) {
              updateObj.num = 100;
            }
            AppToaster("fixed_len").show(
              gutils.showProcessLoader(updateObj.num, dismiss),
              key
            );
            if (updateObj.num != 100) {
              window[myrandId] = setTimeout(mFunc, Math.random() * 1000 + 500);
            } else {
              // done
              window.clearTimeout(window[myrandId]);
              setTimeout(() => {
                gutils.hideAlertFnIfHas("fixed_len");
              }, 2000);
            }
          };
          // window[myrandId] = setTimeout(mFunc, Math.random() * 1000 + 500);
          gutils.alert(`Uploading the file, please wait a moments.`);

          try {
            let res = await gutils.opt(
              "/fs/upload_file",
              {},
              {
                ref(source) {
                  updateObj.ref = source;
                },
                fn_data() {
                  let formData = new FormData();
                  formData.append("user_file", thatFile);
                  return formData;
                },
                contentType: "multipart/form-data",
              }
            );
            let currentFileId = _.get(res, "content");
            console.log("that file id", currentFileId);
            if (func) {
              func(currentFileId, thatFile);
            }
            updateObj.num = 100;
            updateObj.done = true;
            function hideAlertFnIfHas(name) {
              try {
                if (window.ALL_ALERT_INST[name]) {
                  window.ALL_ALERT_INST[name].clear();
                  window.ALL_ALERT_INST[name].dismiss();
                }
              } catch (e) {
                console.log("e", e);
              }
            }
            // hideAlertFnIfHas("uploadRef");
            gutils.alertOk(t(`Uploaded the file successfully!`));
            // window.clearTimeout(window[myrandId]);
          } catch (e) {
            gutils.alert(gutils.getErrMsg(e));
            // window.clearTimeout(window[myrandId]);
            updateObj.err = true;
            console.log(e);
          }
        };
        if (!_.isNil(thatFile)) {
          if (ipc.isCurrentCloudClientMode()) {
            await gutils.win_confirm_with_once(
              t(
                "CodeGen will upload the file you selected to our server, and we will deleted it immediatelly after having finished the action. Please be noted that this message will only display once."
              ),
              "only-once-upload",
              () => {
                handleFunc();
              }
            );
          } else {
            handleFunc();
          }
        }
        console.log(thatFile);
      });
      input.click();
    },
    ...nouseIpc,
    ...fileAPI,
    // handling
    dev: window.flag_isDev(),
    locale: navigator.language,
    version: pkgInfo.version,
    platform: pkgInfo.platform,
    store_set(key, value) {
      set_store(
        key,
        value
        //   {
        //   [key]: value,
        // }
      );
    },
    store_get(key) {
      // console.log("history href", location.href);
      if (
        key == "token" &&
        location.href &&
        location.href.indexOf("token") != -1
      ) {
        try {
          let myres = null;
          if (location.href.indexOf("token?p=") != -1) {
            myres = _.trim(/token\?p=(.+)/g.exec(location.href)[1]);
          } else {
            myres = _.trim(/token=(.+)/g.exec(location.href)[1]);
          }
          return myres;
        } catch (e) {
          console.log(e);
          //gutils.win_alertgutils.getErrMsg(e));
        }
        return "nothing here";
      }
      return get_store(key);
    },
    fn_ruid() {
      return "testuuid1234512345";
    },
    saveLocalSettingJsonToSource(obj) {
      if (window.stop_auto_local_settings) {
        return;
      }
      window.set_store(
        "local_settings",
        obj
        // {
        //   local_settings: obj,
        // }
      );
    },
    isBrandNewAndNeedDownloadInfra() {
      return false;
    },
    getMachineId() {
      return "browser-machine-id";
    },
    isLocalServerNotStartedUp() {
      return false;
    },
    getCurrentLang() {
      return _.get(window.ipc.readInitJSON(), "lang", "en_US");
    },
    setCurrentLang(value) {
      window.ipc.store_set("lang", value);
    },
    readInitJSON() {
      return window.get_store();
    },
    readLocalSourceReadOnlyLocalSettings: () => {
      return window.get_store("local_settings");
    },
  };
}
if (undefined === window.t_preload) {
  function formatResultWithReplacer(val = "", ...args) {
    if (_.isNil(args)) {
      args = [];
    }
    for (let index in args) {
      let tval = args[index];
      val = val.replaceAll("{" + index + "}", tval);
    }
    return val;
  }

  // TODO: add translate
  // if (isDev) {
  //   setInterval(() => {
  //     initLanguageFn();
  //   }, 500);
  // }
  let insertObj = {};
  function collectLabel(keyname) {
    if (insertObj[keyname]) {
      return;
    }
    insertObj[keyname] = "1";
    // TODO: add collect label
    // || location.href.indexOf(`18030`) != -1
    if (true || window.ipc.dev) {
      gutils.opt("/infra/collect_label", {
        text: keyname,
      });
    }
  }

  window.t_preload = (crtLang, keyname, ...args) => {
    crtLang='zh_CN'
    let isDev = _.get(window, "ipc.dev", false);
    // console.log("translating", crtLang, keyname);
    if (_.isNil(keyname) || keyname == " " || keyname == "") {
      return "";
    }
    if (keyname.indexOf("[CG_ERR]") != -1) {
      return keyname;
    }
    if (keyname.indexOf("[CG_975]") != -1) {
      keyname = keyname.replaceAll("[CG_975]", "");
      return keyname;
    }
    let overwritekey = crtLang + "_overwrite";
    let i18nObj = window.pkgInfo.i18n;
    if (_.isEmpty(i18nObj) || crtLang == "en_US") {
      return formatResultWithReplacer(keyname, ...args);
    }
    if (
      _.isEmpty(i18nObj) ||
      (crtLang == "en_US" && !isDev) ||
      _.isNil(i18nObj[overwritekey]) ||
      _.isNil(i18nObj[crtLang])
    ) {
      return formatResultWithReplacer(keyname, ...args);
    }
    // console.log(crtLang, crt_gstore, window.gstore);
    // console.log("continue here", crtLang, i18nObj, keyname);
    if (i18nObj[overwritekey][keyname]) {
      return formatResultWithReplacer(i18nObj[overwritekey][keyname], ...args);
    }
    let crtLangObj = i18nObj[crtLang];
    let finval = crtLangObj[keyname];
    if (finval == "" || _.isNil(finval)) {
      let reverseValue = null;
      _.every(crtLangObj, (x, d, n) => {
        if (x == keyname) {
          reverseValue = x;
          return false;
        }
        return true;
      });
      if (!_.isNil(reverseValue)) {
        return formatResultWithReplacer(reverseValue, ...args);
      } else {
        collectLabel(keyname);
        return formatResultWithReplacer(keyname, ...args);
      }
    }
    return formatResultWithReplacer(finval, ...args);
  };
}
