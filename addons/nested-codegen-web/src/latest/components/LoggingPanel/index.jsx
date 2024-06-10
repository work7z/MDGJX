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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import _ from "lodash";
import Control_Pagination from "../control_Pagination";

export default observer((props) => {
  const { data } = props;
  let matchingRules = gutils.logging_obj();
  let LOGGING_VIEW_FONT_SIZE =
    gutils.getSetting("LOGGING_VIEW_FONT_SIZE") + "px";
  let LOGGING_VIEW_LINE_BREAK = gutils.getSetting("LOGGING_VIEW_LINE_BREAK");
  let LOGGING_VIEW_HEIGHT = gutils.getSetting("LOGGING_VIEW_HEIGHT") + "px";
  let localStore = {
    ...props.data,
    func: {
      search: () => {
        props.refresh();
      },
      create: () => {},
    },
  };
  const [myEle = null, onMyEle] = useState(null);
  if (myEle != null && data.scrollBottom) {
    gutils.defer(() => {
      myEle.scrollTo(null, myEle.scrollHeight);
    });
    gutils.defer(() => {
      data.scrollBottom = false;
    });
  }
  return (
    <Card className="no-max-set-for-card">
      <div style={{ marginBottom: "14px" }} className="simple-flex-container">
        <h3>
          {t("Logging Panel")}
          {props.loading ? t("(Loading...)") : ""}
        </h3>
        <div className="between-anchor">
          <a
            href={gutils.void_ref}
            onClick={() => {
              props.refresh();
            }}
          >
            {t("Refresh Logs")}
          </a>
          <a
            href={gutils.void_ref}
            onClick={() => {
              gutils.api.system.openSettingAPI("preferences");
            }}
          >
            {t("View Settings")}
          </a>
        </div>
      </div>
      <div
        className="logging-content-panel"
        style={{
          fontSize: LOGGING_VIEW_FONT_SIZE,
          height: LOGGING_VIEW_HEIGHT,
          maxHeight: LOGGING_VIEW_HEIGHT,
          marginBottom: "10px",
        }}
        ref={(e) => {
          onMyEle(e);
        }}
      >
        {_.map(data.pageData, (x, d, n) => {
          let crtMatchItem = matchingRules[x["LOG_TYPE"]] || matchingRules[0];
          return (
            <div
              key={d}
              className="eachLogRow"
              style={{
                whiteSpace: LOGGING_VIEW_LINE_BREAK,
              }}
            >
              <span className="log-time">[{x.CREATE_TIME_STR}]</span>
              <span
                className="log-type"
                style={{
                  color: crtMatchItem.color,
                }}
              >
                [{_.padEnd(crtMatchItem.label, 5, " ")}]
              </span>
              <span className="log-thread">[{x.THREAD_ID}]</span>
              <span
                className="log-ctn"
                style={{
                  color: crtMatchItem.color,
                }}
              >
                {x["MSG_CONTENT"]}
              </span>
            </div>
          );
        })}
      </div>
      <Control_Pagination tableInfo={localStore}></Control_Pagination>
    </Card>
  );
});
