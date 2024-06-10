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
import "./index.less";
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import GDataTable from "../../components/GDataTable";
import GFormSlider from "../../components/GFormSlider";
import GFormCheckbox from "../../components/GFormCheckbox";
// import GFormSelect from "../../components/GFormSelect";
import _ from "lodash";

export default observer(() => {
  const backupNow = async () => {
    gutils.alert("Being backup the files, please wait a moments...");
    let myres = await gutils.opt("/infra/backup-system-files");
    if (myres.content) {
      window.ipc.openFile(gstore.localSettings.dataBackupDir);
      // window.ipc.openFile(myres.content);
    }
    gutils.alertOk("Backed it up.");
  };
  const [x, onX] = useState(0);
  return (
    <div keyxx={x} className="settings_general_wrapper">
      <div className="each-settings">
        <h2 className="each-setting-title">{t("Language")}</h2>
        <div className="each-setting-content">
          <GFormSelect
            list={gstore.preliAllData.formList.lang}
            onChange={(e) => {
              console.log("value is chaging", e, e.target.value);
              gutils.changeLang(e.target.value);
            }}
            value={gstore.preliAllData.configs.lang}
          />
        </div>
      </div>
      <div className="each-settings ">
        <h2 className="each-setting-title">{t("Mirror Settings")}</h2>
        <div className="each-setting-content">
          <GFormSelect
            value={gstore.localSettings.is_user_based_on_china ? "1" : "0"}
            list={[
              {
                label: t("Global Mirror"),
                value: "0",
              },
              {
                label: t("China Mirror"),
                value: "1",
              },
            ]}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.is_user_based_on_china =
                e.target.value == "1";
            }}
          ></GFormSelect>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">{t("App View Type")}</h2>
        <div className="each-setting-content">
          <GFormSelect
            value={gstore.localSettings.appTypeView}
            list={gstore.settings.appViewTypeArr.get()}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.appTypeView = e.target.value;
            }}
          ></GFormSelect>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">{t("Data Backup")}</h2>
        <div className="each-setting-content">
          <GFormFilePathSelect
            onChange={async (newval) => {
              if (_.isNil(newval) || _.isEmpty(newval)) {
                return;
              }
              console.log("newval", newval);
              gstore.localSettings.pre_dataBackupDir =
                gstore.localSettings.dataBackupDir;
              gstore.localSettings.dataBackupDir = newval;
              await gutils.saveLocalSettings(gstore.localSettings);
              // gutils.alert("synchronizing backup files...");
              // await gutils.saveLocalSettings(gstore.localSettings);
              // await gutils.opt("/infra/sync-backup-files");
              gutils.w_alertSuccess(
                t(
                  "New backup folder has been setup successfully. Meanwhile, we will NOT move or delete the previous files, if you want to move them, please access the previous directory"
                ) + `: ${gstore.localSettings.pre_dataBackupDir}`,
                {
                  title: t("Set new folder for backup files"),
                }
              );
              // gutils.alertOk("synchronizing backup files successfully");
            }}
            value={gstore.localSettings.dataBackupDir}
          />
          <div>
            <div style={{ marginTop: "3px", marginBottom: "2px" }}>
              {/* {gstore.localSettings.dataBackupDir} */}
              {t(
                `Currently, export actions only backup data excluding the related attachments, for the excluded part we will support it in the following versions`
              )}
            </div>
            <a
              style={{ marginRight: "5px" }}
              onClick={(e) => {
                gutils.stop_e(e);
                backupNow();
              }}
            >
              {t("Backup")}
            </a>
            <a
              style={{ marginRight: "5px" }}
              onClick={(e) => {
                gutils.stop_e(e);
                window.ipc.openFile(gstore.localSettings.dataBackupDir);
              }}
            >
              {t("Open Folder")}
            </a>
            <a
              style={{ marginRight: "5px" }}
              onClick={(e) => {
                gutils.stop_e(e);
                gstore.localSettings.dataBackupDir = window.ipc.backupDir;
                onX(Math.random());
              }}
            >
              {t("Reset Folder")}
            </a>
          </div>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">{t("Data Vacuum")}</h2>
        <div className="each-setting-content">
          <Button
            onClick={async () => {
              let ipc = window.ipc;
              ipc.makeVacuumFlag();
              await gutils.win_alert(
                `Add vacuum task successfully! The datafile will be vacuumed after app restarted.`
              );
            }}
          >
            {t(`Vacuum Local Datafile`)}
          </Button>
          <div style={{ marginTop: "3px" }}>
            {t(`current datafile size`)}:{" "}
            {(window.ipc.getDbFileSize() / 1024 / 1024).toFixed(2)}M
          </div>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">{t("Import/Export")}</h2>
        <div className="each-setting-content">
          <Button
            onClick={() => {
              gutils.selectFile(async (val) => {
                if (_.isNil(val)) {
                  return;
                }
                if (
                  await gutils.win_confirm(
                    "Would you like to import the file? We will import it after the app restarted again"
                  )
                ) {
                  await gutils.opt("/infra/verify-backup-file", {
                    PATH: val,
                  });
                  await gutils.win_alert(
                    "Add import task successfully, please restart CodeGen to apply the changes"
                  );
                  // ok, import file now
                }
              });
            }}
          >
            {t(`Import Data`)}
          </Button>
          <Button
            onClick={() => {
              backupNow();
            }}
            style={{ marginLeft: "3px" }}
          >
            {t(`Export Data`)}
          </Button>
          <div style={{ marginTop: "3px" }}>{t(`file extension: *.zip`)}</div>
        </div>
      </div>
    </div>
  );
});
