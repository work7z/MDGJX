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
  Tabs,
  Tab,
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
import { useState, useEffect } from "react";

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
import gstore from "../../store.jsx";
import "./index.less";
import Blink from "../../components/Blink";
import SoftwareDetailView from "../../components/SoftwareDetailView";
import _ from "lodash";
window.fn_call_update_to_new = async () => {
  await window.fn_call_launch_page_open(
    `&action=restart_server&version=${
      "" + localStorage.getItem("lastReleaseOKVersion")
    }`,
    false
  );
};

const CommonSoftwareUpdatesPanel = observer((props) => {
  const { loading, newVersion, errInfo, updateObj } =
    gstore.sysBootServer.updates;
  const onErrInfo = (val) => {
    gstore.sysBootServer.updates.errInfo = t(val);
  };
  const OnUpdateObj = (val) => {
    gstore.sysBootServer.updates.updateObj = val;
  };
  const OnNewVersion = (val) => {
    gstore.sysBootServer.updates.newVersion = val;
  };
  const Onloading = (val) => {
    gstore.sysBootServer.updates.loading = val;
  };
  useEffect(() => {
    let callThatFn = async (otherarg = {}) => {
      // debugger;
      onErrInfo(null);
      Onloading(true);
      OnUpdateObj({});
      OnNewVersion(false);
      let softwareUpdatesTabId = gstore.localSettings.softwareUpdatesTabId;
      if (softwareUpdatesTabId != props.type) {
        // return;
      }
      try {
        if (p_mode()) {
          return;
        }
      } catch (e) {}
      try {
        let res = await gutils.optCentreWithDeviceInfo(
          "/release-notes/json/get-latest-version",
          {
            TYPE: softwareUpdatesTabId,
            ...otherarg,
          }
        );
        let { content } = res;
        if (content) {
          let { VERSION, BLOG_CODE, DESCRIPTION } = content;
          if (!_.isNil(VERSION)) {
            let a = _.trim(VERSION);
            let b = gutils.app_version;
            if (!_.startsWith(a, "v")) {
              a = "v" + a;
            }
            if (!_.startsWith(b, "v")) {
              b = "v" + b;
            }
            if (a > _.trim(b)) {
              OnUpdateObj(_.cloneDeep(content));
              OnNewVersion(true);
            }
          }
        }
      } catch (err) {
        console.log("got an error", err);
        onErrInfo(
          t(
            `Cannot connect server, please check your network configs or try again later.`
          )
        );
      }
      Onloading(false);
    };
    let myfunc = reaction(() => {
      return [gstore.localSettings.softwareUpdatesTabId];
    }, callThatFn);
    gutils.defer(() => {
      callThatFn({
        CHECKING: true,
      });
    });
    return () => {
      myfunc();
    };
  }, []);
  // debugger;
  return (
    <div>
      {loading ? (
        <div>
          {t(`Retrieving data from server`)}
          <Blink />
        </div>
      ) : errInfo ? (
        <div style={{ color: "var(--app-text-darkred)" }}>
          {errInfo}
          <br />
          <div>{t("Other download approaches:")} </div>
          <ul>
            <li>
              <a href="https://github.com/work7z/CodeGen" target="_blank">
                {t("Github Releases")}
              </a>
            </li>
            <li>
              <a href="https://codegen.cc" target="_blank">
                {t("Official WebSite")}
              </a>
            </li>
          </ul>
        </div>
      ) : _.isEmpty(updateObj) ? (
        <div>
          <div>{t("No available new version")}</div>
          <div style={{ marginTop: "5px" }}>
            <Button
              intent="warning"
              style={{ marginRight: "5px" }}
              text={t("Rollback")}
              outlined={true}
              onClick={() => {
                window.fn_call_launch_page_open();
                // gstore.user.overlayForRollbackVersion.open = true;
              }}
            ></Button>
          </div>
        </div>
      ) : (
        <div>
          <SoftwareDetailView
            obj={updateObj}
            DESCRIPTION={updateObj.DESCRIPTION || ""}
            BLOG_CODE={updateObj.BLOG_CODE || ""}
          />
          {!_.isEmpty(gstore.sysBootServer.updates.installMessage) ? (
            <div style={{ marginTop: "3px" }}>
              {gstore.sysBootServer.updates.installMessage}
            </div>
          ) : (
            ""
          )}
          <div style={{ marginTop: "3px", textAlign: "right" }}>
            <Button
              intent="warning"
              style={{ marginRight: "5px" }}
              text={t("Rollback")}
              outlined={true}
              onClick={async () => {
                window.fn_call_launch_page_open();
                // gstore.user.overlayForRollbackVersion.open = true;
                // TODO: show installed version list
                // if (
                //   await gutils.win_confirm(
                //     `If you had been installed a new version before, CodeGen will be reinstated to the original version you installed at the first time after you clicked the confirm button.`
                //   )
                // ) {
                //   gutils.ipc().cleanVersionFile();
                //   await gutils.win_alert("Reinstated, please reboot CodeGen");
                // } else {
                //   await gutils.win_alert("Operation Cancelled.");
                // }
              }}
            ></Button>
            {("" + updateObj.ID).replace("v", "") ==
            ("" + localStorage.getItem("lastReleaseOKID")).replace("v", "") ? (
              <Button
                intent="success"
                style={{ marginRight: "5px" }}
                disabled={true}
                text={t("Installed")}
                outlined={true}
              ></Button>
            ) : (
              ""
            )}
            {gstore.sysBootServer.updates.restartNeeded ? (
              <Button
                loading={gstore.sysBootServer.updates.isInstalling}
                disabled={gstore.sysBootServer.updates.isInstalling}
                intent="success"
                outlined={true}
                onClick={async () => {
                  window.fn_call_update_to_new();
                  // gutils.ipc().quit();
                }}
              >
                {t("Restart Now")}
              </Button>
            ) : (
              <Button
                loading={gstore.sysBootServer.updates.isInstalling}
                disabled={gstore.sysBootServer.updates.isInstalling}
                intent="success"
                outlined={true}
                onClick={async () => {
                  gutils.api.system.updates.downloadAndInstall(updateObj);
                }}
              >
                {t(
                  "" + updateObj.ID == localStorage.getItem("lastReleaseOKID")
                    ? "ReInstall"
                    : "Download and Install"
                )}
              </Button>
            )}
          </div>
        </div>
      )}
      <Callout style={{ marginTop: "8px" }} title={t(`Friendly Reminder`)}>
        <p>
          {t(
            `If you got some ZIP or decompression errors, please re-try it later and keep this window always the latest one while downloading the updated patch file.`
          )}

          {t(
            `The upgrade package file is fully tested always and workable, however, it's caused by some unexpected issue for dispatching tasks logic internally when the window is hidden or the network is NOT stable enough, no worries, your application can upgrade to the latest version. If you still receive the same error after trying, please feel free to tell us at any time.`
          )}
        </p>
      </Callout>
    </div>
  );
});

export default observer(() => {
  return (
    <div className="softwareupdates-wrapper">
      <div>
        <Tabs
          animate={true}
          key={"vertical"}
          renderActiveTabPanelOnly={true}
          onChange={(val) => {
            if (gstore.sysBootServer.updates.isInstalling) {
              gutils.alert("Cannot toggle tab while installing new version");
              return;
            }
            gstore.localSettings.softwareUpdatesTabId = val;
          }}
          vertical={true}
          large={false}
          selectedTabId={gstore.localSettings.softwareUpdatesTabId}
        >
          <Tab
            id="prod"
            title={t("Released Version")}
            className="mygeneralbox"
            panel={<CommonSoftwareUpdatesPanel type="prod" />}
          />
          <Tab
            id="test"
            title={t("Preview Version")}
            className="mygeneralbox"
            panel={<CommonSoftwareUpdatesPanel type="test" />}
          />
        </Tabs>
      </div>
    </div>
  );
});
