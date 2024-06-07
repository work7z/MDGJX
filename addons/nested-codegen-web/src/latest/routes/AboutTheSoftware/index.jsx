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
import GFormSelect from "../../components/GFormSelect";
import "./index.less";
const FootControl = observer(() => {
  const [moo, onMoo] = useState(false);
  return (
    <div
      className="bp3-text-small btmcontrols"
      style={{
        minHeight: "135px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        backgroundColor: "var(--app-bg-footpage)",
        // borderTop: "1px solid var(--app-bg-border-e1-gray-apptitle)",
      }}
    >
      <div
        onMouseEnter={() => {
          onMoo(true);
        }}
        onMouseLeave={() => {
          onMoo(false);
        }}
        onClick={() => {}}
      >
        {t(`This text has super cow power.`)}
        {moo ? `(Moo... ${`Have you mooed today?`})` : ""}
      </div>
    </div>
  );
});

export default observer(() => {
  return (
    <div className="settings_general_wrapper">
      <div className="each-settings">
        <h2 className="each-setting-title">{t("Basic Information")}</h2>
        <div className="each-setting-content">
          <div>
            <div>
              <b>{t("App Version")}:</b>
              {gutils.app_version}
            </div>
            <div>
              <b>{t("Github Repository")}:</b>https://github.com/work7z/CodeGen
            </div>
            <div>
              <b>{t("Official Website")}:</b>https://codegen.cc
            </div>
            <div>
              <b>{t("Contact Developer")}:</b>work7z@outlook.com
            </div>
          </div>
        </div>
      </div>
      <div className="each-settings">
        <h2 className="each-setting-title">{t("Our Commitment")}</h2>
        <div className="each-setting-content">
          <div>
            {t(
              `We will never ever forever infringe upon user's privacy and interests as bold as brass, we hold the opinion that privacy matters above all things, meanwhile, to achieve this commitment, we hereby guarantee you the following items, but not limited to the following items: `
            )}
          </div>
          <ul>
            <li>
              {t(
                `1. CodeGen will NEVER analyze or upload your files on this PC`
              )}
            </li>
            <li>
              {t(
                `2. CodeGen will NEVER use the device to launch any kind of attack or abuse.`
              )}
            </li>
            <li>
              {t(
                `3. CodeGen is aiming to improve developer’s efficiency and save time as much as it can`
              )}
            </li>
            <li>
              {t(
                `4. Without the user’s definite permission, CodeGen will NEVER read/write your files or execute any unexpected operation.`
              )}
            </li>
            <li>
              {t(
                `5. CodeGen is offline-able software, which means you can use it as well without the Internet.`
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">
          {t("Check for Latest Updates Regulary?")}
        </h2>
        <div className="each-setting-content">
          {/* <GFormSelect
              value={gstore.localSettings.appTypeView}
              list={gstore.settings.appViewTypeArr.get()}
              onChange={(e) => {
                console.log("chg", e.target, e.target.value);
                gstore.localSettings.appTypeView = e.target.value;
              }}
            ></GFormSelect> */}
          <FormGroup
            label=""
            helperText={t(
              `By default, we will check and verify your current application and related local services so as to ensure there's no missing critical updates about new features and vulnerability patches, of course, those checking requests will NOT carry your private data, meanwhile, we will NOT upgrade CodeGen without your permission, we will always ask you first if you want to upgrade, please feel free to turn it on. Hence, We strongly recommend you turning it on unless the policy of your PC/Network doesn't allow it sending any kind of requests.`
            )}
          >
            <GFormSelect
              list={[
                {
                  label: t(
                    "Yes, check for latest software updates automatically. (Recommended Option)"
                  ),
                  value: "yes",
                },
                {
                  label: t(
                    "No, disallow CodeGen from receiving requests from server. (Insecure Option)"
                  ),
                  value: "no",
                },
              ]}
              onChange={async (e) => {
                // console.log("value is chaging", e, e.target.value);
                // gutils.changeLang(e.target.value);
                gstore.localSettings.can_call_remove_requests =
                  gstore.localSettings.can_call_remove_requests == "yes"
                    ? "no"
                    : "yes";
                //
                if (gstore.localSettings.can_call_remove_requests == "no") {
                  await gutils.win_alert(
                    `For the sake of your security, we will turn it on after two weeks.`
                  );
                  let mywaittime = Moment().add(14, "days").toDate().getTime();
                  localStorage.setItem("mywaittimenow", "" + mywaittime);
                } else {
                  localStorage.removeItem("mywaittimenow");
                }

                // await gutils.optCentreWithDeviceInfo(
                //   "/release-notes/json/verify-version",
                //   {
                //     CALL_OR_NOT_MODE:
                //       gstore.localSettings.can_call_remove_requests,
                //   }
                // );
              }}
              value={gstore.localSettings.can_call_remove_requests}
            />
          </FormGroup>
        </div>
      </div>
      <div className="each-settings">
        <h2 className="each-setting-title">{t("Envisioning The Future")}</h2>
        <div className="each-setting-content">
          <Button
            small={true}
            intent={
              !gstore.localSettings.using_desktop_mode ? "none" : "primary"
            }
            // globe
            icon={"globe"}
            text={t(`Window LAF Alike`)}
            onClick={() => {
              gstore.localSettings.using_desktop_mode =
                !gstore.localSettings.using_desktop_mode;
              gstore.localSettings.app_multiple_tab_mode =
                !gstore.localSettings.using_desktop_mode;
              // if (gstore.localSettings.using_desktop_mode) {
              //   gstore.localSettings.isLeftMenuOpen = false;
              // } else {
              //   gstore.localSettings.isLeftMenuOpen = true;
              // }
            }}
          />
          <p>
            <FootControl />
          </p>
        </div>
      </div>
    </div>
  );
});
