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
  Tab,
  Tabs,
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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
// import mapi from "../../../../../plugins/TranslateForJSON/frontend/kit/common_api";
import mapi from "../../frontend/kit/common_api";
import "./index.less";
import UserLoginPanel from "../overlay_for_user_panel/UserLoginPanel";
import GFormInput from "../../components/GFormInput";
import Simple_table from "../simple_table";
import CallOutAndView from "../../components/CallOutAndView";
import _ from "lodash";
import moment from "moment";
import RunningTaskWrapper from "../RunningTaskWrapper";

const settings_local_user = observer(() => {
  const drawerConfig = gstore.localUserConfig.drawer;
  const state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: drawerConfig.open,
    size: "80%",
    position: Position.BOTTOM,
    usePortal: true,
    title: t(`Local User Management`),
  };
  let internalStyle = { padding: "15px 20px", overflow: "auto" };
  let authStatus = gstore.preliAllData.authStatus;
  if (_.isNil(gstore.preliAllData.authStatus)) {
    authStatus = {};
  }
  let [userList, onUserList] = useState([]);
  let fn_c = async () => {
    if (drawerConfig.open !== true) {
      return;
    }
    let all_user_list = await gutils.optCtn(`/local_auth/all_user_list`);
    console.log("all_user_list", all_user_list);
    if (!_.isEqual(all_user_list, userList)) {
      onUserList(all_user_list);
    }
  };
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      //
    }, 1500);
    let c = gutils.run_async_loop(fn_c, 30000);
    // let b = gutils.run_async_loop(async () => {
    //   window.LOCAL_AUTH_LOGIN_CHK.getAuthStatus();
    // }, 1000);
    return () => {
      c();
      a();
      // b();
    };
  }, []);
  let lc_store = useLocalStore(() => {
    return {
      system_processes_list: [],
      crtPubKey: null,
      list: [],
    };
  });
  let fn_d = async () => {
    if (drawerConfig.open !== true) {
      return;
    }
    let get_user_license_res = await mapi.opt("/reg/get_user_devices", {
      alertError: false,
      refresh: true,
    });
    let userLicenseAndRights = get_user_license_res.ftlMap.dataList;
    if (gutils.dev()) {
      window.userLicenseAndRights = userLicenseAndRights;
    }
    if (userLicenseAndRights && userLicenseAndRights.userDevicesList) {
      let userDevicesList = userLicenseAndRights.userDevicesList;
      if (!_.isEqual(lc_store.list, userDevicesList)) {
        lc_store.list = userDevicesList;
      }
    }
    let {
      content: { pubKey },
    } = await gutils.opt(`/premium/get_pub_key`);
    lc_store.crtPubKey = pubKey;
    return false;
  };
  useEffect(() => {
    let c = gutils.run_async_loop(() => {
      fn_d();
    }, 3000);
    return () => {
      c();
    };
  }, [drawerConfig.open + ""]);
  let fn_remove = async (x) => {
    if (true) {
      await mapi.opt("/reg/remove_the_device", {
        alertError: true,
        refresh: true,
        ...x,
      });
      fn_d();
    }
  };
  return (
    <Drawer
      className={"mydrawerclz"}
      icon="user"
      onClose={() => {
        drawerConfig.open = false;
      }}
      {...state}
    >
      <div style={{ margin: "6px 150px", height: "100%", overflow: "auto" }}>
        <Tabs
          vertical={true}
          id={_.uniqueId("TabsExample")}
          selectedTabId={gstore.localUserConfig.drawer.tabId}
          onChange={(e) => {
            gstore.localUserConfig.drawer.tabId = e;
          }}
        >
          <Tab
            id="basic_information"
            title={t("Basic Information")}
            panel={
              <p style={internalStyle}>
                <FormGroup label={t(`My User Profile`)}>
                  <ul>
                    <li>
                      {t("User Name")}:{" "}
                      {authStatus.isAdmin
                        ? "Administrator"
                        : authStatus.username}
                    </li>
                    <li>
                      {t("User Level")}:
                      {authStatus.isAdmin
                        ? t("Administrator")
                        : t("Ordinary User")}
                    </li>
                    <li>
                      {t(`Device ID`)}:{lc_store.crtPubKey}
                    </li>
                  </ul>
                </FormGroup>
              </p>
            }
          />
          {p_mode() ? (
            ""
          ) : (
            <Tab
              id="processes"
              title={t(`System Process`)}
              panel={drawerConfig.open ? <RunningTaskWrapper /> : ""}
            ></Tab>
          )}
          {false ? (
            ""
          ) : (
            <Tab
              id="my_devices"
              title={t(`My Devices`)}
              panel={
                <div>
                  <Simple_table
                    column={[
                      {
                        label: t(`Type`),
                        value: (x) => `USER`,
                      },
                      {
                        label: t(`License ID`),
                        value: (x) => x.ORDER_ID,
                      },
                      {
                        label: t(`Device ID`),
                        value: (x) => (
                          <div
                            style={{
                              fontWeight:
                                lc_store.crtPubKey == x.BE_PUBKEY
                                  ? "bold"
                                  : null,
                            }}
                          >
                            {x.BE_PUBKEY}
                            {lc_store.crtPubKey == x.BE_PUBKEY
                              ? `(${t(`Current Device`)})`
                              : ""}
                          </div>
                        ),
                      },
                      {
                        label: t(`Status`),
                        value: (x) =>
                          x.STATUS == 1 ? t(`Enabled`) : t(`Disabled`),
                      },

                      {
                        label: t(`Create Time`),
                        value: (x) =>
                          moment(x.CREATE_TIME).format("YYYY-MM-DD HH:mm:ss"),
                      },
                      {
                        label: t(`Operation`),
                        value: (x) => (
                          <div className="sub-mr-5">
                            <Button
                              intent={"danger"}
                              text={t(`Remove`)}
                              onClick={async () => {
                                if (await gutils.ask_danger_opt()) {
                                  fn_remove(x);
                                }
                              }}
                            ></Button>
                          </div>
                        ),
                      },
                    ]}
                    data={lc_store.list}
                  />
                  <p style={{ marginTop: "10px" }}>
                    <Button
                      intent={"danger"}
                      text={t(`Remove All Devices`)}
                      onClick={async () => {
                        if (await gutils.ask_danger_opt()) {
                          for (let x of lc_store.list) {
                            await fn_remove(x);
                          }
                          location.reload();
                        }
                      }}
                    ></Button>
                  </p>
                </div>
              }
            ></Tab>
          )}
          {authStatus.isAdmin ? (
            <Tab
              id="admin_tools"
              title={t("Administration Tools")}
              panel={
                <p style={internalStyle}>
                  <FormGroup
                    label={t(`Internal Invitation Code`)}
                    helperText={t(
                      `By Default, CodeGen will generate a random string as its invitation code so as to let new user can register his/her own account at any time. But please be noted that the invitation code will be used only in your internal team, do NOT give the code to the one who doesn't belong to your team, it's really important!`
                    )}
                  >
                    <InputGroup
                      value={gstore.preliAllData.authStatus.invCode}
                      onChange={(e) => {
                        gstore.preliAllData.authStatus.invCode = e.target.value;
                      }}
                      rightElement={[
                        <Button
                          text={t(`Generate`)}
                          onClick={async () => {
                            await gutils.optCtn(`/local_auth/create_inv_code`);
                            await window.LOCAL_AUTH_LOGIN_CHK.getAuthStatus();
                            gutils.alertOk(t(`Generated.`));
                          }}
                        />,
                        <Button
                          text={t(`Update`)}
                          onClick={async () => {
                            if (
                              ("" + gstore.preliAllData.authStatus.invCode)
                                .length < 6
                            ) {
                              gutils.alert(
                                t(`Value length cannot be less than 6`)
                              );
                              return;
                            }
                            if (
                              await gutils.win_confirm(
                                t(
                                  `Would you like to use {0} as the invitation code? Please be noted you cannot specify simple password, `,
                                  gstore.preliAllData.authStatus.invCode
                                )
                              )
                            ) {
                              gutils.alert(`Updating...`);
                              try {
                                await gutils.optCtn(
                                  "/local_auth/update_inv_code_logic",
                                  {
                                    newInvCode:
                                      gstore.preliAllData.authStatus.invCode,
                                  }
                                );
                                gutils.alertOk(`Updated.`);
                              } catch (e) {
                                gutils.alert({
                                  intent: "danger",
                                  message: e.message || e,
                                });
                              }
                            }
                          }}
                        ></Button>,
                      ]}
                    ></InputGroup>
                  </FormGroup>
                  {/* <FormGroup label={t(`Accessible Directories for New Users`)} helperText={t(
                    `Presently, CodeGen has only two user level, the administrator and new ordinary users. This option will be editable for administrator only, please be noted `
                  )}>
                  </FormGroup> */}
                  <FormGroup
                    label={t(`User List`)}
                    helperText={t(
                      `The table above includes all registered user except for the administrator, you can manage them by these operation buttons.`
                    )}
                  >
                    <Simple_table
                      column={[
                        {
                          label: t("User Type"),
                          value: (x) => t(`Ordinary User Level`),
                        },
                        {
                          label: t("User Name"),
                          value: (x) => x["username"],
                        },
                        {
                          label: t("Create Time"),
                          value: (x) =>
                            moment(x["createTime"]).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                        },
                        {
                          label: t("Operation"),
                          value: (x) => (
                            <Button
                              onClick={async () => {
                                if (await gutils.ask_danger_opt()) {
                                  await gutils.optCtn(`/local_auth/del_user`, {
                                    ...x,
                                  });
                                  fn_c();
                                }
                              }}
                            >
                              {t(`Delete`)}
                            </Button>
                          ),
                        },
                      ]}
                      data={userList}
                    />
                  </FormGroup>
                  <FormGroup
                    label={t(`Operation`)}
                    helperText={
                      // t(
                      //   `Some buttons will be useful for your administration.`
                      // ) +
                      // t(
                      //   `For the audit part, by default, we will record ordinary user's parameter in the logs. If you want to check if they're trying to run harmful script or launch cyber attack, you can review logs by opening the logfile below.`
                      // ) +
                      // t(`Though it's `)
                      t(`The buttons above can be used for your administration`)
                    }
                  >
                    <ButtonGroup>
                      <Button
                        onClick={async () => {
                          try {
                            let new_username = await gutils.win_prompt(
                              t(`Please input the new username`)
                            );
                            if (gutils.empty(new_username)) {
                              gutils.win_alert(t(`Username cannot be empty.`));
                              return;
                            }
                            let rule_str = t(
                              `(Rule: at least 6 characters and must have at least one alphabet)`
                            );
                            let new_password = await gutils.win_prompt(
                              t(`Please input the new password`) + rule_str
                            );
                            if (gutils.empty(new_password)) {
                              gutils.win_alert(t(`Password cannot be empty.`));
                              return;
                            }
                            if (
                              new_password.length < 6 ||
                              !new_password.match(/[\d\W]/g) ||
                              !new_password.match(/[a-z]/g)
                              // /\w/.test(new_password) == false
                            ) {
                              gutils.win_alert(
                                t(
                                  `Password is too simple to be used, please check the rule.`
                                ) + rule_str
                              );
                              return;
                            }
                            let new_password_2 = await gutils.win_prompt(
                              t(`Please input the new password` + rule_str)
                            );
                            if (gutils.empty(new_password_2)) {
                              gutils.win_alert(t(`Password cannot be empty.`));
                              return;
                            }
                            if (new_password_2 != new_password) {
                              gutils.win_alert(
                                t(`Two Password isn't the same value.`)
                              );
                              return;
                            }
                            console.log("user-profile", {
                              new_username,
                              new_password,
                            });
                            let r = await gutils.optCtn(
                              `/local_auth/new_random_user`,
                              window.LOCAL_AUTH_LOGIN_CHK.encryptUserInfo({
                                username: new_username,
                                password: new_password,
                              })
                            );
                            window.r100 = r;
                            await fn_c();
                          } catch (e) {
                            window.e100 = e;
                            console.log(e);
                            gutils.alert({
                              intent: "danger",
                              message:
                                _.get(e, "data.message") || e.message || e,
                            });
                          }
                        }}
                        text={t(`Generate User`)}
                      ></Button>
                    </ButtonGroup>
                  </FormGroup>
                  <CallOutAndView
                    noProcess={true}
                    icon="warning-sign"
                    title={t(`Must Read this Message!`)}
                    desc={t(
                      `In the future release version, we will consummate its permission controls gradually, but presently, be careful! For the sake of your server security, please do NOT let any stranger be able to register and use this ToolBox. Because some API is privileged to access your PC local file and network permission, such as groovy script, telnet, local server, etc, therefore, if you don't trust the one entirely, you should NOT let him/her use this account. On the other hand, if you are using Linux system, please never run ToolBox by root user, it's no need to use so high permission level for ToolBox. Lastly, we strongly recommend you use the Docker version if you really want to share with those who are not familiar with you or not trustable enough.`
                    )}
                  ></CallOutAndView>
                  {
                    // <CallOutAndView
                    // noProcess={true}
                    // icon="warning-sign"
                    // title={t(`Why CodeGen provides multiple user mechanism?`)}
                    // desc={t(`The reason why we provide multiple user mechanism is CodeGen `)}
                    // />
                  }
                </p>
              }
            />
          ) : (
            ""
          )}
        </Tabs>
      </div>
    </Drawer>
  );
});

export default settings_local_user;
