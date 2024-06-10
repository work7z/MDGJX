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
  Text,
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
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";

export default observer(() => {
  let data = gstore.databaseAllData.overlay_recentScripts.data.recentScriptList;
  return (
    <div>
      <DialogCommon
        clzname="tiny-view limit-recent-box  addnewconn-box white-app-view"
        pageData={{}}
        resize={true}
        noFoot={true}
        style={{ top: "80px", maxHeight: "500px" }}
        noBackdrop={true}
        obj={gstore.databaseAllData.overlay_recentScripts}
        jsx={(props) => (
          <div className="recent-scr-list">
            <div className="btncontrol">
              <Button
                text={t("New Editor")}
                onClick={() => {
                  let ID =
                    gstore.databaseAllData.overlay_recentScripts.data.connID;
                  gutils.api.dblink.openNewEditor(ID);
                  gstore.databaseAllData.overlay_recentScripts.open = false;
                }}
                intent={"primary"}
              ></Button>
            </div>
            <div className="recentviewlist">
              {_.map(data, (x, d, n) => {
                console.log(x);
                x = x || {};
                return (
                  <div
                    key={x.ID}
                    className="blocklist-view-item recentviewlist-item"
                    onClick={() => {
                      gutils.api.dblink.resumePreviousEditorById({
                        editorId: x.ID,
                        connId:
                          gstore.databaseAllData.overlay_recentScripts.data
                            .connID,
                      });
                    }}
                  >
                    <div className="x_oneline_pack">
                      <div className="x_viewname">{x.VIEW_NAME}</div>
                      <div className="x_preview">
                        <Text>{x.LINE_PREVIEW}</Text>{" "}
                      </div>
                    </div>
                    <div
                      className="x_createtime_desc"
                      title={x.CREATE_TIME_DESC}
                    >
                      {x.CREATE_TIME_DESC}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      />
    </div>
  );
});
