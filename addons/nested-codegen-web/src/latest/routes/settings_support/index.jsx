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

export default observer((props) => {
  let [myt, onMyt] = useState(0);
  return (
    <div className="settings_general_wrapper">
      <div style={{ display: "none" }} className="each-settings">
        <h2 className="each-setting-title">{t("Debug Mode")}</h2>
        <div className="each-setting-content">
          <FormGroup
            helperText={t(
              `if you turn the debug mode on, the local service will record the output into the specified file.`
            )}
          >
            <div>
              {t(`Debug Mode: `)}
              {ipc.hasDebug() ? "true" : "false"}
            </div>
            <div>
              <Button
                onClick={async () => {
                  if (!ipc.hasDebug()) {
                    ipc.createDebug();
                  } else {
                    ipc.deleteDebug();
                  }
                  await gutils.win_alert(
                    `Update the debug mode successfully, will be executed in the next boot time.`
                  );
                  onMyt(myt + 1);
                }}
              >
                {t(`Toggle Debug Mode`)}
              </Button>
            </div>
          </FormGroup>
        </div>
      </div>
      <div style={{ display: "none" }} className="each-settings">
        <h2 className="each-setting-title">{t("Debug Mode")}</h2>
        <div className="each-setting-content">
          <FormGroup
            helperText={t(
              `If you hope the developer of CodeGen to analyze related error, please help to send these logfile to work7z@outlook.com (Friendly reminder, please do NOT upload the logfile to Github issue due to the logfile maybe contain some private information)`
            )}
          >
            <div>
              {t(`Debug File Size: `)}
              {ipc.getDebugFileSize()}
            </div>
            <div>
              {t(`Page File Size: `)}
              {ipc.getPageFileSize()}
            </div>
            <div>
              {t(`Error File Size: `)}
              {ipc.getErrFileSize()}
            </div>
            <Button
              onClick={() => {
                gutils.openDir(ipc.loggingsFolder);
              }}
              text={t("Open Debug Folder")}
            ></Button>
            <Button
              onClick={() => {
                onMyt(myt + 1);
              }}
              text={t("Refresh File Size")}
            ></Button>
            {/* <Button
              va={myt}
              onClick={() => {
                ipc.cleanDebugFiles();
                onMyt(myt + 1);
              }}
              text={t("Clean Debug Folder")}
            ></Button> */}
          </FormGroup>
        </div>
      </div>
    </div>
  );
});
