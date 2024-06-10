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
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer(({ folderkey }) => {
  return (
    <div className="tc-config-item">
      <div className="tc-config-item-title">{t(`Manage`)}</div>
      <div className="tc-config-item-content">
        <Button
          small={true}
          intent="primary"
          text={t("Open Folder")}
          loading={gstore.settings.loading}
          onClick={() => {
            gutils.openFile(gutils.getSetting(folderkey));
          }}
        ></Button>
        <Button
          small={true}
          intent="none"
          text={t("Change Folder")}
          loading={gstore.settings.loading}
          onClick={async () => {
            let oldPath_key = folderkey;
            let oldPathValue = gutils.getSetting(oldPath_key);
            gutils.selectDir(async (mydir) => {
              let isyes = await gutils.win_confirm(
                "Do you want to use this folder to save your attachments of code snippets? If yes, then service will copy files into the new folder."
              );
              if (isyes) {
                console.log(mydir);
                if (
                  await gutils.win_confirm(
                    t(
                      "For the sake of protecting your files, we will NOT delete your files inside the old folder, you need to delete these file manually after copying files. The old path is {0}",
                      oldPathValue
                    )
                  )
                ) {
                  console.log("mydir", mydir);
                  await gutils.opt("/infra/update_setting_for_path", {
                    OLD_PATH: oldPathValue,
                    NEW_PATH: mydir,
                    KEY: oldPath_key,
                  });
                  await gutils.api.system.preInit.loadingAllSettings();
                  if (
                    await gutils.win_confirm(
                      `Would you like to clean the old folder manually? If yes, we will open the old folder`
                    )
                  ) {
                    gutils.openDir(oldPathValue);
                  }
                  gutils.alertOk(`Operated the folder path successfully`);
                } else {
                  await gutils.win_alert("Operation Cancelled");
                }
              } else {
                await gutils.win_alert("Operation Cancelled");
              }
            });
          }}
        ></Button>
        <div
          style={{
            marginTop: "3px",
            width: "100%",
            whiteSpace: "normal",
            overflow: "hidden",
            fontSize: "11px",
            textOverflow: "ellipsis",
          }}
          title={gutils.getSetting(folderkey)}
        >
          {gutils.getSetting(folderkey)}
        </div>
      </div>
    </div>
  );
});
