import "./preinit";
import "./pre-editor";
import localforage from "localforage";
window.NEED_BE_STORED = false;
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
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
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
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import gutils from "./utils";
import _ from "lodash";
import { useState } from "react";
import zhCN from './zh_CN.json'
import zh_CN_overwrite from './zh_CN_overwrite.json'

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
window.observer = observer;
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import {autorun, observable, reaction}  from 'mobx'
import gstore from "./store.jsx";
import LoadingPage from "./routes/loading/index";
import MainPage from "./routes/main/index";
import PreInitView from "./routes/prelimnary/index";
import Overlay_playground from "./routes/overlay_playground";
import "./index.less";
import Handling from "./routes/handling/index";
import LoadService from "./routes/loadService/index";
import autoRunFunc from "./auto_run_func.jsx";
import { FocusStyleManager } from "@blueprintjs/core";
import CryptoJS from "crypto-js";
import HandlerClz from "./routes/WrapError/index";
import TokenPatch from "./routes/TokenPatch";
import { Omnibar } from "@blueprintjs/select";
import GetBaidu from "./GetBaidu";
import NoDataPage from "./NoDataPage";
import { HotkeysTarget2 } from "@blueprintjs/core";
import gui from "./gui";
import SystemAlertOrPrompt from "./SystemAlertOrPrompt";
import authobj from "./auth.jsx";
import "./omnibus";
window.authobj = authobj;

window.CryptoJS = CryptoJS;
// import pinyin from "pinyin-engine/tw";
// window.pinyin = pinyin;
// import i18n from "i18next";
// import { useTranslation, initReactI18next } from "react-i18next";
function fn_mtab_mode() {
  return window.gstore.localSettings.app_multiple_tab_mode;
}
// window.api.setGStore(gstore);
window.localforge = localforage;
window.localforage = localforage;
function escapeRegExpChars(text) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function highlightText(text, query) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}
const initInfo = {
  hadReorientWhenInit: false,
};
gui.init({
  gstore: gstore,
});
window.get_hm_js_link = () => {
  return !p_mode() || location.host == "cloud.codegen.cc"
    ? "https://hm.baidu.com/hm.js?1ef6df6a4dc7351a587f1c8f94df992e"
    : "https://hm.baidu.com/hm.js?f4db69ab107d1e56176b041edd597f79";
};

const fn_sending_GetBaidu = _.throttle((props) => {

}, 3000);

setTimeout(() => {
  fn_sending_GetBaidu();
});
setTimeout(() => {
  // var { BrowserWindow } = require("electron").remote;
  // var winid = require("electron").remote.getGlobal("winid");
  // window.BrowserWindow = BrowserWindow;
});

window.fn_sending_GetBaidu = fn_sending_GetBaidu;

let SysNav = observer(() => {
  let flat_listings = _.chain(gstore.nav_menu)
    .map((x) => x.children)
    .flattenDeep()
    .value();
  let hist = useHistory();
  return (
    <Omnibar
      itemsEqual={(filmA, filmB) => {
        return filmA.pid == filmB.pid;
        // return filmA.pystr.toLowerCase() === filmB.pystr.toLowerCase();
      }}
      noResults={<MenuItem disabled={true} text={t("No results.")} />}
      onClose={() => {
        gstore.localSettings.showingOmnibar = false;
      }}
      isOpen={gstore.localSettings.showingOmnibar}
      allowCreate={false}
      resetOnSelect={true}
      onItemSelect={(item) => {
        hist.push(item.pathname);
        gstore.localSettings.showingOmnibar = false;
      }}
      itemPredicate={(query, film, _index, exactMatch) => {
        // console.log("item pred", query, film, _index, exactMatch);
        // if (_.isNil(query) || query == "") {
        //   return true; //_index < 10;
        // }
        const normalizedTitle = (film.pystr + "").toLowerCase();
        const normalizedQuery = query.toLowerCase();

        if (exactMatch) {
          return normalizedTitle === normalizedQuery;
        } else {
          return `${film.pystr}`.indexOf(normalizedQuery) >= 0;
        }
      }}
      itemRenderer={(item, { handleClick, handleFocus, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
          return null;
        }
        const text = `${item.label}`;
        let fn_1 = () => {};
        return (
          <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={item.label}
            icon={item.icon || "application"}
            key={item.id}
            // onClick={handleClick}
            onFocus={handleFocus}
            text={highlightText(text, query)}
            onClick={handleClick}
          />
        );
      }}
      items={flat_listings}
    />
  );
});

const SubRoot = observer(() => {
  const hist = useHistory();
  gstore.sysinfo.latestRoutePath =
    hist.location.pathname + hist.location.search;
  window.hist = hist;
  if (!initInfo.hasReorientWhenInit) {
    initInfo.hasReorientWhenInit = true;
    gutils.defer(() => {
      // hist.push("/loading");
    });
  }
  gutils.once("run auto run", () => {
    autoRunFunc(gstore);
  });
  // autorun(()=>{
  //   let darkMode = gstore.localSettings.is_using_dark_mode
  // })
  gutils.once("init-sys", async () => {
    let afunc = async () => {
      if (p_mode()) {
        return;
      }
      if (window.LOCAL_AUTH_LOGIN_CHK.isLogin()) {
        return;
      }
      let { isLogin, isNotInit, errMsg, authFilePath } =
        await window.LOCAL_AUTH_LOGIN_CHK.getAuthStatus();
      let crtPathName = hist.location.pathname;
      let isPrelimnary = (crtPathName || "").indexOf("/prelimnary") != -1;
      let isAppPrefix = (crtPathName || "").startsWith("/app");
      if (!isNotInit && isLogin) {
        // if (isPrelimnary) {
        //   hist.push("/");
        // } else if (isAppPrefix) {
        //   hist.push("/");
        // }
      } else {
        if (!p_mode()) {
          hist.replace("/prelimnary");
        }
      }
    };
    window.LOCAL_AUTH_LOGIN_CHK.chkAndRedirect = afunc;
    reaction(() => {
      return gstore.sysinfo.latestRoutePath;
    }, afunc);
    afunc();
  });

  return (
    <div
      className={
        " user-root-box " +
        (gstore.localSettings.is_using_dark_mode ? " bp3-dark " : " ")
      }
      key={gstore.preliAllData.real_update_for_lang}
    >
      <SystemAlertOrPrompt />
      <Switch>
        <Route exact path="/loading" component={LoadingPage}></Route>
        <Route exact path="/prelimnary" component={PreInitView}></Route>
        <Route exact path="/handling" component={Handling}></Route>
        <Route exact path="/loadService" component={LoadService}></Route>
        <Route path="/" component={MainPage}></Route>
        <Route path="/token" component={TokenPatch}></Route>
        <Route path="*" component={NoDataPage}></Route>
        <Redirect path="*" to="/"></Redirect>
      </Switch>
      <SysNav />
    </div>
  );
});

window.fix_pathname = location.pathname;

const Root = () => {
  let hotkeys = [
    {
      combo: "shift + K",
      global: true,
      label: t("Quick Search by {0}", "OmniBar"),
      onKeyDown: () => {
        gstore.localSettings.showingOmnibar = true;
      },
    },
    {
      combo: "shift + P",
      global: true,
      label: t(`Using Rapid/Conventional Mode`),
      onKeyDown: () => {
        window.fn_mountain();
      },
    },
    {
      combo: "shift + L",
      global: true,
      label: t("Toggle Displaying Left Menu Panel"),
      onKeyDown: () => {
        //
        window.fn_leftMenu_handle();
      },
    },
    {
      combo: "shift + D",
      global: true,
      label: t("Toggle Dark/Light View Mode"),
      onKeyDown: () => {
        window.fn_light_dark();
      },
    },

    {
      combo: "shift + S",
      global: true,
      label: t("Show Settings Panel", "OmniBar"),
      onKeyDown: () => {
        gutils.api.system.openSettingAPI("general");
      },
    },
    {
      combo: "shift + U",
      global: true,
      label: t("Show Quick View Panel", "OmniBar"),
      onKeyDown: () => {
        let willWorkPath = "/";
        gutils.showPageByModal(willWorkPath, {
          title: `Navigator`,
          icon: "map",
        });
      },
    },
    {
      combo: "F",
      global: true,
      label: t(`Toggle FullScreen View`),
      onKeyDown: () => {
        window.fn_full_or_not_full();
      },
    },
    p_mode()
      ? null
      : {
          combo: "U",
          global: true,
          label: t(`Toggle Local User Management View`),
          onKeyDown: () => {
            gstore.localUserConfig.drawer.open =
              !gstore.localUserConfig.drawer.open;
          },
        },

    p_mode()
      ? null
      : {
          combo: "U",
          global: true,
          label: t(`Toggle Integrated Terminal View`),
          onKeyDown: () => {
            gstore.localSettings.showing_terminal_panel =
              !gstore.localSettings.showing_terminal_panel;
          },
        },
    {
      combo: "L",
      global: true,
      label: t("Toggle Displaying Tab Panel If Have"),
      onKeyDown: () => {
        window.toggle_tab_panel_view();
      },
    },
    {
      combo: "N",
      global: true,
      label: t("Create A New Tab Item If Possible"),
      onKeyDown: () => {
        window.new_tab_panel_view();
      },
    },
    {
      combo: "A",
      global: true,
      label: t(`Toggle Activation Management View`),
      onKeyDown: () => {
        gstore.licenseConfig.drawer.open = !gstore.licenseConfig.drawer.open;
      },
    },
    p_mode()
      ? null
      : {
          combo: "T",
          global: true,
          label: t(`Show System Integrated Terminal`),
          onKeyDown: () => {
            window.fn_show_console();
          },
        },
  ].filter((x) => !_.isNil(x));
  return (
    // <HandlerClz nochk={true}>
    <Provider store={gstore}>
      <Router>
        <HotkeysTarget2 hotkeys={hotkeys}>
          {({ handleKeyDown, handleKeyUp }) => {
            return (
              <div
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                style={{ width: "100vw", height: "100vh" }}
              >
                <SubRoot></SubRoot>
              </div>
            );
          }}
        </HotkeysTarget2>
      </Router>
    </Provider>
    // </HandlerClz>
  );
};

const { ipc } = window;

let key_username = "codegen_username";
let key_password = "codegen_password";

window.LOCAL_AUTH_LOGIN_CHK = {
  chkAndRedirect: () => {},
  isLogin() {
    return _.get(window.LOCAL_AUTH_LOGIN_CHK, "authStatus.isLogin", false);
  },
  authStatus: null,
  getAuthStatus: async function () {
    if (p_mode()) {
      return;
    }
    let ctn = await gutils.optCtn("/local_auth/local_login_status");
    if (!_.isEqual(ctn, gstore.preliAllData.authStatus) && !_.isNil(ctn)) {
      gstore.preliAllData.authStatus = ctn;
      window.LOCAL_AUTH_LOGIN_CHK.authStatus = ctn;
    }
    return ctn;
  },
  getUserInfo: function () {
    return {
      username: localStorage.getItem(key_username),
      password: localStorage.getItem(key_password),
    };
  },
  cleanUser: function () {
    localStorage.removeItem(key_username);
    localStorage.removeItem(key_password);
  },
  setUserInfo: function ({ username, password }) {
    localStorage.setItem(key_username, username);
    localStorage.setItem(key_password, password);
  },
  encryptUserInfo: function (obj) {
    let { username, password } = obj;
    return {
      ...obj,
      raw_username: username,
      username:
        username == "Administrator"
          ? gutils.md5("cgf_2015" + username)
          : username,
      password: gutils.md5("cgf_2015" + password),
    };
  },
};

async function startFunc() {
  let b_fn_inner = async () => {
    try {
      let { content } = {
        content: {
            "direct_platform": "linux-x64",
        "server_using_windows": false,
        "using_dev_mode": false,
        "using_portal_mode": true,
        "version": "v1.8.63",
        "can_this_device_use_presently": false,
        "if_can_use_msg": "WHEREBY_ONLINE_ELIGIBILITY"
        }
      } // await gutils.opt(`/portal_public/get_api_info`);
      _.merge(gstore.apiInfo, {
        ...content,
      });
      if (gstore.apiInfo.reg_from_BE) {
        gstore.apiInfo.can_this_device_use_presently = true;
        return;
      }
      let fn_t = async () => {
        try {
          if (gstore.apiInfo.reg_from_BE) {
            gstore.apiInfo.can_this_device_use_presently = true;
            return;
          }
          let mp = get_user_info();
          if (mp && !mp.signed) {
            return;
          }
          if(true){
            return;
          }
          let r = await gutils.optCentre(
            "/user/post/ispremiumuser",
            {
              ...mp,
            },
            {
              mute: true,
            }
          );
          window.r0000 = r;
          console.log(r);
          let {
            content: { is_premium },
          } = r;
          if (
            true
            // (! &&  gstore.apiInfo.can_this_device_use_presently)
          ) {
            let is_premium_user = is_premium != 0;
            gstore.apiInfo.can_this_device_use_presently = is_premium_user;
            if (is_premium_user) {
              gstore.licenseConfig.drawer.open = false;
              localStorage.setItem("crt_premium_user", "1");
            } else {
              if (gstore.apiInfo.reg_from_BE) {
                // do nothing here
              } else {
                gstore.licenseConfig.drawer.open = true;
                localStorage.setItem("crt_premium_user", "0");
                if (!is_premium_user) {
                  setTimeout(() => {
                    gutils.alert({
                      message: t(
                        `It seems that your account is not a premium account, please try to buy our premium account.`
                      ),
                    });
                  }, 3000);
                }
              }
            }
          }
        } catch (e) {
          console.log("err", e);
        }
      };
      try {
        await fn_t();
      } catch (e) {
        console.log(e);
      }
      if (localStorage.getItem("crt_premium_user") == "1") {
        if (!gstore.apiInfo.can_this_device_use_presently) {
          gstore.apiInfo.can_this_device_use_presently = true;
        }
      }
      if (!gstore.apiInfo.can_this_device_use_presently) {
        if (!p_mode()) {
          gstore.licenseConfig.drawer.open = true;
        }
      }
    } catch (e) {
      console.log("e", e);
    }

    gstore.apiInfo.finalChk = true;
  };
  let b_fn = async () => {
    try {
      await b_fn_inner();
    } catch (e) {
      console.log("err", e);
    }
    try {
      await authobj.checkLicenseFromTimeToTime();
    } catch (e) {
      console.log("err", e);
    }
  };
  if (p_mode()) {
    gutils.defer(async () => {
      await b_fn();
      gstore.apiInfo.finalChk = true;
    });
  } else {
    gutils.defer(async () => {
      await b_fn();
      gstore.apiInfo.finalChk = true;
    });
  }
  if (p_mode()) {
    gutils.defer(async () => {
      try {
        let m_sign_in_status = {
    "content": {
        "signed": true,
        "username": "N/A",
        "token": "N/A",
        "email": "N/A",
        "user_id": null
    },
    "errors": null,
    "ftlMap": null,
    "ftlPath": null,
    "message": null,
    "newRedirectURL": null,
    "noFurtherHandle": false,
    "payload": null,
    "status": 1,
    "timestamp": 1717782854825,
    "v2Msg": null,
    "v2OK": true
}
        // await gutils.optCentre(
        //   `/api_tool/sign_in_status`,
        //   {
        //     mute: true,
        //   }
        // );
        window.m_sign_in_status = m_sign_in_status;
        _.merge(gstore.localSettings.userInfo, {
          ...m_sign_in_status.content,
        });
        console.log("m_sign_in_status", m_sign_in_status);
      } catch (e) {
        console.log("failed to got sign in status", e);
      }
    });
  }
  // loading translate json
  const i18nObj = _.keys({
    // en_US: {},
    // en_US_overwrite: {},
    zh_CN: {},
    zh_HK: {},
    zh_CN_overwrite: {},
    zh_HK_overwrite: {},
  });
  async function updateLangFunc() {
    let allWaitArr = [];
    console.log("checking updateLangFunc run updateLangRun");
    let crtLang = window.getCrtLang();
    if (crtLang == null) {
      return;
    }
    if (!_.isNil(window["init_already_" + crtLang])) {
      // return false;
    }
    let doitlangarr = [crtLang,];
    try {
      for (let eachJsonName of doitlangarr) {
        let tmpKey = "key_lang_" + eachJsonName;
        let res1 = await localforage.getItem(tmpKey);
        if (!_.isNil(res1)) {
          window.pkgInfo.i18n[eachJsonName] = res1;
          gstore.preliAllData.updateRefForLang++;
          gstore.preliAllData.real_update_for_lang++;
        }
      }
    } catch (e) {
      console.log("err", e);
    }
    let isAnyAck = false;
    let rawTitle = document.title;
    // document.title = `Loading Language Data...`;
    for (let eachJsonName of doitlangarr) {
      // document.title = ;
      // gutils.alert(`Loading ${eachJsonName}...`);
      let baseObject = {};
      // if (!p_mode()) {
      //   try {
      //     let lang_link = "/local_auth/getLangMapValue";
      //     console.log("lang_link", lang_link);
      //     let mres = await gutils.opt(lang_link, {
      //       type: eachJsonName,
      //     });
      //     baseObject = _.get(mres, "content.map");
      //     isAnyAck = true;
      //     console.log("mres", baseObject);
      //   } catch (err) {
      //     console.log("checking updateLangFunc err", err);
      //   }
      // }
      try {
        // let lang_link = gutils.dev()
        //   ? "/app/static/lang/" + eachJsonName + ".json"
        //   : `/app_${pkgInfo.version}` +
        //     `/static/lang/` +
        //     eachJsonName +
        //     ".json";
        // if (p_mode()) {
        //   lang_link = "/static/lang/" + eachJsonName + ".json";
        // }
        // console.log("lang_link", lang_link);
        // debugger
        let langObject =  {
          data: {
            ...zhCN,
            ...zh_CN_overwrite
          },
        } // await gutils.optStatic(lang_link);
        // console.log("langObject", langObject);
        if (!_.isEmpty(baseObject)) {
          console.log("mres merging", langObject.data);
          _.merge(langObject.data, baseObject);
        }
        try {
          let tmpKey = "key_lang_" + eachJsonName;
          await localforage.setItem(tmpKey, langObject.data);
        } catch (e) {
          console.log(e);
        }
        if (!_.isEqual(langObject.data, window.pkgInfo.i18n[eachJsonName])) {
          window.pkgInfo.i18n[eachJsonName] = langObject.data;
          gstore.preliAllData.updateRefForLang++;
          gstore.preliAllData.real_update_for_lang++;
        }
        isAnyAck = true;
      } catch (err) {
        console.log("checking updateLangFunc err", err);
      }
    }
    // for (let item of allWaitArr) {
    //   await item;
    // }
    // document.title = rawTitle; // p_mode() ? t(`CodeGen Online ToolBox`) : `CodeGen`;
    // gutils.alertOk({
    //   message: `Downloaded Language Pack.`,
    // });
    window["init_already_" + crtLang] = "ok";
    // if (document.title.indexOf("CodeGen") == -1) {
    //   document.title = "CodeGen";
    // }
    if (window.update_latest_view_menu) {
      setTimeout(() => {
        window.update_latest_view_menu();
      }, 0);
    }
    return isAnyAck;
  }
  window.updateLangFunc = updateLangFunc;
  gutils.once("alloknow", () => {
    setInterval(() => {
      if (document.title.indexOf("-") == -1) {
        window.update_latest_view_menu();
      }
    }, 500);
    setTimeout(() => {
      if (localStorage.getItem("init_first_run") == null) {
        localStorage.setItem("init_first_run", "ok");
        gutils.hist.push("/prelimnary");
      }
    }, 0);
  });
  let fn_next_call = async () => {
    try {
      // console.log("checking updateLangFunc inited");
      let crtLang = window.getCrtLang();
      if (!_.isNil(window["init_already_t_" + crtLang])) {
        return false;
      }
      window.updateLangFunc();
      window["init_already_t_" + crtLang] = "ok";
      // if (anyChange) {
      //   gstore.preliAllData.updateRefForLang++;
      // }
      // console.log("checking updateLangFunc finished");
    } catch (e) {
      console.log(e);
      console.log("checking updateLangFunc error", e);
    }
    return true;
  };
  setTimeout(fn_next_call, 0);
  setInterval(fn_next_call, 800);
  if (gutils.dev()) {
    // setInterval(async () => {
    //   await updateLangFunc();
    // }, 5000);
  }
  try {
    let doitlangarr = i18nObj;
    for (let eachJsonName of doitlangarr) {
      let tmpKey = "key_lang_" + eachJsonName;
      let res1 = await localforage.getItem(tmpKey);
      if (!_.isNil(res1)) {
        window.pkgInfo.i18n[eachJsonName] = res1;
        gstore.preliAllData.updateRefForLang++;
        gstore.preliAllData.real_update_for_lang++;
      }
    }
  } catch (e) {
    console.log("err", e);
  }

  async function preRunFunc() {
    let preInit = _.keys(gutils.api.system.preInit);
    let allArr = [];
    for (let workFuncKey of preInit) {
      const workFunc = gutils.api.system.preInit[workFuncKey];
      allArr.push(workFunc());
    }
    for (let item of allArr) {
      try {
        await item;
      } catch (err) {
        // // console.log(err);
        // TODO: prevent error logging
      }
    }
  }
  const isBrandNew = ipc.isBrandNewAndNeedDownloadInfra();
  if (isBrandNew || ipc.isLocalServerNotStartedUp()) {
    gutils.waitInitializeRefFunc.push(async function () {
      preRunFunc();
    });
  } else {
    // async run
    preRunFunc();
  }

  ReactDOM.render(
    <HotkeysProvider>
      <Root />
    </HotkeysProvider>,
    document.querySelector("#root")
  );

  // if (gutils.dev()) {
  //   setTimeout(() => {
  //     gutils.api.system.openSettingAPI("import_and_export");
  //   }, 100);
  // }
}
$(() => {
  $("#sysele_preview_text").remove();
  startFunc();
});
