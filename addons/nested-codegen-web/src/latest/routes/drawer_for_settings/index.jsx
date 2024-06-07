import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Popover,
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
  Tabs,
  Tab,
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
import Settings_preferences from "../settings_preferences";
import Settings_general from "../settings_general";
import Settings_appearance from "../settings_appearance";
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
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";
import AboutTheSoftware from "../AboutTheSoftware";
import SoftwareUpdates from "../SoftwareUpdates";
import Settings_editor from "../settings_editor";
window.Settings_editor = Settings_editor;
import SoftwareSupports from "../settings_support";
import Settings_library from "../settings_library";
import SettingLicenses from "../settings_licenses";
import SettingImportExport from "../settings_importexport";

const MyBtmControl = observer((props) => {
  const drawerConfig = gstore.settings.drawerConfig;
  let clean_items = (
    <Button
      style={{ marginLeft: "0px" }}
      text={t("Clean My Traces")}
      intent="success"
      loading={gstore.settings.loading}
      onClick={async () => {
        if (
          await gutils.win_confirm(
            t(
              `After clicking this button, CodeGen will erase sensitive information on this page and will sign out your account. Don't worry, it's just erase your local information, it will not be harmful to your cloud data. Do you want to continue?`
            )
          )
        ) {
          window.stop_auto_local_settings = true;
          localStorage.clear();
          localforage.clear();
          location.reload();
        }
      }}
    ></Button>
  );
  return (
    <div className={Classes.DRAWER_FOOTER}>
      {/* <Button
        text={t("Restore Settings")}
        intent="danger"
        loading={gstore.settings.loading}
        onClick={() => {
          gutils.api.system.restoreAllSettings();
        }}
      ></Button> */}
      {gstore.apiInfo.using_portal_mode
        ? [clean_items]
        : [
            clean_items,
            <Button
              style={{ marginLeft: "10px" }}
              text={t("Shutdown Service")}
              intent="danger"
              disabled={gstore.apiInfo.using_portal_mode}
              loading={gstore.settings.loading}
              onClick={async () => {
                if (
                  await gutils.win_confirm(
                    `Do you want to sign out the local service right now?`
                  )
                ) {
                  await gutils.ipc().quit();
                  gutils.alert(`Done.`);
                  location.reload();
                }
              }}
            ></Button>,
            <Button
              style={{ marginLeft: "10px" }}
              text={t("Launch Centre")}
              intent={"success"}
              disabled={gstore.apiInfo.using_portal_mode}
              loading={gstore.settings.loading}
              onClick={async () => {
                await window.fn_call_launch_page_open();
              }}
            ></Button>,
            <Button
              style={{ marginLeft: "10px" }}
              text={t("Lock Page")}
              intent="success"
              loading={gstore.settings.loading}
              disabled={gstore.apiInfo.using_portal_mode}
              onClick={async () => {
                if (
                  await gutils.win_confirm(
                    `Do you want to lock CodeGen service right now? If yes, after having locked it, you need to provide the password of the local service subsequently next time.`
                  )
                ) {
                  window.LOCAL_AUTH_LOGIN_CHK.cleanUser();
                  gutils.alert(`Done.`);
                  location.reload();
                }
              }}
            ></Button>,
          ]}

      {/* <Button
        style={{ marginLeft: "10px" }}
        text={t("Reload Page")}
        intent="warning"
        loading={gstore.settings.loading}
        onClick={() => {
          location.reload();
        }}
      ></Button> */}
      <div
        style={{
          float: "right",
        }}
      >
        {true
          ? [
              <Button
                text={t("Close")}
                onClick={() => {
                  drawerConfig.open = false;
                }}
                style={{ marginRight: "0px" }}
              ></Button>,
            ]
          : false && gstore.apiInfo.using_portal_mode
          ? [
              <Button
                text={t("Close")}
                onClick={() => {
                  drawerConfig.open = false;
                }}
                style={{ marginRight: "0px" }}
              ></Button>,
            ]
          : [
              <Button
                text={t("Cancel")}
                onClick={() => {
                  drawerConfig.open = false;
                }}
                // disabled={gstore.apiInfo.using_portal_mode}
                style={{ marginRight: "10px" }}
              ></Button>,
              <Button
                text={t("Apply")}
                loading={gstore.settings.loading}
                intent="primary"
                onClick={() => {
                  drawerConfig.open = false;
                  gutils.api.system.confirmAndUpdateSetting();
                }}
                disabled={
                  !gstore.settings.other.isAddModelPass
                  // gstore.apiInfo.using_portal_mode
                }
              ></Button>,
            ]}
      </div>
    </div>
  );
});

export default observer(() => {
  const drawerConfig = gstore.settings.drawerConfig;
  const state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: drawerConfig.open,
    size: "70%",
    position: Position.RIGHT,
    usePortal: true,
    title: t("System Settings"),
  };
  const DefaultPanel = () => {
    return <div>haven't supported yet</div>;
  };
  return (
    <div>
      <Drawer
        className={"mydrawerclz"}
        icon="cog"
        onClose={() => {
          drawerConfig.open = false;
        }}
        {...state}
      >
        <div
          className={Classes.DRAWER_BODY}
          style={{
            padding: "10px",
          }}
        >
          <Card
            style={{
              minHeight: "520px",
            }}
          >
            <Example className="docs-tabs-example">
              <Tabs
                animate={true}
                key={"vertical"}
                renderActiveTabPanelOnly={true}
                vertical={true}
                onChange={(val) => {
                  drawerConfig.view_key = val;
                }}
                large={false}
                selectedTabId={drawerConfig.view_key}
              >
                <Tab
                  id="general"
                  title={t("General")}
                  className="mygeneralbox"
                  panel={<Settings_general />}
                />
                <Tab
                  id="appearance"
                  title={t("Text Editor")}
                  panel={<Settings_editor />}
                />
                {/* <Tab
                  id="editor"
                  title={t("Text Editor")}
                  panel={<Settings_appearance />}
                /> */}
                {/* <Tab id="network" title="Network" panel={<DefaultPanel />} /> */}
                {/* {
                  <Tab
                    disabled={gstore.apiInfo.using_portal_mode}
                    id="preferences"
                    title={t("Logging Viewer")}
                    panel={<Settings_preferences />}
                  />
                } */}
                {
                  <Tab
                    disabled={gstore.apiInfo.using_portal_mode}
                    id="library"
                    title={t("Library")}
                    panel={<Settings_library />}
                  />
                }
                {/* <Tab
                  id="supports"
                  title={t("Software Support")}
                  panel={<SoftwareSupports />}
                /> */}
                <Tab
                  id="updates"
                  disabled={gstore.apiInfo.using_portal_mode}
                  title={t("Software Updates")}
                  panel={<SoftwareUpdates />}
                />
                {/* <Tab
                  id="licenses"
                  title={t("Software Licenses")}
                  className="mygeneralbox"
                  panel={<SettingLicenses />}
                /> */}
                <Tab
                  id="unit_test"
                  title={t("Unit Test")}
                  className="unittest"
                  panel={
                    <div>
                      <p>
                        {t(
                          `Without sufficient coverage usage, CodeGen will lose its reliability and the accuracy of results. Currently, we are writing as many unit tests as we can and will display the unit test on this PC for you to ensure all of these test case results are positive. Please kindly stay tuned, we will release this part ASAP.`
                        )}
                      </p>
                      <p>
                        {t(
                          `Once the part is ready, you can see these test case results directly.`
                        )}
                      </p>
                    </div>
                  }
                />
                <Tab
                  id="import_and_export"
                  title={t("Import and Export")}
                  className="import_and_export"
                  panel={<SettingImportExport />}
                />
                <Tab
                  id="abouts"
                  title={t("About the Software")}
                  panel={<AboutTheSoftware />}
                />
              </Tabs>
            </Example>
          </Card>
        </div>
        <MyBtmControl />
      </Drawer>
    </div>
  );
});
