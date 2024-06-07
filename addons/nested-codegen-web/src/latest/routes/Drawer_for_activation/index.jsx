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
import "./index.less";
import UserLoginPanel from "../overlay_for_user_panel/UserLoginPanel";
import GFormInput from "../../components/GFormInput";
import auth_obj from "../../auth";

const OfflineActivation = observer(() => {
  let lc_store = useLocalStore(() => {
    return {
      crt_serial_id: "N/A",
    };
  });
  useEffect(() => {
    let a = gutils.run_async_loop(async () => {
      let {
        content: { pubKey },
      } = await gutils.opt(`/premium/get_pub_key`);
      if (pubKey != lc_store.crt_serial_id) {
        lc_store.crt_serial_id = pubKey;
      }
    }, 3000);
    return () => {
      a();
    };
  }, []);
  const validConditions = [
    {
      type: "html",
      prop: "EXTRA_TMP_LOGIC_vcode",
      defaultValue: Math.random(),
      value: (x) => {
        return (
          <FormGroup
            label={t(`Local Serial ID`)}
            helperText={t(
              "Please copy the ID above and paste it into the corresponding form on our website, then you can get the activation code accordingly."
            )}
          >
            <h1 style={{ marginTop: "5px" }}>{lc_store.crt_serial_id}</h1>
          </FormGroup>
        );
      },
    },
    {
      label: "Activation Code (Case Sensitive)",
      prop: "activation_code",
      need: true,
      max: 500,
      placeholder: "Please input the activation code to activate this device.",
      helperText: t(
        `To get the activation code, please visit our website {0}`,
        "https://codegen.cc"
      ),
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
  ];
  return (
    <div>
      {React.createElement(
        observer(() => {
          return gutils.createForm(
            gstore.user.offlineActivatePageData,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              obj: gstore.staticOverlay.addItem,
            },
            validConditions
          );
        })
      )}
    </div>
  );
});

const settings_licenses = observer(() => {
  const drawerConfig = gstore.licenseConfig.drawer;
  const state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false , // drawerConfig.open,
    size: "80%",
    position: Position.BOTTOM,
    usePortal: true,
    title:
      t(`My License`) +
      " - " +
      (gstore.apiInfo.can_this_device_use_presently
        ? t(`This Device Has Been Activated.`)
        : t("Activate this Device")),
  };
  let mW = "500px";
  let mS = {
    clear: "both",
    marginTop: "30px",
    textAlign: "left",
  };
  let m_lll = useLocalStore(() => {
    return {
      is_activate_loading: false,
    };
  });
  return (
    <Drawer
      className={"mydrawerclz"}
      icon="endorsed"
      onClose={() => {
        drawerConfig.open = false;
      }}
      {...state}
    >
      <div style={{ margin: "6px 150px" }}>
        <Tabs
          id="TabsExample"
          selectedTabId={gstore.licenseConfig.drawer.tabId}
          onChange={(e) => {
            gstore.licenseConfig.drawer.tabId = e;
          }}
        >
          {not_reg() ? (
            ""
          ) : (
            <Tab
              id="online_activation"
              title={t("Acitvation Management")}
              panel={
                <div>
                  <h3>{t("Thanks! You already activated this device.")}</h3>
                  <p>
                    {t(
                      "Regarding more operations about the activation, please refer to the controls as below."
                    )}
                  </p>
                  <p>
                    <Button
                      onClick={auth_obj.deactivateThisDevice}
                      text={t("Deactivate This Device")}
                    ></Button>
                  </p>
                </div>
              }
            />
          )}
          {!not_reg() ? (
            ""
          ) : (
            <Tab
              id="online_activation"
              title={t("Online Activation")}
              panel={
                <div style={{ width: mW }}>
                  <h3>{t("Sign in your account to activate")}</h3>
                  <div>
                    <UserLoginPanel />
                  </div>
                  <p style={mS}>
                    <Button
                      onClick={() => {
                        let m = gstore.user.loginPageData.addModel;
                        if (
                          gutils.anyEmpty([
                            m.username,
                            m.password,
                            m.verificationCode,
                          ])
                        ) {
                          gutils.alert({
                            intent: "danger",
                            message: t(
                              `Please provide necessary information before activating this device.`
                            ),
                          });
                          return;
                        }
                        gutils.api.user.login({
                          afterSignIn: async () => {
                            //
                          },
                        });
                      }}
                      text={t("Activate this Device")}
                      intent={"primary"}
                    ></Button>
                    <AnchorButton
                      style={{ marginLeft: "8px" }}
                      href="https://codegen.cc"
                      target="_blank"
                      text={t(`View My Account`)}
                    ></AnchorButton>
                    <AnchorButton
                      style={{ marginLeft: "8px" }}
                      onClick={(e) => {
                        gutils.stop_e(e);
                        gutils.win_alert(
                          t(
                            `Online Activate or Offline activate can occupy a seat of the allowed devices in your account, you can release one of them if the maximum device was exceeded. Most of all, please do NOT share your account on the internet, otherwise, we will consider suspense your account for the sake of your account security.`
                          )
                        );
                      }}
                      text={t(`About Activation`)}
                    ></AnchorButton>
                  </p>
                </div>
              }
            />
          )}
          {p_mode() || !not_reg() ? (
            ""
          ) : (
            <Tab
              id="offline_activation"
              title={t("Offline Activation")}
              panel={
                <div
                  style={{
                    width: mW,
                  }}
                >
                  <h3>{t("Offline Activate this Device")}</h3>
                  <div>
                    <OfflineActivation />
                  </div>
                  <p style={mS}>
                    <Button
                      onClick={async () => {
                        m_lll.is_activate_loading = true;
                        try {
                          let m = gstore.user.offlineActivatePageData.addModel;
                          if (gutils.anyEmpty([m.activation_code])) {
                            gutils.alert({
                              intent: "danger",
                              message: t(
                                `Please provide necessary information before activating this device.`
                              ),
                            });
                            return;
                          } else {
                            await gutils.opt("/premium/verify_pri_key", {
                              activation_code: _.trim(m.activation_code),
                            });
                            gutils.alertOk(
                              "Thank You! Activated this device successfully!"
                            );
                            location.reload();
                          }
                        } catch (e) {
                          gutils.alert({
                            intent: "danger",
                            message: t(gutils.getErrMsg(e)),
                          });
                          console.log(e);
                        } finally {
                          m_lll.is_activate_loading = true;
                        }
                      }}
                      intent={"primary"}
                      text={t(`Offline Activate`)}
                    ></Button>
                    <AnchorButton
                      style={{ marginLeft: "8px" }}
                      href="https://codegen.cc"
                      target="_blank"
                      onClick={(e) => {
                        gutils.stop_e(e);
                        gutils.win_alert(
                          t(
                            `To get the activate code, please visit our official website and sign in the user center page, then you will find the related tab, the button is placed there.`
                          )
                        );
                      }}
                      text={t(`How to Get Activate Code?`)}
                    ></AnchorButton>
                    <AnchorButton
                      style={{ marginLeft: "8px" }}
                      onClick={(e) => {
                        gutils.stop_e(e);
                        gutils.win_alert(
                          t(
                            `Since CodeGen is still aiming to be a portable software, the validity of activation will still available though you move the package to another PC. But please note that you may not share the activated result with your friends as we will verify your licenses from time to time, to be simple, that your licenses are abused by sharing it with many people is disallowed and will be considered to be taken further action.`
                          )
                        );
                      }}
                      text={t(`About Activation`)}
                    ></AnchorButton>
                  </p>
                </div>
              }
            />
          )}
          {false ? (
            <Tab
              id="special_offer"
              title={t("Earliest Users")}
              panel={
                <div>
                  <h3>{t("Thanks Notes")}</h3>
                  <p>
                    {t(
                      "We would like to express our gratitude to our earlier users who was making CodeGen a better toolbox, without your encouragements, CodeGen is still a ordinary toolbox, though it is probably still a ordinary one presently. "
                    )}
                    {t(
                      "If you had supported us on any website by Sep 17, 2022 through the behaviours in the docs below, then we will give you a lifelong free account."
                    )}
                  </p>
                  <p>
                    {t(
                      `We do believe our users, but at the same time, we also would like to mention the fact that we will verify the evidence carefully, which means you cannot provide a fake evidence because it will waste the time for you and us. `
                    )}
                  </p>
                  <AnchorButton
                    href={
                      "https://codegen.cc/documentation/view?id=our_earlier_users"
                    }
                    target="_blank"
                    text={t("Learn More")}
                  ></AnchorButton>
                </div>
              }
            />
          ) : (
            ""
          )}
          <Tab
            id="history_version"
            title={t("History Version")}
            panel={
              <div>
                <h3>{t("Downloading the Old ToolBox")}</h3>
                <p>
                  {t(
                    "Since v1.6.53, due to the heavy burden of expenditure, we will no longer provide the toolbox for free, but we still promise the previous features are still available. If you want to use the previous features, please download the installation package by the button below."
                  )}
                </p>
                <p>
                  {t(
                    "Though the old version is available, but we still encourge you to use our latest version, the reason as below"
                  )}
                </p>
                <ul>
                  <li>{t("It will no longer enjoy latest gratis updates.")}</li>
                  <li>
                    {t(
                      "You can use its entire features for free, but as the time goes by, these features will be obsoleted features one day."
                    )}
                  </li>
                  <li>
                    {t(
                      `Some online features will be unavailable in the future due to some API changes.`
                    )}
                  </li>
                  <li>
                    {t(
                      "Please be noted that you could NOT download our software on other unofficial website, for the sake of your PC security, please keep it in your mind!"
                    )}
                  </li>
                  <li>
                    {t(
                      "If you found any issue in the old version, please kindly tell us, but we are sorry the patch will be available only in the latest versions. "
                    )}
                  </li>
                </ul>
                <AnchorButton
                  href={
                    "https://github.com/work7z/CodeGen/releases/tag/v1.6.521"
                  }
                  target="_blank"
                  text={t("Download Old ToolBox")}
                ></AnchorButton>
              </div>
            }
          />
        </Tabs>
      </div>
    </Drawer>
  );
});

export default settings_licenses;
