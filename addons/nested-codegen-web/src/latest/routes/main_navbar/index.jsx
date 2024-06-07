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
  PopoverPosition,
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
  Menu,
  MenuItem,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Popover,
  PopoverInteractionKind,
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
import gutils from "../../utils";
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
import {autorun, observable, reaction, computed} from 'mobx'
import gstore from "../../store.jsx";
import "./index.less";
import gapi from "../../gapi";
import { INTENT_PRIMARY } from "@blueprintjs/core/lib/esm/common/classes";
import NotificationPanel from "../NotificationPanel/index";
import { Omnibar } from "@blueprintjs/select";
import Html_select from "../../components/html_select";
import CurrentServicePanel from "../../components/CurrentServicePanel";
import PluginLoadView from "../PluginLoadView";
import Home from "../../components/Home";
import _ from "lodash";
import localforage from "localforage";
import RunningTaskWrapper from "../RunningTaskWrapper";

function ccFunc() {}
let fn_update_title = () => {
  try {
    if (_.isEmpty(gstore.sysinfo.latestRoutePath)) {
      // if ((document.title + "").indexOf("CodeGen") == -1) {
      //   document.title = t("CodeGen ToolBox");
      // }
      return;
    }
    if (gstore.sysinfo.routeTitleMap[gstore.sysinfo.latestRoutePath]) {
      document.title =
        gstore.sysinfo.routeTitleMap[gstore.sysinfo.latestRoutePath];
      return;
    }
    let anyAck = false;
    gutils.iterateTree(gstore.nav_menu, (node) => {
      if (node && node.pathname == gstore.sysinfo.latestRoutePath) {
        anyAck = true;
        document.title = node.label + " - " + t(`CodeGen ToolBox`);
      }
    });
    if (!anyAck) {
      // if ((document.title + "").indexOf("CodeGen") == -1) {
      //   document.title = t("CodeGen ToolBox");
      // }
    }
  } catch (e) {
    console.log("e", e);
    setTimeout(() => {
      fn_update_title();
    }, 2000);
  }
  gutils.once("work_before", () => {
    reaction(
      () => {
        return [gstore.sysinfo.latestRoutePath, gstore.nav_menu];
      },
      () => {
        fn_update_title();
      }
    );
  });
};
window.update_latest_view_menu = () => {
  fn_update_title();
};
let fn_mountain = () => {
  gstore.localSettings.app_multiple_tab_mode =
    !gstore.localSettings.app_multiple_tab_mode;
  if (!gstore.localSettings.app_multiple_tab_mode) {
    gstore.localSettings.appTypeView = "all";
  }
  if (!gstore.localSettings.app_multiple_tab_mode) {
    gutils.alertOk(
      t(
        `Turn on the intergrated tab view mode, which means you can switch these functions in one page.`
      )
    );
  } else {
    gutils.alertOk(
      t(
        `Turn off the intergrated tab view mode, which means you can switch these functions in your browser.`
      )
    );
  }
  // if (gstore.localSettings.using_desktop_mode) {
  //   gstore.localSettings.isLeftMenuOpen = false;
  // } else {
  //   gstore.localSettings.isLeftMenuOpen = true;
  // }
};
window.fn_mountain = fn_mountain;
const FnAppMultipleTab = observer((props) => {
  let Tag = _.get(props, "mtag", Button);
  return (
    <Tag
      small={true}
      className={Classes.MINIMAL}
      text={_.get(props, "text", "")}
      intent={
        props.noIntent
          ? null
          : gstore.localSettings.app_multiple_tab_mode
          ? "none"
          : "primary"
      }
      title={t(`Using CodeGen ToolBox within rapid single page render mode.`)}
      // globe
      icon={"mountain"}
      onClick={fn_mountain}
    />
  );
});
window.FnAppMultipleTab = FnAppMultipleTab;

window.fn_call_launch_page_open = async (
  join_str = "",
  using_open_mode = true
) => {
  let {
    content: { port, token },
  } = await gutils.opt(`/infra/get_crt_launch_port`);
  console.log("using port", port);
  let total_link = `http://${location.hostname}:${port}/sys/initializer/?token=${token}${join_str}`;
  gutils.alertOk(
    t(`Triggered! Open a new tab for the launch centre: {0}`, total_link)
  );
  // && !gstore.sysinfo.hasDesktop
  if (using_open_mode) {
    window.open(total_link);
  } else {
    location.href = total_link;
  }
};

let fn_alert = () => {
  //
};

let fn_show_console = () => {
  // gstore.localSettings.showing_terminal_panel =
  //   !gstore.localSettings.showing_terminal_panel;
  let willWorkPath = "/exts/SwiftTerminal";
  gutils.showPageByModal(willWorkPath, {
    title: `System Integrated Terminal`,
    icon: "console",
  });
};
window.fn_show_console = fn_show_console;

export default observer(() => {
  const noMsgNow = gstore.sysinfo.latestNewMsgCount == 0;
  const hist = useHistory();
  gutils.hist = hist;
  // ccFunc();
  gutils.once(`oneckd`, () => {
    fn_update_title();
  });
  gutils.once("run listen history", () => {
    let fn_updateByNowPathStr = (now_pathstr) => {
      gstore.sysinfo.latestRoutePath = now_pathstr;
      // latestRoutePath
      // debugger;
      gstore.localSettings.global_menu_tabs_obj.value = now_pathstr;
      let previousValue = _.findIndex(
        gstore.localSettings.global_menu_tabs_obj.list,
        (x) => x.id == now_pathstr
      );

      if (-1 == previousValue) {
        let node = null;
        _.every(gstore.roadmap.get(), (x, d, n) => {
          _.every(x.children, (xx, dd, nn) => {
            if (now_pathstr == xx.pathname) {
              node = xx;
            }
            _.every(xx.children, (xxx, ddd, nnn) => {
              if (now_pathstr == xxx.pathname) {
                node = xxx;
              }
              return node == null;
            });
            return node == null;
          });
          return node == null;
        });
        if (node) {
          gstore.localSettings.global_menu_tabs_obj.list.push({
            // label: computed(() => {
            //   return node.label;
            // }),
            // fn_label: computed(() => {
            //   return node.label;
            // }),
            label: node.label,
            id: now_pathstr,
            closable: true,
          });
        }
      }
    };
    hist.listen((e) => {
      gutils.defer(() => {
        window.fn_sending_GetBaidu();
      }, 0);
      // // console.log("updating listen history", e, gstore.sysinfo);
      let now_pathstr = e.pathname + hist.location.search;
      try {
        (async () => {
          let marr = await localforage.getItem(`recent_usages`);
          if (_.isNil(marr)) {
            marr = [];
          }
          let newobj = {
            path: now_pathstr,
            label: null,
          };
          let anyAck = false;
          gutils.iterateTree(gstore.nav_menu, (node) => {
            if (node && node.pathname == now_pathstr) {
              anyAck = true;
              newobj.label = node.label;
            }
          });
          if (!_.isNil(newobj)) {
            marr = _.filter(marr, (x) => x.path != newobj.path);
            marr.push(newobj);
            if (_.size(marr) > 10) {
              marr.shift();
            }
            await localforage.setItem(`recent_usages`, marr);
          }
        })();
      } catch (e) {
        console.log("err", e);
      }
      fn_updateByNowPathStr(now_pathstr);
    });
    setTimeout(() => {
      fn_updateByNowPathStr(gstore.sysinfo.latestRoutePath);
    }, 0);

    reaction(
      () => {
        return [
          gstore.sysinfo.latestRoutePath,
          gstore.preliAllData.real_update_for_lang,
          gstore.roadmap.get(),
        ];
      },
      () => {
        fn_update_title();
      }
    );
    gutils.defer(() => {
      fn_update_title();
    }, 100);
  });
  gutils.once("testrunning", () => {
    gutils.init();
  });
  let fn_leftMenu_handle = () => {
    if (gstore.localSettings.app_multiple_tab_mode) {
      gstore.show_left_menu_obj.isOpen = !gstore.show_left_menu_obj.isOpen;
    } else {
      gstore.localSettings.isLeftMenuOpen =
        !gstore.localSettings.isLeftMenuOpen;
    }
  };
  window.fn_leftMenu_handle = fn_leftMenu_handle;
  let expandMenu = (
    <Button
      small={true}
      text=""
      className={Classes.MINIMAL}
      rightIcon={"menu"}
      onClick={fn_leftMenu_handle}
    ></Button>
  );
  const isLogin = is_sign_in(); // !_.isNil(localStorage.getItem("USER_TOKEN"));
  let isLoginLocalAccount = true;

  let myuserbtn = (
    <Button
      title={t(`Online Account`)}
      className={Classes.MINIMAL}
      icon="third-party"
      small={true}
      text={
        ""
        // isLogin
        //   ? localStorage.getItem("SYS_USER_NAME")
        //   : t("Sign in My Account")
      }
      intent={isLogin ? "primary" : "none"}
      onClick={() => {
        if (isLogin) {
          gstore.user.overlayForUserInfo.open = true;
        } else {
          gstore.user.overlayForLogin.open = true;
        }
      }}
    ></Button>
  );
  gutils.once("abcd", () => {
    if (_.isNil(gstore.localSettings.pre_currentWorkspaceId)) {
      gstore.localSettings.pre_currentWorkspaceId = "default";
    }
  });
  let isPortalMode = gstore.apiInfo.using_portal_mode;
  let checkFnForDark = () => {
    if (gstore.localSettings.is_using_dark_mode) {
      if (not_reg()) {
        gutils.alert({
          message: t(
            `Sorry, since the dark mode can be used only for premium member, please activate this device at first, otherwise we will turn it off after 5 minutes.`
          ),
        });
        setTimeout(
          () => {
            gstore.localSettings.is_using_dark_mode = true;
            fn_light_dark();
          },
          gutils.dev() ? 3000 : 60000 * 5
        );
        return;
      }
    }
  };
  gutils.once("checkFnForDark", checkFnForDark);
  let fn_light_dark = () => {
    gstore.localSettings.is_using_dark_mode =
      !gstore.localSettings.is_using_dark_mode;

    gstore.localSettings.crt_theme = gstore.localSettings.is_using_dark_mode
      ? gstore.localSettings.default_theme_dark_more
      : gstore.localSettings.default_theme_light;

    checkFnForDark();

    // if (gstore.localSettings.is_using_dark_mode) {
    // } else {
    // }

    // gutils.api.system.openSettingAPI("abouts");
    // gutils.alert(
    //   t(
    //     "Sorry, dark theme is still under developing, we will release it ASAP."
    //   )
    // );
  };
  window.fn_light_dark = fn_light_dark;
  
  return (
    <div
      style={{
        display: gstore.localSettings.hasTopNav ? "" : "none",
      }}
    >
      <Navbar className="make-force-40h">
        {false ? (
          ""
        ) : (
          <NavbarGroup align={Alignment.LEFT}>
            {expandMenu}
            {[
              <Button
                style={{ marginLeft: "12px" }}
                text={
                  !gstore.apiInfo.finalChk
                    ? "Loading..."
                    : gstore.apiInfo.can_this_device_use_presently
                    ? `${t(`CodeGen ToolBox`)} v${gutils.app_version}`
                    : t(`Click Here to Activate ToolBox`) + ``
                }
                loading={!gstore.apiInfo.finalChk}
                outlined={false}
                minimal={true}
                intent={
                  !gstore.apiInfo.finalChk
                    ? "Loading..."
                    : gstore.apiInfo.can_this_device_use_presently
                    ? "primary"
                    : "warning"
                }
                icon="ring"
                onClick={() => {
                  if (!gstore.apiInfo.can_this_device_use_presently) {
                    gstore.licenseConfig.drawer.open = true;
                    return;
                  }
                  gutils.alert(
                    "" +
                      (t(
                        `Sorry, this button hasn't been finished yet so far. We will place more useful features by clicking this button, such as cloud driver, jobs task, reminder, etc. Thanks for your kindly understanding, we will enable its ability asap.`
                      ) +
                        "" +
                        (!p_mode()
                          ? ""
                          : +t(
                              `To bring you more lightweight performance, we disabled some extension and its ability of modifying some config. If you want to use complete features, please access our official website and use offline version.`
                            )))
                  );

                  gstore.licenseConfig.drawer.open = true;
                }}
              ></Button>,
              // <Popover></Popover>
              //   minimal={true}
              //   style={{
              //     padding: "10px",
              //   }}
              //   popoverClassName={
              //     Classes.POPOVER_CONTENT_SIZING +
              //     " short-pop w500-pop max-h-pop"
              //   }
              //   interactionKind={PopoverInteractionKind.HOVER}
              //   portalClassName="textareawrap short-pop w500-pop"
              //   enforceFocus={true}
              //   placement="bottom"
              // >

              //   <div>
              //     <p>
              //   {t(

              //   )}
              // </p>
              // <p>
              //   {t(

              //       )}
              //     </p>
              //   </div>
              // </Popover>,
              isPortalMode ? (
                <Button
                  style={{ marginLeft: "5px" }}
                  text={t(`Download`)}
                  minimal={true}
                  title={t(`Quickly Download CodeGen ToolBox for your PC.`)}
                  outlined={false}
                  intent={"none"}
                  icon="cloud-download"
                  onClick={async () => {
                    window.open(`https://codegen.cc`);
                  }}
                ></Button>
              ) : (
                <AnchorButton
                  style={{ marginLeft: "5px" }}
                  text={t(`Online Tools`)}
                  title={t(`CodeGen Online ToolBox`)}
                  outlined={false}
                  intent={"none"}
                  minimal={true}
                  icon="geosearch"
                  href={`https://1024doc.com`}
                  target="_blank"
                  // onClick={async () => {
                  //   window.open(``);
                  // }}
                ></AnchorButton>
                /**
                 <Button
                  style={{ marginLeft: "5px" }}
                  text={t(`My Local Account`)}
                  title={t(`Manage Local Account`)}
                  outlined={false}
                  intent={"none"}
                  minimal={true}
                  // icon="person"
                  icon="projects"
                  href={`https://1024doc.com`}
                  target="_blank"
                  // onClick={async () => {
                  //   window.open(``);
                  // }}
                ></Button>
                */
              ),
              ,
              p_mode() ? (
                <AnchorButton
                  style={{ marginLeft: "5px" }}
                  text={t(`Documentation`)}
                  outlined={false}
                  minimal={true}
                  title={t(`View Official Docs`)}
                  intent={"none"}
                  icon="manual"
                  href={`https://codegen.cc/documentation/view?id=welcome`}
                  target="_blank"
                ></AnchorButton>
              ) : (
                ""
              ),
              <Popover
                minimal={true}
                transitionDuration={0}
                lazy={false}
                hoverOpenDelay={0}
                hoverCloseDelay={0}
                usePortal={false}
                style={{ minWidth: "700px", padding: "10px", height: "100%" }}
                popoverClassName={Classes.POPOVER_CONTENT_SIZING + "  w700-pop"}
                // interactionKind={PopoverInteractionKind.HOVER}
                interactionKind={PopoverInteractionKind.CLICK}
                portalClassName="  w700-pop"
                enforceFocus={true}
                placement="bottom-center"
              >
                <Button
                  style={{ marginLeft: "5px" }}
                  text={t(`Quick View`)}
                  outlined={false}
                  intent={"none"}
                  title={t(`Click to quick view all features`)}
                  icon="send-to-map"
                  minimal={true}
                  onClick={async () => {}}
                ></Button>
                <div style={{ overflow: "auto" }}>
                  <Home useSmallButton={true} />
                </div>
              </Popover>,
            ].filter((x) => !_.isNil(x))}
            {isPortalMode
              ? []
              : _.size(gstore.preliAllData.configs.workspace_list) >= 2
              ? [
                  <div style={{ marginLeft: "12px" }}>
                    {t(`My Workspace: `)}
                  </div>,
                  <Html_select
                    title={t(`My Workspace List`)}
                    style={{ marginLeft: "4px" }}
                    list={gstore.preliAllData.configs.workspace_list}
                    onChange={(e) => {
                      gstore.localSettings.pre_currentWorkspaceId =
                        e.target.value;
                      window.chk_when_pre_crt();
                    }}
                    value={gstore.localSettings.currentWorkspaceId}
                  ></Html_select>,
                  <Button
                    title={t(`Manage your workspaces`)}
                    small={true}
                    style={{ marginLeft: "5px" }}
                    text=""
                    icon="add-to-artifact"
                    onClick={() => {
                      gstore.user.overlayForCreateWorkspace.open = true;
                      gstore.user.workspacePageData.addModel = _.cloneDeep(
                        gstore.user.workspacePageData.initModel
                      );
                    }}
                  />,
                ]
              : []}

            {ipc.dev && !_.isEmpty(gstore.ext.dev.extList) ? (
              <Html_select
                style={{ marginLeft: "5px" }}
                list={_.sortBy(gstore.ext.dev.extList, (x) => {
                  return x.label;
                })}
                onChange={(e) => {
                  gstore.localSettings.extIndex = e.target.value;
                  gutils.opt("/infra/markCurrentExtension", {
                    extIndex: gstore.localSettings.extIndex,
                  });
                }}
                value={gstore.localSettings.extIndex}
              ></Html_select>
            ) : (
              ""
            )}
            {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                text=""
                icon="refresh"
                onClick={async () => {
                  await window.updateLangFunc();
                  window.cache_duplicate_json_for_menu = null;
                  refreshCrtFunction();
                }}
              />
            ) : (
              ""
            )}
            {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                loading={gstore.sysinfo.loading_for_FE}
                text="FE"
                // icon="build"
                onClick={async () => {
                  gstore.sysinfo.loading_for_FE = true;
                  try {
                    await gutils.opt("/infra/build-all-wait-delete", {
                      extIndex: gstore.localSettings.extIndex,
                      type: "fe",
                    });
                    fn_alert();
                    refreshCrtFunction();
                  } catch (e) {
                    throw e;
                  } finally {
                    gstore.sysinfo.loading_for_FE = false;
                  }
                }}
              />
            ) : (
              ""
            )}
            {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                text="BE"
                loading={gstore.sysinfo.loading_for_BE}
                // icon="build"
                onClick={async () => {
                  gstore.sysinfo.loading_for_BE = true;
                  try {
                    await gutils.opt("/infra/build-all-wait-delete", {
                      extIndex: gstore.localSettings.extIndex,
                      type: "be",
                    });
                    fn_alert();

                    refreshCrtFunction();
                  } catch (e) {
                    throw e;
                  } finally {
                    gstore.sysinfo.loading_for_BE = false;
                  }
                }}
              />
            ) : (
              ""
            )}
            {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                text="RE"
                // icon="build"
                onClick={async () => {
                  await gutils.opt("/infra/clean-be-cache", {
                    extIndex: gstore.localSettings.extIndex,
                    type: "be",
                  });
                }}
              />
            ) : (
              ""
            )}
            {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                text="SE"
                // icon="build"
                onClick={async () => {
                  gutils.alert(t(`Retrieving related HTML contents...`));
                  let allLangArr = ["zh_HK", "en_US", "zh_CN"];
                  for (let eachLang of allLangArr) {
                    gutils.changeLang(eachLang);
                    gstore.preliAllData.updateRefForLang++;
                    await gutils.sleep(2000);
                    // gstore.sysinfo.
                    let allTask = [];
                    gutils.iterateTree(gstore.nav_menu, (node) => {
                      if (node && node.pathname) {
                        if (node.pathname.indexOf("Clip") != -1) {
                          return;
                        }
                        allTask.push(async () => {
                          console.log(`pathname: ${node.pathname}`);
                          gutils.alert({
                            message: t(`Handling {0}`, `${node.pathname}`),
                            skipT: true,
                          });
                          window.tmp_logic_store = undefined;
                          gutils.hist.push(node.pathname);
                          let saveHTML = "";
                          await gutils.sleep(3000);
                          saveHTML = $(document.body).html();
                          let tryTimes = 0;
                          if (node.pathname.indexOf("exts") != -1) {
                            if (window.tmp_logic_store) {
                              let crtLocalStore = window.tmp_logic_store;
                              while (true) {
                                if (
                                  !crtLocalStore.checkBefore ||
                                  !_.isEmpty(crtLocalStore.missedDeps) ||
                                  (crtLocalStore.startNodeCheck &&
                                    !crtLocalStore.nodeCheckDone) ||
                                  crtLocalStore.is_dlib_sent
                                ) {
                                  gutils.alert(`Waiting for operation panel`);
                                  tryTimes++;
                                  await gutils.sleep(2000);
                                  if (tryTimes >= 5) {
                                    break;
                                  }
                                } else {
                                  gutils.alert(`Inited.`);
                                  await gutils.sleep(3000);
                                  break;
                                }
                              }
                            }
                          }
                          // while (true) {
                          //   let lowerSaveHtml = _.toLower(saveHTML);
                          //   if (
                          //     lowerSaveHTML.indexOf("loading") != -1 ||
                          //     lowerSaveHTML.indexOf("initializing") != -1 ||
                          //     lowerSaveHTML.indexOf("初始化") != -1 ||
                          //     lowerSaveHTML.indexOf("依赖") != -1
                          //   ) {
                          //   } else {
                          //     break;
                          //   }
                          // }
                          await gutils.opt("/env_init/save_pre_html", {
                            pathname: node.pathname,
                            lang: eachLang,
                            saveHTML,
                            crt_page_info: {
                              title: document.title,
                            },
                          });
                          gutils.alert("Saved");
                          await gutils.sleep(200);
                        });
                      }
                    });
                    for (let eachTask of allTask) {
                      await eachTask();
                    }
                  }
                }}
              />
            ) : (
              ""
            )}
            {/* {ipc.dev ? (
              <Button
                small={true}
                style={{ marginLeft: "5px" }}
                text="SF"
                // icon="build"
                onClick={async () => {
                  gutils.alert(`Handling...`);
                  await gutils.opt("/env_init/formatter_pre_html");
                  gutils.alertOk(`Done.`);
                }}
              />
            ) : (
              ""
            )} */}
          </NavbarGroup>
        )}
        <NavbarGroup align={Alignment.RIGHT}>
          {/* <Button
            className={Classes.MINIMAL}
            text="Services"
            icon="helper-management"
          /> */}
          {/* {!isLogin ? "" : myuserbtn} */}
          <Button
            className={Classes.MINIMAL}
            small={true}
            title={t(`Search Anything`)}
            text=""
            icon={"search"}
            onClick={() => {
              //
              gstore.localSettings.showingOmnibar = true;
            }}
          />
          <Button
            className={Classes.MINIMAL}
            small={true}
            // text="Software Updates"
            intent={
              gstore.localSettings.is_using_dark_mode ? "primary" : "none"
            }
            title={t(`Light or Dark Mode`)}
            text=""
            icon={gstore.localSettings.is_using_dark_mode ? "flash" : "moon"}
            onClick={fn_light_dark}
          />
          {/* <Popover
            popoverClassName={Classes.POPOVER_WRAPPER}
            portalClassName="faults"
            interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
            enforceFocus={false}
            captureDismiss={true}
            position={PopoverPosition.BOTTOM_RIGHT}
            isOpen={gstore.sysinfo.isOpenNotification}
          >
            <Button
              className={Classes.MINIMAL}
              onClick={() => {
                gapi.msg.openNotificationPanel();
              }}
              text={
                // "Messages" +
                noMsgNow ? "" : `${gstore.sysinfo.latestNewMsgCount}`
              }
              intent={noMsgNow ? null : "primary"}
              icon="notifications"
            />
            <div>
              <NotificationPanel />
            </div>
          </Popover> */}
          {/* <Button
            className={Classes.MINIMAL}
            text=""
            icon="paperclip"
            onClick={() => {
              gutils.hist.push("/notes/notes_snippet");
            }}
          /> */}
          {p_mode() ? (
            ""
          ) : (
            <Button
              title={t(`Local Account(Offline)`)}
              className={Classes.MINIMAL}
              icon="user"
              small={true}
              text={""}
              intent={isLoginLocalAccount ? "primary" : "none"}
              onClick={() => {
                gstore.localUserConfig.drawer.open =
                  !gstore.localUserConfig.drawer.open;
              }}
            ></Button>
          )}
          {isLogin && false ? "" : myuserbtn}

          <Button
            className={Classes.MINIMAL}
            small={true}
            disabled={p_mode()}
            // text="Software Updates"
            intent={
              gstore.localSettings.showing_terminal_panel ? "primary" : "none"
            }
            title={t(`System Integrated Terminal`)}
            text=""
            icon={`console`}
            onClick={fn_show_console}
          />
          <Button
            className={Classes.MINIMAL}
            small={true}
            disabled={p_mode()}
            // text="Software Updates"
            intent={"none"}
            title={t(`System Running Tasks`)}
            icon={`join-table`}
            onClick={() => {
              gstore.localUserConfig.drawer.tabId = "processes";
              gstore.localUserConfig.drawer.open = true;
            }}
          />
          <FnAppMultipleTab />
          {true
            ? ""
            : // <Button
              //   small={true}
              //   className={Classes.MINIMAL}
              //   text=""
              //   intent={
              //     !gstore.localSettings.using_desktop_mode ? "none" : "primary"
              //   }
              //   // globe
              //   icon={"globe"}
              //   onClick={() => {
              //     gstore.localSettings.using_desktop_mode =
              //       !gstore.localSettings.using_desktop_mode;
              //     // if (gstore.localSettings.using_desktop_mode) {
              //     //   gstore.localSettings.isLeftMenuOpen = false;
              //     // } else {
              //     //   gstore.localSettings.isLeftMenuOpen = true;
              //     // }
              //   }}
              // />
              ""}
          {false ? (
            <Button
              className={Classes.MINIMAL}
              // text="Software Updates"
              text=""
              small={true}
              icon="maximize"
              onClick={() => {
                gutils.confirmIfNotClickOk(
                  "maximize",
                  'The button clicked will let app enter "Highly Concentrate" Mode, for more options, you can also change app view type by clicking actions in menu, or pressing a shortcut keymap Shift+Ctrl+0',
                  () => {
                    gutils.toggleViewType(
                      "no-nav,no-subnav,no-leftmenu,no-panel-pad"
                    );
                    gstore.localSettings.isLeftMenuOpen = false;
                  }
                );
              }}
            />
          ) : (
            ""
          )}
          {/* <Button
            className={Classes.MINIMAL}
            small={true}
            text=""
            onClick={() => {
              // gutils.hist.push("/dashboard/home");
              let willWorkPath = "/dashboard/home";
              gutils.showPageByModal(willWorkPath, {
                title: `Navigator`,
                icon: "helper-management",
              });
            }}
            icon={"helper-management"}
          /> */}
          {_.map(gstore.menu_jsx_definition, (x, d, n) => {
            return x();
          })}
          <Button
            className={Classes.MINIMAL}
            small={true}
            text=""
            title={t(`View your latest clipboard history.`)}
            disabled={gstore.apiInfo.using_portal_mode}
            onClick={() => {
              // gutils.hist.push("/dashboard/home");
              // PluginLoadView
              let willWorkPath = "/exts/NotesClipBoard";
              gutils.showPageByModal(willWorkPath, {
                title: `Notes`,
                icon: "paperclip",
              });
            }}
            icon={"paperclip"}
          />
          <Button
            small={true}
            className={Classes.MINIMAL}
            disabled={gstore.apiInfo.using_portal_mode}
            onClick={async () => {
              // reading port value
              await window.fn_call_launch_page_open();
            }}
            icon="wrench"
            title={t(`Visit My Launch Page`)}
          />

          <Button
            small={true}
            className={Classes.MINIMAL}
            intent={
              !gstore.apiInfo.finalChk
                ? "none"
                : gstore.apiInfo.can_this_device_use_presently
                ? "primary"
                : "warning"
            }
            // outlined={
            //   gstore.apiInfo.can_this_device_use_presently ? false : true
            // }
            onClick={async () => {
              gstore.licenseConfig.drawer.open = true;
            }}
            // icon="endorsed"
            // icon="updated"
            // icon="globe"
            loading={!gstore.apiInfo.finalChk}
            icon="offline"
            title={t(`Open Licenses Panel and Activiate this Device`)}
          />
          <Button
            small={true}
            className={Classes.MINIMAL}
            onClick={() => {
              gutils.api.system.openSettingAPI("general");
            }}
            // text="Settings"
            text=""
            icon="cog"
            title={t(`System Settings`)}
          />
        </NavbarGroup>
      </Navbar>
    </div>
  );
});
