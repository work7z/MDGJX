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
  PanelStack2,
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
import "./index.less";
import GFormSelect from "../../components/GFormSelect";
import _ from "lodash";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormInput from "../../components/GFormInput";

class PreliClz extends React.Component {
  state = {
    stackList: [],
  };
  removeFromPanelStack = () => {
    this.setState({
      stackList: (this.state.stackList || []).slice(0, -1),
    });
  };
  addToPanelStack = (newPanel) => {
    this.setState({
      stackList: [...this.state.stackList, newPanel],
    });
  };
  render() {
    document.title = t("Prelimnary - CodeGen ToolBox");
    const stackMap = _.mapValues(
      {
        prelude: {
          props: {},
          renderPanel: (props) => (
            <div className="preli-all-wrap">
              <div className="welcome-preli preli-wrap">
                <h1>Welcome to use {gutils.app_name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: !window.ipc.all_files_placed()
                      ? t(
                          `Before using {0}, please complete the following steps below firstly. `,
                          gutils.app_name
                        )
                      : t(
                          `Before using {0}, we need to check and download necessary dependencies by your network on this PC to ensure that all of these dependencies not having missed while you're using the software. Please kindly make sure that the PC can access the <b>Internet</b>, the progress preliminary will not spend too much time.`,
                          gutils.app_name
                        ),
                  }}
                  className="welcome-brief-preli"
                ></p>
                <p>
                  <h3>
                    {t("We guarantee you solemnly for the following items")}
                  </h3>
                  <ul>
                    <li>
                      {t(
                        `{0} will NOT analyse or upload your personal files on this PC.`,
                        gutils.app_name
                      )}
                    </li>
                    <li>
                      {t(
                        "{0} will NOT launch a cyber attack by using this PC and the network.",
                        gutils.app_name
                      )}
                    </li>
                    <li>
                      {t(
                        `{0} will NOT monitor your user action or data while using this software.`,
                        gutils.app_name
                      )}
                    </li>
                    <li>
                      {t(
                        `{0} WILL put your SECURITY, PRIVACY, INTEREST first, it's a secure, high efficiency, and offline-able software.`,
                        gutils.app_name
                      )}
                    </li>
                    <li>
                      {t(
                        `For any kinds of software issues or suggestions, you could contact the Developer via email work7z@outlook.com`
                      )}
                    </li>
                    <li>
                      {t(
                        `It would be a great honor for us if you would like to share this software with your friends, the official website is https://codegen.cc`
                      )}
                    </li>
                    {/* <a target="_blank" href="mailto:work7z@outlook.com">
                        
                      </a> */}
                  </ul>
                </p>
                <p>
                  <h3>{t("Choose your Languages before starting")}</h3>
                  <FormGroup
                    label={t(`System Languages`)}
                    labelFor="System Languages"
                    labelInfo=""
                  >
                    <GFormSelect
                      list={gstore.preliAllData.formList.lang}
                      onChange={(e) => {
                        console.log("value is chaging", e, e.target.value);
                        gutils.changeLang(e.target.value);
                      }}
                      value={gstore.preliAllData.configs.lang}
                    />
                  </FormGroup>
                </p>
              </div>
              <div className="preli-footer">
                <div></div>
                <div>
                  <Button
                    intent="none"
                    onClick={() => {
                      let isNotInit =
                        window.LOCAL_AUTH_LOGIN_CHK.authStatus.isNotInit;
                      if (isNotInit) {
                        props.openPanel(stackMap.localAuthSetting);
                      } else {
                        gstore.preliAllData.configs.sign_password = "";
                        props.openPanel(stackMap.localSignInSetting);
                      }
                      // props.openPanel(stackMap.mirrorSetting);
                    }}
                  >
                    {t(`Continue`)}
                  </Button>
                </div>
              </div>
            </div>
          ),
          title: `Preliminary(${gutils.app_version})`,
        },
        newUserInSetting: {
          props: {},
          title: t("Register New Local User"),
          renderPanel: (props) => {
            window.t000props = props;
            let [num, onNum] = useState(0);

            let okStyle = "var(--app-text-green)";
            let val_1 =
              !gutils.empty(gstore.preliAllData.configs.signModel.password) &&
              !gutils.empty(
                gstore.preliAllData.configs.signModel.confirmPassword
              ) &&
              !gutils.empty(gstore.preliAllData.configs.signModel.username) &&
              !gutils.empty(gstore.preliAllData.configs.signModel.invCode) &&
              gstore.preliAllData.configs.signModel.password ==
                gstore.preliAllData.configs.signModel.confirmPassword;

            return (
              <div className="preli-all-wrap" key={"x" + num}>
                <div className="preli-wrap">
                  <p style={{ marginBottom: "20px" }}>
                    <h3>{t("Register a New User")}</h3>
                    <span style={{ marginRight: "3px" }}>
                      {t(
                        `If you want to register a new user here, you need to provide an invitation code which can be provided by the administrator. Meanwhile, the administrator can also help you to create a new account in his local user administration panel, you can contact him for further detail.`
                      )}
                    </span>
                  </p>
                  <div>
                    <FormGroup
                      label={t(`Invitation Code`)}
                      helperText={t(
                        `Please provide invitation code firstly. If you don't what the invitation code is, please contact the administrator.`
                      )}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.signModel.invCode}
                        onChange={async (val) => {
                          gstore.preliAllData.configs.signModel.invCode =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <FormGroup
                      label={t(`Username`)}
                      helperText={t(`Please input username.`)}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.signModel.username}
                        onChange={async (val) => {
                          gstore.preliAllData.configs.signModel.username =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <FormGroup
                      label={t(`Password`)}
                      helperText={t(`Please input password.`)}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.signModel.password}
                        onChange={async (val) => {
                          gstore.preliAllData.configs.signModel.password =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <FormGroup
                      label={t(`Confirm Password`)}
                      helperText={t(`Please confirm your password.`)}
                    >
                      <GFormInput
                        value={
                          gstore.preliAllData.configs.signModel.confirmPassword
                        }
                        onChange={async (val) => {
                          gstore.preliAllData.configs.signModel.confirmPassword =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                  </div>
                </div>
                <div className="preli-footer">
                  <div></div>
                  <div>
                    <Button
                      disabled={!val_1}
                      outlined={true}
                      intent={"primary"}
                      onClick={async () => {
                        // location.reload();
                        try {
                          let password =
                            gstore.preliAllData.configs.signModel.password;
                          if (password == "" || password.length < 6) {
                            gutils.alert(
                              "The length of Password cannot less than 6"
                            );
                            return;
                          }
                          if (
                            !password.match(/[\d\W]/g) ||
                            !password.match(/[a-z]/g)
                          ) {
                            gutils.alert(
                              `Password cannot be simple, please include number, alphbet or symbol`
                            );
                            return;
                          }
                          await gutils.optCtn(
                            `/local_auth/user_reg_by_inv_code`,
                            {
                              ...window.LOCAL_AUTH_LOGIN_CHK.encryptUserInfo(
                                gstore.preliAllData.configs.signModel
                              ),
                            }
                          );
                          gutils.alertOk({
                            message:
                              "Created a new user, welcome to use CodeGen.",
                          });
                          props.closePanel();
                        } catch (e) {
                          gutils.alert({
                            intent: "danger",
                            message: gutils.msg_error(e),
                          });
                        }
                      }}
                    >
                      {t("Register")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          },
        },
        localSignInSetting: {
          props: {},
          title: t("Authentication"),
          renderPanel: (props) => {
            let [num, onNum] = useState(0);

            let okStyle = "var(--app-text-green)";
            let val_1 = gstore.preliAllData.configs.sign_ok;
            let authStatus = window.LOCAL_AUTH_LOGIN_CHK.authStatus;
            let [userList, onUserList] = useState([]);

            React.useEffect(() => {
              let a = gutils.run_async_loop(async () => {
                let pub_get_user_list = await gutils.optCtn(
                  `/local_auth/pub_get_user_list`
                );
                if (!_.isEqual(userList, pub_get_user_list)) {
                  onUserList(pub_get_user_list);
                  window.pub_get_user_list = pub_get_user_list;
                }
              }, 3000);
              return () => {
                a();
              };
            }, []);
            return (
              <div className="preli-all-wrap" key={"x" + num}>
                <div className="preli-wrap">
                  <p style={{ marginBottom: "20px" }}>
                    <h3>{t("Verifying Identification")}</h3>
                    <span style={{ marginRight: "3px" }}>
                      {t(
                        `The local service has been protected by the defined password, you need provide that password that you set previously at first. If you forgot the password value, please click here to learn more information.`
                      )}
                    </span>
                    <a
                      href="javascript:void(0);"
                      onClick={async () => {
                        await gutils.win_alert(
                          t(
                            `CodeGen stored the password value into the local file, but no worries, we're adopting a One-way password encryption mechanism, that is to say that nobody can read the password of the plain text version. \n\nTo restore the password, you can delete the file "{0}" and reload this page, then you shall be able to initialize the password again. \n\n(Would it be harmful to the local service? We don't think so, as long as you can modify the system preserved config file, that means you are granted to read everything about CodeGen data files.)`,
                            _.get(authStatus, "authFilePath")
                          )
                        );
                      }}
                    >
                      {t(`Forgot Password?`)}
                    </a>
                  </p>
                  <div>
                    <FormGroup
                      label={t(`Username`)}
                      helperText={t(
                        `Please select your own username. If you don't have an account, you can click the button below to create a new one.`
                      )}
                    >
                      <GFormSelect
                        value={gstore.preliAllData.configs.sign_username}
                        onChange={(val) => {
                          gstore.preliAllData.configs.sign_username =
                            gutils.getValueFromE(val);
                          gstore.preliAllData.configs.sign_ok = false;
                          gstore.preliAllData.configs.sign_password = "";
                        }}
                        list={[
                          {
                            label: "Administrator",
                            value: "Administrator",
                          },
                          ..._.map(userList, (x) => ({
                            label: x.username,
                            value: x.username,
                          })),
                        ]}
                      ></GFormSelect>
                      {/* <GFormInput
                        disabled={true}
                        value={gstore.preliAllData.configs.sign_username}
                        onChange={(val) => {
                          gstore.preliAllData.configs.sign_username =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput> */}
                    </FormGroup>
                    <FormGroup
                      label={t(`Password`)}
                      helperText={t(`Please input password.`)}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.sign_password}
                        onChange={async (val) => {
                          gstore.preliAllData.configs.sign_password =
                            gutils.getValueFromE(val);
                          gstore.preliAllData.configs.sign_ok = false;
                          gstore.preliAllData.configs.sign_loading = true;
                          let aObj = {
                            username: gstore.preliAllData.configs.sign_username,
                            password: gstore.preliAllData.configs.sign_password,
                          };
                          aObj =
                            window.LOCAL_AUTH_LOGIN_CHK.encryptUserInfo(aObj);
                          let content = await gutils.optCtn(
                            "/local_auth/local_login_status",
                            {
                              ft_username: aObj.username,
                              ft_password: aObj.password,
                            }
                          );
                          let mval = _.get(content, "isLogin", false);
                          if (mval) {
                            window.LOCAL_AUTH_LOGIN_CHK.setUserInfo(aObj);
                          }
                          gstore.preliAllData.configs.sign_ok = mval;
                          gstore.preliAllData.configs.sign_loading = false;
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <div>
                      <h4 style={{ marginBottom: "5px" }}>
                        {t(`Password Verification Result`)}
                      </h4>
                      <ul style={{}}>
                        <li
                          style={{
                            color: true ? okStyle : "",
                          }}
                        >
                          {t(`Initialized`)}
                        </li>
                        <li
                          style={{
                            color:
                              gstore.preliAllData.configs.sign_password != ""
                                ? okStyle
                                : "",
                          }}
                        >
                          {t(`Please provide the password value`)}
                        </li>
                        <li
                          style={{
                            display:
                              !gstore.preliAllData.configs.sign_loading ||
                              gstore.preliAllData.configs.sign_password == ""
                                ? "none"
                                : null,
                            color: val_1 ? okStyle : "",
                          }}
                        >
                          {t(`CodeGen is verifying the password value`)}
                        </li>
                        <li
                          style={{
                            display:
                              gstore.preliAllData.configs.sign_loading ||
                              gstore.preliAllData.configs.sign_password == ""
                                ? "none"
                                : null,
                            color: val_1 ? okStyle : "",
                          }}
                        >
                          {t(
                            gstore.preliAllData.configs.sign_ok
                              ? "Verified"
                              : `Not verified yet.`
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="preli-footer">
                  <div>
                    <Button
                      intent={""}
                      onClick={() => {
                        props.openPanel(stackMap.newUserInSetting);
                      }}
                      outlined={true}
                    >
                      {t(`Register New User`)}
                    </Button>
                  </div>
                  <div>
                    <Button
                      disabled={!val_1}
                      outlined={true}
                      intent={"success"}
                      onClick={async () => {
                        // location.reload();
                        location.href = "/";
                      }}
                    >
                      {t("Finish")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          },
        },
        localAuthSetting: {
          props: {},
          title: t("Authentication"),
          renderPanel: (props) => {
            let [num, onNum] = useState(0);
            let fn_updateForAppHome = async (e) => {
              if (e.indexOf(`"`) != -1) {
                await gutils.win_alert(`Invalid FilePath`);
                return;
              }
              let preFolder = gstore.preliAllData.configs.apphome;
              gstore.preliAllData.configs.apphome = e;
              ipc.store_set(`gen.system.apphome`, e);
              onNum(num + 1);
            };
            let fn_updateForAppData = async (e) => {
              if (e.indexOf(`"`) != -1) {
                await gutils.win_alert(`Invalid FilePath`);
                return;
              }
              let preFolder = gstore.preliAllData.configs.appdata;
              gstore.preliAllData.configs.appdata = e;
              ipc.store_set(`gen.system.appdata`, e);
              gutils.alertOk(
                t(
                  `Updated the directory sucessfully! Please be noted the previous files wouldn't be moved to the new folder automatically if you already have created some data over the directory. The previous directory is {0}`,
                  preFolder
                )
              );
              onNum(num + Math.random());
            };
            let okStyle = "var(--app-text-green)";
            let val_1 = gstore.preliAllData.configs.password.length >= 6;
            let val_2 = gstore.preliAllData.configs.password.match(/[\d\W]/g);
            let val_3 =
              gstore.preliAllData.configs.password.match(/[a-z]/g) ||
              gstore.preliAllData.configs.password.match(/[A-Z]/g);
            let val_4 =
              gstore.preliAllData.configs.password != "" &&
              gstore.preliAllData.configs.password ===
                gstore.preliAllData.configs.password_confirm;

            return (
              <div className="preli-all-wrap" key={"x" + num}>
                <div className="preli-wrap">
                  <p style={{ marginBottom: "20px" }}>
                    <h3>{t("Local Service Authentication")}</h3>
                    {t(
                      `Before using CodeGen, you need to set the initial password to protect the local service. Once all of these password strength conditions below are satisfied, you can click the continue button.`
                    )}
                  </p>
                  <div>
                    <FormGroup
                      label={t(`Username`)}
                      helperText={t(`System Default UserName`)}
                    >
                      <GFormInput
                        disabled={true}
                        value={gstore.preliAllData.configs.username}
                        onChange={(val) => {
                          gstore.preliAllData.configs.username =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <FormGroup
                      label={t(`Password`)}
                      helperText={t(`Please input password.`)}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.password}
                        onChange={(val) => {
                          gstore.preliAllData.configs.password =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <FormGroup
                      label={t(`Password Confirmation`)}
                      helperText={t(`Please confirm your password.`)}
                    >
                      <GFormInput
                        value={gstore.preliAllData.configs.password_confirm}
                        onChange={(val) => {
                          gstore.preliAllData.configs.password_confirm =
                            gutils.getValueFromE(val);
                        }}
                      ></GFormInput>
                    </FormGroup>
                    <div>
                      <h4 style={{ marginBottom: "5px" }}>
                        {t(`Password Strength Standard`)}
                      </h4>
                      <ul>
                        <li
                          style={{
                            color: val_1 ? okStyle : null,
                          }}
                        >
                          {t(`Contains at Least 6 characters`)}
                        </li>
                        <li
                          style={{
                            color: val_2 ? okStyle : "",
                          }}
                        >
                          {t(`Contains at least 1 number or 1 symbol`)}
                          {""}
                        </li>
                        <li
                          style={{
                            color: val_3 ? okStyle : "",
                          }}
                        >
                          {t(
                            `Contains upper or lower characters at the same time`
                          )}
                        </li>{" "}
                        <li
                          style={{
                            color: val_4 ? okStyle : "",
                          }}
                        >
                          {t(`Two password value is the same value`)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="preli-footer">
                  <div></div>
                  <div>
                    <Button
                      disabled={!(val_1 && val_2 && val_3 && val_4)}
                      intent="none"
                      onClick={async () => {
                        let obj = {
                          ...gstore.preliAllData.configs,
                        };
                        obj = window.LOCAL_AUTH_LOGIN_CHK.encryptUserInfo(obj);
                        let ctn = await gutils.optCtn(
                          "/local_auth/save_login_to_file",
                          obj
                        );
                        window.LOCAL_AUTH_LOGIN_CHK.setUserInfo(obj);
                        await gutils.alertOk(
                          t(`Initialized, CodeGen will restart this page soon.`)
                        );
                        location.href = "/";
                        // gutils.defer(() => {
                        //   location.reload();
                        // }, 1000);
                        // if (
                        //   gutils.anyEmpty([
                        //     gstore.preliAllData.configs.password,
                        //     gstore.preliAllData.configs.password_confirm,
                        //   ])
                        // ) {
                        //   await gutils.win_alert(`Please input the correct password`);
                        // }
                        // finished that part
                      }}
                    >
                      {t("Continue")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          },
        },
        fileSetting: {
          props: {},
          title: t("Storage Settings"),
          renderPanel: (props) => {
            let [num, onNum] = useState(0);
            let fn_updateForAppHome = async (e) => {
              if (e.indexOf(`"`) != -1) {
                await gutils.win_alert(`Invalid FilePath`);
                return;
              }
              let preFolder = gstore.preliAllData.configs.apphome;
              gstore.preliAllData.configs.apphome = e;
              ipc.store_set(`gen.system.apphome`, e);
              onNum(num + 1);
            };
            let fn_updateForAppData = async (e) => {
              if (e.indexOf(`"`) != -1) {
                await gutils.win_alert(`Invalid FilePath`);
                return;
              }
              let preFolder = gstore.preliAllData.configs.appdata;
              gstore.preliAllData.configs.appdata = e;
              ipc.store_set(`gen.system.appdata`, e);
              gutils.alertOk(
                t(
                  `Updated the directory sucessfully! Please be noted the previous files wouldn't be moved to the new folder automatically if you already have created some data over the directory. The previous directory is {0}`,
                  preFolder
                )
              );
              onNum(num + Math.random());
            };
            return (
              <div className="preli-all-wrap" key={"x" + num}>
                <div className="preli-wrap">
                  <p>
                    <h3>{t("App Storage Location")}</h3>
                    {t(
                      `If you want to save app data into another places, please update the default settings below.`
                    )}
                  </p>
                  <div>
                    <FormGroup
                      label={t(`AppData Directory`)}
                      helperText={t(
                        `System will use the directory to place the internal files of CodeGen`
                      )}
                    >
                      <GFormFilePathSelect
                        value={gstore.preliAllData.configs.apphome}
                        onChange={fn_updateForAppHome}
                      />
                    </FormGroup>
                    <FormGroup
                      label={t(`My WorkSpace`)}
                      helperText={t(
                        `System will use the directory to place the user's data files.`
                      )}
                    >
                      <GFormFilePathSelect
                        value={gstore.preliAllData.configs.appdata}
                        onChange={fn_updateForAppData}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="preli-footer">
                  <div>
                    <Button
                      intent="warning"
                      onClick={() => {
                        fn_updateForAppData(
                          ipc.store_get(`gen.system.defaults.appdata`)
                        );
                        fn_updateForAppHome(
                          ipc.store_get(`gen.system.defaults.apphome`)
                        );
                      }}
                    >
                      {t("Reset FilePath")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      intent="none"
                      onClick={() => {
                        props.openPanel(stackMap.mirrorSetting);
                      }}
                    >
                      {t("Continue")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          },
        },
        mirrorSetting: {
          props: {},
          renderPanel: (props) => {
            const { checkingStatus, mirrors } = useLocalStore(() => {
              return {
                checkingStatus: gstore.preliAllData.checkingStatus,
                mirrors: gstore.preliAllData.formList.mirrors,
              };
            });
            const logsArr = [
              checkingStatus.logs.init,
              checkingStatus.logs.runtime,
              checkingStatus.logs.core,
              checkingStatus.logs.local,
            ];
            let isAnyError = false;
            _.forEach(logsArr, (x, d, n) => {
              if (x.error) {
                isAnyError = true;
              }
            });
            const finLogList = [];
            logsArr.map((x, d, n) => {
              if (!x.work) {
                return "";
              }
              _.forEach(x.msg, (eachMsgItem) => {
                let finval = eachMsgItem.fullText;
                if (_.isNil(finval)) {
                  finval =
                    (eachMsgItem.ok ? "Downloaded" : "Downloading") +
                    " " +
                    " the " +
                    eachMsgItem.label +
                    (eachMsgItem.ok ? " Successfully" : "") +
                    (eachMsgItem.ok
                      ? ""
                      : !eachMsgItem.e
                      ? ""
                      : ", status: " +
                        `${eachMsgItem.e.rate}(${eachMsgItem.e.loaded}/${eachMsgItem.e.total})`);
                }
                finLogList.push(
                  <li>
                    <div
                      style={{
                        color: eachMsgItem.ok ? "var(--app-text-green)" : "",
                      }}
                    >
                      {finval}
                    </div>
                  </li>
                );
              });
              if (x.error) {
                finLogList.push(
                  x.error ? (
                    <div style={{ color: "#F55656" }}>
                      {x.error.label}, cause info: <b>{x.error.cause}</b>
                    </div>
                  ) : (
                    ""
                  )
                );
              }
            });
            return (
              <div className="preli-all-wrap">
                <div className="preli-wrap">
                  <p>
                    <h3>
                      {t(
                        !window.ipc.all_files_placed()
                          ? "Initialize Local Service Files"
                          : "Download Settings"
                      )}
                    </h3>
                    {!window.ipc.all_files_placed() ? (
                      ""
                    ) : (
                      <FormGroup label={t("Download Mirror")} labelInfo="">
                        <GFormSelect
                          list={mirrors}
                          onChange={(e) => {
                            gstore.preliAllData.configs.mirror = e.target.value;
                          }}
                          value={gstore.preliAllData.configs.mirror}
                        />
                      </FormGroup>
                    )}
                  </p>
                  <p>
                    <h3>
                      {t(
                        !window.ipc.all_files_placed()
                          ? "Status"
                          : "Download Status"
                      )}
                    </h3>
                    {!checkingStatus.start ? (
                      <ul>
                        {" "}
                        <li>
                          {t(
                            !window.ipc.all_files_placed()
                              ? "Please click button to start."
                              : `Please click "Downloads" button to start.`
                          )}
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        {finLogList}
                        {isAnyError ? (
                          <div
                            style={{
                              color: "#0E5A8A",
                              marginTop: "26px",
                            }}
                          >
                            {t(
                              `Sorry, cannot handle this progress because of an error, please check the following items and re-try again.`
                            )}
                            <ul>
                              <li>
                                {t(
                                  `Please do not install CodeGen to the folder whose name contains blank or non-english character, it will probably cause unexpected errors.`
                                )}
                              </li>
                              <li>{t("Check if the network is normal.")}</li>
                              <li>
                                {t("Check if the disk has enough space.")}
                              </li>
                              <li>
                                {t(
                                  `Check if {0} was allowed to download files.`,
                                  gutils.app_name
                                )}
                              </li>
                              <li>
                                {t(
                                  "Check if another software interfere this action."
                                )}
                              </li>
                              <li>
                                {t(
                                  `If you still cannot solve this error after checking, please contact us work7z@outlook.com`
                                )}{" "}
                                {/* <a href="mailto:work7z@outlook.com">
                                  
                                </a> */}
                              </li>
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
                        {checkingStatus.done ? (
                          <li style={{ color: "var(--app-text-green)" }}>
                            Done.
                          </li>
                        ) : (
                          ""
                        )}
                        {/* <li>Local Service Runtime</li>
                        <li>Local Service Core Dependencies</li>
                        <li>Finished this checking</li> */}
                      </ul>
                    )}
                  </p>
                </div>
                <div className="preli-footer">
                  <div>
                    <Button
                      intent="danger"
                      onClick={async () => {
                        if (
                          await gutils.win_confirm(
                            t(
                              `If you cannot start-up CodeGen after having tried, and the previous config can be deleted, please click confirm to continue.`
                            )
                          )
                        ) {
                          if (
                            await gutils.win_confirm(
                              `We will remove the previous user data and related configs, please click confirm to continue`
                            )
                          ) {
                            ipc.deleteOldData();
                            await gutils.win_alert(`Restored.`);
                            // location.reload();
                            location.reload();
                          }
                        }
                      }}
                      text={t(`Restore All`)}
                    ></Button>
                  </div>
                  <div>
                    {checkingStatus.done ? (
                      <Button
                        intent="success"
                        outlined={true}
                        onClick={() => {
                          try {
                            // hist.push({
                            //   pathname: "/",
                            // });
                            location.href = "/";
                          } catch (e) {
                            //
                          }
                          // setTimeout(() => {
                          //   location.reload();
                          // }, 800);
                        }}
                      >
                        {t(checkingStatus.doneText)}
                      </Button>
                    ) : (!checkingStatus.start || isAnyError) &&
                      !checkingStatus.tryStopLoading ? (
                      <Button
                        intent={isAnyError ? "warning" : "primary"}
                        onClick={() => {
                          gutils.api.preli.startInit();
                        }}
                      >
                        {isAnyError
                          ? t(`Try Again`)
                          : t(
                              !window.ipc.all_files_placed()
                                ? "Start"
                                : "Download"
                            )}
                      </Button>
                    ) : (
                      <Button
                        loading={checkingStatus.tryStopLoading}
                        outlined={true}
                        intent="danger"
                        onClick={() => {
                          gutils.api.preli.stopInit();
                        }}
                      >
                        {t("Cancel")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          },
          title: t(
            !window.ipc.all_files_placed()
              ? "Initialize Local Services"
              : "Download"
          ),
        },
        example: {
          props: {},
          renderPanel: (props) => {
            return (
              <div className="preli-all-wrap">
                <div className="preli-wrap">example</div>
                <div className="preli-footer">
                  <div></div>
                  <div>
                    <Button
                      intent="none"
                      onClick={() => {
                        props.openPanel(stackMap.mirrorSetting);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            );
          },
          title: "Download Settings",
        },
      },
      (x, d, n) => {
        // // console.log("renderpanel");
        // x.renderPanel = observer(x.renderPanel);
        const RawPanel = x.renderPanel;
        x.renderPanel = (props = {}) => {
          const CrtWork = observer(RawPanel);
          return <CrtWork {...props} />;
        };
        // x.renderPanel = (props = {}) => {
        //   const [update = Math.random(), onUpdate] = useState(null);
        //   return (
        //     <RawPanel
        //       {...props}
        //       onUpdate={() => {
        //         onUpdate(Math.random);
        //       }}
        //       key={update}
        //     />
        //   );
        // };
        return x;
      }
    );

    if (_.isEmpty(this.state.stackList)) {
      gutils.defer(() => {
        this.setState({
          stackList: [stackMap.prelude],
        });
      });
    }

    return (
      <div className="sys-prelimnary-wrapper">
        <Example>
          <PanelStack2
            className="docs-panel-stack-example"
            onOpen={this.addToPanelStack}
            onClose={this.removeFromPanelStack}
            renderActivePanelOnly={true}
            showPanelHeader={true}
            stack={this.state.stackList}
          />
        </Example>
      </div>
    );
  }
}

export default observer(PreliClz);
